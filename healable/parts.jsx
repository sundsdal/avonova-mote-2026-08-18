/* Healable — shared parts (icons, chrome, charts). Exported to window. */

/* ── Prototype navigation ── dispatch a screen change anyone can listen to */
const navTo = (screen) => window.dispatchEvent(new CustomEvent('hnav', { detail: screen }));

/* ── State frame ── full border + tinted ground (replaces colored left-accents) */
const HBL_RGB = { ok: '46,156,114', warn: '198,136,31', alert: '218,87,64', blue: '107,115,232', orchid: '168,98,212' };
const stateFrame = (k) => ({
  background: 'rgba(' + (HBL_RGB[k] || HBL_RGB.blue) + ',0.07)',
  border: '1px solid rgba(' + (HBL_RGB[k] || HBL_RGB.blue) + ',0.32)',
});

const HIcon = ({ n, s }) => {
  const P = { width: s || 18, height: s || 18, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="3"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></>,
    lockopen: <><rect x="4.5" y="10.5" width="15" height="10" rx="3"/><path d="M8 10.5V7a4 4 0 0 1 7.8-1.2"/></>,
    shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></>,
    fingerprint: <><path d="M12 11a2.5 2.5 0 0 1 2.5 2.5c0 2 .3 3.4 1 4.5"/><path d="M12 7a6.5 6.5 0 0 1 6.5 6.5"/><path d="M5.5 13.5A6.5 6.5 0 0 1 8 8.4"/><path d="M9 19.5c-.8-1.4-1.2-3-1.2-5.9a4.2 4.2 0 0 1 6.4-3.6"/><path d="M12 13.5c0 3 .5 4.8 1.5 6.3"/></>,
    scroll: <><path d="M6 4h10a2 2 0 0 1 2 2v11a3 3 0 0 0 3-3H9"/><path d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9"/><path d="M8 8h6M8 11.5h6"/></>,
    search: <><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.8-3.8"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    flask: <><path d="M9 3h6M10 3v6l-4.5 8a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9V3"/><path d="M7.5 15h9"/></>,
    upload: <><path d="M12 16V5M8 9l4-4 4 4"/><path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/></>,
    file: <><path d="M6 3h7l5 5v13a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0z" /><path d="M13 3v5h5"/></>,
    filetext: <><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 13h5M10 16.5h5"/></>,
    bars: <><path d="M5 20V10M10 20V5M15 20v-7M20 20V8"/></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-.5-.3-.9-.6-1.3-.3-.4-.6-.7-.6-1.2 0-.8.7-1.4 1.5-1.4H16a5 5 0 0 0 5-5c0-3.9-4-7.5-9-7.5z"/><circle cx="7.5" cy="12" r="1"/><circle cx="9.5" cy="8" r="1"/><circle cx="14.5" cy="8" r="1"/></>,
    chevR: <path d="M9 5l7 7-7 7"/>,
    chevL: <path d="M15 5l-7 7 7 7"/>,
    chevDown: <path d="M5 9l7 7 7-7"/>,
    check: <path d="M5 12.5l4.5 4.5L19 7"/>,
    arrowUp: <><path d="M12 19V6"/><path d="M6.5 11.5L12 6l5.5 5.5"/></>,
    arrowDown: <><path d="M12 5v13"/><path d="M6.5 12.5L12 18l5.5-5.5"/></>,
    alert: <><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.5v.2"/></>,
    info: <><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.2"/></>,
    sparkle: <><path d="M12 4l1.6 4.7L18 10l-4.4 1.3L12 16l-1.6-4.7L6 10l4.4-1.3z"/><path d="M18.5 15l.7 2 .8-2 .8 2"/></>,
    link: <><path d="M10 14a4 4 0 0 0 6 .4l2-2a4 4 0 0 0-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 0 0-6-.4l-2 2A4 4 0 0 0 11.6 17l1-1"/></>,
    eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></>,
    layers: <><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></>,
    x: <path d="M6 6l12 12M18 6L6 18"/>,
    db: <><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></>,
    clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></>,
    send: <><path d="M21 4L3 11l7 2 2 7z"/><path d="M21 4l-9 9"/></>,
    clip: <><path d="M20 11l-8.5 8.5a4.5 4.5 0 0 1-6.4-6.4L13 5a3 3 0 0 1 4.3 4.3l-8.1 8.1a1.5 1.5 0 0 1-2.2-2.1L14 8"/></>,
    folder: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></>,
    code: <><path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/></>,
    play: <path d="M7 5l11 7-11 7z"/>,
    share: <><circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6"/></>,
    dots: <><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></>,
    trash: <><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M7 7l1 13h8l1-13"/></>,
    quote: <><path d="M7 7h4v5a4 4 0 0 1-4 4M13 7h4v5a4 4 0 0 1-4 4"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></>,
    grid: <><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></>,
    user: <><circle cx="12" cy="8.5" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></>,
    pin: <><circle cx="12" cy="10" r="3"/><path d="M12 21c4-4 6.5-7 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 14 8 17 12 21z"/></>,
    book: <><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 18.5z"/><path d="M5 17.5A1.5 1.5 0 0 1 6.5 16H19"/></>,
    refresh: <><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 16"/><path d="M4 20v-4h4"/></>,
    download: <><path d="M12 4v11"/><path d="M8 11l4 4 4-4"/><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/></>,
    diamond: <path d="M12 3l4 4-4 4-4-4z"/>,
    list: <><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.3"/><circle cx="4.5" cy="12" r="1.3"/><circle cx="4.5" cy="18" r="1.3"/></>,
    checklist: <><path d="M4 6l1.6 1.6L8.5 5"/><path d="M4 12l1.6 1.6L8.5 11"/><path d="M4 18l1.6 1.6L8.5 17"/><path d="M12 6h8M12 12h8M12 18h8"/></>,
    edit: <><path d="M5 19h3l9.5-9.5a2.1 2.1 0 0 0-3-3L5 16z"/><path d="M14 6.5l3 3"/></>,
    maximize: <><path d="M4 9V5a1 1 0 0 1 1-1h4"/><path d="M20 9V5a1 1 0 0 0-1-1h-4"/><path d="M4 15v4a1 1 0 0 0 1 1h4"/><path d="M20 15v4a1 1 0 0 1-1 1h-4"/></>,
    sliders: <><path d="M4 8h9M17 8h3"/><circle cx="15" cy="8" r="2.1"/><path d="M4 16h3M11 16h9"/><circle cx="9" cy="16" r="2.1"/></>,
    inbox: <><path d="M4 13l2.2-7.4A2 2 0 0 1 8.1 4h7.8a2 2 0 0 1 1.9 1.6L20 13"/><path d="M4 13v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M4 13h4l1.5 2.5h5L16 13h4"/></>,
    zoom: <><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.8-3.8M11 8.5v5M8.5 11h5"/></>,
    columns: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16"/></>,
    rows: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16"/></>,
    undo: <><path d="M9 7L4 12l5 5"/><path d="M4 12h11a5 5 0 0 1 0 10h-1"/></>,
    power: <><path d="M12 4v8"/><path d="M7.5 7a7 7 0 1 0 9 0"/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0"/><path d="M12 18v3M9 21h6"/></>,
    waveform: <><path d="M4 10.5v3M8 6.5v11M12 8.5v7M16 4.5v15M20 10v4"/></>,
    image: <><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M5 18l4.5-4.5 3 3L16 12l3 3"/></>,
    globe: <><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.3 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.3-3.5-8.5S9.7 5.8 12 3.5z"/></>,
    external: <><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></>,
    stethoscope: <><path d="M6 4v5a4 4 0 0 0 8 0V4"/><path d="M6 4H4.5M14 4h1.5"/><path d="M10 17a4.5 4.5 0 0 0 9 0v-1.2"/><circle cx="19" cy="13.5" r="2"/></>,
    chat: <><path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 4V6a1 1 0 0 1 1-1z"/><path d="M9 10h6M9 12.5h4"/></>,
    sidebar: <><rect x="4" y="5" width="16" height="14" rx="2.5"/><path d="M9.5 5v14"/></>,
  };
  return <svg {...P}>{paths[n] || null}</svg>;
};

const HMark = ({ size }) => (
  <div className="hbl-mark" style={size ? { width: size, height: size, borderRadius: size*0.32 } : null}>
    <img src={(window.__resources && window.__resources.mark) || 'assets/healable-mark.png'} alt="Healable" style={size ? { width: size*0.72, height: size*0.72 } : null} />
  </div>
);

const HBrand = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
    <HMark />
    <span className="hbl-wordmark">Healable</span>
  </div>
);

const Chip = ({ kind, children, dot, icon }) => (
  <span className={'hbl-chip' + (kind ? ' hbl-chip--' + kind : '') + (dot ? ' hbl-chip--dot' : '')}>
    {icon && <HIcon n={icon} s={13} />}{children}
  </span>
);

const Micro = ({ children, style }) => <div className="hbl-micro" style={style}>{children}</div>;

// Primary tabs — top-level home nav: Hvelv and Studio.
const PrimaryTabs = ({ active }) => {
  const tabs = [['Hvelv', 'db', 'vault'], ['Studio', 'layers', 'studio']];
  return (
    <div className="hbl-modetabs">
      {tabs.map(([t, ic, dest]) => (
        <button key={t} onClick={() => navTo(dest)}
          className={'hbl-modetab' + (dest === active ? ' hbl-modetab--active' : '')}>
          <HIcon n={ic} s={16} />{t}
        </button>
      ))}
    </div>
  );
};

// Mode tabs (Filer · Organiser · Design) — Organiser/Design lock until review complete
const ModeTabs = ({ active }) => {
  const s = window.useStore();
  const locked = window.tabsLocked(s);
  const reason = window.lockReason(s);
  const [tip, setTip] = React.useState(null);
  const tabs = [['Filer','file','filer',false],['Samtale','sparkle','chat',false],['Dokument','filetext','rapport',false]];
  React.useEffect(() => { if (!tip) return; const t = setTimeout(() => setTip(null), 2600); return () => clearTimeout(t); }, [tip]);
  return (
    <div className="hbl-modetabs" style={{ position: 'relative' }}>
      {tabs.map(([t, ic, dest, gate]) => {
        const isLocked = gate && locked;
        return (
          <button key={t} onMouseEnter={() => isLocked && setTip(t)} onMouseLeave={() => setTip(null)}
            onClick={() => isLocked ? setTip(t) : navTo(dest)}
            className={'hbl-modetab' + (t === active ? ' hbl-modetab--active' : '') + (isLocked ? ' hbl-modetab--locked' : '')}>
            <HIcon n={isLocked ? 'lock' : ic} s={isLocked ? 14 : 16} />{t}
          </button>
        );
      })}
      {tip && (
        <div style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', zIndex: 60,
          width: 248, padding: '11px 14px', background: 'var(--ink)', color: '#FBF8F0', borderRadius: 12,
          boxShadow: '0 14px 34px -12px rgba(35,25,22,0.6)', fontSize: 12.5, fontWeight: 500, lineHeight: 1.45 }}>
          <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 10, height: 10, background: 'var(--ink)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 700, marginBottom: 3 }}><HIcon n="lock" s={13} /> {tip} er låst</div>
          {reason}
        </div>
      )}
    </div>
  );
};

// open the review inbox — it lives inside Filer (a pinned entry in the file tree)
const openInbox = () => { window.__openInbox = true; navTo('filer'); };

/* ── Account menu ── click avatar (top-right) → dropdown with Innstillinger / Logg ut */
const AccountMenu = ({ compact }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const avatar = (
    <div style={{ width: 28, height: 28, borderRadius: 9, background: 'linear-gradient(140deg,#C77DD6,#7D7BE8)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flex: '0 0 auto' }}>EM</div>
  );

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {compact ? (
        <button onClick={() => setOpen((o) => !o)} title="Konto"
          style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 3, paddingRight: 7, background: 'var(--paper)', borderRadius: 999, boxShadow: 'var(--e1)', border: '1px solid var(--line-2)', cursor: 'pointer' }}>
          {avatar}
          <HIcon n="chevDown" s={14} />
        </button>
      ) : (
        <button onClick={() => setOpen((o) => !o)}
          style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 10px 6px 14px', background: 'var(--paper)', borderRadius: 999, boxShadow: 'var(--e1)', border: '1px solid var(--line-2)', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
          <HIcon n="shield" s={15} /><span style={{ fontSize: 13.5, fontWeight: 600 }}>Verifisert bruker</span>
          <span style={{ fontSize: 12.5, color: 'var(--ink-45)' }}>· BankID</span>
          {avatar}
          <HIcon n="chevDown" s={14} />
        </button>
      )}

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 80, width: 232,
          background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, boxShadow: 'var(--e3)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 15px', borderBottom: '1px solid var(--line-2)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(140deg,#C77DD6,#7D7BE8)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>EM</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>Emma Moen</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-45)', display: 'flex', alignItems: 'center', gap: 4 }}><HIcon n="shield" s={12} /> BankID-verifisert</div>
            </div>
          </div>
          <div style={{ padding: 6 }}>
            <button onClick={() => { setOpen(false); navTo('konto'); }} className="hbl-menuitem">
              <HIcon n="sparkle" s={17} /> Konto og kreditter
            </button>
            <button onClick={() => { setOpen(false); }} className="hbl-menuitem">
              <HIcon n="sliders" s={17} /> Innstillinger
            </button>
            <button onClick={() => { setOpen(false); navTo('studio'); }} className="hbl-menuitem">
              <HIcon n="layers" s={17} /> Studio
            </button>
            <div style={{ height: 1, background: 'var(--line-2)', margin: '6px 4px' }} />
            <button onClick={() => { setOpen(false); navTo('login'); }} className="hbl-menuitem hbl-menuitem--alert">
              <HIcon n="power" s={17} /> Logg ut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Editable vault name + optional description (click the name to edit)
const VaultTitle = () => {
  const s = window.useStore();
  const name = s.vaultName || 'Lipid- og hjerterisiko';
  const desc = s.vaultDesc || '';
  const [open, setOpen] = React.useState(false);
  const [n, setN] = React.useState(name);
  const [d, setD] = React.useState(desc);
  const ref = React.useRef(null);
  React.useEffect(() => { setN(name); setD(desc); }, [name, desc]);
  const save = () => { window.setStore({ vaultName: (n.trim() || 'Uten navn'), vaultDesc: d.trim() }); setOpen(false); };
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) save(); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open, n, d]);
  return (
    <div ref={ref} style={{ position: 'relative', minWidth: 0 }}>
      <button onClick={() => setOpen((o) => !o)} title="Klikk for å endre navn og beskrivelse"
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 9, font: 'inherit', color: 'inherit', maxWidth: 380 }}>
        <span className="hbl-display" style={{ fontWeight: 500, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
        <span style={{ color: 'var(--ink-30)', flex: '0 0 auto' }}><HIcon n="edit" s={14} /></span>
      </button>
      {desc && !open && <div title={desc} style={{ fontSize: 11.5, color: 'var(--ink-45)', maxWidth: 380, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 6px' }}>{desc}</div>}
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 90, width: 340, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, boxShadow: 'var(--e3)', padding: 14 }}>
          <div className="hbl-micro" style={{ marginBottom: 6 }}>Hvelvnavn</div>
          <input autoFocus value={n} onChange={(e) => setN(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') save(); }}
            style={{ width: '100%', fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--ink)', background: 'var(--paper)', border: '1.5px solid var(--line)', borderRadius: 10, padding: '9px 12px', outline: 'none' }} />
          <div className="hbl-micro" style={{ margin: '12px 0 6px' }}>Beskrivelse (valgfri)</div>
          <textarea value={d} onChange={(e) => setD(e.target.value)} rows={3} placeholder="Legg til en kort beskrivelse …"
            style={{ width: '100%', resize: 'none', fontFamily: 'inherit', fontSize: 13.5, color: 'var(--ink-80)', background: 'var(--paper)', border: '1.5px solid var(--line)', borderRadius: 10, padding: '9px 12px', outline: 'none', lineHeight: 1.5 }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <button onClick={() => setOpen(false)} className="hbl-btn hbl-btn--ghost hbl-btn--sm">Avbryt</button>
            <button onClick={save} className="hbl-btn hbl-btn--primary hbl-btn--sm"><HIcon n="check" s={15} /> Lagre</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Workspace top bar
const WorkTop = ({ vault, purpose, mode, extra }) => (
  <div className="hbl-topbar">
    <button onClick={() => navTo('vault')} className="hbl-btn hbl-btn--ghost hbl-btn--sm" style={{ padding: '8px 10px' }}><HIcon n="chevL" s={16} /></button>
    <VaultTitle />
    <div style={{ flex: 1 }} />
    <ModeTabs active={mode} />
    <div style={{ flex: 1 }} />
    {extra}
    {window.VaultSecurity && <window.VaultSecurity />}
    <AccountMenu compact />
  </div>
);

const SecurityPanel = () => {
  const items = [
    ['lock', 'Kryptert ved ankomst', 'CMEK · KEK per hvelv'],
    ['shield', 'Hermetisk lukket datarom', 'Ingenting forlater rommet'],
    ['fingerprint', 'Bundet til BankID', 'Bare du kan låse opp'],
    ['scroll', 'Revisjonslogget', 'Hver tilgang spores'],
  ];
  return (
    <div className="hbl-seclist">
      {items.map(([ic, t, s]) => (
        <div className="hbl-secitem" key={t}>
          <div className="hbl-secicon"><HIcon n={ic} s={16} /></div>
          <div><div className="hbl-sectitle">{t}</div><div className="hbl-secsub">{s}</div></div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MarkerTrend — longitudinal lab marker with reference-range band,
   out-of-range + low-confidence point states, target line, citation.
   ───────────────────────────────────────────────────────────── */
const MarkerTrend = ({ data, refLow, refHigh, target, yMin, yMax, unit, height }) => {
  const W = 640, H = height || 158;
  const padL = 6, padR = 58, padT = 16, padB = 22;
  const n = data.length;
  const lo = yMin, hi = yMax;
  const x = (i) => padL + (i * (W - padL - padR)) / (n - 1);
  const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
  const pts = data.map((d, i) => ({ ...d, cx: x(i), cy: y(d.v), out: d.v > refHigh || d.v < refLow }));
  const linePath = pts.map((p, i) => (i ? 'L' : 'M') + p.cx.toFixed(1) + ' ' + p.cy.toFixed(1)).join(' ');
  const bandTop = y(refHigh), bandBot = y(refLow);
  const last = pts[n - 1];
  const labelIdx = data.map((_, i) => i).filter((i) => i % 3 === 0 || i === n - 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* reference band (normal zone) */}
      <rect x={padL} y={bandTop} width={W - padL - padR} height={bandBot - bandTop}
        fill="rgba(46,156,114,0.10)" />
      <line x1={padL} y1={bandTop} x2={W - padR} y2={bandTop} stroke="rgba(46,156,114,0.35)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1={padL} y1={bandBot} x2={W - padR} y2={bandBot} stroke="rgba(46,156,114,0.35)" strokeWidth="1" strokeDasharray="2 3" />
      <text x={W - padR + 6} y={bandTop + 4} fontSize="10" fontWeight="700" fill="#2E9C72" fontFamily="Manrope" style={{ letterSpacing: '.08em' }}>REF</text>
      <text x={W - padR + 6} y={bandTop + 16} fontSize="9.5" fill="#7DA694" fontFamily="Manrope">{refLow}–{refHigh}</text>
      {/* target line (clinical goal) */}
      {target != null && (<>
        <line x1={padL} y1={y(target)} x2={W - padR} y2={y(target)} stroke="#6B73E8" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.65" />
        <text x={W - padR + 6} y={y(target) + 3.5} fontSize="9.5" fontWeight="700" fill="#565ED6" fontFamily="Manrope">mål</text>
      </>)}
      {/* trend line */}
      <path d={linePath} fill="none" stroke="#463B34" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />
      {/* points */}
      {pts.map((p, i) => {
        const color = p.out ? '#DA5740' : '#463B34';
        if (p.conf === 'low') return (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="5.2" fill="#FCFAF4" stroke={color} strokeWidth="1.6" strokeDasharray="2.2 2" />
          </g>
        );
        return <circle key={i} cx={p.cx} cy={p.cy} r={i === n-1 ? 4.6 : 3.4} fill={p.out ? '#DA5740' : '#FCFAF4'} stroke={color} strokeWidth={p.out ? 1.5 : 2} />;
      })}
      {/* last value callout */}
      <circle cx={last.cx} cy={last.cy} r="6.5" fill="none" stroke={last.out ? '#DA5740' : '#463B34'} strokeWidth="1.2" opacity="0.4" />
      <text x={last.cx + 10} y={last.cy - 8} fontSize="13" fontWeight="700" fontFamily="Space Grotesk" fill={last.out ? '#B23E2C' : '#231916'} style={{ fontVariantNumeric: 'tabular-nums' }} textAnchor={last.cx > W - 110 ? 'end' : 'start'}>{last.v}</text>
      {/* x labels */}
      {labelIdx.map((i) => (
        <text key={i} x={x(i)} y={H - 5} fontSize="9.5" fill="#968A7E" fontFamily="Manrope" textAnchor={i === 0 ? 'start' : i === n-1 ? 'middle' : 'middle'}>{data[i].q}</text>
      ))}
    </svg>
  );
};

// Compact correlation scatter
const CorrScatter = ({ pts, xlab, ylab, r }) => {
  const W = 230, H = 150, pad = 18;
  const xs = pts.map(p=>p[0]), ys = pts.map(p=>p[1]);
  const xn = Math.min(...xs), xx = Math.max(...xs), yn = Math.min(...ys), yx = Math.max(...ys);
  const X = (v)=> pad + (v-xn)/(xx-xn)*(W-2*pad);
  const Y = (v)=> H-pad - (v-yn)/(yx-yn)*(H-2*pad);
  // simple regression line
  const mx = xs.reduce((a,b)=>a+b,0)/xs.length, my = ys.reduce((a,b)=>a+b,0)/ys.length;
  let num=0, den=0; xs.forEach((xv,i)=>{num+=(xv-mx)*(ys[i]-my); den+=(xv-mx)**2;});
  const slope=num/den, intc=my-slope*mx;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      <line x1={pad} y1={H-pad} x2={W-pad} y2={H-pad} stroke="rgba(35,25,22,0.12)" />
      <line x1={pad} y1={pad} x2={pad} y2={H-pad} stroke="rgba(35,25,22,0.12)" />
      <line x1={X(xn)} y1={Y(slope*xn+intc)} x2={X(xx)} y2={Y(slope*xx+intc)} stroke="#A862D4" strokeWidth="1.6" strokeDasharray="4 3" opacity="0.8" />
      {pts.map((p,i)=>(<circle key={i} cx={X(p[0])} cy={Y(p[1])} r="3.4" fill="rgba(107,115,232,0.7)" />))}
      <text x={W-pad} y={H-6} fontSize="9" fill="#968A7E" textAnchor="end" fontFamily="Manrope">{xlab}</text>
      <text x={pad-2} y={pad-6} fontSize="9" fill="#968A7E" fontFamily="Manrope">{ylab}</text>
    </svg>
  );
};

Object.assign(window, { navTo, openInbox, stateFrame, HIcon, HMark, HBrand, Chip, Micro, AccountMenu, PrimaryTabs, ModeTabs, WorkTop, VaultTitle, SecurityPanel, MarkerTrend, CorrScatter });
