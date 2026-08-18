(function(){
/* Healable v3 — chat atoms, drop zones, composer, artifact card. */
const I3 = window.HIcon;
function V3User({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-end',
      maxWidth: '80%',
      background: 'var(--blue)',
      color: '#fff',
      padding: '11px 15px',
      borderRadius: '18px 18px 5px 18px',
      fontSize: 14,
      lineHeight: 1.5,
      boxShadow: '0 10px 24px -14px rgba(86,94,214,0.75)'
    }
  }, children);
}
function V3Bot({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      maxWidth: '96%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--blue-12)',
      color: 'var(--blue)',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "sparkle",
    s: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      paddingTop: 3
    }
  }, children));
}
function V3Text({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--ink-80)'
    }
  }, children);
}
function V3Tool({
  label,
  out,
  rows
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 10,
      border: '1px solid var(--line-2)',
      background: 'var(--paper-2)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      textAlign: 'left',
      padding: '8px 12px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      font: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 21,
      height: 21,
      borderRadius: 7,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--ok-12)',
      color: 'var(--ok)'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "check",
    s: 12
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--ink-80)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label), out && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: 'var(--ink-45)',
      flex: '0 0 auto'
    }
  }, out), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-30)',
      flex: '0 0 auto',
      display: 'grid',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform .2s'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "chevDown",
    s: 14
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--line-2)',
      padding: '9px 14px 11px 44px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      background: 'var(--paper)'
    }
  }, (rows || []).map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 8,
      fontSize: 12,
      color: 'var(--ink-60)',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-30)',
      flex: '0 0 auto',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: r[0],
    s: 12
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      textWrap: 'pretty'
    }
  }, r[1] && /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--ink-80)',
      fontWeight: 600
    }
  }, r[1], " \xB7 "), r[2])))));
}

/* the file that entered the chat */
function V3FileCard({
  onOpen
}) {
  const F = window.V3_FILE;
  return /*#__PURE__*/React.createElement("div", {
    className: "hbl-card hbl-rowlink",
    onClick: onOpen,
    style: {
      alignSelf: 'flex-start',
      maxWidth: 380,
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      padding: 11,
      borderRadius: 14,
      cursor: 'pointer',
      animation: 'hblFadeUp .3s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 56,
      borderRadius: 8,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--paper-2)',
      border: '1px solid var(--line-2)',
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "filetext",
    s: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hbl-display",
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, F.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)',
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-num"
  }, F.size), " \xB7 ", F.pages), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 6,
      fontSize: 11,
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "lock",
    s: 12
  }), " Kryptert ved ankomst")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-30)',
      flex: '0 0 auto',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "zoom",
    s: 17
  })));
}

/* the analyte read-out */
function V3Markers() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      padding: '4px 16px 10px',
      animation: 'hblFadeUp .3s ease both'
    }
  }, window.V3_MARKERS.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(72px,96px) minmax(0,auto)',
      alignItems: 'center',
      gap: 8,
      padding: '11px 0',
      borderTop: i ? '1px solid var(--line-2)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink-80)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, m.name), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: m.state === 'ok' ? 'var(--ink)' : 'var(--' + m.state + ')'
    }
  }, m.v), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, m.unit)), /*#__PURE__*/React.createElement("span", {
    className: 'hbl-chip hbl-chip--' + m.state,
    style: {
      fontSize: 10.5,
      justifySelf: 'end'
    }
  }, m.ref))));
}

/* the document artifact — click to open the preview pane */
function V3Artifact({
  doc,
  active,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    className: "hbl-card hbl-rowlink",
    style: {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      padding: '13px 15px',
      borderRadius: 14,
      cursor: 'pointer',
      textAlign: 'left',
      font: 'inherit',
      border: '1px solid ' + (active ? 'var(--blue)' : 'var(--line)'),
      animation: 'hblFadeUp .3s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 46,
      borderRadius: 7,
      flex: '0 0 auto',
      background: '#fff',
      border: '1px solid var(--line)',
      boxShadow: 'var(--e1)',
      padding: 5,
      display: 'flex',
      flexDirection: 'column',
      gap: 2.5,
      justifyContent: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: 3,
      width: '80%',
      background: 'var(--ink-30)',
      borderRadius: 2
    }
  }), [1, 2, 3, 4].map(k => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      height: 2,
      width: k === 4 ? '55%' : '100%',
      background: 'var(--line)',
      borderRadius: 2
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hbl-micro",
    style: {
      color: 'var(--ink-45)'
    }
  }, "Dokument \xB7 v", doc.v), /*#__PURE__*/React.createElement("div", {
    className: "hbl-display",
    style: {
      fontSize: 15,
      fontWeight: 500,
      marginTop: 2
    }
  }, "Pasientnotat \u2014 lipidpanel"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)',
      marginTop: 3
    }
  }, "1 side \xB7 ", doc.label, " \xB7 ", doc.when)), /*#__PURE__*/React.createElement("span", {
    className: "hbl-btn hbl-btn--sm",
    style: {
      flex: '0 0 auto',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "eye",
    s: 15
  }), " ", active ? 'Åpen' : 'Åpne'));
}
function V3Build({
  step
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-start',
      minWidth: 300,
      background: 'var(--paper)',
      border: '1px solid var(--line-2)',
      borderRadius: 14,
      boxShadow: 'var(--e1)',
      padding: '10px 16px'
    }
  }, window.V3_BUILD.map((t, i) => {
    const st = step > i ? 'done' : step === i ? 'active' : 'todo';
    return /*#__PURE__*/React.createElement("div", {
      key: t.label,
      style: {
        display: 'flex',
        gap: 11,
        alignItems: 'center',
        padding: '6px 0',
        opacity: st === 'todo' ? 0.4 : 1,
        transition: 'opacity .3s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 25,
        height: 25,
        borderRadius: 8,
        flex: '0 0 auto',
        display: 'grid',
        placeItems: 'center',
        background: st === 'done' ? 'var(--ok-12)' : st === 'active' ? 'var(--blue-12)' : 'var(--paper-2)',
        color: st === 'done' ? 'var(--ok)' : st === 'active' ? 'var(--blue)' : 'var(--ink-30)'
      }
    }, st === 'done' ? /*#__PURE__*/React.createElement(I3, {
      n: "check",
      s: 13
    }) : st === 'active' ? /*#__PURE__*/React.createElement("span", {
      className: "hbl-spin",
      style: {
        display: 'grid'
      }
    }, /*#__PURE__*/React.createElement(I3, {
      n: "refresh",
      s: 13
    })) : /*#__PURE__*/React.createElement(I3, {
      n: t.icon,
      s: 13
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        fontWeight: 600,
        color: st === 'todo' ? 'var(--ink-45)' : 'var(--ink)'
      }
    }, t.label));
  }));
}
function V3Suggest({
  items
}) {
  if (!items || !items.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      paddingTop: 2,
      animation: 'hblFadeUp .3s ease both'
    }
  }, items.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: s.onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '8px 14px',
      borderRadius: 999,
      font: 'inherit',
      cursor: 'pointer',
      fontSize: 12.5,
      fontWeight: 600,
      color: s.primary ? '#fff' : 'var(--ink-80)',
      background: s.primary ? 'linear-gradient(180deg,#757DEE,var(--blue))' : 'var(--paper)',
      border: '1px solid ' + (s.primary ? 'transparent' : 'var(--line-2)'),
      boxShadow: s.primary ? '0 10px 22px -14px rgba(86,94,214,0.8)' : 'var(--e1)'
    }
  }, s.icon && /*#__PURE__*/React.createElement(I3, {
    n: s.icon,
    s: 14
  }), s.label)));
}

/* ── empty state: big, clear drop zones ── */
function V3Drops({
  onUpload,
  onRecord,
  dense
}) {
  const zones = [['Last opp filer', 'upload', 'PDF, bilde, CSV — dra hit eller velg', onUpload], ['Spill inn', 'mic', 'Lyd blir transkribert automatisk', onRecord], ['Ta bilde', 'image', 'Kamera eller skann et ark', onUpload]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 12
    }
  }, zones.map(([t, ic, sub, fn]) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: fn,
    className: "hbl-v3drop",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 7,
      padding: dense ? '16px 16px 18px' : '20px 18px 22px',
      cursor: 'pointer',
      textAlign: 'left',
      font: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: 'var(--paper)',
      border: '1px solid var(--line-2)',
      color: 'var(--ink-80)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: ic,
    s: 20
  })), /*#__PURE__*/React.createElement("span", {
    className: "hbl-display",
    style: {
      fontSize: 15,
      fontWeight: 500,
      marginTop: 2
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)',
      lineHeight: 1.45
    }
  }, sub))));
}

/* ── skiller: slå på per samtale ── */
const v3AllSkills = () => [...(window.V3_DOC_SKILLS || []).map(k => ({
  ...k,
  fam: 'dokument'
})), ...(window.V3_GEN_SKILLS || []).map(k => ({
  ...k,
  fam: 'generell'
}))];
const v3Skill = name => v3AllSkills().find(k => k.name === name);
const v3SkillFace = fam => fam === 'dokument' ? {
  ic: 'filetext',
  fg: '#8C45BC',
  bg: 'var(--orchid-12)'
} : {
  ic: 'flask',
  fg: 'var(--blue)',
  bg: 'var(--blue-12)'
};
function V3SkillRow({
  k,
  on,
  onToggle,
  cmd,
  sel
}) {
  const draft = k.v === 'kladd';
  const f = v3SkillFace(k.fam);
  const shared = k.who && k.who !== 'Du';
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => !draft && !on && onToggle(k.name),
    disabled: draft || on,
    className: "hbl-v3row",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      boxSizing: 'border-box',
      padding: '7px 9px',
      borderRadius: 10,
      border: 'none',
      background: sel ? 'var(--blue-08)' : 'transparent',
      font: 'inherit',
      textAlign: 'left',
      cursor: draft ? 'default' : 'pointer',
      opacity: draft ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 27,
      height: 27,
      borderRadius: 9,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: on ? f.bg : 'var(--paper-2)',
      border: '1px solid ' + (on ? 'transparent' : 'var(--line-2)'),
      color: on ? f.fg : 'var(--ink-30)',
      transition: 'background .14s,color .14s'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: f.ic,
    s: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12.5,
      fontWeight: 600,
      color: on ? 'var(--ink)' : 'var(--ink-80)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, k.title), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      display: 'block',
      fontSize: 10.5,
      color: 'var(--ink-45)',
      marginTop: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, k.name, " \xB7 ", k.v, shared ? ' · delt av ' + k.who : '')), draft ? /*#__PURE__*/React.createElement("span", {
    className: "hbl-chip",
    style: {
      fontSize: 10,
      flex: '0 0 auto'
    }
  }, "kladd") : on ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11.5,
      fontWeight: 600,
      flex: '0 0 auto',
      color: 'var(--ok)'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "check",
    s: 13
  }), " lagt til") : /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11.5,
      fontWeight: 600,
      flex: '0 0 auto',
      color: 'var(--blue)'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "plus",
    s: 13
  }), " legg til"));
}
function V3SkillMenu({
  skills,
  onToggle,
  onStudio,
  cmd,
  q
}) {
  const [find, setFind] = React.useState('');
  const query = ((cmd ? q : find) || '').toLowerCase();
  const all = v3AllSkills().filter(k => !query || (k.title + ' ' + k.name).toLowerCase().indexOf(query) > -1);
  const groups = [['Dokument', 'dokument', 'lager et dokument i filene'], ['Generell', 'generell', 'styrer hvordan svarene leses']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: 0,
      width: 340,
      maxHeight: 396,
      overflowY: 'auto',
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      boxShadow: 'var(--e3)',
      padding: 6,
      zIndex: 30,
      animation: 'hblFadeUp .16s ease both'
    }
  }, cmd ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 9px 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-micro"
  }, "Legg til skill"), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)'
    }
  }, "/", q), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: 'var(--ink-30)'
    }
  }, all.length, " treff")) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '7px 9px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hbl-micro"
  }, "Legg til skill"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)',
      lineHeight: 1.45,
      margin: '4px 0 9px'
    }
  }, "Det du legger til gjelder bare denne samtalen, og kj\xF8rer p\xE5 dine egne data."), /*#__PURE__*/React.createElement("div", {
    className: "hbl-input hbl-search",
    style: {
      padding: '6px 9px',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "search",
    s: 15
  }), /*#__PURE__*/React.createElement("input", {
    value: find,
    onChange: e => setFind(e.target.value),
    placeholder: "Finn en skill \u2026",
    style: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      font: 'inherit',
      fontSize: 12.5,
      width: '100%'
    }
  }))), groups.map(([label, fam, note]) => {
    const rows = all.filter(k => k.fam === fam);
    if (!rows.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: fam,
      style: {
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 7,
        padding: '6px 9px 3px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "hbl-micro",
      style: {
        color: 'var(--ink-60)'
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10.5,
        color: 'var(--ink-30)'
      }
    }, note)), rows.map((k, i) => /*#__PURE__*/React.createElement(V3SkillRow, {
      key: k.name,
      k: k,
      cmd: cmd,
      sel: cmd && fam === 'dokument' && i === 0,
      on: skills.indexOf(k.name) > -1,
      onToggle: onToggle
    })));
  }), !all.length && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 9px 12px',
      fontSize: 12,
      color: 'var(--ink-45)'
    }
  }, "Ingen skill heter det. Du kan lage en i Studio."), /*#__PURE__*/React.createElement("div", {
    className: "hbl-rule",
    style: {
      margin: '7px 0 3px'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "hbl-menuitem",
    onClick: onStudio
  }, /*#__PURE__*/React.createElement(I3, {
    n: "sliders",
    s: 17
  }), " Lag eller endre i Studio"));
}

/* AI-foreslått variant: skillene tilbys i transkriptet */
function V3SkillOffer({
  names,
  skills,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hbl-card",
    style: {
      padding: '5px 15px 11px',
      animation: 'hblFadeUp .3s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-micro",
    style: {
      color: 'var(--ink-45)'
    }
  }, "Skiller som passer her")), names.map((n, i) => {
    const k = v3Skill(n);
    if (!k) return null;
    const on = skills.indexOf(n) > -1;
    const f = v3SkillFace(k.fam);
    return /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '10px 0',
        borderTop: i ? '1px solid var(--line-2)' : '1px solid var(--line-2)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 9,
        flex: '0 0 auto',
        display: 'grid',
        placeItems: 'center',
        background: on ? f.bg : 'var(--paper-2)',
        border: '1px solid ' + (on ? 'transparent' : 'var(--line-2)'),
        color: on ? f.fg : 'var(--ink-45)'
      }
    }, /*#__PURE__*/React.createElement(I3, {
      n: f.ic,
      s: 15
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--ink)'
      }
    }, k.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--ink-45)',
        marginTop: 2,
        lineHeight: 1.4
      }
    }, k.desc)), /*#__PURE__*/React.createElement("button", {
      onClick: () => onToggle(n),
      className: 'hbl-btn hbl-btn--sm' + (on ? '' : ' hbl-btn--primary'),
      style: {
        flex: '0 0 auto'
      }
    }, on ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(I3, {
      n: "check",
      s: 14
    }), " Lagt til") : 'Legg til'));
  }));
}
function V3SkillTags({
  skills,
  onToggle
}) {
  if (!skills.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 6,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-micro",
    style: {
      color: 'var(--ink-30)',
      marginRight: 1
    }
  }, "Lagt til"), skills.map(n => {
    const k = v3Skill(n);
    if (!k) return null;
    const f = v3SkillFace(k.fam);
    return /*#__PURE__*/React.createElement("span", {
      key: n,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 6px 4px 9px',
        borderRadius: 999,
        background: 'var(--paper)',
        border: '1px solid var(--line-2)',
        boxShadow: 'var(--e1)',
        fontSize: 11.5,
        fontWeight: 600,
        color: 'var(--ink-80)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: f.fg,
        display: 'grid'
      }
    }, /*#__PURE__*/React.createElement(I3, {
      n: f.ic,
      s: 13
    })), k.title, /*#__PURE__*/React.createElement("button", {
      onClick: () => onToggle(n),
      title: "Fjern",
      style: {
        width: 17,
        height: 17,
        borderRadius: 999,
        border: 'none',
        background: 'transparent',
        color: 'var(--ink-30)',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(I3, {
      n: "x",
      s: 11
    })));
  }));
}

/* ── composer: plus menu after the chat has started ── */
function V3Composer({
  narrow,
  onUpload,
  onRecord,
  placeholder,
  recording,
  skills,
  onToggleSkill,
  onStudio,
  skillVar
}) {
  const [menu, setMenu] = React.useState(null); // null | 'add' | 'skill'
  const [val, setVal] = React.useState('');
  const ref = React.useRef(null);
  const on = skills || [];
  const btn = skillVar !== 'AI foreslår' && skillVar !== 'Skråstrek';
  const slash = skillVar === 'Skråstrek' && val.charAt(0) === '/';
  React.useEffect(() => {
    if (!menu) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setMenu(null);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [menu]);
  const items = [['Last opp filer', 'upload', onUpload], ['Ta bilde', 'image', onUpload], ['Spill inn', 'mic', onRecord]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--line)',
      background: 'var(--paper-3)',
      padding: narrow ? '12px 20px 16px' : '12px 26px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: narrow ? '100%' : 760,
      margin: '0 auto',
      position: 'relative'
    },
    ref: ref
  }, /*#__PURE__*/React.createElement(V3SkillTags, {
    skills: on,
    onToggle: onToggleSkill
  }), menu === 'add' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: 0,
      width: 232,
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      boxShadow: 'var(--e3)',
      padding: 6,
      zIndex: 30,
      animation: 'hblFadeUp .16s ease both'
    }
  }, items.map(([t, ic, fn]) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => {
      setMenu(null);
      fn();
    },
    className: "hbl-menuitem"
  }, /*#__PURE__*/React.createElement(I3, {
    n: ic,
    s: 17
  }), " ", t))), menu === 'skill' && !slash && /*#__PURE__*/React.createElement(V3SkillMenu, {
    skills: on,
    onToggle: n => {
      setMenu(null);
      onToggleSkill(n);
    },
    onStudio: () => {
      setMenu(null);
      onStudio && onStudio();
    }
  }), slash && /*#__PURE__*/React.createElement(V3SkillMenu, {
    cmd: true,
    q: val.slice(1),
    skills: on,
    onToggle: n => {
      onToggleSkill(n);
      setVal('');
    },
    onStudio: () => {
      setVal('');
      onStudio && onStudio();
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hbl-input hbl-search",
    style: {
      padding: '8px 10px 8px 8px',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenu(m => m === 'add' ? null : 'add'),
    title: "Legg til",
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      flex: '0 0 auto',
      border: '1px solid var(--line-2)',
      background: menu === 'add' ? 'var(--blue-12)' : 'var(--paper-2)',
      color: menu === 'add' ? 'var(--blue)' : 'var(--ink-80)',
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "plus",
    s: 17
  })), btn && /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenu(m => m === 'skill' ? null : 'skill'),
    title: "Skiller",
    style: {
      height: 32,
      padding: on.length ? '0 10px 0 8px' : '0 8px',
      borderRadius: 10,
      flex: '0 0 auto',
      border: '1px solid var(--line-2)',
      background: menu === 'skill' ? 'var(--blue-12)' : 'var(--paper-2)',
      color: menu === 'skill' ? 'var(--blue)' : 'var(--ink-80)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'inherit',
      fontSize: 12.5,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "sliders",
    s: 17
  }), on.length ? /*#__PURE__*/React.createElement("span", {
    className: "hbl-num"
  }, on.length) : null), /*#__PURE__*/React.createElement("button", {
    onClick: onRecord,
    title: "Spill inn",
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      flex: '0 0 auto',
      border: '1px solid ' + (recording ? 'rgba(218,87,64,0.34)' : 'var(--line-2)'),
      background: recording ? 'rgba(218,87,64,0.10)' : 'var(--paper-2)',
      color: recording ? 'var(--alert)' : 'var(--ink-80)',
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "mic",
    s: 17
  })), /*#__PURE__*/React.createElement("input", {
    value: val,
    onChange: e => setVal(e.target.value),
    placeholder: skillVar === 'Skråstrek' ? 'Skriv / for skiller, eller spør …' : placeholder || 'Spør, eller legg inn noe …',
    style: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      fontSize: 14,
      width: '100%',
      padding: '0 4px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: 'linear-gradient(180deg,#757DEE,var(--blue))',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      flex: '0 0 auto',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(I3, {
    n: "send",
    s: 16
  })))));
}
Object.assign(window, {
  V3User,
  V3Bot,
  V3Text,
  V3Tool,
  V3FileCard,
  V3Markers,
  V3Artifact,
  V3Build,
  V3Suggest,
  V3Drops,
  V3Composer,
  V3SkillMenu,
  V3SkillOffer,
  v3AllSkills,
  v3Skill,
  v3SkillFace
});
})();
