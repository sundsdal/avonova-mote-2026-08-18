(function(){
/* Healable v3 — filvisning i høyre pane: fanene Kilde og Uttrekk, pluss gjennomgang av flaggede verdier.
   Rå PDF og kildeutsnitt kommer fra screens/LabReport.jsx (LabReportPage / PdfCutout). */
const IX = window.HIcon;

/* ── Kilde ── */
function V3RawPdf() {
  const Page = window.LabReportPage;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 720,
      maxWidth: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(74,52,38,0.06), 0 40px 80px -34px rgba(74,52,38,0.4), inset 0 0 0 1px rgba(35,25,22,0.07)'
    }
  }, /*#__PURE__*/React.createElement(Page, null));
}
function V3RawText({
  name,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      width: 'min(660px,100%)',
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      borderBottom: '1px solid var(--line-2)',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "bars",
    s: 15
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, "\xB7 r\xE5 kildevisning")), /*#__PURE__*/React.createElement("pre", {
    className: "hbl-num",
    style: {
      margin: 0,
      padding: '16px 20px',
      fontSize: 12.5,
      lineHeight: 1.75,
      color: 'var(--ink-80)',
      whiteSpace: 'pre-wrap'
    }
  }, text));
}
function V3RawAudio({
  name,
  dur
}) {
  const bars = React.useMemo(() => Array.from({
    length: 72
  }, (_, i) => 0.2 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 0.8), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      width: 'min(600px,100%)',
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      borderBottom: '1px solid var(--line-2)',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "mic",
    s: 15
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, "\xB7 r\xE5tt opptak")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: 'var(--ink)',
      color: 'var(--oat)',
      display: 'grid',
      placeItems: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "play",
    s: 19
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2.5,
      height: 48,
      flex: 1,
      minWidth: 0
    }
  }, bars.map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: h * 100 + '%',
      borderRadius: 2,
      background: i < 22 ? 'var(--ink-80)' : 'var(--line)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "hbl-num",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 12,
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "00:00"), /*#__PURE__*/React.createElement("span", null, dur, " \xB7 m4a \xB7 ligger ur\xF8rt"))));
}

/* ── gjennomgang av én flagget verdi: utsnitt fra kilden + rediger + bekreft ── */
function V3Review({
  def,
  edit,
  onConfirm,
  hasNext
}) {
  const [val, setVal] = React.useState(edit && edit.value || def.value);
  const [unit, setUnit] = React.useState(edit && edit.unit || def.unit);
  const same = val === def.value && unit === def.unit;
  const inp = dirty => ({
    width: '100%',
    fontFamily: "'Space Grotesk',sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--ink)',
    background: 'var(--paper)',
    border: '1.5px solid ' + (dirty ? 'rgba(198,136,31,0.55)' : 'var(--line)'),
    borderRadius: 8,
    padding: '8px 11px',
    outline: 'none'
  });
  const lbl = {
    fontSize: 9.5,
    fontWeight: 700,
    letterSpacing: '.12em',
    textTransform: 'uppercase',
    color: 'var(--ink-45)',
    marginBottom: 5
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '2px 14px 14px',
      background: 'var(--blue-08)',
      borderBottom: '1px solid var(--line-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(window.PdfCutout, {
    row: def.row,
    w: 620,
    h: 118,
    zoom: 1,
    label: def.page,
    source: def.file
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '9px 12px',
      borderRadius: 9,
      background: 'var(--warn-12, rgba(198,136,31,0.1))',
      border: '1px solid rgba(198,136,31,0.28)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#9C6A12',
      flex: '0 0 auto',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "alert",
    s: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-80)'
    }
  }, def.reason)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.8fr 1fr auto',
      gap: 10,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Verdi"), /*#__PURE__*/React.createElement("input", {
    value: val,
    onChange: e => setVal(e.target.value),
    className: "hbl-num",
    style: inp(!same)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Enhet"), /*#__PURE__*/React.createElement("input", {
    value: unit,
    onChange: e => setUnit(e.target.value),
    style: inp(!same)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Referanse"), /*#__PURE__*/React.createElement("div", {
    className: "hbl-num",
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--ink-60)',
      background: 'var(--paper-2)',
      border: '1px solid var(--line-2)',
      borderRadius: 8,
      padding: '9px 11px'
    }
  }, def.ref)), /*#__PURE__*/React.createElement("button", {
    onClick: () => onConfirm(def.id, val, unit),
    className: "hbl-btn hbl-btn--primary hbl-btn--sm",
    style: {
      height: 38
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "check",
    s: 16
  }), " ", hasNext ? 'Bekreft og neste' : 'Bekreft verdi')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 11.5,
      fontWeight: 600,
      color: same ? 'var(--ink-45)' : '#9C6A12'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: same ? 'quote' : 'edit',
    s: 13
  }), same ? 'Samsvarer med utsnittet fra kilden' : 'Endret fra «' + def.value + ' ' + def.unit + '»')));
}

/* ── Uttrekk: analytt-tabell med gjennomgang i rad ── */
function V3Labs({
  rows,
  reviewed,
  onConfirm,
  focus
}) {
  const [open, setOpen] = React.useState(focus || null);
  React.useEffect(() => {
    if (focus) setOpen(focus);
  }, [focus]);
  const defs = window.V3_REVIEW_DEFS;
  const pending = defs.filter(d => !reviewed[d.id]);
  const cells = '1.5fr 0.9fr 0.6fr 0.8fr 0.6fr 1.1fr';
  const next = id => {
    const rest = pending.filter(d => d.id !== id);
    setOpen(rest.length ? rest[0].id : null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, pending.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 15px',
      borderRadius: 12,
      background: 'var(--blue-08)',
      border: '1px solid rgba(70,101,216,0.24)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: 'var(--blue-12)',
      color: 'var(--blue)',
      display: 'grid',
      placeItems: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "checklist",
    s: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, pending.length, " ", pending.length === 1 ? 'verdi trenger' : 'verdier trenger', " gjennomgang"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-60)'
    }
  }, defs.length - pending.length, " av ", defs.length, " bekreftet \xB7 dokumenter oppdateres n\xE5r alt er bekreftet")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(pending[0].id),
    className: "hbl-btn hbl-btn--primary hbl-btn--sm",
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "checklist",
    s: 15
  }), " G\xE5 gjennom")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '12px 15px',
      borderRadius: 12,
      background: 'var(--ok-12)',
      border: '1px solid rgba(46,156,114,0.28)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ok)',
      flex: '0 0 auto',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "check",
    s: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-80)'
    }
  }, /*#__PURE__*/React.createElement("b", null, "Alle verdier bekreftet."), " Uttrekket er klart til bruk i dokumenter.")), /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: cells,
      gap: 12,
      padding: '10px 16px',
      background: 'var(--paper-2)',
      borderBottom: '1px solid var(--line)'
    }
  }, ['Analytt', 'Kode (NPU)', 'Enhet', 'Referanse', 'Verdi', 'Status'].map(h => /*#__PURE__*/React.createElement("div", {
    key: h,
    className: "hbl-micro"
  }, h))), rows.map((r, i) => {
    const def = r.review ? defs.find(d => d.id === r.review.id) : null;
    const ed = def ? reviewed[def.id] : null;
    const isOpen = def && open === def.id;
    const val = ed ? ed.value : r.val;
    const unit = ed ? ed.unit : r.unit;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: r.code
    }, /*#__PURE__*/React.createElement("div", {
      onClick: def ? () => setOpen(isOpen ? null : def.id) : undefined,
      style: {
        display: 'grid',
        gridTemplateColumns: cells,
        gap: 12,
        padding: '12px 16px',
        alignItems: 'center',
        cursor: def ? 'pointer' : 'default',
        borderBottom: i < rows.length - 1 && !isOpen ? '1px solid var(--line-2)' : 'none',
        background: isOpen ? 'var(--blue-12)' : def && !ed ? 'var(--blue-08)' : 'transparent',
        transition: 'background .14s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        minWidth: 0
      }
    }, def && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-45)',
        display: 'grid',
        flex: '0 0 auto',
        transform: isOpen ? 'rotate(90deg)' : 'none',
        transition: 'transform .16s'
      }
    }, /*#__PURE__*/React.createElement(IX, {
      n: "chevR",
      s: 12
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, r.a)), /*#__PURE__*/React.createElement("div", {
      className: "hbl-num",
      style: {
        fontSize: 11.5,
        color: 'var(--ink-45)'
      }
    }, r.code), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--ink-60)'
      }
    }, unit), /*#__PURE__*/React.createElement("div", {
      className: "hbl-num",
      style: {
        fontSize: 12,
        color: 'var(--ink-60)'
      }
    }, r.ref), /*#__PURE__*/React.createElement("div", {
      className: "hbl-num",
      style: {
        fontSize: 14.5,
        fontWeight: 600,
        color: r.out ? 'var(--alert)' : 'var(--ink)'
      }
    }, val), /*#__PURE__*/React.createElement("div", null, def && !ed ? /*#__PURE__*/React.createElement("span", {
      className: "hbl-chip",
      style: {
        fontSize: 10.5,
        color: 'var(--blue)',
        borderColor: 'rgba(70,101,216,0.3)',
        background: 'var(--blue-08)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "hbl-dot",
      style: {
        background: 'var(--blue)'
      }
    }), isOpen ? 'Går gjennom' : 'Til gjennomgang') : def ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11.5,
        fontWeight: 600,
        color: 'var(--ok)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "hbl-dot",
      style: {
        background: 'var(--ok)'
      }
    }), "Bekreftet") : /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11,
        color: 'var(--ink-45)',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "hbl-dot",
      style: {
        background: 'var(--ok)'
      }
    }), "H\xF8y \xB7 ", r.page))), isOpen && /*#__PURE__*/React.createElement(V3Review, {
      def: def,
      edit: ed,
      hasNext: pending.length > 1,
      onConfirm: (id, v, u) => {
        onConfirm(id, v, u);
        next(id);
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "quote",
    s: 13
  }), " Hver verdi beholder kildehenvisning til raden den kom fra. Ingenting sl\xE5s sammen i det stille."));
}
function V3Series({
  cols,
  rows,
  more
}) {
  const g = '1.3fr 1fr 1fr 1fr';
  return /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      width: '100%',
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: g,
      gap: 12,
      padding: '10px 16px',
      background: 'var(--paper-2)',
      borderBottom: '1px solid var(--line)'
    }
  }, cols.map(h => /*#__PURE__*/React.createElement("div", {
    key: h,
    className: "hbl-micro"
  }, h))), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: g,
      gap: 12,
      padding: '11px 16px',
      borderBottom: i < rows.length - 1 ? '1px solid var(--line-2)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hbl-num",
    style: {
      fontSize: 12.5,
      color: 'var(--ink-60)'
    }
  }, r[0]), r.slice(1).map((c, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    className: "hbl-num",
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 16px',
      fontSize: 11.5,
      color: 'var(--ink-45)',
      background: 'var(--paper-2)'
    }
  }, "+ ", more));
}
const V3SPK = {
  L: {
    name: 'Lege',
    c: 'var(--blue)',
    bg: 'var(--blue-12)'
  },
  P: {
    name: 'Pasient',
    c: 'var(--ok)',
    bg: 'var(--ok-12)'
  }
};
function V3Transcript({
  ex
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '12px 15px',
      borderRadius: 12,
      background: 'var(--ok-12)',
      border: '1px solid rgba(46,156,114,0.28)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ok)',
      flex: '0 0 auto',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "mic",
    s: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-80)'
    }
  }, /*#__PURE__*/React.createElement("b", null, "Transkribert ved opplasting."), " ", ex.lang, " \xB7 ", ex.dur, " \xB7 talere skilt automatisk.")), /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, ex.segments.map(([t, who, text], i) => {
    const sp = V3SPK[who];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: '52px 84px minmax(0,1fr)',
        gap: 12,
        padding: '12px 16px',
        alignItems: 'start',
        borderBottom: i < ex.segments.length - 1 ? '1px solid var(--line-2)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hbl-num",
      style: {
        fontSize: 11.5,
        color: 'var(--ink-45)',
        paddingTop: 2
      }
    }, t), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11.5,
        fontWeight: 700,
        color: sp.c
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 6,
        background: sp.bg,
        display: 'grid',
        placeItems: 'center',
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement(IX, {
      n: "user",
      s: 12
    })), sp.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        lineHeight: 1.6,
        color: 'var(--ink-80)',
        textWrap: 'pretty'
      }
    }, text));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "quote",
    s: 13
  }), " Tidsstemplene peker tilbake til lydsporet. Originalfilen ligger ur\xF8rt."));
}

/* ── filvisningen: fanene Kilde / Uttrekk ── */
function V3FileView({
  name,
  tab,
  onTab,
  reviewed,
  onConfirm,
  focus
}) {
  const f = window.V3_FILES[name];
  if (!f) return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-45)'
    }
  }, "Ingen forh\xE5ndsvisning for denne filen enn\xE5.");
  if (tab === 'kilde') {
    return f.raw === 'pdf' ? /*#__PURE__*/React.createElement(V3RawPdf, null) : f.raw === 'audio' ? /*#__PURE__*/React.createElement(V3RawAudio, {
      name: name,
      dur: f.ex.dur
    }) : /*#__PURE__*/React.createElement(V3RawText, {
      name: name,
      text: window.V3_CSV_RAW
    });
  }
  const ex = f.ex;
  return ex.kind === 'labs' ? /*#__PURE__*/React.createElement(V3Labs, {
    rows: ex.rows,
    reviewed: reviewed,
    onConfirm: onConfirm,
    focus: focus
  }) : ex.kind === 'series' ? /*#__PURE__*/React.createElement(V3Series, {
    cols: ex.cols,
    rows: ex.rows,
    more: ex.more
  }) : /*#__PURE__*/React.createElement(V3Transcript, {
    ex: ex
  });
}

/* ── gjennomgangsboks — under den midlertidige tråden og inne i hvert hvelv ── */
function V3ReviewBox({
  pending,
  of,
  where,
  onClick,
  mini
}) {
  const done = !pending;
  if (mini) return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: done ? 'Alt bekreftet' : pending + ' til gjennomgang',
    style: {
      position: 'relative',
      width: 34,
      height: 34,
      borderRadius: 11,
      border: '1px solid ' + (done ? 'var(--line-2)' : 'rgba(70,101,216,0.3)'),
      background: done ? 'var(--paper-2)' : 'var(--blue-08)',
      color: done ? 'var(--ink-30)' : 'var(--blue)',
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "checklist",
    s: 16
  }), !done && /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 15,
      height: 15,
      padding: '0 3px',
      borderRadius: 999,
      background: 'var(--blue)',
      color: '#fff',
      fontSize: 9.5,
      fontWeight: 700,
      display: 'grid',
      placeItems: 'center'
    }
  }, pending));
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "hbl-v3row",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      width: '100%',
      textAlign: 'left',
      font: 'inherit',
      cursor: 'pointer',
      padding: '7px 9px',
      marginTop: 3,
      borderRadius: 9,
      background: done ? 'var(--paper-2)' : 'var(--blue-08)',
      border: '1px solid ' + (done ? 'var(--line-2)' : 'rgba(70,101,216,0.24)')
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 7,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: done ? 'var(--paper)' : 'var(--blue-12)',
      color: done ? 'var(--ok)' : 'var(--blue)'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: done ? 'check' : 'checklist',
    s: 13
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11.5,
      fontWeight: 700,
      color: done ? 'var(--ink-60)' : 'var(--ink)'
    }
  }, done ? 'Alt bekreftet' : pending + (pending === 1 ? ' verdi til gjennomgang' : ' verdier til gjennomgang')), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 10.5,
      color: 'var(--ink-45)',
      marginTop: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, done ? of + ' verdier i uttrekket' : where || of - pending + ' av ' + of + ' bekreftet')), !done && /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      flex: '0 0 auto',
      minWidth: 17,
      height: 17,
      padding: '0 4px',
      borderRadius: 999,
      background: 'var(--blue)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      display: 'grid',
      placeItems: 'center'
    }
  }, pending));
}

/* nudge i transkriptet — tar deg rett i uttrekket med første flaggede rad åpen */
function V3ReviewNudge({
  pending,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "hbl-v3row",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      textAlign: 'left',
      font: 'inherit',
      cursor: 'pointer',
      padding: '11px 13px',
      borderRadius: 12,
      background: 'var(--blue-08)',
      border: '1px solid rgba(70,101,216,0.24)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--blue-12)',
      color: 'var(--blue)'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "checklist",
    s: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink)'
    }
  }, pending, " verdier trenger et blikk fra deg"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11.5,
      color: 'var(--ink-60)',
      marginTop: 1
    }
  }, "Utskriften var utydelig p\xE5 to rader. Jeg viser utsnittet fra kilden.")), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      color: 'var(--blue)',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(IX, {
    n: "chevR",
    s: 16
  })));
}
Object.assign(window, {
  V3FileView,
  V3ReviewBox,
  V3ReviewNudge,
  V3Labs,
  V3Review
});
})();
