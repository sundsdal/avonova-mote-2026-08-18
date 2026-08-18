/* Healable v3 — app shell: chat-first, temp → locked vault, inline artifacts, right pane. */
const { V3Account, V3User: U, V3Bot: B, V3Text: T, V3Tool: Tool, V3FileCard, V3Markers, V3Artifact, V3Build, V3Suggest, V3Drops, V3Composer, V3Rail, V3Countdown, V3VaultLocked, V3Pane, V3LockModal, V3LockInline, V3LockPanel, V3Verify, HIcon: IA } = window;

const V3_ENTRY = ['Tom samtale', 'Med sidepanel', 'Slippsoner først'];
const V3_LOCKVAR = ['Modal', 'I samtalen', 'Panel til høyre'];
const V3_SKILLVAR = ['Komponist-knapp', 'AI foreslår', 'Skråstrek'];

function V3App({ entry, lockVar, skillVar }) {
  const [step, setStep] = React.useState(0);          // 0 empty · 1 file · 3 building · 4 doc
  const [asked, setAsked] = React.useState(false);
  const [gen, setGen] = React.useState(0);
  const [pane, setPane] = React.useState(null);       // null | 'doc' | 'files' | 'file'
  const [file, setFile] = React.useState(null);       // åpen fil i panen
  const [tab, setTab] = React.useState('uttrekk');    // 'kilde' | 'uttrekk'
  const [reviewed, setReviewed] = React.useState({}); // bekreftede verdier
  const [focus, setFocus] = React.useState(null);     // rad som skal stå åpen i uttrekket
  const [wide, setWide] = React.useState(false);
  const [docV, setDocV] = React.useState(1);
  const [revised, setRevised] = React.useState(false);
  const [locked, setLocked] = React.useState(false);
  const [lockOpen, setLockOpen] = React.useState(false);
  const [verify, setVerify] = React.useState(null);
  const [pending, setPending] = React.useState(null);
  const [chat, setChat] = React.useState('temp1');
  const [openVault, setOpenVault] = React.useState(null);   // ett hvelv åpent av gangen
  const [unlockId, setUnlockId] = React.useState(null);     // hvelv som venter på bekreftelse
  const [sealed, setSealed] = React.useState(null);         // hvelvet du leste da det ble låst
  const [railMini, setRailMini] = React.useState(false);
  const [rec, setRec] = React.useState(null);         // { chat, secs }
  const [recWarn, setRecWarn] = React.useState(false);
  const [mins] = React.useState(9 * 60 + 42);
  const [studio, setStudio] = React.useState(false);
  const [skills, setSkills] = React.useState([]);     // på i denne samtalen — alt av som utgangspunkt
  const [sEv, setSEv] = React.useState([]);           // tool-kall i transkriptet
  const toggleSkill = (n) => {
    const isOn = skills.indexOf(n) > -1;
    setSkills(isOn ? skills.filter((x) => x !== n) : [...skills, n]);
    setSEv((e) => [...e, { name: n, on: !isOn, k: e.length, at: step }]);
  };
  const [tree, setTree] = React.useState(() => window.V3_TREE.map((f) => ({ ...f, files: f.files.map((x) => ({ ...x })) })));
  const renameFile = (fi, name, nm) => setTree((t) => t.map((f, i) => (i === fi ? { ...f, files: f.files.map((x) => (x.name === name ? { ...x, name: nm } : x)) } : f)));
  const deleteFile = (fi, name) => setTree((t) => t.map((f, i) => (i === fi ? { ...f, files: f.files.filter((x) => x.name !== name) } : f)));
  const uploadFile = (fi) => setTree((t) => t.map((f, i) => (i === fi ? { ...f, files: [...f.files, { name: fi === 2 ? 'Nytt_opptak_' + (f.files.length + 1) + '.m4a' : 'Nytt_vedlegg_' + (f.files.length + 1) + '.pdf', meta: 'Lastet opp nå · kryptert', kind: fi === 2 ? 'audio' : 'pdf', fresh: true }] } : f)));
  const scroller = React.useRef(null);
  const pendingRev = window.V3_REVIEW_DEFS.filter((d) => !reviewed[d.id]).length;

  const vaults = React.useMemo(() => (locked
    ? [{ id: 'lipid', name: window.V3_CHAT.vault, factor: 'Face ID', review: { pending: pendingRev, of: window.V3_REVIEW_DEFS.length }, chats: window.V3_VAULT_CHATS }]
    : []).concat(window.V3_VAULTS), [locked, pending]);
  const vaultOf = (id) => vaults.find((v) => v.chats.some((c) => c.id === id));
  const chatMeta = (id) => { for (const v of vaults) { const c = v.chats.find((x) => x.id === id); if (c) return c; } return null; };
  const activeVault = vaultOf(chat);
  const sealedVault = vaults.find((v) => v.id === sealed);

  const doc = docV === 1 ? window.V3_DOC_V1 : window.V3_DOC_V2;
  const openFile = (name, t) => { setFile(name); setTab(t || 'uttrekk'); setPane('file'); setWide(false); };
  const openReview = () => { const nx = window.V3_REVIEW_DEFS.find((d) => !reviewed[d.id]); setFocus(nx ? nx.id : null); openFile('Lipidpanel_23-25.pdf', 'uttrekk'); };
  const confirmValue = (id, value, unit) => setReviewed((r) => ({ ...r, [id]: { value, unit } }));
  const paneOpen = !!pane;
  const mini = railMini || paneOpen;
  const started = step >= 1;
  const showRail = entry === 'Tom samtale' ? (started || !!rec) : true;

  React.useEffect(() => { setStep(0); setPane(null); setDocV(1); setRevised(false); setGen(0); setAsked(false); }, [entry]);
  React.useEffect(() => { setSkills([]); setSEv([]); }, [skillVar]);
  React.useEffect(() => {
    if (step !== 3) return;
    if (gen >= window.V3_BUILD.length) { const t = setTimeout(() => setStep(4), 350); return () => clearTimeout(t); }
    const t = setTimeout(() => setGen((g) => g + 1), gen === 0 ? 480 : 560);
    return () => clearTimeout(t);
  }, [step, gen]);
  React.useEffect(() => { if (!rec) return; const t = setInterval(() => setRec((r) => (r ? { ...r, secs: r.secs + 1 } : r)), 1000); return () => clearInterval(t); }, [!!rec]);
  React.useEffect(() => { if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; }, [step, gen, docV, revised, chat, lockOpen, pane, asked, sEv.length]);
  React.useEffect(() => { if (!recWarn) return; const t = setTimeout(() => setRecWarn(false), 3600); return () => clearTimeout(t); }, [recWarn]);

  const startRec = () => {
    if (rec && rec.chat !== chat) { setRecWarn(true); return; }
    if (rec) return;
    setRec({ chat, secs: 0 });
  };
  const openDoc = () => { setPane('doc'); setWide(false); };
  const revise = () => { setDocV(2); setRevised(true); setPane('doc'); };
  const doLock = (st) => { setLockOpen(false); setPending(st.picked[0] || 'faceid'); setVerify(true); };
  const finishLock = () => { setVerify(null); setLocked(true); setOpenVault('lipid'); setSealed(null); };
  const askUnlock = (id) => setUnlockId(id);
  const finishUnlock = () => {
    const v = vaults.find((x) => x.id === unlockId);
    setOpenVault(unlockId); setUnlockId(null); setSealed(null);
    if (v && (!chat || !vaultOf(chat) || vaultOf(chat).id !== v.id)) { if (!chat || vaultOf(chat)) { setChat(v.chats[0].id); setPane(null); } }
  };
  const lockVault = (id) => {
    setOpenVault(null);
    const v = vaults.find((x) => x.id === id);
    if (v && v.chats.some((c) => c.id === chat)) { setChat(null); setSealed(id); setPane(null); }
  };
  const newChat = () => { setStep(0); setPane(null); setDocV(1); setRevised(false); setGen(0); setAsked(false); setChat(locked ? 'v2' : 'temp1'); };

  const chatTitle = chat ? ((chatMeta(chat) || {}).title || window.V3_CHAT.title) : (sealedVault ? sealedVault.name : '');
  const recTitle = rec ? ((chatMeta(rec.chat) || {}).title || window.V3_CHAT.title) : '';

  /* ── transcript ── */
  const other = chat && chat !== 'temp1' && chat !== 'v2' ? chatMeta(chat) : null;
  const feed = other ? (
    <>
      <U>{other.q}</U>
      <B><T>{other.a}</T></B>
    </>
  ) : chat === 'v2' ? (
    <>
      <U>Kan statinet gi muskelsmerter i leggene?</U>
      <B><T>Muskelsmerter er en kjent bivirkning, og verdt å ta opp med legen. Jeg har ikke prøvesvar på CK i hvelvet — vil du legge inn et nyere svar, så ser jeg på det?</T></B>
    </>
  ) : (
    <>
      {step >= 1 && <>
        <U><span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><IA n="clip" s={14} /> La til en fil</span></U>
        <V3FileCard onOpen={() => openFile('Lipidpanel_23-25.pdf', 'kilde')} />
        <B>
          <Tool label="Leste Lipidpanel_23-25.pdf" out={'5 analytter' + (pendingRev ? ' · ' + pendingRev + ' til gjennomgang' : '')} rows={[['flask', 'Kilde', 'skannet utskrift fra fastlegen'], ['quote', null, 'hver verdi peker tilbake til siden den kom fra'], ['lock', null, 'kryptert ved ankomst']]} />
          <T>Jeg har lest de fem analyttene. Tre av dem er verdt å se nærmere på:</T>
          <V3Markers />
          {pendingRev > 0 && <window.V3ReviewNudge pending={pendingRev} onClick={openReview} />}
          {skillVar === 'AI foreslår'
            ? <>
                <T>Jeg har to skiller som passer på dette. Legg til det du vil bruke — det gjelder bare denne samtalen.</T>
                <window.V3SkillOffer names={['pasientnotat', 'lipid']} skills={skills} onToggle={toggleSkill} />
              </>
            : <T>Vil du at jeg lager et pasientnotat du kan ta med til konsultasjonen?</T>}
        </B>
        {step === 1 && <V3Suggest items={[
          { label: 'Lag et pasientnotat', icon: 'filetext', primary: true, onClick: () => { setStep(3); setGen(0); } },
          { label: 'Hvorfor er LDL for høyt?', icon: 'info', onClick: () => setAsked(true) },
        ]} />}
      </>}
      {asked && <>
        <U>Hvorfor er LDL for høyt?</U>
        <B><T>LDL har ligget mellom 4,0 og 4,6 mmol/L i alle tolv kvartalene i denne PDF-en — altså stabilt over målet, ikke et enkelt utslag. Det kan skyldes dose, etterlevelse eller kosthold. Det er noe legen bør vurdere.</T></B>
        {step < 3 && <V3Suggest items={[{ label: 'Lag et pasientnotat', icon: 'filetext', primary: true, onClick: () => { setStep(3); setGen(0); } }]} />}
      </>}
      {step >= 3 && <>
        <U>Lag et pasientnotat jeg kan ta med.</U>
        <B>
          {step === 3 ? <V3Build step={gen} /> : <>
            <Tool label="Skrev Pasientnotat.docx" out="Dokumenter" rows={[['filetext', 'Skill', 'pasientnotat · fyller mal fra kilden'], ['folder', 'Sti', (locked ? window.V3_CHAT.vault : 'Denne samtalen') + ' / Dokumenter']]} />
            <T>Notatet ligger klart. Klikk kortet for å lese det — be om endringer her, så skriver jeg en ny versjon.</T>
            <V3Artifact doc={window.V3_DOC_V1} active={pane === 'doc' && docV === 1} onOpen={() => { setDocV(1); openDoc(); }} />
          </>}
        </B>
        {step >= 4 && !revised && <V3Suggest items={[
          { label: 'Legg til spørsmål til legen', icon: 'edit', primary: true, onClick: revise },
          { label: 'Lås samtalen', icon: 'lock', onClick: () => setLockOpen(true) },
        ]} />}
      </>}
      {revised && <>
        <U>Legg til tre spørsmål jeg bør stille legen.</U>
        <B>
          <Tool label="Oppdaterte Pasientnotat.docx" out="v2" rows={[['edit', 'Endring', 'la til seksjonen «Spørsmål til konsultasjonen»'], ['layers', 'Versjon', 'v1 beholdes i historikken']]} />
          <T>Ny versjon er skrevet. Forrige versjon ligger fortsatt i historikken.</T>
          <V3Artifact doc={window.V3_DOC_V2} active={pane === 'doc' && docV === 2} onOpen={() => { setDocV(2); openDoc(); }} />
        </B>
        {!locked && <V3Suggest items={[{ label: 'Lås samtalen', icon: 'lock', primary: true, onClick: () => setLockOpen(true) }]} />}
      </>}
      {lockOpen && lockVar === 'I samtalen' && (
        <B><T>Da låser vi den. Etterpå blir dette et kryptert hvelv, og du kan legge flere samtaler i det.</T>
          <V3LockInline onDone={doLock} onCancel={() => setLockOpen(false)} /></B>
      )}
      {locked && <>
        <div style={{ alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 999, background: 'var(--ok-12)', border: '1px solid rgba(46,156,114,0.3)', fontSize: 12, fontWeight: 600, color: 'var(--ok)' }}><IA n="lock" s={13} /> Låst som hvelv · {window.V3_CHAT.vault}</div>
        <B><T>Samtalen er nå et kryptert hvelv som låses opp med Face ID. Filene ble med. Du kan starte nye samtaler i hvelvet fra sidepanelet.</T></B>
      </>}
    </>
  );

  /* ── skill slått på/av — kommer som et vanlig tool-kall i transkriptet ── */
  const skillCard = (e, last) => {
    const k = window.v3Skill(e.name);
    if (!k) return null;
    const doc = k.fam === 'dokument';
    return (
      <React.Fragment key={e.k}>
        <B>
          <Tool label={(e.on ? 'La til' : 'Fjernet') + ' skill · ' + k.title} out={doc ? 'Dokument' : 'Generell'}
            rows={e.on
              ? [[doc ? 'filetext' : 'flask', 'Skill', k.name + ' · ' + k.v + (k.who !== 'Du' ? ' · delt av ' + k.who : '')],
                 doc ? ['folder', 'Skriver til', (locked ? window.V3_CHAT.vault : 'Denne samtalen') + ' / Dokumenter'] : ['bars', 'Bruk', 'regler og markører brukes når prøvesvar leses'],
                 ['lock', null, 'kjører på dine data · gjelder bare denne samtalen']]
              : [[doc ? 'filetext' : 'flask', 'Skill', k.name], ['info', null, 'brukes ikke videre i denne samtalen']]} />
          <T>{e.on
            ? (doc
              ? k.title + ' er lagt til. Si hva notatet skal dekke, eller legg inn et prøvesvar — så skriver jeg det etter malen.'
              : k.title + ' er lagt til. Jeg bruker reglene og referansene derfra når jeg leser prøvesvar her.')
            : k.title + ' er fjernet. Jeg bruker den ikke videre i denne samtalen.'}</T>
        </B>
        {last && e.on && doc && step >= 1 && step < 3 && <V3Suggest items={[{ label: 'Lag ' + k.title.toLowerCase() + ' nå', icon: 'filetext', primary: true, onClick: () => { setStep(3); setGen(0); } }]} />}
      </React.Fragment>
    );
  };
  const lastEv = sEv.length - 1;
  const preLog = sEv.filter((e) => e.at < 1).map((e) => skillCard(e, e.k === lastEv));
  const postLog = sEv.filter((e) => e.at >= 1).map((e) => skillCard(e, e.k === lastEv));

  const empty = (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'grid', placeItems: 'center', padding: 26 }}>
      <div style={{ width: '100%', maxWidth: 700, animation: 'hblFadeUp .35s ease both', textAlign: entry === 'Slippsoner først' ? 'left' : 'center' }}>
        {entry === 'Slippsoner først' ? (
          <>
            <h1 className="hbl-display" style={{ fontSize: 25, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>Legg inn noe å jobbe med</h1>
            <p style={{ fontSize: 14, color: 'var(--ink-60)', margin: '7px 0 22px', lineHeight: 1.55 }}>Samtalen er midlertidig til du låser den. Alt du legger inn krypteres ved ankomst.</p>
            <V3Drops onUpload={() => setStep(1)} onRecord={startRec} />
          </>
        ) : (
          <>
            <div style={{ width: 52, height: 52, borderRadius: 15, background: 'var(--blue-12)', color: 'var(--blue)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}><IA n="sparkle" s={26} /></div>
            <h1 className="hbl-display" style={{ fontSize: 27, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>Hva vil du se på i dag?</h1>
            <p style={{ fontSize: 14.5, color: 'var(--ink-60)', margin: '8px auto 24px', maxWidth: 470, lineHeight: 1.55 }}>Skriv, last opp et prøvesvar eller start et opptak. Samtalen er midlertidig til du låser den.</p>
            <V3Drops onUpload={() => setStep(1)} onRecord={startRec} />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 22, fontSize: 11.5, color: 'var(--ink-45)' }}><IA n="clock" s={14} /> Slettes automatisk etter 10 timer</div>
          </>
        )}
      </div>
    </div>
  );

  const showEmpty = chat === 'temp1' && !started && !sEv.length;
  const showSealed = !chat && !!sealedVault;

  return (
    <div className="hbl" style={{ position: 'relative', display: 'flex', height: '100%', background: 'var(--oat)', overflow: 'hidden' }}>
      {showRail && <V3Rail mini={mini} tempOpen={!locked} activeId={chat} mins={mins} rec={rec} recTitle={recTitle}
        pending={pendingRev} reviewOf={started ? window.V3_REVIEW_DEFS.length : 0} onReview={openReview}
        vaults={vaults} openVault={openVault} onOpenVault={askUnlock} onLockVault={lockVault}
        onGoRec={() => { setChat(rec.chat); setPane(null); }} onStopRec={() => { setRec(null); setStep((s) => (s < 1 ? 1 : s)); }}
        onStudio={() => setStudio(true)} onPick={(id) => { setChat(id); setSealed(null); setPane(null); }} onNew={newChat} onToggle={() => { setRailMini((m) => !m); if (paneOpen) setPane(null); }} />}

      <div style={{ flex: 1, minWidth: 0, display: 'grid', gridTemplateColumns: paneOpen ? (wide ? '0px minmax(0,1fr)' : 'minmax(0,34%) minmax(0,1fr)') : 'minmax(0,1fr)', position: 'relative', overflow: 'hidden', transition: 'grid-template-columns .44s cubic-bezier(.2,.8,.3,1)' }}>
        {/* chat column */}
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* chat header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', borderBottom: '1px solid var(--line)', background: 'rgba(252,250,244,0.8)', backdropFilter: 'blur(12px)', flex: '0 0 auto' }}>
            {!showRail && <window.HMark size={26} />}
            <span className="hbl-display" style={{ fontSize: 15.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{chatTitle}</span>
            {activeVault
              ? <span className="hbl-chip hbl-chip--ok" style={{ fontSize: 10.5, flex: '0 0 auto' }} title={'I hvelvet ' + activeVault.name}><IA n="lockopen" s={12} /> {paneOpen ? 'Hvelv' : activeVault.name + ' · ' + activeVault.factor}</span>
              : showSealed
              ? <span className="hbl-chip" style={{ fontSize: 10.5, flex: '0 0 auto' }}><IA n="lock" s={12} /> Låst</span>
              : <span style={{ flex: '0 0 auto', display: 'inline-flex' }} title="Midlertidig samtale — utløper om 9t 42m"><V3Countdown mins={mins} compact={paneOpen} /></span>}
            <div style={{ flex: 1, minWidth: 4 }} />
            {!locked && !activeVault && !showSealed && <button onClick={() => setLockOpen(true)} className="hbl-btn hbl-btn--sm" title="Lås samtalen" style={{ flex: '0 0 auto', padding: paneOpen ? 8 : undefined }}><IA n="lock" s={15} />{!paneOpen && ' Lås samtalen'}</button>}
            <button onClick={() => setPane(pane === 'files' ? null : 'files')} title="Filer i samtalen" className="hbl-btn hbl-btn--ghost hbl-btn--sm" style={{ padding: 8, flex: '0 0 auto', background: pane === 'files' ? 'var(--blue-12)' : undefined, color: pane === 'files' ? 'var(--blue)' : undefined }}><IA n="folder" s={16} /></button>
            {!showRail && <><div style={{ width: 1, height: 20, background: 'var(--line-2)', flex: '0 0 auto' }} /><V3Account onStudio={() => setStudio(true)} /></>}
          </div>

          {showSealed ? <V3VaultLocked vault={sealedVault} onUnlock={() => askUnlock(sealedVault.id)} /> : showEmpty ? empty : (
            <div ref={scroller} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '22px 0 16px' }}>
              <div style={{ maxWidth: paneOpen ? 520 : 760, margin: '0 auto', padding: paneOpen ? '0 20px' : '0 26px', display: 'flex', flexDirection: 'column', gap: paneOpen ? 15 : 18 }}>
                <div style={{ alignSelf: 'center', fontSize: 10.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-30)' }}>I dag</div>
                {preLog}
                {feed}
                {postLog}
                {!started && chat === 'temp1' && (
                  <div style={{ paddingTop: 2 }}>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-45)', marginBottom: 9 }}>Legg inn noe skillen kan jobbe på:</div>
                    <V3Drops dense onUpload={() => setStep(1)} onRecord={startRec} />
                  </div>
                )}
              </div>
            </div>
          )}

          {!showSealed && <V3Composer narrow={paneOpen} recording={!!rec && rec.chat === chat} onUpload={() => setStep((s) => (s < 1 ? 1 : s))} onRecord={startRec}
            skills={skills} onToggleSkill={toggleSkill} onStudio={() => setStudio(true)} skillVar={skillVar}
            placeholder={pane === 'doc' ? 'Be om endringer i notatet …' : showEmpty ? 'Skriv, eller legg inn noe …' : 'Spør om prøvesvarene …'} />}
        </div>

        {/* right pane — preview, and the file tree behind it */}
        {paneOpen && (
          <div style={{ minWidth: 0, display: 'flex', overflow: 'hidden', animation: 'hblFade .3s ease both' }}>
            <V3Pane view={pane} file={file} tab={tab} onTab={setTab} reviewed={reviewed} onConfirm={confirmValue} focus={focus} pending={pendingRev}
              doc={doc} locked={locked} wide={wide} tree={tree} onRename={renameFile} onDelete={deleteFile} onUpload={uploadFile}
              onClose={() => { setPane(null); setWide(false); }} onShowFiles={() => { setPane('files'); setFocus(null); }}
              onOpenDoc={() => setPane('doc')} onOpenFile={(n) => openFile(n, 'uttrekk')} onWide={() => setWide((w) => !w)} />
          </div>
        )}

        {lockOpen && lockVar === 'Modal' && <V3LockModal onDone={doLock} onCancel={() => setLockOpen(false)} />}
        {lockOpen && lockVar === 'Panel til høyre' && <V3LockPanel onDone={doLock} onCancel={() => setLockOpen(false)} />}
        {verify && <V3Verify factor={pending} onDone={finishLock} />}
        {unlockId && <V3Verify mode="unlock" vault={(vaults.find((v) => v.id === unlockId) || {}).name} factor={(vaults.find((v) => v.id === unlockId) || {}).factor === 'Touch ID' ? 'touchid' : 'faceid'} onDone={finishUnlock} />}
      </div>

      {studio && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 120, background: 'var(--oat)', animation: 'hblFade .22s ease both' }}>
          <window.V3Studio onClose={() => setStudio(false)} />
        </div>
      )}

      {/* second-record warning — recording itself lives at the top of the rail */}
      {rec && recWarn && (
        <div style={{ position: 'absolute', bottom: 92, left: '50%', transform: 'translateX(-50%)', zIndex: 70, display: 'flex', alignItems: 'center', gap: 9, padding: '10px 13px', borderRadius: 12, background: 'var(--ink)', color: '#FBF8F0', boxShadow: '0 18px 40px -14px rgba(35,25,22,0.55)', animation: 'hblFadeUp .2s ease both', maxWidth: 380 }}>
          <span style={{ color: '#F0A98E', flex: '0 0 auto', display: 'grid' }}><IA n="alert" s={16} /></span>
          <div style={{ fontSize: 12, lineHeight: 1.45 }}>Et opptak går allerede i <b>{recTitle}</b>. Stopp det først for å ta opp her.</div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { V3App, V3_ENTRY, V3_LOCKVAR, V3_SKILLVAR });
