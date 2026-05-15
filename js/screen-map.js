function DropdownCircleRow({ circle, isActive, hasDivider, onSelect }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
        background: isActive ? "#F2F7FF" : hovered ? "#F5F7FA" : "#fff",
        cursor: "pointer",
        borderBottom: hasDivider ? "1px solid #F0F2F7" : "none",
        transition: "background 0.12s",
      }}
    >
      <CircleAvatar gradient={circle.gradient} icon={circle.icon} size={48} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28", lineHeight: "24px" }}>
          {circle.name}
        </div>
        <div style={{ fontSize: 14, fontWeight: 400, color: "#6B7280", lineHeight: "20px", marginTop: 1 }}>
          {circle.type} · {circle.role}
        </div>
      </div>
      <AvatarStack members={circle.members} size={28} />
    </div>
  );
}

function CirclesDropdown({ circles, activeCircle, onSelect, onClose, onNewCircle, onJoinCode, isMobile }) {
  const ref = useRef();
  const [hovNew, setHovNew] = React.useState(false);
  const [hovJoin, setHovJoin] = React.useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute", top: isMobile ? 64 : 72, left: 12,
        right: isMobile ? 12 : "auto",
        width: isMobile ? "auto" : 320, background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)",
        zIndex: 870,
        animation: "slideDown 0.18s ease",
        display: "flex", flexDirection: "column",
        maxHeight: isMobile ? "calc(100vh - 80px)" : "calc(100vh - 88px)",
        overflow: "hidden",
      }}
    >
      <div style={{
        height: 52, display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px", borderBottom: "1px solid #F0F2F7",
      }}>
        <span style={{ fontSize: 17, fontWeight: 500, color: "#1B1E28" }}>Your Circles</span>
        <CloseBtn onClick={onClose} />
      </div>

      <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
        {circles.map((c, i) => (
          <DropdownCircleRow
            key={c.id}
            circle={c}
            isActive={activeCircle?.id === c.id}
            hasDivider={i < circles.length - 1}
            onSelect={() => { onSelect(c); onClose(); }}
          />
        ))}
      </div>

      <div style={{
        display: "flex", gap: 8, padding: "12px 16px",
        borderTop: "1px solid #F0F2F7",
      }}>
        <button
          onMouseEnter={() => setHovNew(true)}
          onMouseLeave={() => setHovNew(false)}
          onClick={() => { onClose(); onNewCircle(); }}
          style={{
            flex: 1, height: 44, borderRadius: 100,
            background: hovNew ? "#2563EB" : "#0F6EFF",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            fontSize: 16, fontWeight: 700, color: "#fff",
            transition: "background 0.15s",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="white">
            <path d="M11.053 5.053H6.947V.947a.947.947 0 1 0-1.894 0v4.106H.947a.947.947 0 1 0 0 1.894h4.106v4.106a.947.947 0 1 0 1.894 0V6.947h4.106a.947.947 0 1 0 0-1.894Z"/>
          </svg>
          New circle
        </button>
        <button
          onMouseEnter={() => setHovJoin(true)}
          onMouseLeave={() => setHovJoin(false)}
          onClick={() => { onClose(); onJoinCode(); }}
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
    </div>
  );
}

function DropdownItem({ label, icon, onClick, danger, first }) {
  const [hov, setHov] = React.useState(false);
  const color = danger ? "#FF3B30" : "#1B1E28";
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        width: "100%",
        height: 44, padding: "0 16px",
        background: hov ? (danger ? "#FFF5F5" : "#F5F7FA") : "#fff",
        border: "none",
        borderTop: first ? "none" : "1px solid #F0F2F7",
        cursor: "pointer", textAlign: "left",
        fontSize: 15, fontWeight: 500,
        color,
        fontFamily: '"Google Sans", sans-serif',
        transition: "background 0.12s",
      }}
    >
      {icon && <Icon src={icon} size={24} color={color} />}
      {label}
    </button>
  );
}

function UserAvatarDropdown({ isMobile, headerH, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: headerH + (isMobile ? 8 : 0),
      right: isMobile ? 12 : 16,
      left: isMobile ? 12 : "auto",
      zIndex: 870,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)",
      width: isMobile ? "auto" : 240,
      overflow: "hidden",
      animation: "slideDown 0.18s ease",
    }}>
      <div style={{
        padding: "24px 16px 20px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        borderBottom: "1px solid #F0F2F7",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: CURRENT_USER.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 21, fontWeight: 700, color: "#fff",
          fontFamily: '"Google Sans", sans-serif',
        }}>{CURRENT_USER.initial}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#1B1E28", marginTop: 4, lineHeight: "20px" }}>{CURRENT_USER.name}</div>
        <div style={{ fontSize: 14, fontWeight: 400, color: "#6B7280", lineHeight: "20px" }}>{CURRENT_USER.email}</div>
      </div>
      <DropdownItem label="Profile" icon="assets/icons/profile.svg" first onClick={() => { onClose(); window.location.href = "Settings.html"; }} />
      <DropdownItem label="Account Settings" icon="assets/icons/account-settings.svg" onClick={() => { onClose(); window.location.href = "Settings.html"; }} />
      <DropdownItem label="Subscription" icon="assets/icons/subscription.svg" onClick={onClose} />
      <div style={{ height: 1, background: "#F0F2F7" }} />
      <DropdownItem label="Sign Out" icon="assets/icons/logout.svg" danger first onClick={onClose} />
    </div>
  );
}

function MembersPanel({ members, onClose, onSelectMember, onInvite, headerH, isMobile }) {
  const [hovInvite, setHovInvite] = React.useState(false);
  return (
    <div style={{
      position: "absolute", top: headerH + 8,
      left: 8, right: isMobile ? 8 : "auto",
      width: isMobile ? "auto" : 344, background: "#fff",
      borderRadius: 16,
      boxShadow: "0px 4px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)",
      zIndex: 820, overflow: "hidden",
      animation: "slideDown 0.18s ease",
      display: "flex", flexDirection: "column",
      maxHeight: `calc(100vh - ${headerH + 8 + 16}px)`,
    }}>
      <div style={{
        height: 52, display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px", borderBottom: "1px solid #F0F2F7", flexShrink: 0,
      }}>
        <span style={{ fontSize: 17, fontWeight: 500, color: "#1B1E28" }}>Members</span>
        <CloseBtn onClick={onClose} />
      </div>
      <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
        {members.map((m, i) => (
          <div key={i} onClick={() => { onSelectMember(m); if (isMobile) onClose(); }}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px", cursor: "pointer",
              borderBottom: "1px solid #F0F2F7",
              transition: "background 0.12s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F5F7FA"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{
              width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
              background: m.gradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, color: "#fff",
            }}>{m.initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1B1E28" }}>{m.name}</span>
                {i === 0 && <span style={{ fontSize: 14, fontWeight: 400, color: "#6B7280" }}>(you)</span>}
              </div>
              <div style={{ fontSize: 14, fontWeight: 400, color: "#6B7280", marginTop: 2, lineHeight: "20px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {m.status}
              </div>
            </div>
            <span style={{ fontSize: 14, fontWeight: m.online ? 700 : 400, lineHeight: "20px", flexShrink: 0, color: m.online ? "#34C55A" : "#9CA3AF" }}>
              {m.time}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 16px" }}>
        <button
          onClick={onInvite}
          onMouseEnter={() => setHovInvite(true)}
          onMouseLeave={() => setHovInvite(false)}
          style={{
            width: "100%", height: 44, borderRadius: 100,
            background: hovInvite ? "#2563EB" : "#0F6EFF",
            border: "none", cursor: "pointer",
            fontSize: 16, fontWeight: 700, color: "#fff",
            fontFamily: '"Google Sans", sans-serif',
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.15s",
          }}
        >
          <Icon src="assets/icons/add-user.svg" size={20} color="#fff" />
          Invite people
        </button>
      </div>
    </div>
  );
}

function MapControlBtn({ icon, tooltip, divider = false, topRadius = 0, bottomRadius = 0, standalone = false, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const btnStyle = {
    width: 44, height: 44,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: hovered ? "rgba(245,247,250,0.95)" : "rgba(255,255,255,0.9)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "none", cursor: "pointer",
    transition: "background 0.15s",
    borderBottom: divider ? "1px solid #F0F2F7" : "none",
    borderRadius: standalone ? 14 : `${topRadius}px ${topRadius}px ${bottomRadius}px ${bottomRadius}px`,
    boxShadow: standalone ? "0px 2px 16px rgba(0,0,0,0.12)" : "none",
  };
  return (
    <div style={{ position: "relative" }}>
      <button
        style={btnStyle}
        onClick={onClick}
        onMouseEnter={() => { setHovered(true); setShowTip(true); }}
        onMouseLeave={() => { setHovered(false); setShowTip(false); }}
      >
        <Icon src={icon} size={24} color={hovered ? "#0F6EFF" : "#6B7280"} />
      </button>
      {showTip && (
        <div style={{
          position: "absolute",
          right: 52,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(27,30,40,0.92)",
          color: "#fff",
          fontSize: 13,
          fontWeight: 500,
          padding: "6px 10px",
          borderRadius: 8,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 999,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}>
          {tooltip}
        </div>
      )}
    </div>
  );
}

function MobileSearchField({ inputRef }) {
  const [active, setActive] = React.useState(true);
  const border = active ? "1px solid #0F6EFF" : "1px solid #E2E6EF";
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{ flex: 1, height: 44, borderRadius: 12, border, background: "#fff", display: "flex", alignItems: "center", gap: 8, padding: "0 12px", transition: "border-color 0.15s", cursor: "text" }}
    >
      <Icon src="assets/icons/search.svg" size={20} color={active ? "#0F6EFF" : "#9CA3AF"} />
      <input
        ref={inputRef}
        autoFocus
        placeholder="Search Place"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#1B1E28", background: "transparent", fontFamily: '"Google Sans", sans-serif' }}
      />
    </div>
  );
}

function CheckInModal({ onClose, isMobile }) {
  const user = MAP_PINS.find(p => p.isCurrentUser) || MAP_PINS[0];
  const [hovBtn, setHovBtn] = React.useState(false);

  const handleCheckIn = () => {
    onClose();
    window.showToast && window.showToast("Check-in sent!", "success");
  };

  const inner = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Address block with avatar pin */}
      <div style={{ position: "relative", paddingTop: 24, marginBottom: 16 }}>
        {/* Avatar pin — half above the blue block */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: user.gradient,
            border: "2.5px solid #fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 700, color: "#fff",
          }}>
            {user.initial}
          </div>
          <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #fff", filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))", marginTop: -1 }} />
        </div>
        {/* Blue block */}
        <div style={{ background: "#EBF2FF", borderRadius: 12, paddingTop: 40, paddingBottom: 32, paddingLeft: 16, paddingRight: 16, marginLeft: 32, marginRight: 32, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 17, fontWeight: 500, color: "#1B1E28", lineHeight: "20px", textAlign: "center", marginBottom: 4 }}>
            {user.status}
          </div>
          <div style={{ fontSize: 16, fontWeight: 400, color: "#1B1E28", lineHeight: "24px", textAlign: "center" }}>
            Los Angeles, CA
          </div>
        </div>
      </div>

      {/* Notice */}
      <div style={{ padding: "0 32px", marginBottom: 24 }}>
        <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", textAlign: "center" }}>
          Your contacts will receive notifications about your current location.
        </div>
      </div>

      {/* Button */}
      <button
        onMouseEnter={() => setHovBtn(true)}
        onMouseLeave={() => setHovBtn(false)}
        onClick={handleCheckIn}
        style={{
          width: "100%", height: 44, borderRadius: 100,
          background: hovBtn ? "#0D60E0" : "#0F6EFF",
          border: "none", cursor: "pointer",
          fontSize: 16, fontWeight: 700, color: "#fff",
          transition: "background 0.15s",
          fontFamily: '"Google Sans", sans-serif',
        }}
      >Check In</button>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 1001, background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 64, background: "#fff", borderBottom: "1px solid #E9E9E9", display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1B1E28", flex: 1 }}>Check In</span>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {inner}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: 420, background: "#fff", borderRadius: 20,
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      padding: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#1B1E28" }}>Check In</span>
        <CloseBtn onClick={onClose} />
      </div>
      {inner}
    </div>
  );
}

function MapScreen({ isMobile, activeCircle, onCircleChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [circleHovered, setCircleHovered] = useState(false);
  const [followActive, setFollowActive] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [membersHovered, setMembersHovered] = useState(false);
  const [followHovered, setFollowHovered] = useState(false);
  const [modal, setModal] = useState(null); // "create" | "join" | "invite" | null
  const [sosOpen, setSosOpen] = useState(false);
  const [sosCount, setSosCount] = useState(10);
  const [sosHovered, setSosHovered] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);
  const [sendHovered, setSendHovered] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [sosActiveModal, setSosActiveModal] = useState(false);
  const [sosStartedAt, setSosStartedAt] = useState(null);

  function activateSos() {
    clearInterval(sosTimerRef.current);
    setSosOpen(false);
    sosCountRef.current = 10;
    setSosCount(10);
    const d = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const h = d.getHours(), m = String(d.getMinutes()).padStart(2,"0");
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    setSosStartedAt(`${months[d.getMonth()]} ${d.getDate()}, ${h12}:${m} ${ampm}`);
    setSosActive(true);
    setSosActiveModal(true);
    window.showToast && window.showToast("SOS activated — contacts notified", "success");
  }
  function endSos() {
    setSosActive(false);
    setSosActiveModal(false);
    setSosStartedAt(null);
    window.showToast && window.showToast("SOS has been cancelled", "success");
  }
  const [checkInHovered, setCheckInHovered] = useState(false);
  const sosTimerRef = useRef(null);
  const sosCountRef = useRef(10);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const searchInputRef = useRef(null);
  const headerH = isMobile ? 56 : 64;
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef({});

  const flyToMember = (pin) => {
    if (leafletMap.current) {
      leafletMap.current.flyTo([pin.lat, pin.lng], 15, { duration: 1 });
    }
  };

  function buildPinHtml(pin, sosOn) {
    const ripples = sosOn ? `
      <span style="position:absolute;inset:0;border-radius:50%;background:#FF3B30;
        animation:sosRipple 1.6s ease-out infinite;pointer-events:none;"></span>
      <span style="position:absolute;inset:0;border-radius:50%;background:#FF3B30;
        animation:sosRipple 1.6s ease-out infinite;animation-delay:.55s;pointer-events:none;"></span>
      <span style="position:absolute;inset:0;border-radius:50%;background:#FF3B30;
        animation:sosRipple 1.6s ease-out infinite;animation-delay:1.1s;pointer-events:none;"></span>
    ` : "";
    return `
      <div style="position:relative;width:48px;height:48px;">
        ${ripples}
        <div style="position:relative;z-index:1;width:48px;height:48px;border-radius:50%;
          background:${pin.gradient};border:2.5px solid #fff;box-shadow:0 4px 8px rgba(0,0,0,0.22);
          display:flex;align-items:center;justify-content:center;
          font-size:20px;font-weight:700;color:#fff;font-family:'Google Sans',sans-serif;">
          ${pin.initial}
        </div>
      </div>
      <div style="width:0;height:0;border-left:5px solid transparent;
        border-right:5px solid transparent;border-top:7px solid #fff;
        filter:drop-shadow(0 2px 2px rgba(0,0,0,0.15));margin-top:-1px;"></div>
    `;
  }

  function makePinIcon(pin, sosOn) {
    const el = document.createElement("div");
    el.style.cssText = "display:flex;flex-direction:column;align-items:center;cursor:pointer;";
    el.innerHTML = buildPinHtml(pin, sosOn);
    return L.divIcon({ html: el, className: "", iconSize: [48, 58], iconAnchor: [24, 58] });
  }

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [34.055, -118.244],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.control.attribution({ position: "bottomleft", prefix: false })
      .addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>')
      .addTo(map);

    MAP_PINS.forEach(pin => {
      const marker = L.marker([pin.lat, pin.lng], { icon: makePinIcon(pin, !!pin.sosActive) });
      marker.on("click", () => {
        map.flyTo([pin.lat, pin.lng], 15, { duration: 1 });
      });
      markersRef.current[pin.id] = marker;
    });

    leafletMap.current = map;
    return () => { map.remove(); leafletMap.current = null; markersRef.current = {}; };
  }, []);

  // Update current-user pin when their SOS state changes
  useEffect(() => {
    const currentPin = MAP_PINS.find(p => p.isCurrentUser);
    if (!currentPin) return;
    const marker = markersRef.current[currentPin.id];
    if (!marker) return;
    marker.setIcon(makePinIcon(currentPin, sosActive));
  }, [sosActive]);

  useEffect(() => {
    if (!leafletMap.current) return;
    const memberIds = new Set(activeCircle.members.map(m => m.id));
    MAP_PINS.forEach(pin => {
      const marker = markersRef.current[pin.id];
      if (!marker) return;
      if (memberIds.has(pin.id)) {
        if (!leafletMap.current.hasLayer(marker)) marker.addTo(leafletMap.current);
      } else {
        if (leafletMap.current.hasLayer(marker)) marker.remove();
      }
    });
  }, [activeCircle]);

  const visiblePins = MAP_PINS.filter(pin =>
    activeCircle.members.some(m => m.id === pin.id)
  );

  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      <div ref={mapRef} style={{ position: "absolute", inset: 0 }} />

      {/* Header */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: headerH,
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0px 0px 48px rgba(27,30,40,0.05), 0px 0px 16px rgba(0,0,0,0.13)",
        display: "flex", alignItems: "center",
        padding: isMobile ? "0 12px" : "0 16px",
        gap: 12, zIndex: 800,
      }}>
        {isMobile && searchOpen ? (
          /* ── Mobile search bar ── */
          <>
            <MobileSearchField inputRef={searchInputRef} />
            <button
              onClick={() => setSearchOpen(false)}
              style={{
                flexShrink: 0, background: "none", border: "none", cursor: "pointer",
                fontSize: 16, fontWeight: 700, color: "#0F6EFF",
                fontFamily: '"Google Sans", sans-serif', padding: "0 4px",
              }}
            >Cancel</button>
          </>
        ) : (
          /* ── Normal header content ── */
          <>
            <button
              onClick={() => setShowDropdown(v => !v)}
              onMouseEnter={() => setCircleHovered(true)}
              onMouseLeave={() => setCircleHovered(false)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "none", border: "none", cursor: "pointer",
                padding: 0, flexShrink: 0,
              }}
            >
              <CircleAvatar gradient={activeCircle.gradient} icon={activeCircle.icon} size={40} />
              <span style={{
                fontSize: isMobile ? 17 : 20, fontWeight: 700,
                color: circleHovered ? "#0F6EFF" : "#1B1E28",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}>
                {activeCircle.name}
              </span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{
                flexShrink: 0,
                transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}>
                <path d="M1 1l5 5 5-5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div style={{ flex: 1 }} />

            {!isMobile && (
              <div style={{ width: 278, flexShrink: 0 }}>
                <DSInputField
                  placeholder="Search Place"
                  iconSrc="assets/icons/search.svg"
                />
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12, flexShrink: 0 }}>
              {isMobile && (
                <button
                  onClick={() => setSearchOpen(true)}
                  style={{
                    width: 40, height: 40,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "none", border: "none", cursor: "pointer",
                  }}>
                  <Icon src="assets/icons/search.svg" size={24} color="#9CA3AF" />
                </button>
              )}
              <button
                onClick={() => setShowUserDropdown(v => !v)}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: CURRENT_USER.gradient,
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 15, fontWeight: 700, color: "#fff",
                  fontFamily: '"Google Sans", sans-serif',
                }}
              >{CURRENT_USER.initial}</button>
            </div>
          </>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <>
          <div
            onClick={() => setShowDropdown(false)}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 860,
              animation: "fadeIn 0.18s ease",
            }}
          />
          <CirclesDropdown
            circles={CIRCLES.filter(c => !c.archived)}
            activeCircle={activeCircle}
            onSelect={onCircleChange}
            onClose={() => setShowDropdown(false)}
            onNewCircle={() => setModal("create")}
            onJoinCode={() => setModal("join")}
            isMobile={isMobile}
          />
        </>
      )}

      {/* User avatar dropdown */}
      {showUserDropdown && (
        <>
          <div
            onClick={() => setShowUserDropdown(false)}
            style={{
              position: "absolute", inset: 0,
              background: isMobile ? "rgba(0,0,0,0.35)" : "transparent",
              zIndex: 869,
              animation: isMobile ? "fadeIn 0.18s ease" : "none",
            }}
          />
          <UserAvatarDropdown
            isMobile={isMobile}
            headerH={headerH}
            onClose={() => setShowUserDropdown(false)}
          />
        </>
      )}

      {/* Members panel */}
      {membersOpen && (
        <MembersPanel
          members={visiblePins}
          headerH={headerH}
          isMobile={isMobile}
          onClose={() => setMembersOpen(false)}
          onSelectMember={flyToMember}
          onInvite={() => setModal("invite")}
        />
      )}

      {/* Overlay row */}
      <div style={{
        position: "absolute",
        top: headerH + 8,
        left: 8, right: 8,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 800,
        pointerEvents: "none",
      }}>
        <button
          onClick={() => setMembersOpen(v => !v)}
          onMouseEnter={() => setMembersHovered(true)}
          onMouseLeave={() => setMembersHovered(false)}
          style={{
            height: 44, borderRadius: 12, padding: "0 16px",
            background: membersHovered ? "rgba(245,247,250,0.95)" : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0px 0px 16px rgba(0,0,0,0.13)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10,
            pointerEvents: "auto",
            visibility: membersOpen ? "hidden" : "visible",
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: membersHovered ? "#0F6EFF" : "#6B7280", fontFamily: '"Google Sans", sans-serif', transition: "color 0.15s" }}>
            Members
          </span>
          <AvatarStack members={activeCircle.members} size={32} />
        </button>

        <button
          onClick={() => setFollowActive(v => !v)}
          onMouseEnter={() => setFollowHovered(true)}
          onMouseLeave={() => setFollowHovered(false)}
          style={{
            height: 44, borderRadius: 12,
            padding: "0 16px",
            background: followActive ? "rgba(15,110,255,0.12)" : followHovered ? "rgba(245,247,250,0.95)" : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0px 0px 16px rgba(0,0,0,0.13)",
            border: followActive ? "1px solid rgba(15,110,255,0.4)" : "none",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
            transition: "all 0.2s",
            pointerEvents: "auto",
          }}
        >
          <Icon src="assets/icons/route.svg" size={20} color={followActive || followHovered ? "#0F6EFF" : "#6B7280"} />
          <span style={{
            fontSize: 16, fontWeight: 700,
            color: followActive || followHovered ? "#0F6EFF" : "#6B7280",
            fontFamily: '"Google Sans", sans-serif',
            transition: "color 0.15s",
          }}>
            Follow Me
          </span>
        </button>
      </div>

      {/* Map controls */}
      <div style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: 8,
        display: "flex", flexDirection: "column", gap: 8,
        zIndex: 800,
        pointerEvents: "auto",
      }}>
        {/* Zoom buttons */}
        <div style={{
          width: 44,
          boxShadow: "0px 2px 16px rgba(0,0,0,0.12)",
          borderRadius: 14,
        }}>
          <MapControlBtn icon="assets/icons/plus.svg" tooltip="Zoom in" divider topRadius={14} bottomRadius={0}
            onClick={() => leafletMap.current?.zoomIn()} />
          <MapControlBtn icon="assets/icons/minus.svg" tooltip="Zoom out" topRadius={0} bottomRadius={14}
            onClick={() => leafletMap.current?.zoomOut()} />
        </div>

        {/* Location button */}
        <MapControlBtn icon="assets/icons/send.svg" tooltip="My location" standalone
          onClick={() => {
            navigator.geolocation?.getCurrentPosition(
              pos => leafletMap.current?.flyTo([pos.coords.latitude, pos.coords.longitude], 15, { duration: 1.2 }),
              () => leafletMap.current?.flyTo([34.055, -118.244], 13, { duration: 1.2 })
            );
          }} />

        {/* SOS button */}
        <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0 }}>
          {sosActive && (
            <>
              <span style={{ position: "absolute", inset: 0, borderRadius: 14, background: "#FF3B30", animation: "sosRipple 1.6s ease-out infinite", pointerEvents: "none" }} />
              <span style={{ position: "absolute", inset: 0, borderRadius: 14, background: "#FF3B30", animation: "sosRipple 1.6s ease-out infinite", animationDelay: "0.55s", pointerEvents: "none" }} />
              <span style={{ position: "absolute", inset: 0, borderRadius: 14, background: "#FF3B30", animation: "sosRipple 1.6s ease-out infinite", animationDelay: "1.1s", pointerEvents: "none" }} />
            </>
          )}
          <button
            onMouseEnter={() => setSosHovered(true)}
            onMouseLeave={() => setSosHovered(false)}
            onClick={() => {
              if (sosActive) {
                setSosActiveModal(true);
                return;
              }
              sosCountRef.current = 10;
              setSosCount(10);
              setSosOpen(true);
              clearInterval(sosTimerRef.current);
              sosTimerRef.current = setInterval(() => {
                sosCountRef.current -= 1;
                setSosCount(sosCountRef.current);
                if (sosCountRef.current <= 0) {
                  activateSos();
                }
              }, 1000);
            }}
            style={{
              position: "relative", zIndex: 1,
              width: 44, height: 44, borderRadius: 14,
              background: sosHovered ? "#E0352B" : "#FF3B30", border: "none",
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              boxShadow: "0px 2px 16px rgba(255,59,48,0.4)",
              flexShrink: 0, transition: "background 0.15s",
              animation: sosActive ? "sosPulse 1.4s ease-in-out infinite" : "none",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: 0.5 }}>SOS</span>
          </button>
        </div>

        {/* Check In button */}
        <button
          onMouseEnter={() => setCheckInHovered(true)}
          onMouseLeave={() => setCheckInHovered(false)}
          onClick={() => setModal("checkin")}
          style={{
            width: 44, height: 44, borderRadius: 14,
            background: checkInHovered ? "#0D60E0" : "#0F6EFF",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0px 2px 16px rgba(15,110,255,0.4)",
            flexShrink: 0, transition: "background 0.15s",
          }}
        >
          <img src="assets/icons/check-in.svg" width={24} height={24} alt=""
            style={{ filter: "brightness(0) invert(1)", display: "block" }} />
        </button>
      </div>

      {/* SOS Modal */}
      {sosOpen && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "#1E2235", borderRadius: 28,
            padding: "40px 32px 32px",
            width: 340, maxWidth: "90vw",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
          }}>
            {/* Countdown ring */}
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#3A3F55" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke="#FF3B30" strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (sosCount / 10)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.9s linear" }}
                />
              </svg>
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 48, fontWeight: 700, color: "#FF3B30",
              }}>
                {sosCount}
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#FF3B30", marginBottom: 10 }}>SOS Alert</div>
              <div style={{ fontSize: 14, color: "#9CA3AF", lineHeight: "20px" }}>
                Contacts will receive your location, timestamp, and note.
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
              <button
                onClick={() => {
                  clearInterval(sosTimerRef.current);
                  setSosOpen(false);
                  setSosCount(10);
                  sosCountRef.current = 10;
                }}
                onMouseEnter={() => setCancelHovered(true)}
                onMouseLeave={() => setCancelHovered(false)}
                style={{
                  width: "100%", height: 52, borderRadius: 100,
                  background: cancelHovered ? "rgba(255,255,255,0.12)" : "transparent",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  color: "#fff", fontSize: 16, fontWeight: 700,
                  cursor: "pointer", fontFamily: '"Google Sans", sans-serif',
                  transition: "background 0.15s",
                }}
              >
                I'm ok
              </button>

              <button
                onClick={activateSos}
                onMouseEnter={() => setSendHovered(true)}
                onMouseLeave={() => setSendHovered(false)}
                style={{
                  width: "100%", height: 52, borderRadius: 100,
                  background: sendHovered ? "#E0322A" : "#FF3B30",
                  border: "none",
                  color: "#fff", fontSize: 16, fontWeight: 700,
                  cursor: "pointer", fontFamily: '"Google Sans", sans-serif',
                  transition: "background 0.15s",
                }}
              >
                Send now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active SOS modal (light) */}
      {sosActiveModal && (
        <ModalBackdrop onClose={() => setSosActiveModal(false)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: 460, maxWidth: "calc(100vw - 32px)", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1B1E28", minWidth: 0 }}>Active SOS</div>
              <CloseBtn onClick={() => setSosActiveModal(false)} />
            </div>
            <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", marginBottom: 18 }}>
              Started {sosStartedAt}. Contacts were queued from the web flow.
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <button
                onClick={endSos}
                style={{ flex: 1, height: 48, borderRadius: 100, background: "#fff", border: "1px solid #E2E6EF", color: "#1B1E28", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: '"Google Sans", sans-serif', display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F5F7FA"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#1B1E28" strokeWidth="1.8"/><path d="M8 12l3 3 5-6" stroke="#1B1E28" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                I'm safe
              </button>
              <button
                onClick={endSos}
                style={{ flex: 1, height: 48, borderRadius: 100, background: "#fff", border: "1px solid #E2E6EF", color: "#1B1E28", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: '"Google Sans", sans-serif', transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#F5F7FA"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                Mark false alarm
              </button>
            </div>
            <button
              onClick={endSos}
              style={{ width: "100%", height: 48, borderRadius: 100, background: "#FF3B30", border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: '"Google Sans", sans-serif', transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#E0322A"}
              onMouseLeave={e => e.currentTarget.style.background = "#FF3B30"}>
              Cancel SOS
            </button>
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <a
                href="Settings.html#identity"
                style={{ fontSize: 14, lineHeight: "20px", color: "#6B7280", textDecoration: "none", fontFamily: '"Google Sans", sans-serif', cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#1B1E28"}
                onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}>
                Manage in Safety &amp; Emergency settings
              </a>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* Modals */}
      {modal === "create" && (
        isMobile
          ? <CreateCircleModal onClose={() => setModal(null)} isMobile={true} />
          : <ModalBackdrop onClose={() => setModal(null)}>
              <CreateCircleModal onClose={() => setModal(null)} />
            </ModalBackdrop>
      )}
      {modal === "join" && (
        isMobile
          ? <JoinCircleModal onClose={() => setModal(null)} isMobile={true} />
          : <ModalBackdrop onClose={() => setModal(null)}>
              <JoinCircleModal onClose={() => setModal(null)} />
            </ModalBackdrop>
      )}
      {modal === "invite" && (
        isMobile
          ? <InvitePeopleModal onClose={() => setModal(null)} isMobile={true} />
          : <ModalBackdrop onClose={() => setModal(null)}>
              <InvitePeopleModal onClose={() => setModal(null)} />
            </ModalBackdrop>
      )}
      {modal === "checkin" && (
        isMobile
          ? <CheckInModal onClose={() => setModal(null)} isMobile={true} />
          : <ModalBackdrop onClose={() => setModal(null)}>
              <CheckInModal onClose={() => setModal(null)} />
            </ModalBackdrop>
      )}
    </div>
  );
}
