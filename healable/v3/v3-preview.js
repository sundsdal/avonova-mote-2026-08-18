(function(){
/* Healable v3 — right pane. It holds the preview AND the file tree behind it. */
const IP = window.HIcon;
function V3Paper({
  doc
}) {
  const Sec = ({
    t,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-45)',
      marginBottom: 7
    }
  }, t), children);
  return /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      width: 'min(660px,100%)',
      background: '#fff',
      padding: '46px 56px 54px',
      boxShadow: '0 30px 70px -34px rgba(35,25,22,0.45)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 20,
      paddingBottom: 15,
      borderBottom: '2px solid var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hbl-display",
    style: {
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: '-0.01em'
    }
  }, "Pasientnotat"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)',
      marginTop: 3
    }
  }, "Lipidpanel \xB7 sammenstilt fra samtalen")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 10.5,
      color: 'var(--ink-60)',
      lineHeight: 1.65
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--ink)'
    }
  }, "Emma Moen"), /*#__PURE__*/React.createElement("div", null, "BankID-verifisert"), /*#__PURE__*/React.createElement("div", {
    className: "hbl-num"
  }, "04.08.2026 \xB7 v", doc.v))), /*#__PURE__*/React.createElement(Sec, {
    t: "Sammendrag"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.65,
      color: 'var(--ink-80)'
    }
  }, doc.summary)), /*#__PURE__*/React.createElement(Sec, {
    t: "Funn"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      fontSize: 14,
      lineHeight: 1.75,
      color: 'var(--ink-80)'
    }
  }, doc.findings.map(f => /*#__PURE__*/React.createElement("li", {
    key: f
  }, f)))), doc.tail && /*#__PURE__*/React.createElement(Sec, {
    t: doc.tail.title
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 18,
      fontSize: 14,
      lineHeight: 1.75,
      color: 'var(--ink-80)'
    }
  }, doc.tail.items.map(f => /*#__PURE__*/React.createElement("li", {
    key: f
  }, f)))), /*#__PURE__*/React.createElement(Sec, {
    t: "Kilde"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-60)'
    }
  }, "Lipidpanel_23-25.pdf \xB7 s. 1\u20132 \xB7 hver verdi peker tilbake til kilden")));
}

/* the file tree — the pane flips between this and one file at a time */
function V3Files({
  locked,
  onOpenDoc,
  onOpenFile,
  active,
  tree,
  onRename,
  onDelete,
  onUpload,
  pending
}) {
  const [open, setOpen] = React.useState({
    Blodprøver: true,
    Dokumenter: true,
    Lydopptak: false
  });
  const [editing, setEditing] = React.useState(null); // "folder/name"
  const [draft, setDraft] = React.useState('');
  const [confirm, setConfirm] = React.useState(null);
  const count = tree.reduce((n, f) => n + f.files.length, 0);
  const rename = (fi, name) => {
    const nm = draft.trim();
    setEditing(null);
    if (!nm || nm === name) return;
    onRename(fi, name, nm);
  };
  const remove = (fi, name) => {
    setConfirm(null);
    onDelete(fi, name);
  };
  const upload = fi => {
    setOpen(o => ({
      ...o,
      [tree[fi].name]: true
    }));
    onUpload(fi);
  };
  const iconFor = k => k === 'audio' ? 'waveform' : k === 'csv' ? 'bars' : 'filetext';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'min(660px,100%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      padding: '13px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: locked ? 'var(--ok-12)' : 'var(--paper-2)',
      color: locked ? 'var(--ok)' : 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: locked ? 'lock' : 'lockopen',
    s: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hbl-display",
    style: {
      fontSize: 14.5,
      fontWeight: 500
    }
  }, locked ? window.V3_CHAT.vault : 'Filer i denne samtalen'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, locked ? 'Kryptert hvelv · 2 samtaler' : 'Midlertidig · forsvinner med samtalen', " \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "hbl-num"
  }, count), " filer")), /*#__PURE__*/React.createElement("button", {
    onClick: () => upload(0),
    className: "hbl-btn hbl-btn--sm",
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "upload",
    s: 15
  }), " Last opp")), /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      padding: 8
    }
  }, tree.map((folder, fi) => /*#__PURE__*/React.createElement("div", {
    key: folder.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "hbl-v3row",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '9px 10px',
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => ({
      ...o,
      [folder.name]: !o[folder.name]
    })),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      flex: 1,
      minWidth: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      font: 'inherit',
      padding: 0,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-30)',
      display: 'grid',
      flex: '0 0 auto',
      transform: open[folder.name] ? 'rotate(0deg)' : 'rotate(-90deg)',
      transition: 'transform .16s'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "chevDown",
    s: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-45)',
      display: 'grid',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: folder.icon,
    s: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 600
    }
  }, folder.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => upload(fi),
    title: 'Last opp til ' + folder.name,
    className: "hbl-v3act",
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "upload",
    s: 14
  })), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      fontSize: 11,
      color: 'var(--ink-30)',
      flex: '0 0 auto',
      width: 12,
      textAlign: 'right'
    }
  }, folder.files.length)), open[folder.name] && folder.files.map(f => {
    const on = active === f.name;
    const key = folder.name + '/' + f.name;
    const isEdit = editing === key;
    const isConfirm = confirm === key;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "hbl-v3row",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px 9px 36px',
        borderRadius: 10,
        background: isConfirm ? 'var(--alert-12)' : on ? 'var(--blue-12)' : 'transparent',
        animation: f.fresh ? 'hblFadeUp .24s ease both' : undefined
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: isConfirm ? '#A5321F' : on ? 'var(--blue)' : 'var(--ink-30)',
        display: 'grid',
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement(IP, {
      n: iconFor(f.kind),
      s: 15
    })), isEdit ? /*#__PURE__*/React.createElement("input", {
      autoFocus: true,
      value: draft,
      onChange: e => setDraft(e.target.value),
      onKeyDown: e => {
        if (e.key === 'Enter') rename(fi, f.name);
        if (e.key === 'Escape') setEditing(null);
      },
      onBlur: () => rename(fi, f.name),
      style: {
        flex: 1,
        minWidth: 0,
        fontFamily: 'inherit',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--ink)',
        background: 'var(--paper)',
        border: '1.5px solid var(--blue)',
        borderRadius: 7,
        padding: '5px 8px',
        outline: 'none'
      }
    }) : /*#__PURE__*/React.createElement("button", {
      onClick: () => f.kind === 'doc' ? onOpenDoc() : onOpenFile(f.name),
      style: {
        flex: 1,
        minWidth: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        font: 'inherit',
        padding: 0,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--ink)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, f.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 11,
        color: isConfirm ? '#A5321F' : 'var(--ink-45)',
        marginTop: 1
      }
    }, isConfirm ? 'Slett denne filen?' : f.name === 'Lipidpanel_23-25.pdf' && pending !== undefined ? pending ? 'PDF · 5 analytter · ' + pending + ' til gjennomgang' : 'PDF · 5 analytter · alle bekreftet' : f.meta)), isConfirm ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 6,
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setConfirm(null),
      className: "hbl-btn hbl-btn--ghost hbl-btn--sm"
    }, "Avbryt"), /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(fi, f.name),
      className: "hbl-btn hbl-btn--sm",
      style: {
        color: '#A5321F',
        borderColor: 'rgba(192,64,44,0.34)'
      }
    }, /*#__PURE__*/React.createElement(IP, {
      n: "trash",
      s: 14
    }), " Slett")) : !isEdit && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 4,
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setDraft(f.name);
        setEditing(key);
      },
      title: "Gi nytt navn",
      className: "hbl-v3act"
    }, /*#__PURE__*/React.createElement(IP, {
      n: "edit",
      s: 14
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => setConfirm(key),
      title: "Slett",
      className: "hbl-v3act hbl-v3act--alert"
    }, /*#__PURE__*/React.createElement(IP, {
      n: "trash",
      s: 14
    }))));
  }), open[folder.name] && folder.files.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '9px 10px 9px 36px',
      fontSize: 12,
      color: 'var(--ink-45)'
    }
  }, "Tom mappe")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 11.5,
      color: 'var(--ink-45)',
      padding: '0 4px'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "shield",
    s: 13
  }), " ", locked ? 'Kryptert per hvelv · låses opp med Face ID' : 'Ligger i det lukkede datarommet så lenge samtalen lever'));
}

/* the pane itself: flips between the tree and one open file */
function V3Pane({
  view,
  file,
  tab,
  onTab,
  reviewed,
  onConfirm,
  focus,
  doc,
  locked,
  onClose,
  onShowFiles,
  onOpenDoc,
  onOpenFile,
  onWide,
  wide,
  tree,
  onRename,
  onDelete,
  onUpload,
  pending
}) {
  const isFiles = view === 'files';
  const isFile = view === 'file';
  const title = isFile ? file : 'Pasientnotat.docx';
  const crumbRoot = locked ? window.V3_CHAT.vault : 'Midlertidig samtale';
  const meta = isFile && window.V3_FILES[file];
  const rawLabel = !meta ? 'Kilde' : meta.raw === 'pdf' ? 'Rå PDF' : meta.raw === 'audio' ? 'Opptak' : 'Rå fil';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 0',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'radial-gradient(120% 80% at 50% 0%, #F1ECDF, #E4DDCB)',
      borderLeft: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '9px 16px',
      borderBottom: '1px solid var(--line)',
      background: 'rgba(252,250,244,0.72)',
      backdropFilter: 'blur(8px)'
    }
  }, isFiles ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--ink-80)',
      padding: '5px 3px'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "folder",
    s: 15
  }), " Filer ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      color: 'var(--ink-45)'
    }
  }, "\xB7 ", crumbRoot)) : /*#__PURE__*/React.createElement("button", {
    onClick: onShowFiles,
    title: "Tilbake til filene",
    className: "hbl-btn hbl-btn--ghost hbl-btn--sm",
    style: {
      flex: '0 0 auto',
      gap: 6,
      paddingLeft: 7
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "chevL",
    s: 15
  }), " Filer"), !isFiles && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      fontSize: 11.5,
      color: 'var(--ink-80)',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0
    }
  }, title), view === 'doc' && /*#__PURE__*/React.createElement("span", {
    className: "hbl-chip",
    style: {
      fontSize: 10.5,
      flex: '0 0 auto'
    }
  }, "v", doc.v)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 4
    }
  }), isFile && meta && /*#__PURE__*/React.createElement("div", {
    className: "hbl-seg hbl-v3seg",
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === 'kilde' ? 'is-active' : '',
    onClick: () => onTab('kilde')
  }, /*#__PURE__*/React.createElement(IP, {
    n: meta.raw === 'audio' ? 'waveform' : meta.raw === 'pdf' ? 'filetext' : 'bars',
    s: 14
  }), rawLabel), /*#__PURE__*/React.createElement("button", {
    className: tab === 'uttrekk' ? 'is-active' : '',
    onClick: () => onTab('uttrekk')
  }, /*#__PURE__*/React.createElement(IP, {
    n: "layers",
    s: 14
  }), "Uttrekk", meta.ex.kind === 'labs' && pending > 0 && /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      marginLeft: 5,
      minWidth: 15,
      height: 15,
      padding: '0 3px',
      borderRadius: 999,
      background: 'var(--blue)',
      color: '#fff',
      fontSize: 9.5,
      fontWeight: 700,
      display: 'inline-grid',
      placeItems: 'center'
    }
  }, pending))), view === 'doc' && /*#__PURE__*/React.createElement("button", {
    className: "hbl-btn hbl-btn--ghost hbl-btn--sm",
    title: "Last ned .docx",
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "download",
    s: 15
  }), " .docx"), view === 'doc' && /*#__PURE__*/React.createElement("button", {
    className: "hbl-btn hbl-btn--ghost hbl-btn--sm",
    title: "Del",
    style: {
      flex: '0 0 auto',
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "share",
    s: 15
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onWide,
    className: "hbl-btn hbl-btn--ghost hbl-btn--sm",
    style: {
      padding: 8,
      flex: '0 0 auto'
    },
    title: wide ? 'Vis samtalen' : 'Bredere'
  }, /*#__PURE__*/React.createElement(IP, {
    n: wide ? 'columns' : 'maximize',
    s: 15
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    title: "Lukk",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--ink-45)',
      cursor: 'pointer',
      display: 'grid',
      padding: 5,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "x",
    s: 18
  }))), /*#__PURE__*/React.createElement("div", {
    key: isFiles ? 'files' : isFile ? 'f:' + file + tab : 'doc',
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: isFile && tab === 'uttrekk' ? 'stretch' : 'center',
      padding: isFile && tab === 'uttrekk' ? '20px 22px 40px' : '28px 26px 40px',
      animation: 'hblFlip .26s ease both'
    }
  }, isFiles ? /*#__PURE__*/React.createElement(V3Files, {
    locked: locked,
    active: file,
    pending: pending,
    onOpenDoc: onOpenDoc,
    onOpenFile: onOpenFile,
    tree: tree,
    onRename: onRename,
    onDelete: onDelete,
    onUpload: onUpload
  }) : isFile ? /*#__PURE__*/React.createElement(window.V3FileView, {
    name: file,
    tab: tab,
    onTab: onTab,
    reviewed: reviewed,
    onConfirm: onConfirm,
    focus: focus
  }) : /*#__PURE__*/React.createElement(V3Paper, {
    doc: doc
  })), view === 'doc' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 20px',
      borderTop: '1px solid var(--line)',
      background: 'rgba(252,250,244,0.72)',
      backdropFilter: 'blur(8px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 11.5,
      color: 'var(--ink-45)',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(IP, {
    n: "quote",
    s: 14
  }), " Kun lesing \u2014 be om endringer i samtalen, s\xE5 skriver jeg en ny versjon."), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      fontSize: 11,
      color: 'var(--ink-45)'
    }
  }, "1 side")));
}
Object.assign(window, {
  V3Pane,
  V3Files,
  V3Paper
});
})();
