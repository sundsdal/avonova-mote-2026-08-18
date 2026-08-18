/* Healable v3 — lock flow. Three variants: modal, inline in the chat, right-side panel. */
const IL = window.HIcon;

function V3FactorList({ picked, onToggle, compact }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {window.V3_FACTORS.map((f) => {
        const on = picked.includes(f.id);
        return (
          <button key={f.id} onClick={() => onToggle(f.id)} style={{ display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left', font: 'inherit', cursor: 'pointer', padding: compact ? '10px 12px' : '12px 13px', borderRadius: 12, background: on ? 'var(--blue-08)' : 'var(--paper)', border: '1.5px solid ' + (on ? 'var(--blue)' : 'var(--line-2)'), transition: 'background .14s, border-color .14s' }}>
            <span style={{ width: 32, height: 32, borderRadius: 10, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: on ? 'var(--blue-12)' : 'var(--paper-2)', color: on ? 'var(--blue)' : 'var(--ink-45)' }}><IL n={f.icon} s={17} /></span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="hbl-display" style={{ fontSize: 14, fontWeight: 500 }}>{f.name}</span>
                {f.last && <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--blue)', background: 'var(--blue-12)', padding: '2px 7px', borderRadius: 999 }}>Sist brukt</span>}
              </span>
              <span style={{ display: 'block', fontSize: 11.5, color: 'var(--ink-45)', marginTop: 1 }}>{f.sub}</span>
            </span>
            <span style={{ width: 19, height: 19, borderRadius: 6, flex: '0 0 auto', display: 'grid', placeItems: 'center', border: '1.5px solid ' + (on ? 'var(--blue)' : 'var(--line)'), background: on ? 'var(--blue)' : 'transparent', color: '#fff' }}>{on && <IL n="check" s={12} />}</span>
          </button>
        );
      })}
    </div>
  );
}

function V3LockBody({ name, setName, picked, toggle, compact }) {
  return (
    <>
      <div className="hbl-micro" style={{ marginBottom: 6 }}>Navn på hvelvet</div>
      <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Space Grotesk',sans-serif", fontSize: 15.5, fontWeight: 600, color: 'var(--ink)', background: 'var(--paper)', border: '1.5px solid var(--line)', borderRadius: 10, padding: '10px 13px', outline: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: compact ? '16px 0 7px' : '18px 0 8px' }}>
        <div className="hbl-micro">Lås opp med</div>
        <span style={{ fontSize: 11.5, color: 'var(--ink-45)' }}>Én er nok — legg til flere hvis du vil</span>
      </div>
      <V3FactorList picked={picked} onToggle={toggle} compact={compact} />
    </>
  );
}

function useLockState() {
  const [name, setName] = React.useState(window.V3_CHAT.vault);
  const [picked, setPicked] = React.useState(['faceid']);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  return { name, setName, picked, toggle };
}

/* variant A — modal */
function V3LockModal({ onDone, onCancel }) {
  const st = useLockState();
  return (
    <div onClick={onCancel} style={{ position: 'absolute', inset: 0, zIndex: 90, display: 'grid', placeItems: 'center', padding: 30, background: 'rgba(35,25,22,0.44)', backdropFilter: 'blur(6px)', animation: 'hblFade .16s ease' }}>
      <div onClick={(e) => e.stopPropagation()} className="hbl-card" style={{ width: 468, maxHeight: '86%', overflowY: 'auto', padding: 0, animation: 'hblPop .2s cubic-bezier(.2,.8,.3,1)' }}>
        <div style={{ padding: '20px 22px 14px', borderBottom: '1px solid var(--line-2)', display: 'flex', gap: 13, alignItems: 'flex-start' }}>
          <span style={{ width: 36, height: 36, borderRadius: 11, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: 'var(--blue-12)', color: 'var(--blue)' }}><IL n="lock" s={18} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="hbl-display" style={{ fontSize: 18, fontWeight: 500 }}>Lås samtalen</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-60)', marginTop: 3, lineHeight: 1.5 }}>Den blir et kryptert hvelv med egen nøkkel. Filene som ligger her flytter med.</div>
          </div>
          <button onClick={onCancel} style={{ border: 'none', background: 'transparent', color: 'var(--ink-45)', cursor: 'pointer', display: 'grid', padding: 3 }}><IL n="x" s={17} /></button>
        </div>
        <div style={{ padding: '16px 22px 4px' }}><V3LockBody {...st} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 22px', marginTop: 12, borderTop: '1px solid var(--line-2)', background: 'var(--paper-3)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--ink-45)', flex: 1 }}><IL n="shield" s={13} /> Nøkkel per hvelv · bundet til BankID</span>
          <button onClick={onCancel} className="hbl-btn hbl-btn--ghost hbl-btn--sm">Avbryt</button>
          <button onClick={() => onDone(st)} className="hbl-btn hbl-btn--primary hbl-btn--sm" style={{ opacity: st.picked.length ? 1 : 0.45, pointerEvents: st.picked.length ? 'auto' : 'none' }}><IL n="lock" s={15} /> Lås</button>
        </div>
      </div>
    </div>
  );
}

/* variant B — inline in the transcript, AI-led */
function V3LockInline({ onDone, onCancel }) {
  const st = useLockState();
  return (
    <div className="hbl-card" style={{ padding: 0, overflow: 'hidden', animation: 'hblFadeUp .3s ease both' }}>
      <div style={{ padding: '15px 17px 11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 24, height: 24, borderRadius: 7, background: 'var(--blue-12)', color: 'var(--blue)', display: 'grid', placeItems: 'center' }}><IL n="lock" s={13} /></span>
          <div className="hbl-micro">Steg 1 av 1</div>
        </div>
        <div className="hbl-display" style={{ fontSize: 16, fontWeight: 500 }}>Gi hvelvet et navn og velg hvordan du låser opp</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-60)', marginTop: 3, lineHeight: 1.5 }}>Filene i samtalen krypteres med en egen nøkkel for dette hvelvet.</div>
      </div>
      <div style={{ padding: '4px 17px 14px' }}><V3LockBody {...st} compact /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 17px', borderTop: '1px solid var(--line)', background: 'var(--paper-3)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--ink-45)', flex: 1 }}><IL n="shield" s={13} /> Bundet til BankID</span>
        <button onClick={onCancel} className="hbl-btn hbl-btn--ghost hbl-btn--sm">Ikke nå</button>
        <button onClick={() => onDone(st)} className="hbl-btn hbl-btn--primary hbl-btn--sm"><IL n="lock" s={15} /> Lås samtalen</button>
      </div>
    </div>
  );
}

/* variant C — slide-over on the right, in the pane's place */
function V3LockPanel({ onDone, onCancel }) {
  const st = useLockState();
  return (
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 428, zIndex: 60, background: 'var(--paper)', borderLeft: '1px solid var(--line)', boxShadow: '-18px 0 50px -20px rgba(35,25,22,0.28)', display: 'flex', flexDirection: 'column', animation: 'hblSlideIn .34s cubic-bezier(.2,.8,.3,1) both' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 18px', borderBottom: '1px solid var(--line-2)' }}>
        <span style={{ width: 30, height: 30, borderRadius: 9, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: 'var(--blue-12)', color: 'var(--blue)' }}><IL n="lock" s={16} /></span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="hbl-display" style={{ fontSize: 15.5, fontWeight: 500 }}>Lås samtalen</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-45)' }}>Blir et kryptert hvelv</div>
        </div>
        <button onClick={onCancel} style={{ border: 'none', background: 'transparent', color: 'var(--ink-45)', cursor: 'pointer', display: 'grid', padding: 4 }}><IL n="x" s={18} /></button>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 18px 24px' }}>
        <V3LockBody {...st} compact />
        <div style={{ marginTop: 18, padding: '12px 14px', borderRadius: 12, background: 'var(--paper-2)', border: '1px solid var(--line-2)', fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.55 }}>
          Etter låsing kan du legge flere samtaler i hvelvet. Filene som allerede ligger i samtalen blir liggende — bare kryptert med hvelvets nøkkel.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 9, padding: '13px 18px', borderTop: '1px solid var(--line-2)', background: 'var(--paper-3)' }}>
        <button onClick={onCancel} className="hbl-btn hbl-btn--ghost" style={{ flex: '0 0 auto' }}>Avbryt</button>
        <button onClick={() => onDone(st)} className="hbl-btn hbl-btn--primary" style={{ flex: 1, justifyContent: 'center' }}><IL n="lock" s={16} /> Lås</button>
      </div>
    </div>
  );
}

/* the unlock confirmation the chosen factor triggers */
function V3Verify({ factor, onDone, mode, vault }) {
  const f = window.V3_FACTORS.find((x) => x.id === factor) || window.V3_FACTORS[0];
  const unlock = mode === 'unlock';
  const [ok, setOk] = React.useState(false);
  React.useEffect(() => {
    const a = setTimeout(() => setOk(true), 1500);
    const b = setTimeout(onDone, 2500);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 95, display: 'grid', placeItems: 'center', padding: 30, background: 'rgba(35,25,22,0.44)', backdropFilter: 'blur(6px)', animation: 'hblFade .16s ease' }}>
      <div className="hbl-card" style={{ width: 340, padding: '28px 26px 24px', textAlign: 'center', animation: 'hblPop .2s cubic-bezier(.2,.8,.3,1)' }}>
        <div style={{ width: 54, height: 54, borderRadius: 16, margin: '0 auto', display: 'grid', placeItems: 'center', background: ok ? 'var(--ok-12)' : 'var(--blue-12)', color: ok ? 'var(--ok)' : 'var(--blue)', transition: 'background .2s' }}>
          {ok ? <IL n="check" s={26} /> : <span className="hbl-spin" style={{ display: 'grid' }}><IL n={f.icon} s={26} /></span>}
        </div>
        <div className="hbl-display" style={{ fontSize: 17, fontWeight: 500, marginTop: 15 }}>{ok ? (unlock ? (vault || 'Hvelvet') + ' er åpent' : 'Hvelvet er låst') : 'Bekreft med ' + f.name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-60)', marginTop: 5, lineHeight: 1.5 }}>{ok ? (unlock ? 'Andre hvelv ble låst. Bare ett kan være åpent av gangen.' : 'Nøkkelen er opprettet og filene er kryptert.') : f.id === 'faceid' ? 'Sendte forespørsel til mobilen din …' : 'Venter på bekreftelse …'}</div>
      </div>
    </div>
  );
}

Object.assign(window, { V3LockModal, V3LockInline, V3LockPanel, V3Verify });
