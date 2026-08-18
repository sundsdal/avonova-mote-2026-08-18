(function(){
/* Healable v3 — app shell: chat-first, temp → locked vault, inline artifacts, right pane. */
const {
  V3Account,
  V3User: U,
  V3Bot: B,
  V3Text: T,
  V3Tool: Tool,
  V3FileCard,
  V3Markers,
  V3Artifact,
  V3Build,
  V3Suggest,
  V3Drops,
  V3Composer,
  V3Rail,
  V3Countdown,
  V3VaultLocked,
  V3Pane,
  V3LockModal,
  V3LockInline,
  V3LockPanel,
  V3Verify,
  HIcon: IA
} = window;
const V3_ENTRY = ['Tom samtale', 'Med sidepanel', 'Slippsoner først'];
const V3_LOCKVAR = ['Modal', 'I samtalen', 'Panel til høyre'];
const V3_SKILLVAR = ['Komponist-knapp', 'AI foreslår', 'Skråstrek'];
function V3App({
  entry,
  lockVar,
  skillVar
}) {
  const [step, setStep] = React.useState(0); // 0 empty · 1 file · 3 building · 4 doc
  const [asked, setAsked] = React.useState(false);
  const [gen, setGen] = React.useState(0);
  const [pane, setPane] = React.useState(null); // null | 'doc' | 'files' | 'file'
  const [file, setFile] = React.useState(null); // åpen fil i panen
  const [tab, setTab] = React.useState('uttrekk'); // 'kilde' | 'uttrekk'
  const [reviewed, setReviewed] = React.useState({}); // bekreftede verdier
  const [focus, setFocus] = React.useState(null); // rad som skal stå åpen i uttrekket
  const [wide, setWide] = React.useState(false);
  const [docV, setDocV] = React.useState(1);
  const [revised, setRevised] = React.useState(false);
  const [locked, setLocked] = React.useState(false);
  const [lockOpen, setLockOpen] = React.useState(false);
  const [verify, setVerify] = React.useState(null);
  const [pending, setPending] = React.useState(null);
  const [chat, setChat] = React.useState('temp1');
  const [openVault, setOpenVault] = React.useState(null); // ett hvelv åpent av gangen
  const [unlockId, setUnlockId] = React.useState(null); // hvelv som venter på bekreftelse
  const [sealed, setSealed] = React.useState(null); // hvelvet du leste da det ble låst
  const [railMini, setRailMini] = React.useState(false);
  const [rec, setRec] = React.useState(null); // { chat, secs }
  const [recWarn, setRecWarn] = React.useState(false);
  const [mins] = React.useState(9 * 60 + 42);
  const [studio, setStudio] = React.useState(false);
  const [skills, setSkills] = React.useState([]); // på i denne samtalen — alt av som utgangspunkt
  const [sEv, setSEv] = React.useState([]); // tool-kall i transkriptet
  const toggleSkill = n => {
    const isOn = skills.indexOf(n) > -1;
    setSkills(isOn ? skills.filter(x => x !== n) : [...skills, n]);
    setSEv(e => [...e, {
      name: n,
      on: !isOn,
      k: e.length,
      at: step
    }]);
  };
  const [tree, setTree] = React.useState(() => window.V3_TREE.map(f => ({
    ...f,
    files: f.files.map(x => ({
      ...x
    }))
  })));
  const renameFile = (fi, name, nm) => setTree(t => t.map((f, i) => i === fi ? {
    ...f,
    files: f.files.map(x => x.name === name ? {
      ...x,
      name: nm
    } : x)
  } : f));
  const deleteFile = (fi, name) => setTree(t => t.map((f, i) => i === fi ? {
    ...f,
    files: f.files.filter(x => x.name !== name)
  } : f));
  const uploadFile = fi => setTree(t => t.map((f, i) => i === fi ? {
    ...f,
    files: [...f.files, {
      name: fi === 2 ? 'Nytt_opptak_' + (f.files.length + 1) + '.m4a' : 'Nytt_vedlegg_' + (f.files.length + 1) + '.pdf',
      meta: 'Lastet opp nå · kryptert',
      kind: fi === 2 ? 'audio' : 'pdf',
      fresh: true
    }]
  } : f));
  const scroller = React.useRef(null);
  const pendingRev = window.V3_REVIEW_DEFS.filter(d => !reviewed[d.id]).length;
  const vaults = React.useMemo(() => (locked ? [{
    id: 'lipid',
    name: window.V3_CHAT.vault,
    factor: 'Face ID',
    review: {
      pending: pendingRev,
      of: window.V3_REVIEW_DEFS.length
    },
    chats: window.V3_VAULT_CHATS
  }] : []).concat(window.V3_VAULTS), [locked, pending]);
  const vaultOf = id => vaults.find(v => v.chats.some(c => c.id === id));
  const chatMeta = id => {
    for (const v of vaults) {
      const c = v.chats.find(x => x.id === id);
      if (c) return c;
    }
    return null;
  };
  const activeVault = vaultOf(chat);
  const sealedVault = vaults.find(v => v.id === sealed);
  const doc = docV === 1 ? window.V3_DOC_V1 : window.V3_DOC_V2;
  const openFile = (name, t) => {
    setFile(name);
    setTab(t || 'uttrekk');
    setPane('file');
    setWide(false);
  };
  const openReview = () => {
    const nx = window.V3_REVIEW_DEFS.find(d => !reviewed[d.id]);
    setFocus(nx ? nx.id : null);
    openFile('Lipidpanel_23-25.pdf', 'uttrekk');
  };
  const confirmValue = (id, value, unit) => setReviewed(r => ({
    ...r,
    [id]: {
      value,
      unit
    }
  }));
  const paneOpen = !!pane;
  const mini = railMini || paneOpen;
  const started = step >= 1;
  const showRail = entry === 'Tom samtale' ? started || !!rec : true;
  React.useEffect(() => {
    setStep(0);
    setPane(null);
    setDocV(1);
    setRevised(false);
    setGen(0);
    setAsked(false);
  }, [entry]);
  React.useEffect(() => {
    setSkills([]);
    setSEv([]);
  }, [skillVar]);
  React.useEffect(() => {
    if (step !== 3) return;
    if (gen >= window.V3_BUILD.length) {
      const t = setTimeout(() => setStep(4), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setGen(g => g + 1), gen === 0 ? 480 : 560);
    return () => clearTimeout(t);
  }, [step, gen]);
  React.useEffect(() => {
    if (!rec) return;
    const t = setInterval(() => setRec(r => r ? {
      ...r,
      secs: r.secs + 1
    } : r), 1000);
    return () => clearInterval(t);
  }, [!!rec]);
  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [step, gen, docV, revised, chat, lockOpen, pane, asked, sEv.length]);
  React.useEffect(() => {
    if (!recWarn) return;
    const t = setTimeout(() => setRecWarn(false), 3600);
    return () => clearTimeout(t);
  }, [recWarn]);
  const startRec = () => {
    if (rec && rec.chat !== chat) {
      setRecWarn(true);
      return;
    }
    if (rec) return;
    setRec({
      chat,
      secs: 0
    });
  };
  const openDoc = () => {
    setPane('doc');
    setWide(false);
  };
  const revise = () => {
    setDocV(2);
    setRevised(true);
    setPane('doc');
  };
  const doLock = st => {
    setLockOpen(false);
    setPending(st.picked[0] || 'faceid');
    setVerify(true);
  };
  const finishLock = () => {
    setVerify(null);
    setLocked(true);
    setOpenVault('lipid');
    setSealed(null);
  };
  const askUnlock = id => setUnlockId(id);
  const finishUnlock = () => {
    const v = vaults.find(x => x.id === unlockId);
    setOpenVault(unlockId);
    setUnlockId(null);
    setSealed(null);
    if (v && (!chat || !vaultOf(chat) || vaultOf(chat).id !== v.id)) {
      if (!chat || vaultOf(chat)) {
        setChat(v.chats[0].id);
        setPane(null);
      }
    }
  };
  const lockVault = id => {
    setOpenVault(null);
    const v = vaults.find(x => x.id === id);
    if (v && v.chats.some(c => c.id === chat)) {
      setChat(null);
      setSealed(id);
      setPane(null);
    }
  };
  const newChat = () => {
    setStep(0);
    setPane(null);
    setDocV(1);
    setRevised(false);
    setGen(0);
    setAsked(false);
    setChat(locked ? 'v2' : 'temp1');
  };
  const chatTitle = chat ? (chatMeta(chat) || {}).title || window.V3_CHAT.title : sealedVault ? sealedVault.name : '';
  const recTitle = rec ? (chatMeta(rec.chat) || {}).title || window.V3_CHAT.title : '';

  /* ── transcript ── */
  const other = chat && chat !== 'temp1' && chat !== 'v2' ? chatMeta(chat) : null;
  const feed = other ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(U, null, other.q), /*#__PURE__*/React.createElement(B, null, /*#__PURE__*/React.createElement(T, null, other.a))) : chat === 'v2' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(U, null, "Kan statinet gi muskelsmerter i leggene?"), /*#__PURE__*/React.createElement(B, null, /*#__PURE__*/React.createElement(T, null, "Muskelsmerter er en kjent bivirkning, og verdt \xE5 ta opp med legen. Jeg har ikke pr\xF8vesvar p\xE5 CK i hvelvet \u2014 vil du legge inn et nyere svar, s\xE5 ser jeg p\xE5 det?"))) : /*#__PURE__*/React.createElement(React.Fragment, null, step >= 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(U, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(IA, {
    n: "clip",
    s: 14
  }), " La til en fil")), /*#__PURE__*/React.createElement(V3FileCard, {
    onOpen: () => openFile('Lipidpanel_23-25.pdf', 'kilde')
  }), /*#__PURE__*/React.createElement(B, null, /*#__PURE__*/React.createElement(Tool, {
    label: "Leste Lipidpanel_23-25.pdf",
    out: '5 analytter' + (pendingRev ? ' · ' + pendingRev + ' til gjennomgang' : ''),
    rows: [['flask', 'Kilde', 'skannet utskrift fra fastlegen'], ['quote', null, 'hver verdi peker tilbake til siden den kom fra'], ['lock', null, 'kryptert ved ankomst']]
  }), /*#__PURE__*/React.createElement(T, null, "Jeg har lest de fem analyttene. Tre av dem er verdt \xE5 se n\xE6rmere p\xE5:"), /*#__PURE__*/React.createElement(V3Markers, null), pendingRev > 0 && /*#__PURE__*/React.createElement(window.V3ReviewNudge, {
    pending: pendingRev,
    onClick: openReview
  }), skillVar === 'AI foreslår' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(T, null, "Jeg har to skiller som passer p\xE5 dette. Legg til det du vil bruke \u2014 det gjelder bare denne samtalen."), /*#__PURE__*/React.createElement(window.V3SkillOffer, {
    names: ['pasientnotat', 'lipid'],
    skills: skills,
    onToggle: toggleSkill
  })) : /*#__PURE__*/React.createElement(T, null, "Vil du at jeg lager et pasientnotat du kan ta med til konsultasjonen?")), step === 1 && /*#__PURE__*/React.createElement(V3Suggest, {
    items: [{
      label: 'Lag et pasientnotat',
      icon: 'filetext',
      primary: true,
      onClick: () => {
        setStep(3);
        setGen(0);
      }
    }, {
      label: 'Hvorfor er LDL for høyt?',
      icon: 'info',
      onClick: () => setAsked(true)
    }]
  })), asked && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(U, null, "Hvorfor er LDL for h\xF8yt?"), /*#__PURE__*/React.createElement(B, null, /*#__PURE__*/React.createElement(T, null, "LDL har ligget mellom 4,0 og 4,6 mmol/L i alle tolv kvartalene i denne PDF-en \u2014 alts\xE5 stabilt over m\xE5let, ikke et enkelt utslag. Det kan skyldes dose, etterlevelse eller kosthold. Det er noe legen b\xF8r vurdere.")), step < 3 && /*#__PURE__*/React.createElement(V3Suggest, {
    items: [{
      label: 'Lag et pasientnotat',
      icon: 'filetext',
      primary: true,
      onClick: () => {
        setStep(3);
        setGen(0);
      }
    }]
  })), step >= 3 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(U, null, "Lag et pasientnotat jeg kan ta med."), /*#__PURE__*/React.createElement(B, null, step === 3 ? /*#__PURE__*/React.createElement(V3Build, {
    step: gen
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tool, {
    label: "Skrev Pasientnotat.docx",
    out: "Dokumenter",
    rows: [['filetext', 'Skill', 'pasientnotat · fyller mal fra kilden'], ['folder', 'Sti', (locked ? window.V3_CHAT.vault : 'Denne samtalen') + ' / Dokumenter']]
  }), /*#__PURE__*/React.createElement(T, null, "Notatet ligger klart. Klikk kortet for \xE5 lese det \u2014 be om endringer her, s\xE5 skriver jeg en ny versjon."), /*#__PURE__*/React.createElement(V3Artifact, {
    doc: window.V3_DOC_V1,
    active: pane === 'doc' && docV === 1,
    onOpen: () => {
      setDocV(1);
      openDoc();
    }
  }))), step >= 4 && !revised && /*#__PURE__*/React.createElement(V3Suggest, {
    items: [{
      label: 'Legg til spørsmål til legen',
      icon: 'edit',
      primary: true,
      onClick: revise
    }, {
      label: 'Lås samtalen',
      icon: 'lock',
      onClick: () => setLockOpen(true)
    }]
  })), revised && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(U, null, "Legg til tre sp\xF8rsm\xE5l jeg b\xF8r stille legen."), /*#__PURE__*/React.createElement(B, null, /*#__PURE__*/React.createElement(Tool, {
    label: "Oppdaterte Pasientnotat.docx",
    out: "v2",
    rows: [['edit', 'Endring', 'la til seksjonen «Spørsmål til konsultasjonen»'], ['layers', 'Versjon', 'v1 beholdes i historikken']]
  }), /*#__PURE__*/React.createElement(T, null, "Ny versjon er skrevet. Forrige versjon ligger fortsatt i historikken."), /*#__PURE__*/React.createElement(V3Artifact, {
    doc: window.V3_DOC_V2,
    active: pane === 'doc' && docV === 2,
    onOpen: () => {
      setDocV(2);
      openDoc();
    }
  })), !locked && /*#__PURE__*/React.createElement(V3Suggest, {
    items: [{
      label: 'Lås samtalen',
      icon: 'lock',
      primary: true,
      onClick: () => setLockOpen(true)
    }]
  })), lockOpen && lockVar === 'I samtalen' && /*#__PURE__*/React.createElement(B, null, /*#__PURE__*/React.createElement(T, null, "Da l\xE5ser vi den. Etterp\xE5 blir dette et kryptert hvelv, og du kan legge flere samtaler i det."), /*#__PURE__*/React.createElement(V3LockInline, {
    onDone: doLock,
    onCancel: () => setLockOpen(false)
  })), locked && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'center',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 13px',
      borderRadius: 999,
      background: 'var(--ok-12)',
      border: '1px solid rgba(46,156,114,0.3)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--ok)'
    }
  }, /*#__PURE__*/React.createElement(IA, {
    n: "lock",
    s: 13
  }), " L\xE5st som hvelv \xB7 ", window.V3_CHAT.vault), /*#__PURE__*/React.createElement(B, null, /*#__PURE__*/React.createElement(T, null, "Samtalen er n\xE5 et kryptert hvelv som l\xE5ses opp med Face ID. Filene ble med. Du kan starte nye samtaler i hvelvet fra sidepanelet."))));

  /* ── skill slått på/av — kommer som et vanlig tool-kall i transkriptet ── */
  const skillCard = (e, last) => {
    const k = window.v3Skill(e.name);
    if (!k) return null;
    const doc = k.fam === 'dokument';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: e.k
    }, /*#__PURE__*/React.createElement(B, null, /*#__PURE__*/React.createElement(Tool, {
      label: (e.on ? 'La til' : 'Fjernet') + ' skill · ' + k.title,
      out: doc ? 'Dokument' : 'Generell',
      rows: e.on ? [[doc ? 'filetext' : 'flask', 'Skill', k.name + ' · ' + k.v + (k.who !== 'Du' ? ' · delt av ' + k.who : '')], doc ? ['folder', 'Skriver til', (locked ? window.V3_CHAT.vault : 'Denne samtalen') + ' / Dokumenter'] : ['bars', 'Bruk', 'regler og markører brukes når prøvesvar leses'], ['lock', null, 'kjører på dine data · gjelder bare denne samtalen']] : [[doc ? 'filetext' : 'flask', 'Skill', k.name], ['info', null, 'brukes ikke videre i denne samtalen']]
    }), /*#__PURE__*/React.createElement(T, null, e.on ? doc ? k.title + ' er lagt til. Si hva notatet skal dekke, eller legg inn et prøvesvar — så skriver jeg det etter malen.' : k.title + ' er lagt til. Jeg bruker reglene og referansene derfra når jeg leser prøvesvar her.' : k.title + ' er fjernet. Jeg bruker den ikke videre i denne samtalen.')), last && e.on && doc && step >= 1 && step < 3 && /*#__PURE__*/React.createElement(V3Suggest, {
      items: [{
        label: 'Lag ' + k.title.toLowerCase() + ' nå',
        icon: 'filetext',
        primary: true,
        onClick: () => {
          setStep(3);
          setGen(0);
        }
      }]
    }));
  };
  const lastEv = sEv.length - 1;
  const preLog = sEv.filter(e => e.at < 1).map(e => skillCard(e, e.k === lastEv));
  const postLog = sEv.filter(e => e.at >= 1).map(e => skillCard(e, e.k === lastEv));
  const empty = /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      display: 'grid',
      placeItems: 'center',
      padding: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 700,
      animation: 'hblFadeUp .35s ease both',
      textAlign: entry === 'Slippsoner først' ? 'left' : 'center'
    }
  }, entry === 'Slippsoner først' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "hbl-display",
    style: {
      fontSize: 25,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, "Legg inn noe \xE5 jobbe med"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--ink-60)',
      margin: '7px 0 22px',
      lineHeight: 1.55
    }
  }, "Samtalen er midlertidig til du l\xE5ser den. Alt du legger inn krypteres ved ankomst."), /*#__PURE__*/React.createElement(V3Drops, {
    onUpload: () => setStep(1),
    onRecord: startRec
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 15,
      background: 'var(--blue-12)',
      color: 'var(--blue)',
      display: 'grid',
      placeItems: 'center',
      margin: '0 auto 16px'
    }
  }, /*#__PURE__*/React.createElement(IA, {
    n: "sparkle",
    s: 26
  })), /*#__PURE__*/React.createElement("h1", {
    className: "hbl-display",
    style: {
      fontSize: 27,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, "Hva vil du se p\xE5 i dag?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--ink-60)',
      margin: '8px auto 24px',
      maxWidth: 470,
      lineHeight: 1.55
    }
  }, "Skriv, last opp et pr\xF8vesvar eller start et opptak. Samtalen er midlertidig til du l\xE5ser den."), /*#__PURE__*/React.createElement(V3Drops, {
    onUpload: () => setStep(1),
    onRecord: startRec
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 22,
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(IA, {
    n: "clock",
    s: 14
  }), " Slettes automatisk etter 10 timer"))));
  const showEmpty = chat === 'temp1' && !started && !sEv.length;
  const showSealed = !chat && !!sealedVault;
  return /*#__PURE__*/React.createElement("div", {
    className: "hbl",
    style: {
      position: 'relative',
      display: 'flex',
      height: '100%',
      background: 'var(--oat)',
      overflow: 'hidden'
    }
  }, showRail && /*#__PURE__*/React.createElement(V3Rail, {
    mini: mini,
    tempOpen: !locked,
    activeId: chat,
    mins: mins,
    rec: rec,
    recTitle: recTitle,
    pending: pendingRev,
    reviewOf: started ? window.V3_REVIEW_DEFS.length : 0,
    onReview: openReview,
    vaults: vaults,
    openVault: openVault,
    onOpenVault: askUnlock,
    onLockVault: lockVault,
    onGoRec: () => {
      setChat(rec.chat);
      setPane(null);
    },
    onStopRec: () => {
      setRec(null);
      setStep(s => s < 1 ? 1 : s);
    },
    onStudio: () => setStudio(true),
    onPick: id => {
      setChat(id);
      setSealed(null);
      setPane(null);
    },
    onNew: newChat,
    onToggle: () => {
      setRailMini(m => !m);
      if (paneOpen) setPane(null);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'grid',
      gridTemplateColumns: paneOpen ? wide ? '0px minmax(0,1fr)' : 'minmax(0,34%) minmax(0,1fr)' : 'minmax(0,1fr)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'grid-template-columns .44s cubic-bezier(.2,.8,.3,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '11px 20px',
      borderBottom: '1px solid var(--line)',
      background: 'rgba(252,250,244,0.8)',
      backdropFilter: 'blur(12px)',
      flex: '0 0 auto'
    }
  }, !showRail && /*#__PURE__*/React.createElement(window.HMark, {
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    className: "hbl-display",
    style: {
      fontSize: 15.5,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0
    }
  }, chatTitle), activeVault ? /*#__PURE__*/React.createElement("span", {
    className: "hbl-chip hbl-chip--ok",
    style: {
      fontSize: 10.5,
      flex: '0 0 auto'
    },
    title: 'I hvelvet ' + activeVault.name
  }, /*#__PURE__*/React.createElement(IA, {
    n: "lockopen",
    s: 12
  }), " ", paneOpen ? 'Hvelv' : activeVault.name + ' · ' + activeVault.factor) : showSealed ? /*#__PURE__*/React.createElement("span", {
    className: "hbl-chip",
    style: {
      fontSize: 10.5,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IA, {
    n: "lock",
    s: 12
  }), " L\xE5st") : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      display: 'inline-flex'
    },
    title: "Midlertidig samtale \u2014 utl\xF8per om 9t 42m"
  }, /*#__PURE__*/React.createElement(V3Countdown, {
    mins: mins,
    compact: paneOpen
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 4
    }
  }), !locked && !activeVault && !showSealed && /*#__PURE__*/React.createElement("button", {
    onClick: () => setLockOpen(true),
    className: "hbl-btn hbl-btn--sm",
    title: "L\xE5s samtalen",
    style: {
      flex: '0 0 auto',
      padding: paneOpen ? 8 : undefined
    }
  }, /*#__PURE__*/React.createElement(IA, {
    n: "lock",
    s: 15
  }), !paneOpen && ' Lås samtalen'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPane(pane === 'files' ? null : 'files'),
    title: "Filer i samtalen",
    className: "hbl-btn hbl-btn--ghost hbl-btn--sm",
    style: {
      padding: 8,
      flex: '0 0 auto',
      background: pane === 'files' ? 'var(--blue-12)' : undefined,
      color: pane === 'files' ? 'var(--blue)' : undefined
    }
  }, /*#__PURE__*/React.createElement(IA, {
    n: "folder",
    s: 16
  })), !showRail && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 20,
      background: 'var(--line-2)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement(V3Account, {
    onStudio: () => setStudio(true)
  }))), showSealed ? /*#__PURE__*/React.createElement(V3VaultLocked, {
    vault: sealedVault,
    onUnlock: () => askUnlock(sealedVault.id)
  }) : showEmpty ? empty : /*#__PURE__*/React.createElement("div", {
    ref: scroller,
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      padding: '22px 0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: paneOpen ? 520 : 760,
      margin: '0 auto',
      padding: paneOpen ? '0 20px' : '0 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: paneOpen ? 15 : 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'center',
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-30)'
    }
  }, "I dag"), preLog, feed, postLog, !started && chat === 'temp1' && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-45)',
      marginBottom: 9
    }
  }, "Legg inn noe skillen kan jobbe p\xE5:"), /*#__PURE__*/React.createElement(V3Drops, {
    dense: true,
    onUpload: () => setStep(1),
    onRecord: startRec
  })))), !showSealed && /*#__PURE__*/React.createElement(V3Composer, {
    narrow: paneOpen,
    recording: !!rec && rec.chat === chat,
    onUpload: () => setStep(s => s < 1 ? 1 : s),
    onRecord: startRec,
    skills: skills,
    onToggleSkill: toggleSkill,
    onStudio: () => setStudio(true),
    skillVar: skillVar,
    placeholder: pane === 'doc' ? 'Be om endringer i notatet …' : showEmpty ? 'Skriv, eller legg inn noe …' : 'Spør om prøvesvarene …'
  })), paneOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      overflow: 'hidden',
      animation: 'hblFade .3s ease both'
    }
  }, /*#__PURE__*/React.createElement(V3Pane, {
    view: pane,
    file: file,
    tab: tab,
    onTab: setTab,
    reviewed: reviewed,
    onConfirm: confirmValue,
    focus: focus,
    pending: pendingRev,
    doc: doc,
    locked: locked,
    wide: wide,
    tree: tree,
    onRename: renameFile,
    onDelete: deleteFile,
    onUpload: uploadFile,
    onClose: () => {
      setPane(null);
      setWide(false);
    },
    onShowFiles: () => {
      setPane('files');
      setFocus(null);
    },
    onOpenDoc: () => setPane('doc'),
    onOpenFile: n => openFile(n, 'uttrekk'),
    onWide: () => setWide(w => !w)
  })), lockOpen && lockVar === 'Modal' && /*#__PURE__*/React.createElement(V3LockModal, {
    onDone: doLock,
    onCancel: () => setLockOpen(false)
  }), lockOpen && lockVar === 'Panel til høyre' && /*#__PURE__*/React.createElement(V3LockPanel, {
    onDone: doLock,
    onCancel: () => setLockOpen(false)
  }), verify && /*#__PURE__*/React.createElement(V3Verify, {
    factor: pending,
    onDone: finishLock
  }), unlockId && /*#__PURE__*/React.createElement(V3Verify, {
    mode: "unlock",
    vault: (vaults.find(v => v.id === unlockId) || {}).name,
    factor: (vaults.find(v => v.id === unlockId) || {}).factor === 'Touch ID' ? 'touchid' : 'faceid',
    onDone: finishUnlock
  })), studio && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 120,
      background: 'var(--oat)',
      animation: 'hblFade .22s ease both'
    }
  }, /*#__PURE__*/React.createElement(window.V3Studio, {
    onClose: () => setStudio(false)
  })), rec && recWarn && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 92,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 70,
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '10px 13px',
      borderRadius: 12,
      background: 'var(--ink)',
      color: '#FBF8F0',
      boxShadow: '0 18px 40px -14px rgba(35,25,22,0.55)',
      animation: 'hblFadeUp .2s ease both',
      maxWidth: 380
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#F0A98E',
      flex: '0 0 auto',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(IA, {
    n: "alert",
    s: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.45
    }
  }, "Et opptak g\xE5r allerede i ", /*#__PURE__*/React.createElement("b", null, recTitle), ". Stopp det f\xF8rst for \xE5 ta opp her.")));
}
Object.assign(window, {
  V3App,
  V3_ENTRY,
  V3_LOCKVAR,
  V3_SKILLVAR
});
})();
