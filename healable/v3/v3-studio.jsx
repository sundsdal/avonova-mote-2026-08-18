/* Healable v3 — Studio: skill-hub reached from the account menu (avatar top right).
   Two families of skills — Dokument (hva som produseres) and Generell (hvordan det analyseres).
   Card → en kompakt skill-editor (filtre + SKILL.md + assistent), som i v2. */
const IST = window.HIcon;
const { Chip: ChipST, Micro: MicroST } = window;

const V3_STUDIO_TABS = {
  dokument: {
    label: 'Dokument', studio: 'Dokument Studio', icon: 'filetext', kicker: 'palette', accent: '#A862D4', accentFg: '#8C45BC', accentBg: 'var(--orchid-12)',
    eyebrow: 'Dokument-skill', title: 'Lag dokumenter akkurat slik du vil',
    sub: 'Følg standarder, maler og komponenter — eller start helt fritt. Analysen fyller dem med innhold.',
    cta: 'Nytt dokument-skill', count: '3 skiller · 1 kladd',
  },
  generell: {
    label: 'Generell', studio: 'Organiser Studio', icon: 'bars', kicker: 'flask', accent: 'var(--blue)', accentFg: 'var(--blue-deep)', accentBg: 'var(--blue-12)',
    eyebrow: 'Organiser-skill', title: 'Metoden din, gjenbrukbar',
    sub: 'Fanger hvordan du analyserer en sakstype — regler, markører og referanser. Versjonert, validert og delbar.',
    cta: 'Ny organiser-skill', count: '6 skiller · 1 kladd',
  },
};

const V3_DOC_SKILLS = [
  { name: 'pasientnotat', kind: 'report', title: 'Pasientnotat', desc: 'Kort notat til konsultasjonen — verdier, avvik og spørsmål, hver verdi forankret i kilden.', v: 'v2', scope: ['Privat', null], val: ['Validert', 'ok'], who: 'Du', fmt: 'DOCX' },
  { name: 'konsultasjon', kind: 'slide', title: 'Konsultasjonspresentasjon', desc: 'Lysbildemal for å vise trender og funn til legen i konsultasjon.', v: 'v4', scope: ['Delt', 'blue'], val: ['Validert', 'ok'], who: 'Du', fmt: 'PDF' },
  { name: 'henvisningsbrev', kind: 'letter', title: 'Henvisningsbrev', desc: 'Brevmal til spesialisthelsetjenesten — riktig topp, felt og signatur.', v: 'kladd', scope: ['Privat', null], val: ['Kladd', null], who: 'Du', fmt: 'DOCX' },
];

const V3_GEN_SKILLS = [
  { name: 'lipid', title: 'Lipid- og hjerterisiko', desc: 'Korrelasjon, regresjon og flagging av lipidpanel mot referanse.', level: 'clinical-rules', v: 'v3', scope: ['Privat', null], val: ['Validert', 'ok'], who: 'Du' },
  { name: 'hba1c', title: 'Diabetes — HbA1c-forløp', desc: 'Longitudinell glykemisk kontroll med medikamentkontekst.', level: 'clinical-rules', v: 'v5', scope: ['Delt', 'blue'], val: ['Validert', 'ok'], who: 'Klinikk Nord' },
  { name: 'tyreoidea', title: 'Tyreoidea-utredning', desc: 'Tolkning av TSH/FT4-mønstre for lavt stoffskifte.', level: 'pure', v: 'v2', scope: ['Delt', 'blue'], val: ['1 advarsel', 'warn'], who: 'Dr. Haugen' },
  { name: 'egfr', title: 'Nyrefunksjon eGFR', desc: 'Stadieinndeling og fallhastighet for kronisk nyresvikt.', level: 'pure', v: 'v1', scope: ['Privat', null], val: ['Validert', 'ok'], who: 'Du' },
  { name: 'anemi', title: 'Anemi-panel', desc: 'Differensiering av anemityper fra ferritin, MCV og retikulocytter.', level: 'clinical-rules', v: 'v4', scope: ['Privat', null], val: ['Validert', 'ok'], who: 'Du' },
  { name: 'crp', title: 'Inflammasjon CRP/SR', desc: 'Trendovervåking av inflammasjonsmarkører over tid.', level: 'pure', v: 'kladd', scope: ['Privat', null], val: ['Kladd', null], who: 'Du' },
];

/* ── miniatyr av artefaktet skillen produserer ── */
function V3DocThumb({ kind }) {
  const bar = (w, c) => <div style={{ height: 4, borderRadius: 2, width: w, background: c || '#DCD5C4' }} />;
  if (kind === 'slide') return (
    <div style={{ width: 232, height: 131, borderRadius: 8, background: 'var(--ink)', padding: '15px 17px', display: 'flex', flexDirection: 'column', boxShadow: '0 14px 28px -14px rgba(35,25,22,0.55)' }}>
      <div style={{ fontSize: 6, letterSpacing: '.18em', fontWeight: 700, color: '#B8A8F0' }}>KONSULTASJON</div>
      <div className="hbl-display" style={{ fontSize: 15, fontWeight: 500, color: '#FBF8F0', lineHeight: 1.15, marginTop: 5 }}>LDL stiger jevnt<br />over to år</div>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', gap: 7, height: 40 }}>
        {[16, 22, 28, 34, 40].map((h, i) => <div key={i} style={{ flex: 1, height: h, borderRadius: '3px 3px 0 0', background: i === 4 ? '#DA5740' : i === 3 ? '#A862D4' : 'rgba(120,132,232,0.85)' }} />)}
      </div>
    </div>
  );
  if (kind === 'letter') return (
    <div style={{ width: 168, height: 200, borderRadius: 6, background: '#FCFAF4', border: '1px solid #E6DFCD', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: '0 14px 28px -16px rgba(74,52,38,0.42)' }}>
      <div style={{ height: 3, width: 34, background: '#A862D4', borderRadius: 2, marginBottom: 6 }} />
      <div className="hbl-display" style={{ fontSize: 9, fontWeight: 600 }}>Dr. Anne Haugen</div>
      {bar('72%')}{bar('54%')}
      <div style={{ height: 9 }} />
      <div className="hbl-display" style={{ fontSize: 8.5, fontWeight: 600 }}>Vedr.: Henvisning</div>
      {bar('100%')}{bar('94%')}{bar('97%')}{bar('61%')}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ width: 62, height: 1, background: 'var(--ink)' }} />
        {bar('44%')}
      </div>
    </div>
  );
  const rows = [['P-LDL', '4,1', '#DA5740'], ['P-HDL', '1,3', '#2E9C72'], ['P-Trigl.', '2,4', '#DA5740'], ['P-CRP', '6,8', '#C6881F'], ['P-Hcy', '11,2', '#2E9C72']];
  return (
    <div style={{ width: 168, height: 200, borderRadius: 6, background: '#FCFAF4', border: '1px solid #E6DFCD', padding: '18px 20px', boxShadow: '0 14px 28px -16px rgba(74,52,38,0.42)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <window.HMark size={14} />
        <span style={{ fontSize: 5.5, letterSpacing: '.16em', fontWeight: 700, color: '#9a9285' }}>PASIENTNOTAT</span>
      </div>
      <div style={{ height: 1, background: '#EFE9DA', margin: '10px 0 9px' }} />
      <div className="hbl-display" style={{ fontSize: 11, fontWeight: 500 }}>Lipidpanel</div>
      <div style={{ fontSize: 6.5, color: '#9a9285', marginTop: 2 }}>Konsultasjonsnotat · 23.05.2025</div>
      <div style={{ marginTop: 11 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 0', borderTop: i ? '1px solid #F2ECDE' : 'none' }}>
            <span style={{ fontSize: 7, flex: 1, color: '#463B34' }}>{r[0]}</span>
            <span className="hbl-num" style={{ fontSize: 7, fontWeight: 600 }}>{r[1]}</span>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: r[2] }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── kort ── */
function V3DocCard({ k, onOpen }) {
  const slide = k.kind === 'slide';
  return (
    <div className="hbl-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 150, background: 'linear-gradient(160deg,#F3EEE2,#E9E2D1)', borderBottom: '1px solid var(--line)', overflow: 'hidden', display: 'grid', placeItems: slide ? 'center' : 'start center', paddingTop: slide ? 0 : 16, position: 'relative' }}>
        <div style={{ transform: 'scale(0.86)', transformOrigin: slide ? 'center' : 'top center', pointerEvents: 'none' }}><V3DocThumb kind={k.kind} /></div>
        <span style={{ position: 'absolute', top: 10, left: 12, fontSize: 9, fontWeight: 700, letterSpacing: '.1em', color: '#8C45BC', background: 'rgba(252,250,244,0.86)', padding: '3px 8px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>{k.fmt}</span>
      </div>
      <div style={{ padding: '15px 17px 14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <span className="hbl-num" style={{ fontSize: 11.5, color: 'var(--ink-30)' }}>{k.name}</span>
          <ChipST kind={k.val[1]} dot>{k.val[0]}</ChipST>
        </div>
        <div className="hbl-display" style={{ fontSize: 16.5, fontWeight: 500, marginBottom: 5 }}>{k.title}</div>
        <p style={{ fontSize: 12.5, color: 'var(--ink-60)', margin: 0, lineHeight: 1.45, minHeight: 54 }}>{k.desc}</p>
        <div style={{ display: 'flex', gap: 6, margin: '11px 0 12px', flexWrap: 'wrap' }}>
          <ChipST kind={k.scope[1]}>{k.scope[0]}</ChipST>
          <ChipST kind="orchid">mal</ChipST>
          <ChipST kind={k.v === 'kladd' ? null : 'ok'} dot>{k.v}</ChipST>
        </div>
        <div className="hbl-rule" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 }}>
          <span style={{ fontSize: 11.5, color: 'var(--ink-45)', display: 'inline-flex', alignItems: 'center', gap: 6 }}><IST n="user" s={13} /> {k.who}</span>
          <button onClick={onOpen} style={{ border: 'none', background: 'transparent', font: 'inherit', fontSize: 12.5, fontWeight: 600, color: '#8C45BC', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0 }}>Åpne i Studio <IST n="chevR" s={14} /></button>
        </div>
      </div>
    </div>
  );
}

function V3GenCard({ k, onOpen }) {
  const rules = k.level === 'clinical-rules';
  return (
    <div className="hbl-card" style={{ padding: '18px 18px 14px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, display: 'grid', placeItems: 'center', background: rules ? 'var(--blue-12)' : 'var(--paper-2)', color: rules ? 'var(--blue)' : 'var(--ink-45)' }}>
          <IST n={rules ? 'flask' : 'book'} s={19} />
        </div>
        <ChipST kind={k.val[1]} dot>{k.val[0]}</ChipST>
      </div>
      <div className="hbl-num" style={{ fontSize: 11.5, color: 'var(--ink-30)', marginBottom: 3 }}>{k.name}</div>
      <div className="hbl-display" style={{ fontSize: 16.5, fontWeight: 500, marginBottom: 5 }}>{k.title}</div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-60)', margin: 0, lineHeight: 1.45, minHeight: 54 }}>{k.desc}</p>
      <div style={{ display: 'flex', gap: 6, margin: '11px 0 12px', flexWrap: 'wrap' }}>
        <ChipST kind={k.scope[1]}>{k.scope[0]}</ChipST>
        <ChipST>{k.level}</ChipST>
        <ChipST kind={k.v === 'kladd' ? null : 'ok'} dot>{k.v}</ChipST>
      </div>
      <div className="hbl-rule" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 }}>
        <span style={{ fontSize: 11.5, color: 'var(--ink-45)', display: 'inline-flex', alignItems: 'center', gap: 6 }}><IST n="user" s={13} /> {k.who}</span>
        <button onClick={onOpen} style={{ border: 'none', background: 'transparent', font: 'inherit', fontSize: 12.5, fontWeight: 600, color: 'var(--blue-deep)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0 }}>Åpne i Studio <IST n="chevR" s={14} /></button>
      </div>
    </div>
  );
}

/* ── skill-editor — filtre · SKILL.md · assistent ── */
const V3_SKILL_FILES = {
  dokument: [
    { g: 'skill', items: [['SKILL.md', 'file', true], ['seksjoner.md', 'file'], ['felt-binding.yaml', 'file']] },
    { g: 'mal', items: [['topp-og-bunn.md', 'file'], ['tabell-stil.md', 'file']] },
    { g: 'eksempler', items: [['notat-mai-2025.docx', 'filetext'], ['notat-jan-2025.docx', 'filetext']] },
  ],
  generell: [
    { g: 'skill', items: [['SKILL.md', 'file', true], ['regler.yaml', 'file'], ['markorer.yaml', 'file']] },
    { g: 'referanser', items: [['nklm-lipid.pdf', 'filetext'], ['esc-2021.pdf', 'filetext']] },
    { g: 'fixtures', items: [['panel-normal.json', 'file'], ['panel-avvik.json', 'file']] },
  ],
};

const V3_SKILL_EXAMPLES = {
  pasientnotat: [['notat-mai-2025.docx', 'filetext'], ['notat-jan-2025.docx', 'filetext']],
  konsultasjon: [['lysbilder-mai-2025.pdf', 'filetext'], ['lysbilder-des-2024.pdf', 'filetext']],
  henvisningsbrev: [['henvisning-kardiologi.docx', 'filetext'], ['henvisning-utkast.docx', 'filetext']],
};

const V3_SKILL_REFS = {
  lipid: [['nklm-lipid.pdf', 'filetext'], ['esc-2021.pdf', 'filetext']],
  hba1c: [['nklm-diabetes.pdf', 'filetext'], ['ada-standards.pdf', 'filetext']],
  tyreoidea: [['nklm-tyreoidea.pdf', 'filetext'], ['eta-retningslinje.pdf', 'filetext']],
  egfr: [['kdigo-2024.pdf', 'filetext'], ['ckd-epi-formel.pdf', 'filetext']],
  anemi: [['who-anemi.pdf', 'filetext'], ['nklm-jernstatus.pdf', 'filetext']],
  crp: [['nklm-inflammasjon.pdf', 'filetext'], ['sr-referanser.pdf', 'filetext']],
};

const v3SkillFiles = (fam, skill) => V3_SKILL_FILES[fam].map((g) => {
  if (fam === 'dokument' && g.g === 'eksempler' && V3_SKILL_EXAMPLES[skill.name]) return { ...g, items: V3_SKILL_EXAMPLES[skill.name] };
  if (fam === 'generell' && g.g === 'referanser' && V3_SKILL_REFS[skill.name]) return { ...g, items: V3_SKILL_REFS[skill.name] };
  return g;
});

const V3_SKILL_MD = {
  dokument: [
    ['#', ' Pasientnotat'],
    ['', ''],
    ['', 'Kort notat pasienten tar med til konsultasjonen. Fyller malen fra en'],
    ['', 'analyse — teksten skal kunne leses av noen uten medisinsk bakgrunn.'],
    ['', ''],
    ['##', ' Seksjoner'],
    ['', ''],
    ['1.', ' **Sammendrag** — tre setninger, ingen tall uten enhet.'],
    ['2.', ' **Markører** — tabell: analytt, verdi, referanse, status.'],
    ['3.', ' **Trend** — kun hvis kilden har ≥ 3 målinger.'],
    ['4.', ' **Spørsmål til konsultasjonen** — valgfri, 3 punkter.'],
    ['', ''],
    ['##', ' Regler'],
    ['', ''],
    ['-', ' Hver verdi peker tilbake til side og linje i kilden.'],
    ['-', ' Ingen diagnose. Formuler funn som noe legen bør vurdere.'],
    ['-', ' Tall settes i Space Grotesk med enhet: `5,4 mmol/L`.'],
  ],
  generell: [
    ['#', ' Lipid- og hjerterisiko'],
    ['', ''],
    ['', 'Leser et lipidpanel, matcher referanseområder og flagger avvik'],
    ['', 'over tid. Brukes av dokument-skiller som kilde til innhold.'],
    ['', ''],
    ['##', ' Markører'],
    ['', ''],
    ['-', ' `P-LDL` · mål < 3,0 mmol/L · flagg ved 2 målinger over mål'],
    ['-', ' `P-HDL` · mål > 1,0 mmol/L'],
    ['-', ' `P-Triglyserider` · mål < 2,0 mmol/L'],
    ['-', ' `P-CRP` · følg opp mellom 5 og 10 mg/L'],
    ['', ''],
    ['##', ' Metode'],
    ['', ''],
    ['1.', ' Normaliser analyttnavn mot NLK-kodeverket.'],
    ['2.', ' Regn lineær trend når serien har ≥ 3 punkter.'],
    ['3.', ' Marker som `avvik` kun når trenden er stabil, ikke ett utslag.'],
  ],
};

/* per-skill SKILL.md der seksjonene faktisk skiller seg; ellers arves familiens kropp
   med tittel og intro fra skillen selv. */
const V3_SKILL_MD_BY_NAME = {
  konsultasjon: [
    ['#', ' Konsultasjonspresentasjon'],
    ['', ''],
    ['', 'Lysbilder som viser trender og funn i konsultasjonen. Ett poeng'],
    ['', 'per lysbilde — legen skal kunne lese det på fem sekunder.'],
    ['', ''],
    ['##', ' Lysbilder'],
    ['', ''],
    ['1.', ' **Tittel** — analysens navn og periode.'],
    ['2.', ' **Hovedfunn** — én setning, satt stort.'],
    ['3.', ' **Trend** — søylediagram, siste måling markert.'],
    ['4.', ' **Spørsmål** — punktliste, maks fire.'],
    ['', ''],
    ['##', ' Regler'],
    ['', ''],
    ['-', ' Maks 12 ord i en tittel. Ingen avsnitt på lysbilder.'],
    ['-', ' Mørk bakgrunn, tall i Space Grotesk med enhet.'],
    ['-', ' Kilden vises i bunnteksten, aldri i brødteksten.'],
  ],
  henvisningsbrev: [
    ['#', ' Henvisningsbrev'],
    ['', ''],
    ['', 'Brev til spesialisthelsetjenesten. Formelt oppsett; innholdet'],
    ['', 'hentes fra analysen, avsender fylles fra profilen.'],
    ['', ''],
    ['##', ' Felt'],
    ['', ''],
    ['1.', ' **Avsender** — navn, rolle, adresse.'],
    ['2.', ' **Mottaker** — avdeling og sykehus.'],
    ['3.', ' **Vedr.** — én linje som sier hva saken gjelder.'],
    ['4.', ' **Begrunnelse** — funn, varighet og tiltak som er prøvd.'],
    ['5.', ' **Vedlegg** — dokumentene som følger brevet.'],
    ['', ''],
    ['##', ' Regler'],
    ['', ''],
    ['-', ' Sted og dato øverst til høyre, aldri i brødteksten.'],
    ['-', ' Ingen diagnose — beskriv funn og be om vurdering.'],
    ['-', ' Signaturlinje står alltid over navnet.'],
  ],
};

const V3_GEN_MARKERS = {
  lipid: [
    ['-', ' `P-LDL` · mål < 3,0 mmol/L · flagg ved 2 målinger over mål'],
    ['-', ' `P-HDL` · mål > 1,0 mmol/L'],
    ['-', ' `P-Triglyserider` · mål < 2,0 mmol/L'],
    ['-', ' `P-CRP` · følg opp mellom 5 og 10 mg/L'],
  ],
  hba1c: [
    ['-', ' `B-HbA1c` · mål < 53 mmol/mol · flagg ved 2 målinger over mål'],
    ['-', ' `P-Glukose (fastende)` · 4,0 – 6,0 mmol/L'],
    ['-', ' `Medikamentkontekst` · dose og oppstart fra journalnotat'],
  ],
  tyreoidea: [
    ['-', ' `S-TSH` · 0,5 – 3,6 mIE/L · flagg mønster, ikke enkeltverdi'],
    ['-', ' `S-FT4` · 8 – 21 pmol/L'],
    ['-', ' `S-anti-TPO` · positiv over 35 kIE/L'],
  ],
  egfr: [
    ['-', ' `P-Kreatinin` · kjønnsjustert referanse'],
    ['-', ' `eGFR` · stadium G1 – G5 · fallhastighet per år'],
    ['-', ' `U-ACR` · stadium A1 – A3'],
  ],
  anemi: [
    ['-', ' `S-Ferritin` · lav under 30 µg/L'],
    ['-', ' `B-MCV` · 82 – 98 fL · skiller mikro- og makrocytær'],
    ['-', ' `B-Retikulocytter` · produksjonssvar'],
  ],
  crp: [
    ['-', ' `P-CRP` · følg opp mellom 5 og 10 mg/L'],
    ['-', ' `SR` · aldersjustert øvre grense'],
  ],
};

const v3SkillMd = (fam, skill) => {
  if (V3_SKILL_MD_BY_NAME[skill.name]) return V3_SKILL_MD_BY_NAME[skill.name];
  const base = V3_SKILL_MD[fam];
  const w = skill.desc.split(' ');
  const cut = Math.ceil(w.length / 2);
  const head = [['#', ' ' + skill.title], ['', ''], ['', w.slice(0, cut).join(' ')], ['', w.slice(cut).join(' ')]];
  if (fam !== 'generell') return [...head, ...base.slice(4)];
  const markers = V3_GEN_MARKERS[skill.name] || V3_GEN_MARKERS.lipid;
  return [...head, ['', ''], ['##', ' Markører'], ['', ''], ...markers, ...base.slice(11)];
};

function V3SkillEditor({ fam, skill, onBack }) {
  const cfg = V3_STUDIO_TABS[fam];
  const [tab, setTab] = React.useState('SKILL.md');
  const groups = v3SkillFiles(fam, skill);
  const md = v3SkillMd(fam, skill);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--oat)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 18px', borderBottom: '1px solid var(--line)', background: 'rgba(252,250,244,0.82)', backdropFilter: 'blur(12px)', flex: '0 0 auto' }}>
        <button onClick={onBack} className="hbl-btn hbl-btn--ghost hbl-btn--sm" style={{ padding: '7px 9px' }}><IST n="chevL" s={16} /></button>
        <span className="hbl-display" style={{ fontSize: 15, fontWeight: 500 }}>{cfg.studio}</span>
        <div style={{ width: 1, height: 18, background: 'var(--line-2)' }} />
        <span className="hbl-num" style={{ fontSize: 13.5, fontWeight: 600 }}>{skill.name}</span>
        {skill.val[0].toLowerCase() !== skill.v.toLowerCase() && <ChipST kind={skill.val[1]} dot>{skill.val[0]}</ChipST>}
        <ChipST kind={skill.v === 'kladd' ? null : 'ok'} dot>{skill.v}</ChipST>
        <div style={{ flex: 1 }} />
        <button className="hbl-btn hbl-btn--sm"><IST n="check" s={15} /> Valider</button>
        <button className="hbl-btn hbl-btn--primary hbl-btn--sm" style={fam === 'dokument' ? { background: '#A862D4' } : null}><IST n="upload" s={15} /> Publiser</button>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '224px minmax(0,1fr) 296px' }}>
        {/* filtre */}
        <div style={{ borderRight: '1px solid var(--line)', background: 'var(--paper-3)', overflowY: 'auto', padding: '12px 9px' }}>
          {groups.map((g) => (
            <div key={g.g} style={{ marginBottom: 12 }}>
              <div className="hbl-micro" style={{ padding: '5px 8px' }}>{g.g}</div>
              {g.items.map(([n, ic, on]) => (
                <button key={n} onClick={() => setTab(n)} className="hbl-rowlink" style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', font: 'inherit', border: 'none', cursor: 'pointer', padding: '7px 9px', borderRadius: 9, marginBottom: 1, background: tab === n ? 'var(--blue-12)' : 'transparent' }}>
                  <span style={{ color: tab === n ? 'var(--blue)' : 'var(--ink-30)', display: 'grid', flex: '0 0 auto' }}><IST n={ic} s={14} /></span>
                  <span className="hbl-num" style={{ fontSize: 12, color: tab === n ? 'var(--ink)' : 'var(--ink-80)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</span>
                  {on && <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--ok)', flex: '0 0 auto' }} />}
                </button>
              ))}
            </div>
          ))}
          <div style={{ margin: '4px 8px 0', fontSize: 11, color: 'var(--ink-45)', lineHeight: 1.5 }}>Skillen styrer alt den produserer. Endringer gjelder fra neste versjon.</div>
        </div>

        {/* SKILL.md */}
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 18px', borderBottom: '1px solid var(--line)', flex: '0 0 auto' }}>
            <span className="hbl-num" style={{ fontSize: 12.5, fontWeight: 600 }}>{tab}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-45)' }}>markdown · redigerbar</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: 'var(--ink-45)', display: 'inline-flex', alignItems: 'center', gap: 5 }}><IST n="clock" s={12} /> lagret nå</span>
          </div>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 0 26px', background: 'var(--paper)' }}>
            <div style={{ maxWidth: 620, margin: '0 auto', padding: '0 22px' }}>
              {md.map((l, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, minHeight: 21 }}>
                  <span className="hbl-num" style={{ width: 20, textAlign: 'right', fontSize: 11, color: 'var(--ink-30)', flex: '0 0 auto', userSelect: 'none' }}>{i + 1}</span>
                  <span className="hbl-num" style={{ fontSize: 12.5, lineHeight: 1.65, color: 'var(--ink-80)' }}>
                    {l[0] && <span style={{ color: l[0].startsWith('#') ? cfg.accentFg : 'var(--ink-30)', fontWeight: 700 }}>{l[0]}</span>}
                    <span style={{ color: l[0].startsWith('#') ? 'var(--ink)' : 'var(--ink-80)', fontWeight: l[0].startsWith('#') ? 600 : 400 }}>{l[1]}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* assistent */}
        <div style={{ borderLeft: '1px solid var(--line)', background: 'var(--paper-3)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '11px 15px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' }}>
            <span style={{ width: 22, height: 22, borderRadius: 7, background: cfg.accentBg, color: cfg.accentFg, display: 'grid', placeItems: 'center' }}><IST n="sparkle" s={13} /></span>
            <span className="hbl-display" style={{ fontSize: 13.5, fontWeight: 500 }}>Assistent</span>
          </div>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px 15px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ alignSelf: 'flex-end', maxWidth: '90%', padding: '9px 12px', borderRadius: '12px 12px 4px 12px', background: 'var(--ink)', color: '#FBF8F0', fontSize: 12.5, lineHeight: 1.5 }}>Kan du beskrive hva skillen gjør med tomme felt?</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--ink-80)' }}>La til en regel: tomme felt utelates i stedet for å skrives som «ukjent», og seksjonen faller bort hvis alle feltene mangler. Se linje 15.</div>
            <div style={{ padding: '10px 12px', borderRadius: 11, background: 'var(--paper-2)', border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--ok)', display: 'grid', flex: '0 0 auto' }}><IST n="check" s={14} /></span>
              <span style={{ fontSize: 11.5, color: 'var(--ink-60)', lineHeight: 1.45 }}>Validert mot 2 fixtures · ingen avvik</span>
            </div>
          </div>
          <div style={{ padding: 12, borderTop: '1px solid var(--line)', flex: '0 0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', borderRadius: 11, background: 'var(--paper)', border: '1px solid var(--line-2)' }}>
              <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-30)' }}>Be om en endring …</span>
              <IST n="chevR" s={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── hub ── */
function V3Studio({ onClose }) {
  const [fam, setFam] = React.useState('dokument');
  const [open, setOpen] = React.useState(null);
  const cfg = V3_STUDIO_TABS[fam];
  if (open) return <V3SkillEditor fam={open.fam} skill={open.skill} onBack={() => setOpen(null)} />;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'radial-gradient(105% 62% at 92% -12%, ' + (fam === 'dokument' ? 'rgba(168,98,212,0.10)' : 'rgba(70,101,216,0.10)') + ', transparent 52%), var(--oat)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 22px', borderBottom: '1px solid var(--line)', background: 'rgba(252,250,244,0.78)', backdropFilter: 'blur(12px)', flex: '0 0 auto' }}>
        <button onClick={onClose} className="hbl-btn hbl-btn--ghost hbl-btn--sm" style={{ gap: 7 }}><IST n="chevL" s={15} /> Tilbake til samtalen</button>
        <div style={{ width: 1, height: 18, background: 'var(--line-2)' }} />
        <window.HMark size={24} />
        <span className="hbl-display" style={{ fontSize: 15.5, fontWeight: 500 }}>Studio</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11.5, color: 'var(--ink-45)' }}>{cfg.count}</span>
        <window.V3Account />
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '26px 34px 34px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 26, marginBottom: 22 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                <span style={{ width: 24, height: 24, borderRadius: 8, background: cfg.accentBg, color: cfg.accentFg, display: 'grid', placeItems: 'center' }}><IST n={cfg.kicker} s={14} /></span>
                <MicroST>{cfg.eyebrow}</MicroST>
              </div>
              <h1 className="hbl-display" style={{ fontSize: 30, margin: 0, fontWeight: 500, letterSpacing: '-0.02em' }}>{cfg.title}</h1>
              <p style={{ color: 'var(--ink-60)', fontSize: 14.5, margin: '7px 0 0', maxWidth: 600, lineHeight: 1.55, textWrap: 'pretty' }}>{cfg.sub}</p>
            </div>
            <button className="hbl-btn hbl-btn--primary" style={fam === 'dokument' ? { background: '#A862D4', flex: '0 0 auto' } : { flex: '0 0 auto' }}><IST n="plus" s={16} /> {cfg.cta}</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div className="hbl-seg" style={{ padding: 4, borderRadius: 12 }}>
              {Object.entries(V3_STUDIO_TABS).map(([k, c]) => (
                <button key={k} onClick={() => setFam(k)} className={'hbl-studiotab' + (k === fam ? ' hbl-studiotab--active' : '')} style={{ padding: '8px 17px', fontSize: 13.5 }}>
                  <IST n={c.icon} s={15} />{c.label}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 11.5, color: 'var(--ink-45)', display: 'inline-flex', alignItems: 'center', gap: 6 }}><IST n="lock" s={13} /> Skiller kjører på dine data — ingenting forlater hvelvet</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {fam === 'dokument'
              ? V3_DOC_SKILLS.map((k) => <V3DocCard key={k.name} k={k} onOpen={() => setOpen({ fam, skill: k })} />)
              : V3_GEN_SKILLS.map((k) => <V3GenCard key={k.name} k={k} onOpen={() => setOpen({ fam, skill: k })} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { V3Studio, V3_STUDIO_TABS, V3_DOC_SKILLS, V3_GEN_SKILLS });
