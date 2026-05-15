/* ── Transfer Owner Confirmation Modal ── */
function TransferOwnerModal({ member, onClose }) {
  const [hovCancel, setHovCancel] = React.useState(false);
  const [hovTransfer, setHovTransfer] = React.useState(false);
  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{ width: 440, background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.18)", padding: "28px 28px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 20, fontWeight: 500, color: "#1B1E28" }}>Transfer ownership</span>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 400, color: "#1B1E28", lineHeight: "24px", marginBottom: 8 }}>
          Are you sure you want to make <strong>{member.name}</strong> the owner?
        </div>
        <div style={{ fontSize: 14, fontWeight: 400, color: "#6B7280", lineHeight: "20px", marginBottom: 28 }}>
          You will lose owner control over this circle and become a regular member.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onMouseEnter={() => setHovCancel(true)}
            onMouseLeave={() => setHovCancel(false)}
            onClick={onClose}
            style={{ flex: 1, height: 44, borderRadius: 100, background: hovCancel ? "#F5F7FA" : "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", transition: "background 0.15s" }}
          >Cancel</button>
          <button
            onMouseEnter={() => setHovTransfer(true)}
            onMouseLeave={() => setHovTransfer(false)}
            style={{ flex: 1, height: 44, borderRadius: 100, background: hovTransfer ? "#E0322A" : "#FF3B30", border: "none", fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer", transition: "background 0.15s" }}
          >Transfer</button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

/* ── What actions can myRole perform on a target member ── */
function getAvailableActions(myRole, member) {
  if (member.isCurrentUser) return [];
  if (myRole === "Owner") {
    const a = [];
    if (member.role === "Member") a.push("make-admin");
    a.push("transfer-owner");
    a.push("remove");
    return a;
  }
  if (myRole === "Admin") {
    if (member.role === "Member") return ["remove"];
    return [];
  }
  return []; // Member: no actions
}

/* ── Member dropdown menu ── */
function MemberDropdown({ actions, onClose, onTransferOwner }) {
  const [hovAdmin, setHovAdmin]       = React.useState(false);
  const [hovTransfer, setHovTransfer] = React.useState(false);
  const [hovRemove, setHovRemove]     = React.useState(false);
  const itemStyle = (hov, red, first) => ({
    width: "100%", height: 42, padding: "0 16px",
    background: hov ? (red ? "#FFF5F5" : "#F5F7FA") : "#fff",
    border: "none", borderTop: first ? "none" : "1px solid #F0F2F7",
    cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center",
    fontSize: 16, fontWeight: 700,
    color: red ? "#FF3B30" : "#1B1E28",
    transition: "background 0.12s",
    fontFamily: '"Google Sans", sans-serif',
  });
  const items = actions;
  return (
    <div style={{
      position: "absolute", right: 0, top: 36, zIndex: 1100,
      background: "#fff", borderRadius: 14,
      boxShadow: "0 4px 24px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)",
      minWidth: 190, overflow: "hidden",
      animation: "slideDown 0.12s ease",
    }}>
      {items.includes("make-admin") && (
        <button onMouseEnter={() => setHovAdmin(true)} onMouseLeave={() => setHovAdmin(false)} onClick={onClose} style={itemStyle(hovAdmin, false, true)}>Make Admin</button>
      )}
      {items.includes("transfer-owner") && (
        <button onMouseEnter={() => setHovTransfer(true)} onMouseLeave={() => setHovTransfer(false)} onClick={onTransferOwner} style={itemStyle(hovTransfer, false, !items.includes("make-admin"))}>Transfer Owner</button>
      )}
      {items.includes("remove") && (
        <button onMouseEnter={() => setHovRemove(true)} onMouseLeave={() => setHovRemove(false)} onClick={onClose} style={itemStyle(hovRemove, true, items.length === 1)}>Remove</button>
      )}
    </div>
  );
}

/* ── Member row (CircleDetail) ── */
function MemberRow({ member, isLast, myRole }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [showTransfer, setShowTransfer] = React.useState(false);
  const [hovMore, setHovMore] = React.useState(false);
  const wrapRef = React.useRef();

  const actions = getAvailableActions(myRole, member);
  const hasActions = actions.length > 0;

  React.useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const badgeStyle = member.role === "Owner"
    ? { bg: "#EBF2FF", color: "#0F6EFF" }
    : member.role === "Admin"
    ? { bg: "#ECFDF5", color: "#22C55E" }
    : null;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: isLast ? "none" : "1px solid #F0F2F7" }}>
        {/* Avatar 48px */}
        <div style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0, background: member.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff" }}>
          {member.initial}
        </div>
        {/* Name + Status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, lineHeight: "24px" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28" }}>{member.name}</span>
            {member.isCurrentUser && <span style={{ fontSize: 14, fontWeight: 400, color: "#9CA3AF", lineHeight: "20px" }}>(you)</span>}
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, color: "#6B7280", lineHeight: "20px" }}>{member.status}</div>
        </div>
        {/* Role badge — Owner (blue) or Admin (green) only */}
        {badgeStyle && (
          <span style={{ fontSize: 12, fontWeight: 600, borderRadius: 100, padding: "3px 10px", flexShrink: 0, background: badgeStyle.bg, color: badgeStyle.color }}>
            {member.role}
          </span>
        )}
        {/* More button — only if there are actions */}
        {hasActions && (
          <div style={{ position: "relative", flexShrink: 0 }} ref={wrapRef}>
            <button
              onMouseEnter={() => setHovMore(true)}
              onMouseLeave={() => setHovMore(false)}
              onClick={() => setDropdownOpen(v => !v)}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: hovMore || dropdownOpen ? "#F0F2F7" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5"  r="1.6" fill={hovMore || dropdownOpen ? "#0F6EFF" : "#9CA3AF"} />
                <circle cx="12" cy="12" r="1.6" fill={hovMore || dropdownOpen ? "#0F6EFF" : "#9CA3AF"} />
                <circle cx="12" cy="19" r="1.6" fill={hovMore || dropdownOpen ? "#0F6EFF" : "#9CA3AF"} />
              </svg>
            </button>
            {dropdownOpen && (
              <MemberDropdown
                actions={actions}
                onClose={() => setDropdownOpen(false)}
                onTransferOwner={() => { setDropdownOpen(false); setShowTransfer(true); }}
              />
            )}
          </div>
        )}
      </div>
      {showTransfer && <TransferOwnerModal member={member} onClose={() => setShowTransfer(false)} />}
    </>
  );
}

/* ── Circle list item ── */
function CircleListItem({ circle, isActive, onSelect, archived }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={() => onSelect(circle)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px",
        background: isActive ? "#F2F7FF" : hovered ? "#F5F7FA" : "transparent",
        borderBottom: "1px solid #F0F2F7",
        cursor: "pointer",
        transition: "background 0.15s, opacity 0.15s",
        minHeight: 80,
        opacity: archived ? (hovered ? 0.85 : 0.55) : 1,
      }}
    >
      <CircleAvatar gradient={circle.gradient} icon={circle.icon} size={56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28", lineHeight: "24px" }}>
          {circle.name}
        </div>
        <div style={{ fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "#6B7280", marginTop: 3 }}>
          {circle.type} · {circle.role}
        </div>
      </div>
      <AvatarStack members={circle.members} size={32} />
    </div>
  );
}

function CircleListPanel({ selected, onSelect, isMobile, onNewCircle, onJoinCode }) {
  const [hovNew, setHovNew] = React.useState(false);
  const [hovJoin, setHovJoin] = React.useState(false);
  const [showArchived, setShowArchived] = React.useState(false);
  const [hovArchivedToggle, setHovArchivedToggle] = React.useState(false);
  const activeCircles = CIRCLES.filter(c => !c.archived);
  const archivedCircles = CIRCLES.filter(c => c.archived);
  return (
    <div style={{
      width: isMobile ? "100%" : 360, height: "100%",
      background: "#fff",
      borderRight: isMobile ? "none" : "1px solid #E9E9E9",
      display: "flex", flexDirection: "column", flexShrink: 0,
    }}>
      <div style={{
        height: isMobile ? 56 : 64, padding: "0 16px",
        display: "flex", alignItems: "center",
        borderBottom: "1px solid #F0F2F7", flexShrink: 0,
      }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: "#1B1E28" }}>Circles</span>
      </div>

      <div style={{
        display: "flex", gap: 8, padding: 16,
        borderBottom: "1px solid #F0F2F7", flexShrink: 0,
      }}>
        <button
          onMouseEnter={() => setHovNew(true)}
          onMouseLeave={() => setHovNew(false)}
          onClick={onNewCircle}
          style={{
            flex: 1, height: 44, borderRadius: 100,
            background: hovNew ? "#2563EB" : "#0F6EFF", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            fontSize: 16, fontWeight: 700, color: "#fff",
            transition: "background 0.15s",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
            <path d="M11.053 5.053H6.947V.947a.947.947 0 1 0-1.894 0v4.106H.947a.947.947 0 1 0 0 1.894h4.106v4.106a.947.947 0 1 0 1.894 0V6.947h4.106a.947.947 0 1 0 0-1.894Z"/>
          </svg>
          New circle
        </button>
        <button
          onMouseEnter={() => setHovJoin(true)}
          onMouseLeave={() => setHovJoin(false)}
          onClick={onJoinCode}
          style={{
            flex: 1, height: 44, borderRadius: 100,
            background: hovJoin ? "#F0F2F7" : "#fff",
            border: "1px solid #E2E6EF", cursor: "pointer",
            fontSize: 16, fontWeight: 700, color: "#1B1E28",
            transition: "background 0.15s",
          }}
        >
          Join with code
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {activeCircles.map(c => (
          <CircleListItem key={c.id} circle={c} isActive={selected?.id === c.id} onSelect={onSelect} />
        ))}

        {archivedCircles.length > 0 && (
          <div
            onClick={() => setShowArchived(v => !v)}
            onMouseEnter={() => setHovArchivedToggle(true)}
            onMouseLeave={() => setHovArchivedToggle(false)}
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid #F0F2F7",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              cursor: "pointer",
              fontSize: 14, fontWeight: 600,
              color: hovArchivedToggle ? "#2563EB" : "#0F6EFF",
              transition: "color 0.15s",
            }}
          >
            {showArchived ? "Hide archived" : "Show archived"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ transform: showArchived ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {showArchived && archivedCircles.map(c => (
          <CircleListItem key={c.id} circle={c} isActive={selected?.id === c.id} onSelect={onSelect} archived />
        ))}

        <div style={{
          padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="#9CA3AF" strokeWidth="1.2"/>
            <path d="M8 7v4" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="8" cy="5.5" r="0.7" fill="#9CA3AF"/>
          </svg>
          <span style={{ fontSize: 13, color: "#9CA3AF", lineHeight: "18px" }}>
            Private groups for sharing location and messages.
          </span>
        </div>
      </div>
    </div>
  );
}

function IdentitySafetyCard({ circle }) {
  const [hovHub, setHovHub] = React.useState(false);
  const members = CIRCLE_MEMBERS[circle.id] || [];
  const total = members.length;
  const verified = 0;
  const anyBreach = 0;
  const critical = 0;

  const cellStyle = {
    padding: "16px 20px",
    display: "flex", flexDirection: "column", gap: 10,
    minHeight: 96,
  };
  const labelStyle = {
    display: "flex", alignItems: "center", gap: 8,
    fontSize: 14, fontWeight: 400, color: "#9CA3AF",
    lineHeight: "20px",
  };
  const valueStyle = {
    fontSize: 28, fontWeight: 700, color: "#1B1E28", lineHeight: "32px",
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      marginBottom: 16, overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 16px", borderBottom: "1px solid #F0F2F7",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 17, fontWeight: 500, color: "#1B1E28", lineHeight: "20px" }}>
          Identity safety
        </span>
        <button
          onMouseEnter={() => setHovHub(true)}
          onMouseLeave={() => setHovHub(false)}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontSize: 14, fontWeight: 600,
            color: hovHub ? "#2563EB" : "#0F6EFF",
            transition: "color 0.15s",
          }}
        >Open hub</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ ...cellStyle, borderRight: "1px solid #F0F2F7", borderBottom: "1px solid #F0F2F7" }}>
          <div style={labelStyle}>MEMBERS</div>
          <div style={valueStyle}>{total}</div>
        </div>
        <div style={{ ...cellStyle, borderBottom: "1px solid #F0F2F7" }}>
          <div style={labelStyle}>VERIFIED EMAIL</div>
          <div style={valueStyle}>{verified} / {total}</div>
        </div>
        <div style={{ ...cellStyle, borderRight: "1px solid #F0F2F7" }}>
          <div style={labelStyle}>ANY BREACH</div>
          <div style={valueStyle}>{anyBreach}</div>
        </div>
        <div style={cellStyle}>
          <div style={labelStyle}>CRITICAL BREACH</div>
          <div style={valueStyle}>{critical}</div>
        </div>
      </div>

      <div style={{
        padding: "14px 20px",
        fontSize: 13, color: "#9CA3AF", lineHeight: "18px",
      }}>
        Aggregated across members of this circle. Individual emails are never shared with admins.
      </div>
    </div>
  );
}

function CircleSettingsCard({ circle, isMobile }) {
  const initIconIdx = CIRCLE_ICON_OPTIONS.findIndex(o =>
    circle.icon && circle.icon.endsWith(o.file)
  );
  const [selectedIcon, setSelectedIcon] = React.useState(initIconIdx >= 0 ? initIconIdx : 0);
  const [selectedType, setSelectedType] = React.useState(circle.type);
  const [hovSave, setHovSave]           = React.useState(false);
  const [hovArchive, setHovArchive]     = React.useState(false);
  const [hovDelete, setHovDelete]       = React.useState(false);
  const [confirm, setConfirm]           = React.useState(null); // "archive" | "delete" | null

  return (
    <React.Fragment>
    <div style={{
      background: "#fff", borderRadius: 16,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      marginBottom: 0, overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 16px", borderBottom: "1px solid #F0F2F7",
        fontSize: 17, fontWeight: 500, color: "#1B1E28", lineHeight: "20px",
      }}>
        Circle Settings
      </div>

      <div style={{ padding: 20 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 8 }}>Name</div>
          <DSInputField defaultValue={circle.name} placeholder="Circle name" />
        </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 10 }}>Icon</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CIRCLE_ICON_OPTIONS.map((opt, i) => {
            const isSelected = selectedIcon === i;
            const [hovIcon, setHovIcon] = useState(false);
            return (
              <div key={i} onClick={() => setSelectedIcon(i)}
                onMouseEnter={() => setHovIcon(true)} onMouseLeave={() => setHovIcon(false)}
                style={{
                  width: 52, height: 52, borderRadius: 100, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: isSelected ? "1px solid #0F6EFF" : "1px solid transparent",
                  boxSizing: "border-box", transition: "border-color 0.15s, background 0.15s",
                  background: isSelected ? "#fff" : hovIcon ? "#E8F1FF" : "#F5F7FA",
                }}>
                <CircleAvatar gradient={opt.gradient} icon={`assets/icons/circles/${opt.file}`} size={40} />
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 10 }}>Type</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CIRCLE_TYPES.map(t => {
            const isActive = selectedType === t;
            const [hov, setHov] = useState(false);
            return (
              <button key={t} onClick={() => setSelectedType(t)}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{
                  height: 32, borderRadius: 100, padding: "0 16px",
                  border: isActive ? "1px solid #0F6EFF" : "1px solid transparent",
                  background: isActive ? "#fff" : hov ? "#E8F1FF" : "#F5F7FA",
                  color: "#1B1E28",
                  fontSize: 14, fontWeight: 400,
                  cursor: "pointer", transition: "background 0.15s",
                  fontFamily: '"Google Sans", sans-serif',
                }}>{t}</button>
            );
          })}
        </div>
      </div>

      </div>

      {confirm === "archive" && (
        <ConfirmModal
          title={circle.archived ? "Unarchive circle?" : "Archive circle?"}
          confirmLabel={circle.archived ? "Unarchive" : "Archive"}
          tone="primary"
          description={circle.archived
            ? "The circle will be restored to your active list."
            : "The circle will be hidden from your active list. You can restore it anytime."}
          onConfirm={() => window.showToast && window.showToast(
            circle.archived ? "Circle restored" : "Circle archived", "warning"
          )}
          onClose={() => setConfirm(null)}
          isMobile={isMobile}
        />
      )}
      {confirm === "delete" && (
        <ConfirmModal
          title="Delete circle?"
          confirmLabel="Delete"
          tone="danger"
          description="All members, places, and history will be permanently removed."
          onConfirm={() => window.showToast && window.showToast("Circle deleted", "error")}
          onClose={() => setConfirm(null)}
          isMobile={isMobile}
        />
      )}
    </div>

    <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
      <button
        onClick={() => window.showToast && window.showToast("Changes saved", "success")}
        onMouseEnter={() => setHovSave(true)}
        onMouseLeave={() => setHovSave(false)}
        style={{
          height: 44, borderRadius: 100, padding: "0 22px",
          background: hovSave ? "#2563EB" : "#0F6EFF",
          border: "none", cursor: "pointer",
          fontSize: 16, fontWeight: 700, color: "#fff",
          transition: "background 0.15s",
        }}
      >Save changes</button>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => setConfirm("archive")}
          onMouseEnter={() => setHovArchive(true)}
          onMouseLeave={() => setHovArchive(false)}
          style={{
            height: 44, borderRadius: 100, padding: "0 22px",
            background: hovArchive ? "#F5F7FA" : "#fff",
            border: "1px solid #E2E6EF", cursor: "pointer",
            fontSize: 16, fontWeight: 700, color: "#1B1E28",
            transition: "background 0.15s",
          }}
        >{circle.archived ? "Unarchive" : "Archive"}</button>
        <button
          onClick={() => setConfirm("delete")}
          onMouseEnter={() => setHovDelete(true)}
          onMouseLeave={() => setHovDelete(false)}
          style={{
            height: 44, borderRadius: 100, padding: "0 22px",
            background: hovDelete ? "#E0322A" : "#FF3B30",
            border: "none", cursor: "pointer",
            fontSize: 16, fontWeight: 700, color: "#fff",
            transition: "background 0.15s",
          }}
        >Delete</button>
      </div>
    </div>
    </React.Fragment>
  );
}

function CircleDetail({ circle, onBack, isMobile, onInvite }) {
  const [hovInvite, setHovInvite] = React.useState(false);
  const [hovLeave, setHovLeave] = React.useState(false);
  const [confirmLeave, setConfirmLeave] = React.useState(false);
  const isOwnerOrAdmin = circle.role === "Owner" || circle.role === "Admin";
  const isOwner = circle.role === "Owner";

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      background: "#F5F7FA", overflow: "hidden",
    }}>
      <div style={{
        height: isMobile ? 56 : 64, background: "#fff",
        borderBottom: "1px solid #E9E9E9",
        display: "flex", alignItems: "center",
        padding: "0 16px", gap: 4, flexShrink: 0,
      }}>
        {isMobile && (
          <button
            onClick={onBack}
            style={{
              width: 40, height: 40, marginLeft: -8, marginRight: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "none", cursor: "pointer", borderRadius: 8,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#1B1E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <span style={{ fontSize: 20, fontWeight: 500, color: "#1B1E28" }}>Circle Details</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{
            padding: "24px 20px 20px",
            display: "flex", flexDirection: "column", alignItems: "center",
            marginBottom: 16,
          }}>
            <CircleAvatar gradient={circle.gradient} icon={circle.icon} size={72} />
            <div style={{ marginTop: 14, fontSize: 24, fontWeight: 700, color: "#1B1E28" }}>
              {circle.name}
            </div>
            <div style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
              {circle.type} · {circle.role}
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              {isOwnerOrAdmin && (
                <button
                  onClick={onInvite}
                  onMouseEnter={() => setHovInvite(true)}
                  onMouseLeave={() => setHovInvite(false)}
                  style={{
                    height: 44, borderRadius: 100, padding: "0 20px",
                    background: hovInvite ? "#2563EB" : "#0F6EFF",
                    border: "none", cursor: "pointer",
                    fontSize: 16, fontWeight: 700, color: "#fff",
                    display: "flex", alignItems: "center", gap: 8,
                    transition: "background 0.15s",
                  }}>
                  <Icon src="assets/icons/add-user.svg" size={20} color="#fff" />
                  Invite people
                </button>
              )}
              {!isOwner && (
                <button
                  onClick={() => setConfirmLeave(true)}
                  onMouseEnter={() => setHovLeave(true)}
                  onMouseLeave={() => setHovLeave(false)}
                  style={{
                    height: 44, borderRadius: 100, padding: "0 20px",
                    background: hovLeave ? "#FFF0F0" : "#fff",
                    border: "1px solid #E2E6EF", cursor: "pointer",
                    fontSize: 16, fontWeight: 700, color: "#FF3B30",
                    transition: "background 0.15s",
                  }}>
                  Leave Circle
                </button>
              )}
            </div>
          </div>

          <div style={{
            background: "#fff", borderRadius: 16,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            marginBottom: 16,
          }}>
            {(() => {
              const members = CIRCLE_MEMBERS[circle.id] || [];
              return (<>
                <div style={{
                  padding: "14px 16px", borderBottom: "1px solid #F0F2F7",
                  fontSize: 17, fontWeight: 500, color: "#1B1E28", lineHeight: "20px",
                  borderRadius: "16px 16px 0 0",
                }}>
                  Members · {members.length}
                </div>
                {members.map((m, i) => (
                  <MemberRow key={i} member={m} isLast={i === members.length - 1} myRole={circle.role} />
                ))}
              </>);
            })()}
          </div>

          {isOwnerOrAdmin && (
            <IdentitySafetyCard circle={circle} />
          )}

          {isOwnerOrAdmin && (
            <CircleSettingsCard key={circle.id} circle={circle} isMobile={isMobile} />
          )}
        </div>
      </div>

      {confirmLeave && (
        <ConfirmModal
          title="Leave circle?"
          confirmLabel="Leave"
          tone="danger"
          description="You'll lose access to this circle's location, places, and chat."
          onConfirm={() => window.showToast && window.showToast("You left the circle", "warning")}
          onClose={() => setConfirmLeave(false)}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}

function CreateCirclePanel({ onBack, isMobile }) {
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [selectedType, setSelectedType] = useState("Family");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F7FA", overflow: "hidden" }}>
      <div style={{ height: isMobile ? 56 : 64, background: "#fff", borderBottom: "1px solid #E9E9E9", display: "flex", alignItems: "center", padding: "0 16px", gap: 4, flexShrink: 0 }}>
        {isMobile && (
          <button onClick={onBack} style={{ width: 40, height: 40, marginLeft: -8, marginRight: 4, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1B1E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <span style={{ fontSize: 20, fontWeight: 500, color: "#1B1E28" }}>Create a circle</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ padding: "24px 0 20px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#EBF2FF,#E0F0FF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon src="assets/icons/circles.svg" size={32} color="#0F6EFF" />
            </div>
            <div style={{ marginTop: 10, fontSize: 14, color: "#6B7280", lineHeight: "20px", textAlign: "center" }}>
              Private group for sharing location and chat.
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "20px 20px 24px", marginBottom: 16 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 8 }}>Name</div>
              <DSInputField placeholder="The Smiths" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 10 }}>Icon</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {CIRCLE_ICON_OPTIONS.map((opt, i) => {
                  const isSelIcon = selectedIcon === i;
                  const [hovIcon, setHovIcon] = useState(false);
                  return (
                    <div key={i} onClick={() => setSelectedIcon(i)}
                      onMouseEnter={() => setHovIcon(true)} onMouseLeave={() => setHovIcon(false)}
                      style={{
                        width: 52, height: 52, borderRadius: 100, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: isSelIcon ? "1px solid #0F6EFF" : "1px solid transparent",
                        boxSizing: "border-box", transition: "border-color 0.15s, background 0.15s",
                        background: isSelIcon ? "#fff" : hovIcon ? "#E8F1FF" : "#F5F7FA",
                      }}>
                      <CircleAvatar gradient={opt.gradient} icon={`assets/icons/circles/${opt.file}`} size={40} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 10 }}>Type</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {CIRCLE_TYPES.map(t => {
                  const isActive = selectedType === t;
                  const [hov, setHov] = useState(false);
                  return (
                    <button key={t} onClick={() => setSelectedType(t)}
                      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                      style={{
                        height: 32, borderRadius: 100, padding: "0 16px",
                        border: isActive ? "1px solid #0F6EFF" : "1px solid transparent",
                        background: isActive ? "#fff" : hov ? "#E8F1FF" : "#F5F7FA",
                        color: "#1B1E28", fontSize: 14, fontWeight: 400,
                        cursor: "pointer", transition: "background 0.15s",
                        fontFamily: '"Google Sans", sans-serif',
                      }}>{t}</button>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "#0F6EFF", border: "none", fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: '"Google Sans", sans-serif' }}>
              Create circle
            </button>
            <div style={{ flex: 1 }} />
            <button onClick={onBack} style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", fontFamily: '"Google Sans", sans-serif' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CirclesEmptyState() {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F5F7FA", gap: 12,
      animation: "fadeIn 0.2s ease",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: "#EBF2FF",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon src="assets/icons/circles.svg" size={28} color="#0F6EFF" />
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1B1E28" }}>Select a circle</div>
      <div style={{
        fontSize: 14, color: "#9CA3AF",
        textAlign: "center", maxWidth: 220, lineHeight: "20px",
      }}>
        Choose a circle from the list to view or edit it
      </div>
    </div>
  );
}

function CirclesScreen({ isMobile }) {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("list"); // "list" | "detail" | "create"
  const [modal, setModal] = useState(null); // "join" | "invite" | null

  const handleSelect = (c) => {
    setSelected(c);
    setView(isMobile ? "detail" : "list");
  };

  const closeModal = () => setModal(null);

  const joinModal = modal === "join"
    ? (isMobile
        ? <JoinCircleModal onClose={closeModal} isMobile={true} />
        : <ModalBackdrop onClose={closeModal}><JoinCircleModal onClose={closeModal} /></ModalBackdrop>)
    : null;
  const inviteModal = modal === "invite"
    ? (isMobile
        ? <InvitePeopleModal onClose={closeModal} circle={selected} isMobile={true} />
        : <ModalBackdrop onClose={closeModal}><InvitePeopleModal onClose={closeModal} circle={selected} /></ModalBackdrop>)
    : null;

  if (isMobile) {
    return (
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {view === "create" ? (
          <CreateCirclePanel onBack={() => setView("list")} isMobile={true} />
        ) : view === "detail" && selected ? (
          <CircleDetail circle={selected} onBack={() => setView("list")} isMobile={true} onInvite={() => setModal("invite")} />
        ) : (
          <CircleListPanel
            selected={selected}
            onSelect={handleSelect}
            isMobile={true}
            onNewCircle={() => setView("create")}
            onJoinCode={() => setModal("join")}
          />
        )}
        {joinModal}
        {inviteModal}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <CircleListPanel
        selected={selected}
        onSelect={handleSelect}
        isMobile={false}
        onNewCircle={() => setView("create")}
        onJoinCode={() => setModal("join")}
      />
      {view === "create" ? (
        <CreateCirclePanel onBack={() => setView("list")} isMobile={false} />
      ) : selected ? (
        <CircleDetail circle={selected} isMobile={false} onInvite={() => setModal("invite")} />
      ) : (
        <CirclesEmptyState />
      )}
      {joinModal}
      {inviteModal}
    </div>
  );
}
