/* Healable v3 — right pane. It holds the preview AND the file tree behind it. */
const IP = window.HIcon;

function V3Paper({ doc }) {
  const Sec = ({ t, children }) => (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-45)', marginBottom: 7 }}>{t}</div>
      {children}
    </div>
  );
  return (
    <div className="hbl-card" style={{ width: 'min(660px,100%)', background: '#fff', padding: '46px 56px 54px', boxShadow: '0 30px 70px -34px rgba(35,25,22,0.45)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, paddingBottom: 15, borderBottom: '2px solid var(--ink)' }}>
        <div>
          <div className="hbl-display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>Pasientnotat</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-45)', marginTop: 3 }}>Lipidpanel · sammenstilt fra samtalen</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 10.5, color: 'var(--ink-60)', lineHeight: 1.65 }}>
          <div style={{ fontWeight: 700, color: 'var(--ink)' }}>Emma Moen</div>
          <div>BankID-verifisert</div>
          <div className="hbl-num">04.08.2026 · v{doc.v}</div>
        </div>
      </div>
      <Sec t="Sammendrag"><p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--ink-80)' }}>{doc.summary}</p></Sec>
      <Sec t="Funn">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.75, color: 'var(--ink-80)' }}>
          {doc.findings.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </Sec>
      {doc.tail && (
        <Sec t={doc.tail.title}>
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.75, color: 'var(--ink-80)' }}>
            {doc.tail.items.map((f) => <li key={f}>{f}</li>)}
          </ol>
        </Sec>
      )}
      <Sec t="Kilde"><div style={{ fontSize: 13, color: 'var(--ink-60)' }}>Lipidpanel_23-25.pdf · s. 1–2 · hver verdi peker tilbake til kilden</div></Sec>
    </div>
  );
}

/* the file tree — the pane flips between this and one file at a time */
function V3Files({ locked, onOpenDoc, onOpenFile, active, tree, onRename, onDelete, onUpload, pending }) {
  const [open, setOpen] = React.useState({ Blodprøver: true, Dokumenter: true, Lydopptak: false });
  const [editing, setEditing] = React.useState(null);   // "folder/name"
  const [draft, setDraft] = React.useState('');
  const [confirm, setConfirm] = React.useState(null);
  const count = tree.reduce((n, f) => n + f.files.length, 0);

  const rename = (fi, name) => {
    const nm = draft.trim();
    setEditing(null);
    if (!nm || nm === name) return;
    onRename(fi, name, nm);
  };
  const remove = (fi, name) => { setConfirm(null); onDelete(fi, name); };
  const upload = (fi) => { setOpen((o) => ({ ...o, [tree[fi].name]: true })); onUpload(fi); };

  const iconFor = (k) => (k === 'audio' ? 'waveform' : k === 'csv' ? 'bars' : 'filetext');

  return (
    <div style={{ width: 'min(660px,100%)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="hbl-card" style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <span style={{ width: 30, height: 30, borderRadius: 9, flex: '0 0 auto', display: 'grid', placeItems: 'center', background: locked ? 'var(--ok-12)' : 'var(--paper-2)', color: locked ? 'var(--ok)' : 'var(--ink-45)' }}><IP n={locked ? 'lock' : 'lockopen'} s={16} /></span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="hbl-display" style={{ fontSize: 14.5, fontWeight: 500 }}>{locked ? window.V3_CHAT.vault : 'Filer i denne samtalen'}</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-45)' }}>{locked ? 'Kryptert hvelv · 2 samtaler' : 'Midlertidig · forsvinner med samtalen'} · <span className="hbl-num">{count}</span> filer</div>
        </div>
        <button onClick={() => upload(0)} className="hbl-btn hbl-btn--sm" style={{ flex: '0 0 auto' }}><IP n="upload" s={15} /> Last opp</button>
      </div>
      <div className="hbl-card" style={{ padding: 8 }}>
        {tree.map((folder, fi) => (
          <div key={folder.name}>
            <div className="hbl-v3row" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 10 }}>
              <button onClick={() => setOpen((o) => ({ ...o, [folder.name]: !o[folder.name] }))} style={{ display: 'flex', alignItems: 'center', gap: 9, flex: 1, minWidth: 0, border: 'none', background: 'transparent', cursor: 'pointer', font: 'inherit', padding: 0, textAlign: 'left' }}>
                <span style={{ color: 'var(--ink-30)', display: 'grid', flex: '0 0 auto', transform: open[folder.name] ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform .16s' }}><IP n="chevDown" s={14} /></span>
                <span style={{ color: 'var(--ink-45)', display: 'grid', flex: '0 0 auto' }}><IP n={folder.icon} s={15} /></span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{folder.name}</span>
              </button>
              <button onClick={() => upload(fi)} title={'Last opp til ' + folder.name} className="hbl-v3act" style={{ flex: '0 0 auto' }}><IP n="upload" s={14} /></button>
              <span className="hbl-num" style={{ fontSize: 11, color: 'var(--ink-30)', flex: '0 0 auto', width: 12, textAlign: 'right' }}>{folder.files.length}</span>
            </div>
            {open[folder.name] && folder.files.map((f) => {
              const on = active === f.name;
              const key = folder.name + '/' + f.name;
              const isEdit = editing === key;
              const isConfirm = confirm === key;
              return (
                <div key={key} className="hbl-v3row" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px 9px 36px', borderRadius: 10, background: isConfirm ? 'var(--alert-12)' : on ? 'var(--blue-12)' : 'transparent', animation: f.fresh ? 'hblFadeUp .24s ease both' : undefined }}>
                  <span style={{ color: isConfirm ? '#A5321F' : on ? 'var(--blue)' : 'var(--ink-30)', display: 'grid', flex: '0 0 auto' }}><IP n={iconFor(f.kind)} s={15} /></span>
                  {isEdit ? (
                    <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') rename(fi, f.name); if (e.key === 'Escape') setEditing(null); }}
                      onBlur={() => rename(fi, f.name)}
                      style={{ flex: 1, minWidth: 0, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: 'var(--ink)', background: 'var(--paper)', border: '1.5px solid var(--blue)', borderRadius: 7, padding: '5px 8px', outline: 'none' }} />
                  ) : (
                    <button onClick={() => (f.kind === 'doc' ? onOpenDoc() : onOpenFile(f.name))}
                      style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', cursor: 'pointer', font: 'inherit', padding: 0, textAlign: 'left' }}>
                      <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</span>
                      <span style={{ display: 'block', fontSize: 11, color: isConfirm ? '#A5321F' : 'var(--ink-45)', marginTop: 1 }}>{isConfirm ? 'Slett denne filen?' : f.name === 'Lipidpanel_23-25.pdf' && pending !== undefined ? (pending ? 'PDF · 5 analytter · ' + pending + ' til gjennomgang' : 'PDF · 5 analytter · alle bekreftet') : f.meta}</span>
                    </button>
                  )}
                  {isConfirm ? (
                    <span style={{ display: 'flex', gap: 6, flex: '0 0 auto' }}>
                      <button onClick={() => setConfirm(null)} className="hbl-btn hbl-btn--ghost hbl-btn--sm">Avbryt</button>
                      <button onClick={() => remove(fi, f.name)} className="hbl-btn hbl-btn--sm" style={{ color: '#A5321F', borderColor: 'rgba(192,64,44,0.34)' }}><IP n="trash" s={14} /> Slett</button>
                    </span>
                  ) : !isEdit && (
                    <span style={{ display: 'flex', gap: 4, flex: '0 0 auto' }}>
                      <button onClick={() => { setDraft(f.name); setEditing(key); }} title="Gi nytt navn" className="hbl-v3act"><IP n="edit" s={14} /></button>
                      <button onClick={() => setConfirm(key)} title="Slett" className="hbl-v3act hbl-v3act--alert"><IP n="trash" s={14} /></button>
                    </span>
                  )}
                </div>
              );
            })}
            {open[folder.name] && folder.files.length === 0 && (
              <div style={{ padding: '9px 10px 9px 36px', fontSize: 12, color: 'var(--ink-45)' }}>Tom mappe</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'var(--ink-45)', padding: '0 4px' }}>
        <IP n="shield" s={13} /> {locked ? 'Kryptert per hvelv · låses opp med Face ID' : 'Ligger i det lukkede datarommet så lenge samtalen lever'}
      </div>
    </div>
  );
}

/* the pane itself: flips between the tree and one open file */
function V3Pane({ view, file, tab, onTab, reviewed, onConfirm, focus, doc, locked, onClose, onShowFiles, onOpenDoc, onOpenFile, onWide, wide, tree, onRename, onDelete, onUpload, pending }) {
  const isFiles = view === 'files';
  const isFile = view === 'file';
  const title = isFile ? file : 'Pasientnotat.docx';
  const crumbRoot = locked ? window.V3_CHAT.vault : 'Midlertidig samtale';
  const meta = isFile && window.V3_FILES[file];
  const rawLabel = !meta ? 'Kilde' : meta.raw === 'pdf' ? 'Rå PDF' : meta.raw === 'audio' ? 'Opptak' : 'Rå fil';
  return (
    <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', background: 'radial-gradient(120% 80% at 50% 0%, #F1ECDF, #E4DDCB)', borderLeft: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 16px', borderBottom: '1px solid var(--line)', background: 'rgba(252,250,244,0.72)', backdropFilter: 'blur(8px)' }}>
        {isFiles ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, color: 'var(--ink-80)', padding: '5px 3px' }}>
            <IP n="folder" s={15} /> Filer <span style={{ fontWeight: 500, color: 'var(--ink-45)' }}>· {crumbRoot}</span>
          </span>
        ) : (
          <button onClick={onShowFiles} title="Tilbake til filene" className="hbl-btn hbl-btn--ghost hbl-btn--sm" style={{ flex: '0 0 auto', gap: 6, paddingLeft: 7 }}>
            <IP n="chevL" s={15} /> Filer
          </button>
        )}
        {!isFiles && <>
          <span className="hbl-num" style={{ fontSize: 11.5, color: 'var(--ink-80)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{title}</span>
          {view === 'doc' && <span className="hbl-chip" style={{ fontSize: 10.5, flex: '0 0 auto' }}>v{doc.v}</span>}
        </>}
        <div style={{ flex: 1, minWidth: 4 }} />
        {isFile && meta && (
          <div className="hbl-seg hbl-v3seg" style={{ flex: '0 0 auto' }}>
            <button className={tab === 'kilde' ? 'is-active' : ''} onClick={() => onTab('kilde')}><IP n={meta.raw === 'audio' ? 'waveform' : meta.raw === 'pdf' ? 'filetext' : 'bars'} s={14} />{rawLabel}</button>
            <button className={tab === 'uttrekk' ? 'is-active' : ''} onClick={() => onTab('uttrekk')}>
              <IP n="layers" s={14} />Uttrekk
              {meta.ex.kind === 'labs' && pending > 0 && <span className="hbl-num" style={{ marginLeft: 5, minWidth: 15, height: 15, padding: '0 3px', borderRadius: 999, background: 'var(--blue)', color: '#fff', fontSize: 9.5, fontWeight: 700, display: 'inline-grid', placeItems: 'center' }}>{pending}</span>}
            </button>
          </div>
        )}
        {view === 'doc' && <button className="hbl-btn hbl-btn--ghost hbl-btn--sm" title="Last ned .docx" style={{ flex: '0 0 auto' }}><IP n="download" s={15} /> .docx</button>}
        {view === 'doc' && <button className="hbl-btn hbl-btn--ghost hbl-btn--sm" title="Del" style={{ flex: '0 0 auto', padding: 8 }}><IP n="share" s={15} /></button>}
        <button onClick={onWide} className="hbl-btn hbl-btn--ghost hbl-btn--sm" style={{ padding: 8, flex: '0 0 auto' }} title={wide ? 'Vis samtalen' : 'Bredere'}><IP n={wide ? 'columns' : 'maximize'} s={15} /></button>
        <button onClick={onClose} title="Lukk" style={{ border: 'none', background: 'transparent', color: 'var(--ink-45)', cursor: 'pointer', display: 'grid', padding: 5, flex: '0 0 auto' }}><IP n="x" s={18} /></button>
      </div>
      <div key={isFiles ? 'files' : isFile ? 'f:' + file + tab : 'doc'} style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: isFile && tab === 'uttrekk' ? 'stretch' : 'center', padding: isFile && tab === 'uttrekk' ? '20px 22px 40px' : '28px 26px 40px', animation: 'hblFlip .26s ease both' }}>
        {isFiles ? <V3Files locked={locked} active={file} pending={pending} onOpenDoc={onOpenDoc} onOpenFile={onOpenFile} tree={tree} onRename={onRename} onDelete={onDelete} onUpload={onUpload} />
          : isFile ? <window.V3FileView name={file} tab={tab} onTab={onTab} reviewed={reviewed} onConfirm={onConfirm} focus={focus} />
          : <V3Paper doc={doc} />}
      </div>
      {view === 'doc' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderTop: '1px solid var(--line)', background: 'rgba(252,250,244,0.72)', backdropFilter: 'blur(8px)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--ink-45)', flex: 1 }}><IP n="quote" s={14} /> Kun lesing — be om endringer i samtalen, så skriver jeg en ny versjon.</span>
          <span className="hbl-num" style={{ fontSize: 11, color: 'var(--ink-45)' }}>1 side</span>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { V3Pane, V3Files, V3Paper });
