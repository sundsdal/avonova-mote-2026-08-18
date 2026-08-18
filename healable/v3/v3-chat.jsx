/* Healable v3 — chat atoms, drop zones, composer, artifact card. */
const I3 = window.HIcon;

function V3User({ children }) {
  return <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: 'var(--blue)', color: '#fff', padding: '11px 15px', borderRadius: '18px 18px 5px 18px', fontSize: 14, lineHeight: 1.5, boxShadow: '0 10px 24px -14px rgba(86,94,214,0.75)' }}>{children}</div>;
}
function V3Bot({ children }) {
  return (
    <div style={{ display: 'flex', gap: 12, maxWidth: '96%' }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: 'var(--blue-12)', color: 'var(--blue)', marginTop: 1 }}><I3 n="sparkle" s={16} /></div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 11, paddingTop: 3 }}>{children}</div>
    </div>
  );
}
function V3Text({ children }) { return <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-80)' }}>{children}</div>; }

function V3Tool({ label, out, rows }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderRadius: 10, border: '1px solid var(--line-2)', background: 'var(--paper-2)', overflow: 'hidden' }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', textAlign: 'left', padding: '8px 12px', background: 'transparent', border: 'none', cursor: 'pointer', font: 'inherit' }}>
        <span style={{ width: 21, height: 21, borderRadius: 7, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: 'var(--ok-12)', color: 'var(--ok)' }}><I3 n="check" s={12} /></span>
        <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, fontWeight: 600, color: 'var(--ink-80)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
        {out && <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-45)', flex: '0 0 auto' }}>{out}</span>}
        <span style={{ color: 'var(--ink-30)', flex: '0 0 auto', display: 'grid', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><I3 n="chevDown" s={14} /></span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--line-2)', padding: '9px 14px 11px 44px', display: 'flex', flexDirection: 'column', gap: 6, background: 'var(--paper)' }}>
          {(rows || []).map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--ink-30)', flex: '0 0 auto', marginTop: 1 }}><I3 n={r[0]} s={12} /></span>
              <div style={{ minWidth: 0, textWrap: 'pretty' }}>{r[1] && <b style={{ color: 'var(--ink-80)', fontWeight: 600 }}>{r[1]} · </b>}{r[2]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* the file that entered the chat */
function V3FileCard({ onOpen }) {
  const F = window.V3_FILE;
  return (
    <div className="hbl-card hbl-rowlink" onClick={onOpen} style={{ alignSelf: 'flex-start', maxWidth: 380, display: 'flex', alignItems: 'center', gap: 13, padding: 11, borderRadius: 14, cursor: 'pointer', animation: 'hblFadeUp .3s ease both' }}>
      <div style={{ width: 46, height: 56, borderRadius: 8, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: 'var(--paper-2)', border: '1px solid var(--line-2)', color: 'var(--ink-45)' }}><I3 n="filetext" s={22} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="hbl-display" style={{ fontSize: 14.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{F.name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-45)', marginTop: 3 }}><span className="hbl-num">{F.size}</span> · {F.pages}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6, fontSize: 11, color: 'var(--ink-45)' }}><I3 n="lock" s={12} /> Kryptert ved ankomst</div>
      </div>
      <span style={{ color: 'var(--ink-30)', flex: '0 0 auto', display: 'grid' }}><I3 n="zoom" s={17} /></span>
    </div>
  );
}

/* the analyte read-out */
function V3Markers() {
  return (
    <div className="hbl-card" style={{ padding: '4px 16px 10px', animation: 'hblFadeUp .3s ease both' }}>
      {window.V3_MARKERS.map((m, i) => (
        <div key={m.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(72px,96px) minmax(0,auto)', alignItems: 'center', gap: 8, padding: '11px 0', borderTop: i ? '1px solid var(--line-2)' : 'none' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-80)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</span>
          <span><span className="hbl-num" style={{ fontSize: 17, fontWeight: 600, color: m.state === 'ok' ? 'var(--ink)' : 'var(--' + m.state + ')' }}>{m.v}</span> <span style={{ fontSize: 11.5, color: 'var(--ink-45)' }}>{m.unit}</span></span>
          <span className={'hbl-chip hbl-chip--' + m.state} style={{ fontSize: 10.5, justifySelf: 'end' }}>{m.ref}</span>
        </div>
      ))}
    </div>
  );
}

/* the document artifact — click to open the preview pane */
function V3Artifact({ doc, active, onOpen }) {
  return (
    <button onClick={onOpen} className="hbl-card hbl-rowlink" style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center', gap: 13, padding: '13px 15px', borderRadius: 14, cursor: 'pointer', textAlign: 'left', font: 'inherit', border: '1px solid ' + (active ? 'var(--blue)' : 'var(--line)'), animation: 'hblFadeUp .3s ease both' }}>
      <div style={{ width: 38, height: 46, borderRadius: 7, flex: '0 0 auto', background: '#fff', border: '1px solid var(--line)', boxShadow: 'var(--e1)', padding: 5, display: 'flex', flexDirection: 'column', gap: 2.5, justifyContent: 'flex-start' }}>
        <span style={{ height: 3, width: '80%', background: 'var(--ink-30)', borderRadius: 2 }} />
        {[1,2,3,4].map((k) => <span key={k} style={{ height: 2, width: k === 4 ? '55%' : '100%', background: 'var(--line)', borderRadius: 2 }} />)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="hbl-micro" style={{ color: 'var(--ink-45)' }}>Dokument · v{doc.v}</div>
        <div className="hbl-display" style={{ fontSize: 15, fontWeight: 500, marginTop: 2 }}>Pasientnotat — lipidpanel</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-45)', marginTop: 3 }}>1 side · {doc.label} · {doc.when}</div>
      </div>
      <span className="hbl-btn hbl-btn--sm" style={{ flex: '0 0 auto', pointerEvents: 'none' }}><I3 n="eye" s={15} /> {active ? 'Åpen' : 'Åpne'}</span>
    </button>
  );
}

function V3Build({ step }) {
  return (
    <div style={{ alignSelf: 'flex-start', minWidth: 300, background: 'var(--paper)', border: '1px solid var(--line-2)', borderRadius: 14, boxShadow: 'var(--e1)', padding: '10px 16px' }}>
      {window.V3_BUILD.map((t, i) => {
        const st = step > i ? 'done' : step === i ? 'active' : 'todo';
        return (
          <div key={t.label} style={{ display: 'flex', gap: 11, alignItems: 'center', padding: '6px 0', opacity: st === 'todo' ? 0.4 : 1, transition: 'opacity .3s' }}>
            <div style={{ width: 25, height: 25, borderRadius: 8, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: st === 'done' ? 'var(--ok-12)' : st === 'active' ? 'var(--blue-12)' : 'var(--paper-2)', color: st === 'done' ? 'var(--ok)' : st === 'active' ? 'var(--blue)' : 'var(--ink-30)' }}>
              {st === 'done' ? <I3 n="check" s={13} /> : st === 'active' ? <span className="hbl-spin" style={{ display: 'grid' }}><I3 n="refresh" s={13} /></span> : <I3 n={t.icon} s={13} />}
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: st === 'todo' ? 'var(--ink-45)' : 'var(--ink)' }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function V3Suggest({ items }) {
  if (!items || !items.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 2, animation: 'hblFadeUp .3s ease both' }}>
      {items.map((s, i) => (
        <button key={i} onClick={s.onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 999, font: 'inherit', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
          color: s.primary ? '#fff' : 'var(--ink-80)', background: s.primary ? 'linear-gradient(180deg,#757DEE,var(--blue))' : 'var(--paper)',
          border: '1px solid ' + (s.primary ? 'transparent' : 'var(--line-2)'), boxShadow: s.primary ? '0 10px 22px -14px rgba(86,94,214,0.8)' : 'var(--e1)' }}>
          {s.icon && <I3 n={s.icon} s={14} />}{s.label}
        </button>
      ))}
    </div>
  );
}

/* ── empty state: big, clear drop zones ── */
function V3Drops({ onUpload, onRecord, dense }) {
  const zones = [
    ['Last opp filer', 'upload', 'PDF, bilde, CSV — dra hit eller velg', onUpload],
    ['Spill inn', 'mic', 'Lyd blir transkribert automatisk', onRecord],
    ['Ta bilde', 'image', 'Kamera eller skann et ark', onUpload],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
      {zones.map(([t, ic, sub, fn]) => (
        <button key={t} onClick={fn} className="hbl-v3drop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 7, padding: dense ? '16px 16px 18px' : '20px 18px 22px', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--paper)', border: '1px solid var(--line-2)', color: 'var(--ink-80)', display: 'grid', placeItems: 'center' }}><I3 n={ic} s={20} /></span>
          <span className="hbl-display" style={{ fontSize: 15, fontWeight: 500, marginTop: 2 }}>{t}</span>
          <span style={{ fontSize: 11.5, color: 'var(--ink-45)', lineHeight: 1.45 }}>{sub}</span>
        </button>
      ))}
    </div>
  );
}

/* ── skiller: slå på per samtale ── */
const v3AllSkills = () => [
  ...(window.V3_DOC_SKILLS || []).map((k) => ({ ...k, fam: 'dokument' })),
  ...(window.V3_GEN_SKILLS || []).map((k) => ({ ...k, fam: 'generell' })),
];
const v3Skill = (name) => v3AllSkills().find((k) => k.name === name);
const v3SkillFace = (fam) => (fam === 'dokument' ? { ic: 'filetext', fg: '#8C45BC', bg: 'var(--orchid-12)' } : { ic: 'flask', fg: 'var(--blue)', bg: 'var(--blue-12)' });

function V3SkillRow({ k, on, onToggle, cmd, sel }) {
  const draft = k.v === 'kladd';
  const f = v3SkillFace(k.fam);
  const shared = k.who && k.who !== 'Du';
  return (
    <button onClick={() => !draft && !on && onToggle(k.name)} disabled={draft || on} className="hbl-v3row" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', boxSizing: 'border-box', padding: '7px 9px', borderRadius: 10, border: 'none', background: sel ? 'var(--blue-08)' : 'transparent', font: 'inherit', textAlign: 'left', cursor: draft ? 'default' : 'pointer', opacity: draft ? 0.5 : 1 }}>
      <span style={{ width: 27, height: 27, borderRadius: 9, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: on ? f.bg : 'var(--paper-2)', border: '1px solid ' + (on ? 'transparent' : 'var(--line-2)'), color: on ? f.fg : 'var(--ink-30)', transition: 'background .14s,color .14s' }}><I3 n={f.ic} s={14} /></span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: on ? 'var(--ink)' : 'var(--ink-80)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.title}</span>
        <span className="hbl-num" style={{ display: 'block', fontSize: 10.5, color: 'var(--ink-45)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.name} · {k.v}{shared ? ' · delt av ' + k.who : ''}</span>
      </span>
      {draft ? <span className="hbl-chip" style={{ fontSize: 10, flex: '0 0 auto' }}>kladd</span>
        : on ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 600, flex: '0 0 auto', color: 'var(--ok)' }}><I3 n="check" s={13} /> lagt til</span>
        : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 600, flex: '0 0 auto', color: 'var(--blue)' }}><I3 n="plus" s={13} /> legg til</span>}
    </button>
  );
}

function V3SkillMenu({ skills, onToggle, onStudio, cmd, q }) {
  const [find, setFind] = React.useState('');
  const query = ((cmd ? q : find) || '').toLowerCase();
  const all = v3AllSkills().filter((k) => !query || (k.title + ' ' + k.name).toLowerCase().indexOf(query) > -1);
  const groups = [['Dokument', 'dokument', 'lager et dokument i filene'], ['Generell', 'generell', 'styrer hvordan svarene leses']];
  return (
    <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, width: 340, maxHeight: 396, overflowY: 'auto', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, boxShadow: 'var(--e3)', padding: 6, zIndex: 30, animation: 'hblFadeUp .16s ease both' }}>
      {cmd ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 9px 8px' }}>
          <span className="hbl-micro">Legg til skill</span>
          <span className="hbl-num" style={{ fontSize: 11.5, color: 'var(--ink-45)' }}>/{q}</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 10.5, color: 'var(--ink-30)' }}>{all.length} treff</span>
        </div>
      ) : (
        <div style={{ padding: '7px 9px 8px' }}>
          <div className="hbl-micro">Legg til skill</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-45)', lineHeight: 1.45, margin: '4px 0 9px' }}>Det du legger til gjelder bare denne samtalen, og kjører på dine egne data.</div>
          <div className="hbl-input hbl-search" style={{ padding: '6px 9px', gap: 8 }}>
            <I3 n="search" s={15} />
            <input value={find} onChange={(e) => setFind(e.target.value)} placeholder="Finn en skill …" style={{ border: 'none', background: 'transparent', outline: 'none', font: 'inherit', fontSize: 12.5, width: '100%' }} />
          </div>
        </div>
      )}
      {groups.map(([label, fam, note]) => {
        const rows = all.filter((k) => k.fam === fam);
        if (!rows.length) return null;
        return (
          <div key={fam} style={{ marginTop: 2 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, padding: '6px 9px 3px' }}>
              <span className="hbl-micro" style={{ color: 'var(--ink-60)' }}>{label}</span>
              <span style={{ fontSize: 10.5, color: 'var(--ink-30)' }}>{note}</span>
            </div>
            {rows.map((k, i) => <V3SkillRow key={k.name} k={k} cmd={cmd} sel={cmd && fam === 'dokument' && i === 0} on={skills.indexOf(k.name) > -1} onToggle={onToggle} />)}
          </div>
        );
      })}
      {!all.length && <div style={{ padding: '10px 9px 12px', fontSize: 12, color: 'var(--ink-45)' }}>Ingen skill heter det. Du kan lage en i Studio.</div>}
      <div className="hbl-rule" style={{ margin: '7px 0 3px' }} />
      <button className="hbl-menuitem" onClick={onStudio}><I3 n="sliders" s={17} /> Lag eller endre i Studio</button>
    </div>
  );
}

/* AI-foreslått variant: skillene tilbys i transkriptet */
function V3SkillOffer({ names, skills, onToggle }) {
  return (
    <div className="hbl-card" style={{ padding: '5px 15px 11px', animation: 'hblFadeUp .3s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0 4px' }}>
        <span className="hbl-micro" style={{ color: 'var(--ink-45)' }}>Skiller som passer her</span>
      </div>
      {names.map((n, i) => {
        const k = v3Skill(n);
        if (!k) return null;
        const on = skills.indexOf(n) > -1;
        const f = v3SkillFace(k.fam);
        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderTop: i ? '1px solid var(--line-2)' : '1px solid var(--line-2)' }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: on ? f.bg : 'var(--paper-2)', border: '1px solid ' + (on ? 'transparent' : 'var(--line-2)'), color: on ? f.fg : 'var(--ink-45)' }}><I3 n={f.ic} s={15} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{k.title}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-45)', marginTop: 2, lineHeight: 1.4 }}>{k.desc}</div>
            </div>
            <button onClick={() => onToggle(n)} className={'hbl-btn hbl-btn--sm' + (on ? '' : ' hbl-btn--primary')} style={{ flex: '0 0 auto' }}>
              {on ? <><I3 n="check" s={14} /> Lagt til</> : 'Legg til'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function V3SkillTags({ skills, onToggle }) {
  if (!skills.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 8 }}>
      <span className="hbl-micro" style={{ color: 'var(--ink-30)', marginRight: 1 }}>Lagt til</span>
      {skills.map((n) => {
        const k = v3Skill(n);
        if (!k) return null;
        const f = v3SkillFace(k.fam);
        return (
          <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 6px 4px 9px', borderRadius: 999, background: 'var(--paper)', border: '1px solid var(--line-2)', boxShadow: 'var(--e1)', fontSize: 11.5, fontWeight: 600, color: 'var(--ink-80)' }}>
            <span style={{ color: f.fg, display: 'grid' }}><I3 n={f.ic} s={13} /></span>
            {k.title}
            <button onClick={() => onToggle(n)} title="Fjern" style={{ width: 17, height: 17, borderRadius: 999, border: 'none', background: 'transparent', color: 'var(--ink-30)', cursor: 'pointer', display: 'grid', placeItems: 'center', padding: 0 }}><I3 n="x" s={11} /></button>
          </span>
        );
      })}
    </div>
  );
}

/* ── composer: plus menu after the chat has started ── */
function V3Composer({ narrow, onUpload, onRecord, placeholder, recording, skills, onToggleSkill, onStudio, skillVar }) {
  const [menu, setMenu] = React.useState(null);   // null | 'add' | 'skill'
  const [val, setVal] = React.useState('');
  const ref = React.useRef(null);
  const on = skills || [];
  const btn = skillVar !== 'AI foreslår' && skillVar !== 'Skråstrek';
  const slash = skillVar === 'Skråstrek' && val.charAt(0) === '/';
  React.useEffect(() => {
    if (!menu) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenu(null); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [menu]);
  const items = [['Last opp filer', 'upload', onUpload], ['Ta bilde', 'image', onUpload], ['Spill inn', 'mic', onRecord]];
  return (
    <div style={{ borderTop: '1px solid var(--line)', background: 'var(--paper-3)', padding: narrow ? '12px 20px 16px' : '12px 26px 18px' }}>
      <div style={{ maxWidth: narrow ? '100%' : 760, margin: '0 auto', position: 'relative' }} ref={ref}>
        <V3SkillTags skills={on} onToggle={onToggleSkill} />
        {menu === 'add' && (
          <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, width: 232, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, boxShadow: 'var(--e3)', padding: 6, zIndex: 30, animation: 'hblFadeUp .16s ease both' }}>
            {items.map(([t, ic, fn]) => (
              <button key={t} onClick={() => { setMenu(null); fn(); }} className="hbl-menuitem"><I3 n={ic} s={17} /> {t}</button>
            ))}
          </div>
        )}
        {menu === 'skill' && !slash && <V3SkillMenu skills={on} onToggle={(n) => { setMenu(null); onToggleSkill(n); }} onStudio={() => { setMenu(null); onStudio && onStudio(); }} />}
        {slash && <V3SkillMenu cmd q={val.slice(1)} skills={on} onToggle={(n) => { onToggleSkill(n); setVal(''); }} onStudio={() => { setVal(''); onStudio && onStudio(); }} />}
        <div className="hbl-input hbl-search" style={{ padding: '8px 10px 8px 8px', alignItems: 'center', gap: 6 }}>
          <button onClick={() => setMenu((m) => (m === 'add' ? null : 'add'))} title="Legg til" style={{ width: 32, height: 32, borderRadius: 10, flex: '0 0 auto', border: '1px solid var(--line-2)', background: menu === 'add' ? 'var(--blue-12)' : 'var(--paper-2)', color: menu === 'add' ? 'var(--blue)' : 'var(--ink-80)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><I3 n="plus" s={17} /></button>
          {btn && (
            <button onClick={() => setMenu((m) => (m === 'skill' ? null : 'skill'))} title="Skiller" style={{ height: 32, padding: on.length ? '0 10px 0 8px' : '0 8px', borderRadius: 10, flex: '0 0 auto', border: '1px solid var(--line-2)', background: menu === 'skill' ? 'var(--blue-12)' : 'var(--paper-2)', color: menu === 'skill' ? 'var(--blue)' : 'var(--ink-80)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, font: 'inherit', fontSize: 12.5, fontWeight: 600 }}>
              <I3 n="sliders" s={17} />{on.length ? <span className="hbl-num">{on.length}</span> : null}
            </button>
          )}
          <button onClick={onRecord} title="Spill inn" style={{ width: 32, height: 32, borderRadius: 10, flex: '0 0 auto', border: '1px solid ' + (recording ? 'rgba(218,87,64,0.34)' : 'var(--line-2)'), background: recording ? 'rgba(218,87,64,0.10)' : 'var(--paper-2)', color: recording ? 'var(--alert)' : 'var(--ink-80)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><I3 n="mic" s={17} /></button>
          <input value={val} onChange={(e) => setVal(e.target.value)} placeholder={skillVar === 'Skråstrek' ? 'Skriv / for skiller, eller spør …' : (placeholder || 'Spør, eller legg inn noe …')} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 14, width: '100%', padding: '0 4px' }} />
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(180deg,#757DEE,var(--blue))', display: 'grid', placeItems: 'center', color: '#fff', flex: '0 0 auto', cursor: 'pointer' }}><I3 n="send" s={16} /></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { V3User, V3Bot, V3Text, V3Tool, V3FileCard, V3Markers, V3Artifact, V3Build, V3Suggest, V3Drops, V3Composer, V3SkillMenu, V3SkillOffer, v3AllSkills, v3Skill, v3SkillFace });
