(function(){
/* Healable v3 — left rail. Temp chat in an open, dashed frame; each vault in a sealed frame. One vault unlocked at a time. */
const IR = window.HIcon;
function V3Countdown({
  mins,
  compact
}) {
  const h = Math.floor(mins / 60),
    m = mins % 60;
  return /*#__PURE__*/React.createElement("span", {
    title: "Midlertidig samtale \u2014 slettes n\xE5r tiden er ute",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      flex: '0 0 auto',
      padding: compact ? '1px 6px' : '2px 8px',
      borderRadius: 999,
      background: 'var(--paper-2)',
      border: '1px solid var(--line-2)',
      color: 'var(--ink-45)',
      fontSize: compact ? 10 : 11,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "clock",
    s: compact ? 10 : 12
  }), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num"
  }, h, "t ", m, "m"));
}
function V3Row({
  title,
  sub,
  on,
  icon,
  chip,
  rec,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "hbl-rowlink",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      width: '100%',
      textAlign: 'left',
      font: 'inherit',
      cursor: 'pointer',
      border: 'none',
      padding: '8px 10px',
      borderRadius: 9,
      marginBottom: 1,
      background: on ? 'var(--blue-12)' : 'transparent'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      color: on ? 'var(--blue)' : 'var(--ink-30)',
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: icon,
    s: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13.5,
      fontWeight: 600,
      color: on ? 'var(--ink)' : 'var(--ink-80)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11.5,
      color: 'var(--ink-45)',
      marginTop: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, sub)), rec && /*#__PURE__*/React.createElement("span", {
    className: "hbl-recdot",
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--alert)',
      flex: '0 0 auto'
    }
  }), chip);
}

/* recording strip — under the temp chat row, or on the vault frame when the recording lives in a vault */
function V3RecBar({
  rec,
  title,
  where,
  onGo,
  onStop,
  mini
}) {
  const time = Math.floor(rec.secs / 60) + ':' + String(rec.secs % 60).padStart(2, '0');
  if (mini) return /*#__PURE__*/React.createElement("button", {
    onClick: onGo,
    title: 'Spiller inn · ' + title,
    style: {
      width: 38,
      borderRadius: 11,
      border: '1px solid rgba(218,87,64,0.34)',
      background: 'var(--alert-12)',
      cursor: 'pointer',
      font: 'inherit',
      padding: '7px 0',
      display: 'grid',
      justifyItems: 'center',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-recdot",
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'var(--alert)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      fontSize: 9.5,
      fontWeight: 700,
      color: '#B23E2C'
    }
  }, time));
  return /*#__PURE__*/React.createElement("div", {
    onClick: onGo,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '7px 9px 7px 10px',
      borderRadius: 9,
      background: 'var(--alert-12)',
      border: '1px solid rgba(192,64,44,0.26)',
      cursor: 'pointer',
      animation: 'hblFadeUp .2s ease both'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-recdot",
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--alert)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: '#A5321F'
    }
  }, "Spiller inn"), where && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11,
      color: 'var(--ink-60)',
      marginTop: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, where)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: 12,
      flex: '0 0 auto'
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "hbl-wavebar",
    style: {
      width: 2.5,
      background: 'var(--alert)',
      borderRadius: 2,
      animationDelay: i * 0.07 + 's'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--ink)',
      flex: '0 0 auto'
    }
  }, time), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onStop();
    },
    title: "Stopp og lagre",
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 22,
      height: 22,
      borderRadius: 7,
      border: '1px solid rgba(192,64,44,0.3)',
      background: 'var(--paper)',
      color: '#A5321F',
      cursor: 'pointer',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: '#A5321F',
      display: 'inline-block'
    }
  })));
}

/* one vault = one framed group. Sealed (collapsed) or unlocked (open). Only one can be open. */
function V3VaultFrame({
  vault,
  open,
  activeId,
  onPick,
  onOpen,
  onLock,
  rec,
  recChat,
  onGoRec,
  onStopRec,
  onReview
}) {
  const [hov, setHov] = React.useState(false);
  const recHere = rec && vault.chats.some(c => c.id === rec.chat);
  const time = rec ? Math.floor(rec.secs / 60) + ':' + String(rec.secs % 60).padStart(2, '0') : '';
  if (!open) return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      textAlign: 'left',
      font: 'inherit',
      cursor: 'pointer',
      padding: '10px 11px',
      borderRadius: 12,
      background: hov ? 'var(--paper)' : 'var(--paper-2)',
      border: '1px solid ' + (hov ? 'var(--line)' : 'var(--line-2)'),
      boxShadow: hov ? 'var(--e1)' : 'none',
      transition: 'background .14s, border-color .14s, box-shadow .14s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--paper-3)',
      border: '1px solid var(--line-2)',
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "lock",
    s: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-display",
    style: {
      display: 'block',
      fontSize: 13.5,
      fontWeight: 500,
      color: 'var(--ink-60)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, vault.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11,
      color: 'var(--ink-30)',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", null, vault.chats.length, " samtaler \xB7 l\xE5st"), recHere && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      color: '#A5321F',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-recdot",
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: 'var(--alert)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num"
  }, time)))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      fontSize: 11.5,
      fontWeight: 600,
      color: hov ? 'var(--blue)' : 'var(--ink-30)'
    }
  }, hov ? 'Lås opp' : vault.factor)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8,
      borderRadius: 12,
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      boxShadow: 'var(--e2)',
      padding: 5,
      animation: 'hblFadeUp .2s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '6px 6px 7px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--ok-12)',
      color: 'var(--ok)'
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "lockopen",
    s: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-display",
    style: {
      display: 'block',
      fontSize: 13.5,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, vault.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '.02em',
      color: 'var(--ok)',
      marginTop: 1
    }
  }, "\xC5pen \xB7 ", vault.factor)), /*#__PURE__*/React.createElement("button", {
    onClick: onLock,
    title: "L\xE5s hvelvet",
    className: "hbl-btn hbl-btn--ghost hbl-btn--sm",
    style: {
      padding: 6,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "lock",
    s: 14
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--line-2)',
      margin: '0 2px 5px'
    }
  }), vault.chats.map(c => /*#__PURE__*/React.createElement(V3Row, {
    key: c.id,
    title: c.title,
    sub: c.sub,
    icon: "chat",
    on: activeId === c.id,
    onClick: () => onPick(c.id)
  })), vault.review && /*#__PURE__*/React.createElement(window.V3ReviewBox, {
    pending: vault.review.pending,
    of: vault.review.of,
    where: vault.review.where,
    onClick: onReview
  }), /*#__PURE__*/React.createElement("button", {
    className: "hbl-rowlink",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      font: 'inherit',
      padding: '8px 10px',
      borderRadius: 9,
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "plus",
    s: 14
  }), " Ny samtale i hvelvet"), recHere && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(V3RecBar, {
    rec: rec,
    title: recChat,
    where: recChat,
    onGo: onGoRec,
    onStop: onStopRec
  })));
}
function V3Rail({
  mini,
  tempOpen,
  activeId,
  onPick,
  onNew,
  onToggle,
  onStudio,
  mins,
  rec,
  recTitle,
  vaults,
  openVault,
  onOpenVault,
  onLockVault,
  onGoRec,
  onStopRec,
  pending,
  reviewOf,
  onReview
}) {
  const openV = vaults.find(v => v.id === openVault);
  if (mini) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 58,
        flex: '0 0 auto',
        borderRight: '1px solid var(--line)',
        background: 'var(--paper-3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '13px 0',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onToggle,
      title: "Vis samtaler",
      className: "hbl-btn hbl-btn--ghost hbl-btn--sm",
      style: {
        padding: 8
      }
    }, /*#__PURE__*/React.createElement(IR, {
      n: "sidebar",
      s: 16
    })), /*#__PURE__*/React.createElement("button", {
      onClick: onNew,
      title: "Ny samtale",
      style: {
        width: 34,
        height: 34,
        borderRadius: 11,
        border: 'none',
        cursor: 'pointer',
        background: 'var(--blue-12)',
        color: 'var(--blue)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(IR, {
      n: "plus",
      s: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 24,
        height: 1,
        background: 'var(--line-2)'
      }
    }), tempOpen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: () => onPick('temp1'),
      title: "Midlertidig samtale",
      className: "hbl-rowlink",
      style: {
        position: 'relative',
        width: 34,
        height: 34,
        borderRadius: 11,
        border: '1.5px dashed ' + (activeId === 'temp1' ? 'var(--blue)' : 'var(--line)'),
        cursor: 'pointer',
        background: activeId === 'temp1' ? 'var(--paper)' : 'transparent',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--ink-80)'
      }
    }, /*#__PURE__*/React.createElement(IR, {
      n: "clock",
      s: 16
    })), pending > 0 && /*#__PURE__*/React.createElement(window.V3ReviewBox, {
      mini: true,
      pending: pending,
      of: reviewOf,
      onClick: onReview
    }), rec && rec.chat === 'temp1' && /*#__PURE__*/React.createElement(V3RecBar, {
      rec: rec,
      title: recTitle,
      mini: true,
      onGo: onGoRec,
      onStop: onStopRec
    })), openV && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      title: openV.name + ' — åpent',
      style: {
        width: 34,
        height: 34,
        borderRadius: 11,
        display: 'grid',
        placeItems: 'center',
        background: 'var(--ok-12)',
        color: 'var(--ok)'
      }
    }, /*#__PURE__*/React.createElement(IR, {
      n: "lockopen",
      s: 16
    })), openV.chats.map(c => /*#__PURE__*/React.createElement("button", {
      key: c.id,
      onClick: () => onPick(c.id),
      title: c.title,
      className: "hbl-rowlink",
      style: {
        width: 34,
        height: 34,
        borderRadius: 11,
        border: '1.5px solid ' + (activeId === c.id ? 'var(--blue)' : 'transparent'),
        cursor: 'pointer',
        background: activeId === c.id ? 'var(--paper)' : 'transparent',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--ink-80)'
      }
    }, /*#__PURE__*/React.createElement(IR, {
      n: "chat",
      s: 16
    }))), rec && openV.chats.some(c => c.id === rec.chat) && /*#__PURE__*/React.createElement(V3RecBar, {
      rec: rec,
      title: recTitle,
      mini: true,
      onGo: onGoRec,
      onStop: onStopRec
    })), vaults.filter(v => v.id !== openVault).map(v => /*#__PURE__*/React.createElement("button", {
      key: v.id,
      onClick: () => onOpenVault(v.id),
      title: v.name + ' — låst',
      style: {
        width: 34,
        height: 34,
        borderRadius: 11,
        border: '1px solid var(--line-2)',
        background: 'var(--paper-2)',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--ink-45)'
      }
    }, /*#__PURE__*/React.createElement(IR, {
      n: "lock",
      s: 15
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 8
      }
    }), /*#__PURE__*/React.createElement(V3Account, {
      mini: true,
      placement: "bottom",
      onStudio: onStudio
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 286,
      flex: '0 0 auto',
      borderRight: '1px solid var(--line)',
      background: 'var(--paper-3)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 13px 11px'
    }
  }, /*#__PURE__*/React.createElement(window.HMark, {
    size: 27
  }), /*#__PURE__*/React.createElement("span", {
    className: "hbl-display",
    style: {
      fontSize: 15.5,
      fontWeight: 500,
      flex: 1
    }
  }, "Healable"), /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    title: "Skjul",
    className: "hbl-btn hbl-btn--ghost hbl-btn--sm",
    style: {
      padding: 7
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "sidebar",
    s: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 13px 11px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onNew,
    className: "hbl-btn hbl-btn--primary hbl-btn--block hbl-btn--sm",
    style: {
      justifyContent: 'flex-start',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "plus",
    s: 16
  }), " Ny samtale")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      padding: '0 11px 14px'
    }
  }, tempOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      borderRadius: 12,
      border: '1.5px dashed var(--line)',
      background: 'transparent',
      padding: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '5px 6px 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hbl-micro",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "clock",
    s: 12
  }), " Midlertidig"), /*#__PURE__*/React.createElement(V3Countdown, {
    mins: mins,
    compact: true
  })), /*#__PURE__*/React.createElement(V3Row, {
    title: window.V3_CHAT.title,
    sub: "Ikke lagret \xB7 ul\xE5st",
    on: activeId === 'temp1',
    onClick: () => onPick('temp1')
  }), reviewOf > 0 && /*#__PURE__*/React.createElement(window.V3ReviewBox, {
    pending: pending,
    of: reviewOf,
    onClick: onReview
  }), rec && rec.chat === 'temp1' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement(V3RecBar, {
    rec: rec,
    title: recTitle,
    onGo: onGoRec,
    onStop: onStopRec
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ink-45)',
      lineHeight: 1.5,
      padding: '5px 7px 4px'
    }
  }, "Slettes n\xE5r tiden er ute. L\xE5s den for \xE5 beholde den som hvelv.")), /*#__PURE__*/React.createElement("div", {
    className: "hbl-micro",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '2px 4px 8px'
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "lock",
    s: 12
  }), " Hvelv ", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      letterSpacing: 0,
      textTransform: 'none',
      fontWeight: 600,
      color: 'var(--ink-30)'
    }
  }, "ett \xE5pent av gangen")), vaults.map(v => /*#__PURE__*/React.createElement(V3VaultFrame, {
    key: v.id,
    vault: v,
    open: v.id === openVault,
    activeId: activeId,
    rec: rec,
    recChat: recTitle,
    onReview: onReview,
    onPick: onPick,
    onOpen: () => onOpenVault(v.id),
    onLock: () => onLockVault(v.id),
    onGoRec: onGoRec,
    onStopRec: onStopRec
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      borderTop: '1px solid var(--line-2)',
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(V3Account, {
    placement: "bottom",
    onStudio: onStudio
  })));
}

/* main-area state when the open vault gets locked while you were reading it */
function V3VaultLocked({
  vault,
  onUnlock
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'grid',
      placeItems: 'center',
      padding: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      textAlign: 'center',
      animation: 'hblFadeUp .25s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 15,
      margin: '0 auto 15px',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--paper-2)',
      border: '1px solid var(--line-2)',
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "lock",
    s: 24
  })), /*#__PURE__*/React.createElement("div", {
    className: "hbl-display",
    style: {
      fontSize: 19,
      fontWeight: 500
    }
  }, vault.name, " er l\xE5st"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-60)',
      margin: '7px 0 18px',
      lineHeight: 1.55
    }
  }, "Innholdet er kryptert med hvelvets egen n\xF8kkel. L\xE5s opp for \xE5 lese samtalene og filene."), /*#__PURE__*/React.createElement("button", {
    onClick: onUnlock,
    className: "hbl-btn hbl-btn--primary hbl-btn--sm"
  }, /*#__PURE__*/React.createElement(IR, {
    n: "lockopen",
    s: 15
  }), " L\xE5s opp med ", vault.factor)));
}

/* ── Account menu ── avatar (top-right, or bottom-left of the rail) → Konto og kreditter / Innstillinger / Logg ut ── */
function V3Account({
  onStudio,
  placement,
  mini
}) {
  const bottom = placement === 'bottom';
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const av = (s, r, f) => ({
    width: s,
    height: s,
    borderRadius: r,
    background: 'linear-gradient(140deg,#C77DD6,#7D7BE8)',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
    fontWeight: 700,
    fontSize: f,
    flex: '0 0 auto'
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: bottom && !mini ? '100%' : undefined
    }
  }, bottom ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    title: "Konto",
    className: "hbl-rowlink",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: mini ? 0 : 9,
      width: '100%',
      font: 'inherit',
      textAlign: 'left',
      cursor: 'pointer',
      border: 'none',
      background: open ? 'var(--paper)' : 'transparent',
      borderRadius: 10,
      padding: mini ? 4 : '6px 8px',
      justifyContent: mini ? 'center' : undefined,
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: av(26, 8, 12)
  }, "EM"), !mini && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
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
  }, "Emma Moen"), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      display: 'block',
      fontSize: 10.5,
      color: 'var(--ink-45)',
      marginTop: 1
    }
  }, "412 kreditter")), /*#__PURE__*/React.createElement(IR, {
    n: "chevDown",
    s: 14
  }))) : /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    title: "Konto",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      padding: 3,
      paddingRight: 6,
      background: 'var(--paper)',
      borderRadius: 999,
      boxShadow: 'var(--e1)',
      border: '1px solid var(--line-2)',
      cursor: 'pointer',
      color: 'var(--ink-45)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: av(26, 8, 12)
  }, "EM"), /*#__PURE__*/React.createElement(IR, {
    n: "chevDown",
    s: 14
  })), open && /*#__PURE__*/React.createElement("div", {
    style: bottom ? {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: 0,
      zIndex: 90,
      width: 240,
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      boxShadow: 'var(--e3)',
      overflow: 'hidden',
      animation: 'hblFadeUp .16s ease both'
    } : {
      position: 'absolute',
      top: 'calc(100% + 10px)',
      right: 0,
      zIndex: 90,
      width: 240,
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      boxShadow: 'var(--e3)',
      overflow: 'hidden',
      animation: 'hblFadeUp .16s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '14px 15px',
      borderBottom: '1px solid var(--line-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: av(38, 11, 15)
  }, "EM"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--ink)'
    }
  }, "Emma Moen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-45)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IR, {
    n: "shield",
    s: 12
  }), " BankID-verifisert"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(false),
    className: "hbl-menuitem"
  }, /*#__PURE__*/React.createElement(IR, {
    n: "sparkle",
    s: 17
  }), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "Konto og kreditter"), /*#__PURE__*/React.createElement("span", {
    className: "hbl-num",
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: 'var(--ink-45)'
    }
  }, "412")), onStudio && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setOpen(false);
      onStudio();
    },
    className: "hbl-menuitem"
  }, /*#__PURE__*/React.createElement(IR, {
    n: "layers",
    s: 17
  }), " Studio"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(false),
    className: "hbl-menuitem"
  }, /*#__PURE__*/React.createElement(IR, {
    n: "sliders",
    s: 17
  }), " Innstillinger"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--line-2)',
      margin: '6px 4px'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(false),
    className: "hbl-menuitem hbl-menuitem--alert"
  }, /*#__PURE__*/React.createElement(IR, {
    n: "power",
    s: 17
  }), " Logg ut"))));
}
Object.assign(window, {
  V3Rail,
  V3Countdown,
  V3RecBar,
  V3VaultFrame,
  V3VaultLocked,
  V3Account
});
})();
