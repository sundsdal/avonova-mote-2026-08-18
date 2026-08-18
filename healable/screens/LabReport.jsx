/* Healable — LabReportPage (realistic lab PDF mock) + PdfCutout
   Fixed coordinate system so cutouts can frame an exact analyte row.
   All sizes in page-px at base scale 1. */
const { HIcon: LRIcon } = window;

const LR = {
  PAGE_W: 720,
  PAGE_H: 1018,
  TABLE_TOP: 384,   // y of first data row's top edge
  ROW_H: 42,
  ROWS: [
    { code: 'NPU01568', name: 'P-LDL-Kolesterol', res: '4,1',  unit: 'mmol/L', ref: '< 3,0',    flag: 'H' },
    { code: 'NPU01567', name: 'P-HDL-Kolesterol', res: '1,2',  unit: 'mmol/L', ref: '> 1,0',    flag: ''  },
    { code: 'NPU04094', name: 'P-Triglyserider',  res: '2,4',  unit: 'mmol/L', ref: '< 2,0',    flag: 'H' },
    { code: 'NPU04073', name: 'P-Homocystein',    res: '11,2', unit: 'µmol/L', ref: '5,0 – 15,0', flag: '' },
    { code: 'NPU19748', name: 'P-CRP',            res: '6,8',  unit: 'mg/L',   ref: '< 5,0',    flag: 'H' },
  ],
};

/* one document page rendered as a "scan": serif body, ruled table, light grain */
function LabReportPage({ highlight }) {
  const { PAGE_W, PAGE_H, TABLE_TOP, ROW_H, ROWS } = LR;
  const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, 'Times New Roman', serif";
  const col = { name: 56, res: 360, unit: 446, ref: 540, flag: 648 };
  return (
    <div style={{ position: 'relative', width: PAGE_W, height: PAGE_H, background: '#FDFDFB', color: '#1c1a17',
      fontFamily: serif, boxShadow: '0 1px 0 rgba(0,0,0,0.04)', overflow: 'hidden' }}>
      {/* faint scan grain / vignette */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0) 60%, rgba(120,110,90,0.05) 100%)' }} />

      {/* ── letterhead ── */}
      <div style={{ position: 'absolute', top: 44, left: 56, right: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 42, height: 42, borderRadius: 8, background: '#1c1a17', color: '#FDFDFB',
            display: 'grid', placeItems: 'center', fontFamily: serif, fontSize: 22, fontWeight: 700 }}>N</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>Nordlab Medisinsk Laboratorium</div>
            <div style={{ fontSize: 12.5, color: '#5b554c' }}>Avdeling for klinisk kjemi · Storgata 18, 0184 Oslo · Org. 982&nbsp;774&nbsp;021</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#5b554c', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: '#1c1a17', fontSize: 13 }}>PRØVESVAR</div>
          <div>Rapport-ID 23-25-LP</div>
          <div>Side 1 av 2</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 112, left: 56, right: 56, height: 2, background: '#1c1a17' }} />

      {/* ── patient / sample block ── */}
      <div style={{ position: 'absolute', top: 132, left: 56, right: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40, rowGap: 7, fontSize: 13 }}>
        {[
          ['Navn', 'Pasient, Demo'], ['Rekvirent', 'Fastlege M. Halvorsen'],
          ['Født', '14.03.1976 (49 år)'], ['Rekvisisjon', 'R-2025-04417'],
          ['Kjønn', 'Kvinne'], ['Prøvetaking', '23.05.2025 kl. 08:10'],
          ['Pasient-ID', '140376 ●●●●●'], ['Analysert', '23.05.2025 kl. 11:42'],
        ].map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: '#8a8378', minWidth: 86 }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      {/* ── section title ── */}
      <div style={{ position: 'absolute', top: 300, left: 56, right: 56 }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', paddingBottom: 6, borderBottom: '1px solid #cfc9bb' }}>KLINISK KJEMI — LIPIDPROFIL &amp; KARDIOVASKULÆR RISIKO</div>
      </div>

      {/* ── table header ── */}
      <div style={{ position: 'absolute', top: 344, left: 56, right: 56, height: 28, fontSize: 11.5, letterSpacing: '0.04em', color: '#8a8378', fontWeight: 700 }}>
        <span style={{ position: 'absolute', left: col.name - 56 }}>ANALYSE</span>
        <span style={{ position: 'absolute', left: col.res - 56 }}>RESULTAT</span>
        <span style={{ position: 'absolute', left: col.unit - 56 }}>ENHET</span>
        <span style={{ position: 'absolute', left: col.ref - 56 }}>REFERANSE</span>
        <span style={{ position: 'absolute', left: col.flag - 56 }}>FLAGG</span>
        <div style={{ position: 'absolute', top: 26, left: 0, right: 0, height: 1, background: '#cfc9bb' }} />
      </div>

      {/* ── data rows ── */}
      {ROWS.map((r, i) => {
        const top = TABLE_TOP + i * ROW_H;
        const hot = highlight === i;
        return (
          <div key={r.code} style={{ position: 'absolute', top, left: 56, right: 56, height: ROW_H, borderBottom: '1px solid #e7e2d6' }}>
            {hot && <div style={{ position: 'absolute', inset: '3px -10px', background: 'rgba(232,180,40,0.16)', border: '1.5px solid rgba(200,140,20,0.55)', borderRadius: 4 }} />}
            <div style={{ position: 'absolute', top: 11, left: col.name - 56, fontSize: 14, fontWeight: 600 }}>{r.name}</div>
            <div style={{ position: 'absolute', top: 25, left: col.name - 56, fontSize: 10.5, color: '#9a9388', letterSpacing: '0.03em' }}>{r.code}</div>
            <div style={{ position: 'absolute', top: 13, left: col.res - 56, fontSize: 15, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{r.res}</div>
            <div style={{ position: 'absolute', top: 14, left: col.unit - 56, fontSize: 13, color: '#5b554c' }}>{r.unit}</div>
            <div style={{ position: 'absolute', top: 14, left: col.ref - 56, fontSize: 13, color: '#5b554c', fontVariantNumeric: 'tabular-nums' }}>{r.ref}</div>
            <div style={{ position: 'absolute', top: 13, left: col.flag - 56, fontSize: 14, fontWeight: 700, color: r.flag ? '#a23' : '#9a9388' }}>{r.flag || '—'}</div>
          </div>
        );
      })}

      {/* ── legend + note ── */}
      <div style={{ position: 'absolute', top: TABLE_TOP + ROWS.length * ROW_H + 22, left: 56, right: 56, fontSize: 12, color: '#5b554c', lineHeight: 1.6 }}>
        <div><b>H</b> = over referanseområde &nbsp;·&nbsp; <b>L</b> = under referanseområde. Referanseområder gjelder voksne &gt; 18 år.</div>
        <div style={{ marginTop: 8 }}>P-CRP målt fra ettersendt skannet rekvisisjon (side 2). Verdi kontrolleres mot originalrekvisisjon.</div>
      </div>

      {/* ── signature ── */}
      <div style={{ position: 'absolute', top: 880, left: 56, right: 56, borderTop: '1px solid #cfc9bb', paddingTop: 14, fontSize: 12.5, color: '#5b554c', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 20, color: '#2a2622' }}>Anne Lien</div>
          <div>Cand.scient., bioingeniør — faglig ansvarlig</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Akkreditert ISO 15189</div>
          <div>Elektronisk signert 23.05.2025</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 22, left: 56, right: 56, fontSize: 11, color: '#9a9388', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e7e2d6', paddingTop: 8 }}>
        <span>Nordlab Medisinsk Laboratorium · prøvesvar er konfidensielt</span>
        <span>Lipidpanel_23-25.pdf</span>
      </div>
    </div>
  );
}

/* zoomed crop of the page that frames row `row`, with a scan-frame chrome */
function PdfCutout({ row, w, h, zoom, label, chrome, source }) {
  const Z = zoom || 1.28;
  const VW = w || 560, VH = h || 124;
  const src = source || 'Lipidpanel_23-25.pdf';
  const { TABLE_TOP, ROW_H } = LR;
  const rowCenterY = TABLE_TOP + row * ROW_H + ROW_H / 2;
  const leftX = 40;                              // page-x we start showing from
  const tx = -leftX * Z;
  const ty = VH / 2 - rowCenterY * Z;
  return (
    <div style={{ width: VW, maxWidth: '100%' }}>
      <div style={{ position: 'relative', width: '100%', height: VH, overflow: 'hidden',
        borderRadius: 12, background: '#FDFDFB',
        boxShadow: '0 1px 2px rgba(74,52,38,0.06), 0 18px 36px -22px rgba(74,52,38,0.4), inset 0 0 0 1px rgba(35,25,22,0.08)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, transform: `translate(${tx}px, ${ty}px) scale(${Z})`, transformOrigin: 'top left' }}>
          <LabReportPage highlight={row} />
        </div>
        {/* corner crop marks */}
        {chrome !== false && [['top',8,'left',8],['top',8,'right',8],['bottom',8,'left',8],['bottom',8,'right',8]].map((c, i) => (
          <div key={i} style={{ position: 'absolute', [c[0]]: c[1], [c[2]]: c[3], width: 12, height: 12,
            borderTop: c[0] === 'top' ? '2px solid rgba(35,25,22,0.4)' : 'none',
            borderBottom: c[0] === 'bottom' ? '2px solid rgba(35,25,22,0.4)' : 'none',
            borderLeft: c[2] === 'left' ? '2px solid rgba(35,25,22,0.4)' : 'none',
            borderRight: c[2] === 'right' ? '2px solid rgba(35,25,22,0.4)' : 'none',
            borderRadius: 2 }} />
        ))}
      </div>
      {label !== false && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 9, fontSize: 11.5, color: 'var(--ink-45)' }}>
          <LRIcon n="quote" s={13} />
          <span>Utsnitt fra <b style={{ color: 'var(--ink-60)' }}>{src}</b>{label ? ' · ' + label : ''}</span>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LR, LabReportPage, PdfCutout });
