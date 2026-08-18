/* Healable v3 — data. Scenario lifted from v2 (lipid). */
const V3_CHAT = {
  id: 'temp1', title: 'Blodprøver fra fastlegen', temp: true,
  vault: 'Lipid- og hjerterisiko',
};

const V3_FILE = { name: 'Lipidpanel_23-25.pdf', size: '1,8 MB', pages: '4 sider' };

const V3_TREE = [
  { name: 'Blodprøver', icon: 'flask', open: true, files: [
    { name: 'Lipidpanel_23-25.pdf', meta: 'PDF · 5 analytter · 2 til gjennomgang', kind: 'pdf' },
    { name: 'Analytter.csv', meta: 'CSV · 12 prøvetakinger · utpakket', kind: 'csv' },
  ]},
  { name: 'Dokumenter', icon: 'filetext', open: true, files: [
    { name: 'Pasientnotat.docx', meta: 'DOCX · 1 side · v2', kind: 'doc', active: true },
  ]},
  { name: 'Lydopptak', icon: 'waveform', open: false, files: [
    { name: 'Opptak_fastlege.m4a', meta: 'Lyd · 4:12 · transkribert', kind: 'audio' },
  ]},
];

/* the analytes read out of the PDF */
const V3_MARKERS = [
  { name: 'P-LDL-kolesterol', v: '4,1', unit: 'mmol/L', ref: 'mål < 3,0', state: 'alert' },
  { name: 'P-Triglyserider', v: '2,4', unit: 'mmol/L', ref: 'ref < 2,0', state: 'warn' },
  { name: 'P-HDL-kolesterol', v: '1,2', unit: 'mmol/L', ref: 'ref > 1,0', state: 'ok' },
];

/* document versions — read-only, revised by asking */
const V3_DOC_V1 = {
  v: 1, when: 'nå', label: 'Første utkast',
  summary: 'P-LDL ligger på 4,1 mmol/L mot mål under 3,0 — fortsatt over. Triglyserider 2,4 mmol/L er også litt høyt, mens HDL 1,2 mmol/L ligger fint.',
  findings: [
    'P-LDL-kolesterol 4,1 mmol/L — over mål < 3,0',
    'P-Triglyserider 2,4 mmol/L — litt over referanse',
    'P-HDL-kolesterol 1,2 mmol/L — innenfor referanse',
  ],
  tail: null,
};
const V3_DOC_V2 = {
  v: 2, when: 'nå', label: 'La til spørsmål til legen',
  summary: V3_DOC_V1.summary,
  findings: V3_DOC_V1.findings,
  tail: {
    title: 'Spørsmål til konsultasjonen',
    items: [
      'Bør statindosen økes når LDL har ligget over målet i fire kvartaler?',
      'Skal triglyseridene følges med ny prøve, eller er kostendring nok først?',
      'Hvor ofte bør lipidpanelet gjentas framover?',
    ],
  },
};

const V3_BUILD = [
  { label: 'Leser Lipidpanel_23-25.pdf', icon: 'flask' },
  { label: 'Henter pasientnotat-mal', icon: 'filetext' },
  { label: 'Fyller inn verdier og referanser', icon: 'edit' },
  { label: 'Forankrer hver verdi i kilden', icon: 'quote' },
  { label: 'Skriver til Dokumenter', icon: 'download' },
];

/* the vault the temp chat becomes when locked, plus the ones that already exist. Only one is unlocked at a time. */
const V3_VAULT_CHATS = [
  { id: 'temp1', title: 'Blodprøver fra fastlegen', sub: 'Pasientnotat · v2' },
  { id: 'v2', title: 'Statin og bivirkninger', sub: 'Utkast til spørsmål' },
];

const V3_VAULTS = [
  { id: 'hud', name: 'Hud og føflekker', factor: 'Touch ID', review: { pending: 1, of: 3, where: 'Hudkontroll_notat.pdf' }, chats: [
    { id: 'hud1', title: 'Føflekk på venstre skulder', sub: 'Bilde · vurdert', q: 'Har føflekken endret seg siden i fjor?', a: 'Bildene fra mars 2025 og april 2026 ligger begge i hvelvet. Omrisset er jevnt på begge, men diameteren ser ut til å ha økt litt. Dette er ikke en vurdering av om den er ufarlig — ta den med til hudlegen ved neste kontroll.' },
    { id: 'hud2', title: 'Etter hudkontrollen', sub: 'Notat · 12. mai', q: 'Oppsummer hva legen sa på kontrollen.', a: 'Fra notatet: to føflekker fotodokumentert, ingen fjernet, ny kontroll om tolv måneder. Du ble bedt om å ta bilde selv hvis noe endrer form eller farge før det.' },
  ]},
  { id: 'legetimer', name: 'Legetimer og notater', factor: 'Face ID', review: { pending: 0, of: 6 }, chats: [
    { id: 'lt1', title: 'Årskontroll 2026', sub: 'Opptak · transkribert', q: 'Hva ble avtalt på årskontrollen?', a: 'Opptaket er transkribert. Avtalt: fortsette dagens statindose, ny lipidprøve om tre måneder, og blodtrykksmåling hjemme to ganger i uken fram til da.' },
  ]},
];

/* second factors — all equal, one is enough */
const V3_FACTORS = [
  { id: 'faceid', name: 'Face ID', sub: 'Push til mobilen', icon: 'user', last: true },
  { id: 'touchid', name: 'Touch ID', sub: 'Denne maskinen', icon: 'fingerprint' },
  { id: 'passkey', name: 'Passnøkkel', sub: 'Sikkerhetsnøkkel eller enhet', icon: 'shield' },
  { id: 'totp', name: 'Engangskode', sub: 'Authenticator-app', icon: 'clock' },
  { id: 'sms', name: 'SMS', sub: '••• •• 47', icon: 'chat' },
];

/* ── uttrekk per fil ── rader peker tilbake til raden i kilde-PDF-en (row = indeks i LabReportPage) ── */
const V3_LAB_ROWS = [
  { a: 'P-LDL-kolesterol', code: 'NPU01568', unit: 'mmol/L', ref: '< 3,0', val: '4,1', out: true, row: 0, page: 's. 1' },
  { a: 'P-HDL-kolesterol', code: 'NPU01567', unit: 'mmol/L', ref: '> 1,0', val: '1,2', out: false, row: 1, page: 's. 1' },
  { a: 'P-Triglyserider', code: 'NPU04094', unit: 'mmol/L', ref: '< 2,0', val: '2,4', out: true, row: 2, page: 's. 1',
    review: { id: 'trig', reason: 'Desimaltegnet er utydelig i utskriften — 2,4 eller 24?' } },
  { a: 'P-Homocystein', code: 'NPU04073', unit: 'µmol/L', ref: '5,0 – 15,0', val: '11,2', out: false, row: 3, page: 's. 2' },
  { a: 'P-CRP', code: 'NPU19748', unit: 'mg/L', ref: '< 5,0', val: '6,8', out: true, row: 4, page: 's. 2 (skannet)',
    review: { id: 'crp', reason: 'Hentet fra skannet side — lav sikkerhet i tegngjenkjenningen.' } },
];
const V3_REVIEW_DEFS = V3_LAB_ROWS.filter((r) => r.review).map((r) => ({ ...r.review, name: r.a, value: r.val, unit: r.unit, ref: r.ref, row: r.row, page: r.page, code: r.code, file: 'Lipidpanel_23-25.pdf' }));

const V3_CSV_RAW = `dato,analytt,kode,verdi,enhet,referanse\n23.05.2025,P-LDL-kolesterol,NPU01568,4.1,mmol/L,< 3.0\n23.05.2025,P-HDL-kolesterol,NPU01567,1.2,mmol/L,> 1.0\n23.05.2025,P-Triglyserider,NPU04094,2.4,mmol/L,< 2.0\n23.05.2025,P-Homocystein,NPU04073,11.2,µmol/L,5.0–15.0\n23.05.2025,P-CRP,NPU19748,6.8,mg/L,< 5.0\n12.02.2025,P-LDL-kolesterol,NPU01568,4.3,mmol/L,< 3.0\n… 54 flere rader`;

const V3_SERIES = {
  cols: ['Prøvetaking', 'LDL', 'Triglyserider', 'HDL'],
  rows: [['23.05.2025', '4,1', '2,4', '1,2'], ['12.02.2025', '4,3', '2,2', '1,2'], ['08.11.2024', '4,6', '2,6', '1,1'], ['21.08.2024', '4,2', '2,1', '1,3'], ['14.05.2024', '4,4', '2,5', '1,2']],
  more: '7 flere prøvetakinger',
};

const V3_TRANSCRIPT = [
  ['00:00', 'L', 'Vi ser på lipidverdiene i dag. LDL ligger fortsatt over målet.'],
  ['00:22', 'P', 'Jeg har tatt tablettene som avtalt hele våren.'],
  ['00:41', 'L', 'Da vurderer vi dosen. Triglyseridene er også litt høye, på 2,4.'],
  ['01:09', 'P', 'Og CRP-en fra det skannede arket?'],
  ['01:18', 'L', 'Den må bekreftes manuelt — utskriften var utydelig.'],
];

/* fil → hva panelet viser i fanene Kilde og Uttrekk */
const V3_FILES = {
  'Lipidpanel_23-25.pdf': { kind: 'pdf', raw: 'pdf', meta: 'PDF · 1,8 MB · 4 sider',
    ex: { kind: 'labs', rows: V3_LAB_ROWS, chips: [['', 'flask', '5 analytter'], ['', 'clock', '12 prøvetakinger'], ['warn', 'alert', '2 til gjennomgang']] } },
  'Analytter.csv': { kind: 'csv', raw: 'text', meta: 'CSV · utpakket fra PDF-en',
    ex: { kind: 'series', ...V3_SERIES, chips: [['', 'bars', '12 prøvetakinger'], ['ok', 'check', 'utpakket automatisk']] } },
  'Opptak_fastlege.m4a': { kind: 'audio', raw: 'audio', meta: 'Lyd · 4:12',
    ex: { kind: 'transcript', dur: '4:12', lang: 'Norsk (bokmål)', segments: V3_TRANSCRIPT, chips: [['ok', 'mic', 'Transkribert automatisk'], ['', 'user', '2 talere']] } },
};

Object.assign(window, { V3_CHAT, V3_TREE, V3_LAB_ROWS, V3_REVIEW_DEFS, V3_FILES, V3_CSV_RAW, V3_DOC_V1, V3_DOC_V2, V3_BUILD, V3_FACTORS, V3_VAULTS, V3_VAULT_CHATS });
