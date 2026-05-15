
const { useState, useEffect, useRef } = React;

/* ─────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────── */
const CIRCLES = [
  {
    id: 1, name: "My Family", type: "Family", role: "Admin",
    gradient: "linear-gradient(135deg,#FF6B6B,#FFA552)",
    members: [
      { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
      { initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)" },
    ],
  },
  {
    id: 2, name: "Work", type: "Work", role: "Member",
    gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)",
    members: [
      { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
      { initial: "B", gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)" },
      { initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)" },
      { initial: "+8", gradient: "#9CA3AF" },
    ],
  },
  {
    id: 3, name: "Beersaurus", type: "Friends", role: "Admin",
    gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)",
    members: [
      { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
      { initial: "A", gradient: "linear-gradient(135deg,#F857A6,#FF5858)" },
      { initial: "T", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)" },
    ],
  },
];



const CIRCLE_MEMBERS_DETAIL = [
  { initial: "S", gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", name: "Sara", role: "Admin", status: "Active now" },
  { initial: "M", gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", name: "Mom", role: "Member", status: "Home · 2 min ago" },
  { initial: "D", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", name: "Dad", role: "Member", status: "Work · 5 min ago" },
  { initial: "A", gradient: "linear-gradient(135deg,#F857A6,#FF5858)", name: "Alex", role: "Member", status: "On the move · Just now" },
];

/* ─────────────────────────────────────────────────
   PRIMITIVES
───────────────────────────────────────────────── */

/* Icon with CSS color filter */
function Icon({ src, size = 24, color = "#9CA3AF" }) {
  const filters = {
    "#0F6EFF": "invert(33%) sepia(99%) saturate(2000%) hue-rotate(207deg) brightness(100%) contrast(104%)",
    "#1B1E28": "invert(9%) sepia(14%) saturate(700%) hue-rotate(192deg) brightness(35%) contrast(95%)",
    "#6B7280": "invert(47%) sepia(7%) saturate(600%) hue-rotate(180deg) brightness(90%)",
    "#22C55E": "invert(62%) sepia(60%) saturate(500%) hue-rotate(95deg) brightness(95%)",
  };
  const filter = filters[color] || "invert(70%) sepia(6%) saturate(400%) hue-rotate(180deg) brightness(95%)";
  return (
    <img
      src={src} width={size} height={size}
      style={{ filter, display: "block", flexShrink: 0 }}
      alt=""
    />
  );
}

/* Circle avatar – gradient bg at 30% opacity + famify heart icon with gradient fill */
let _caIdx = 0;
function CircleAvatar({ gradient, size = 56 }) {
  const id = React.useRef(`ca-${_caIdx++}`).current;
  const iconSize = Math.round(size * 0.52);

  // Parse gradient string to extract from/to colors e.g. "linear-gradient(135deg,#FF6B6B,#FFA552)"
  const colors = (gradient.match(/#[0-9a-fA-F]{3,6}/g) || ["#0F6EFF", "#00C7BE"]);
  const from = colors[0] || "#0F6EFF";
  const to   = colors[1] || from;

  // bg color: same gradient but 30% opacity
  const bgGradient = `linear-gradient(135deg, ${from}4D, ${to}4D)`; // 4D = ~30% hex alpha

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bgGradient,
      flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd" clipRule="evenodd"
          d="M17.6584 11.123H17.6334C17.2192 11.1071 16.8941 10.7412 16.9081 10.3034C16.9402 9.29771 16.475 8.64519 15.6638 8.55742C15.2517 8.513 14.9516 8.12382 14.9936 7.6881C15.0366 7.25345 15.4067 6.93301 15.8168 6.97954C17.4253 7.15298 18.4666 8.50983 18.4076 10.3563C18.3936 10.7856 18.0605 11.123 17.6584 11.123ZM17.5763 3.28231C15.8558 2.70066 13.4742 2.94178 11.9877 4.72482C10.4263 2.95447 8.12562 2.69748 6.41713 3.28337C2.50101 4.6159 1.27966 9.41298 2.39398 13.0922C4.15248 18.8781 9.99917 22 12.0017 22C13.7893 22 19.868 18.9373 21.6065 13.0922C22.7208 9.41404 21.4965 4.61695 17.5763 3.28231Z"
          fill={`url(#${id})`}
        />
      </svg>
    </div>
  );
}

/* Stacked mini-avatars */
function AvatarStack({ members, size = 24 }) {
  const visible = members.slice(0, 3);
  const extra = members.length > 3 ? members.length - 3 : 0;
  return (
    <div style={{ display: "flex", flexShrink: 0 }}>
      {visible.map((m, i) => (
        <div key={i} style={{
          width: size, height: size, borderRadius: "50%",
          background: m.gradient,
          border: "1.5px solid #fff",
          marginLeft: i === 0 ? 0 : -(size * 0.34),
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: Math.round(size * 0.36), fontWeight: 700, color: "#fff",
          flexShrink: 0, position: "relative",
          zIndex: i + 1,
        }}>
          {m.initial}
        </div>
      ))}
      {extra > 0 && (
        <div style={{
          width: size, height: size, borderRadius: "50%",
          background: "#EBF2FF",
          border: "1.5px solid #fff",
          marginLeft: -(size * 0.34),
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: Math.round(size * 0.34), fontWeight: 700, color: "#0F6EFF",
          flexShrink: 0, position: "relative", zIndex: 4,
        }}>
          {extra}+
        </div>
      )}
    </div>
  );
}

/* FamSync logo mark */
function Logo() {
  return (
    <img src="assets/logo-icon.svg" width="32" height="40" alt="FamSync" style={{ display: "block" }} />
  );
}

/* ─────────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "map",     label: "Map",     icon: "assets/icons/map.svg" },
  { id: "circles", label: "Circles", icon: "assets/icons/circles.svg" },
  { id: "places",  label: "Places",  icon: "assets/icons/places.svg" },
  { id: "chat",    label: "Chat",    icon: "assets/icons/chat.svg" },
  { id: "history", label: "History", icon: "assets/icons/history.svg" },
  { id: "design",  label: "Design",  icon: "assets/icons/drop.svg", desktopOnly: true },
];
const SETTINGS_ITEM = { id: "settings", label: "Settings", icon: "assets/icons/settings.svg" };
const ALL_TABS = [...NAV_ITEMS.filter(t => !t.desktopOnly), SETTINGS_ITEM];

function NavButton({ item, active, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  const color = active ? "#0F6EFF" : hovered ? "#6B7280" : "#9CA3AF";
  return (
    <button
      onClick={() => onClick(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 72, height: 58,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 3,
        borderRadius: 10, margin: "0 4px",
        background: "transparent", border: "none", cursor: "pointer",
        padding: "8px 0", transition: "background 0.15s",
      }}
    >
      <Icon src={item.icon} size={24} color={color} />
      <span style={{
        fontSize: 11, fontWeight: 500, lineHeight: "16px",
        color, transition: "color 0.15s",
      }}>
        {item.label}
      </span>
    </button>
  );
}

function SidebarNav({ activeTab, onTabChange }) {
  return (
    <nav style={{
      width: 80, height: "100%", background: "#fff",
      borderRight: "1px solid #F0F2F7",
      display: "flex", flexDirection: "column", alignItems: "center",
      flexShrink: 0, zIndex: 20,
    }}>
      {/* Logo */}
      <div style={{
        width: 80, height: 64,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Logo />
      </div>

      {/* Main tabs */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        width: "100%", alignItems: "center", paddingTop: 8, gap: 4,
      }}>
        {NAV_ITEMS.map(item => (
          <NavButton key={item.id} item={item} active={activeTab === item.id} onClick={onTabChange} />
        ))}
      </div>

      {/* Settings at bottom */}
      <div style={{ paddingBottom: 12, width: "100%", display: "flex", justifyContent: "center" }}>
        <NavButton item={SETTINGS_ITEM} active={activeTab === "settings"} onClick={onTabChange} />
      </div>
    </nav>
  );
}

function BottomTabBar({ activeTab, onTabChange }) {
  return (
    <div style={{
      height: 58, background: "#fff", borderTop: "1px solid #F0F2F7",
      display: "flex", flexShrink: 0, zIndex: 100,
    }}>
      {ALL_TABS.map(item => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 2,
            border: "none", background: "none", cursor: "pointer", padding: "8px 0",
          }}
        >
          <Icon src={item.icon} size={24} color={activeTab === item.id ? "#0F6EFF" : "#9CA3AF"} />
          <span style={{
            fontSize: 11, fontWeight: 500,
            color: activeTab === item.id ? "#0F6EFF" : "#9CA3AF",
          }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   CIRCLES DROPDOWN (map header)
───────────────────────────────────────────────── */
function CirclesDropdown({ circles, activeCircle, onSelect, onClose }) {
  const ref = useRef();
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
        position: "absolute", top: 72, left: 12,
        width: 320, background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)",
        zIndex: 900,
        animation: "slideDown 0.18s ease",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        height: 52, display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px", borderBottom: "1px solid #F0F2F7",
      }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: "#1B1E28" }}>Your Circles</span>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "#F5F7FA", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, color: "#6B7280",
        }}>✕</button>
      </div>

      {/* Circle rows */}
      {circles.map((c, i) => (
        <div
          key={c.id}
          onClick={() => { onSelect(c); onClose(); }}
          style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
            background: activeCircle?.id === c.id ? "#F2F7FF" : "#fff",
            cursor: "pointer",
            borderBottom: i < circles.length - 1 ? "1px solid #F0F2F7" : "none",
            transition: "background 0.12s",
          }}
        >
          <CircleAvatar gradient={c.gradient} size={48} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1B1E28", lineHeight: "22px" }}>
              {c.name}
            </div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 1 }}>
              {c.type} · {c.role}
            </div>
          </div>
          <AvatarStack members={c.members.slice(0, 3)} size={22} />
        </div>
      ))}
    </div>
  );
}

const MAP_PINS = [
  { initial: "S", name: "Sara",  gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)", lat: 55.752, lng: 37.618, status: "19 Plympton Street",   time: "Online",  online: true },
  { initial: "B", name: "Ben",   gradient: "linear-gradient(135deg,#F857A6,#FF5858)", lat: 55.762, lng: 37.648, status: "100 Industrial Way",   time: "Online",  online: true },
  { initial: "M", name: "Mom",   gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)", lat: 55.748, lng: 37.605, status: "742 Evergreen Terrace", time: "5m ago",  online: false },
  { initial: "T", name: "Tanya", gradient: "linear-gradient(135deg,#F0922A,#EFC03A)", lat: 55.770, lng: 37.635, status: "9th Street",            time: "2h ago",  online: false },
];
/* ─────────────────────────────────────────────────
   MEMBERS PANEL
───────────────────────────────────────────────── */
function MembersPanel({ members, onClose, onSelectMember, headerH, isMobile }) {
  return (
    <div style={{
      position: "absolute", top: headerH + 8, left: 8,
      width: 320, background: "#fff",
      borderRadius: 16,
      boxShadow: "0px 4px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)",
      zIndex: 800, overflow: "hidden",
      animation: "slideDown 0.18s ease",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        height: 52, display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px", borderBottom: "1px solid #F0F2F7", flexShrink: 0,
      }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: "#1B1E28" }}>Members</span>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "#F5F7FA", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#6B7280", fontSize: 16,
        }}>✕</button>
      </div>

      {/* List */}
      <div style={{ overflowY: "auto", maxHeight: 360 }}>
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
                <span style={{ fontSize: 15, fontWeight: 700, color: "#1B1E28" }}>{m.name}</span>
                {i === 0 && <span style={{ fontSize: 11, color: "#9CA3AF" }}>(you)</span>}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {m.status}
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, flexShrink: 0, color: m.online ? "#22C55E" : "#C5CBD7" }}>
              {m.time}
            </span>
          </div>
        ))}
      </div>

      {/* Invite */}
      <div style={{ padding: "12px 16px" }}>
        <button style={{
          width: "100%", height: 44, borderRadius: 100,
          background: "#0F6EFF", border: "none", cursor: "pointer",
          fontSize: 15, fontWeight: 500, color: "#fff",
          fontFamily: '"Google Sans", sans-serif',
        }}>+ Invite people</button>
      </div>
    </div>
  );
}

function MapScreen({ isMobile, activeCircle, onCircleChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [followActive, setFollowActive] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const headerH = isMobile ? 56 : 64;
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);

  const flyToMember = (pin) => {
    if (leafletMap.current) {
      leafletMap.current.flyTo([pin.lat, pin.lng], 15, { duration: 1 });
    }
  };

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [55.757, 37.630],
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

    // Avatar pin markers
    MAP_PINS.forEach(pin => {
      const el = document.createElement("div");
      el.style.cssText = "display:flex;flex-direction:column;align-items:center;cursor:pointer;";
      el.innerHTML = `
        <div style="width:48px;height:48px;border-radius:50%;background:${pin.gradient};
          border:2.5px solid #fff;box-shadow:0 4px 8px rgba(0,0,0,0.22);
          display:flex;align-items:center;justify-content:center;
          font-size:20px;font-weight:700;color:#fff;font-family:'Google Sans',sans-serif;">
          ${pin.initial}
        </div>
        <div style="width:0;height:0;border-left:5px solid transparent;
          border-right:5px solid transparent;border-top:7px solid #fff;
          filter:drop-shadow(0 2px 2px rgba(0,0,0,0.15));margin-top:-1px;"></div>
      `;
      const icon = L.divIcon({ html: el, className: "", iconSize: [48, 58], iconAnchor: [24, 58] });
      const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);
      marker.on("click", () => {
        map.flyTo([pin.lat, pin.lng], 15, { duration: 1 });
      });
      markersRef.current.push(marker);
    });

    leafletMap.current = map;
    return () => { map.remove(); leafletMap.current = null; };
  }, []);

  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      {/* Leaflet map */}
      <div ref={mapRef} style={{ position: "absolute", inset: 0 }} />

      {/* ── HEADER ─────────────────────────────────────────────── */}
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

        {/* Circle selector */}
        <button
          onClick={() => setShowDropdown(v => !v)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", cursor: "pointer",
            padding: 0, flexShrink: 0,
          }}
        >
          <CircleAvatar gradient={activeCircle.gradient} size={40} />
          <span style={{
            fontSize: isMobile ? 17 : 20, fontWeight: 700, color: "#1B1E28",
            whiteSpace: "nowrap",
          }}>
            {activeCircle.name}
          </span>
          {/* chevron */}
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ flexShrink: 0 }}>
            <path d="M1 1l5 5 5-5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{ flex: 1 }} />

        {/* Search bar — desktop */}
        {!isMobile && (
          <div style={{ width: 278, flexShrink: 0 }}>
            <DSInputField
              placeholder="Search Place"
              iconSrc="assets/icons/search.svg"
            />
          </div>
        )}

        {/* Search icon — mobile */}
        {isMobile && (
          <button style={{
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
          }}>
            <Icon src="assets/icons/search.svg" size={24} color="#9CA3AF" />
          </button>
        )}

        {/* Bell notification */}
        <button style={{
          width: 44, height: 44, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "none", border: "none", cursor: "pointer",
          position: "relative",
        }}>
          <Icon src="assets/icons/bell-filled.svg" size={24} color="#9CA3AF" />
          <div style={{
            position: "absolute", top: 9, right: 9,
            width: 10, height: 10, borderRadius: "50%",
            background: "#22C55E", border: "2px solid rgba(255,255,255,0.6)",
          }} />
        </button>
      </div>

      {/* Dropdown backdrop + panel */}
      {showDropdown && (
        <>
          <div
            onClick={() => setShowDropdown(false)}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 850,
              animation: "fadeIn 0.18s ease",
            }}
          />
          <CirclesDropdown
            circles={CIRCLES}
            activeCircle={activeCircle}
            onSelect={onCircleChange}
            onClose={() => setShowDropdown(false)}
          />
        </>
      )}

      {/* Members panel */}
      {membersOpen && (
        <MembersPanel
          members={MAP_PINS}
          headerH={headerH}
          isMobile={isMobile}
          onClose={() => setMembersOpen(false)}
          onSelectMember={flyToMember}
        />
      )}

      {/* ── OVERLAY ROW: Members + Follow Me ───────────────────── */}
      <div style={{
        position: "absolute",
        top: headerH + 8,
        left: 8, right: 8,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 800,
        pointerEvents: "none",
      }}>
        {/* Members pill — hidden when panel is open, keeps its space */}
        <button
          onClick={() => setMembersOpen(v => !v)}
          style={{
            height: 44, borderRadius: 12, padding: "0 16px",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0px 0px 16px rgba(0,0,0,0.13)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10,
            pointerEvents: "auto",
            visibility: membersOpen ? "hidden" : "visible",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: "#6B7280", fontFamily: '"Google Sans", sans-serif' }}>
            Members
          </span>
          <AvatarStack members={activeCircle.members.slice(0, 3)} size={24} />
        </button>

        {/* Follow Me pill */}
        <button
          onClick={() => setFollowActive(v => !v)}
          style={{
            height: 44, width: 128, borderRadius: 12,
            padding: "0 14px",
            background: followActive ? "rgba(15,110,255,0.12)" : "rgba(255,255,255,0.8)",
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
          <Icon src="assets/icons/route.svg" size={20} color={followActive ? "#0F6EFF" : "#6B7280"} />
          <span style={{
            fontSize: 14, fontWeight: 700,
            color: followActive ? "#0F6EFF" : "#6B7280",
            fontFamily: '"Google Sans", sans-serif',
          }}>
            Follow Me
          </span>
        </button>
      </div>

      {/* ── MAP NAVIGATION CONTROLS ────────────────────────────── */}
      <div style={{
        position: "absolute",
        top: headerH + 8 + 44 + 12,
        right: 8,
        width: 44,
        borderRadius: 10,
        boxShadow: "0px 0px 16px rgba(0,0,0,0.13)",
        overflow: "hidden",
        zIndex: 800,
        pointerEvents: "auto",
      }}>
        <button style={{
          width: 44, height: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "none",
          borderBottom: "1px solid #F0F2F7",
          cursor: "pointer",
        }}>
          <Icon src="assets/icons/map-mode.svg" size={22} color="#6B7280" />
        </button>
        <button style={{
          width: 44, height: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "none", cursor: "pointer",
        }}>
          <Icon src="assets/icons/location-arrow.svg" size={22} color="#6B7280" />
        </button>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────
   CIRCLES SCREEN
───────────────────────────────────────────────── */
function CircleListItem({ circle, isActive, onSelect }) {
  return (
    <div
      onClick={() => onSelect(circle)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px",
        background: isActive ? "#F2F7FF" : "transparent",
        borderBottom: "1px solid #F0F2F7",
        cursor: "pointer",
        transition: "background 0.12s",
        minHeight: 80,
      }}
    >
      <CircleAvatar gradient={circle.gradient} size={56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#1B1E28", lineHeight: "22px" }}>
          {circle.name}
        </div>
        <div style={{ fontSize: 11, color: "#6B7280", marginTop: 3, fontWeight: 500 }}>
          {circle.type} · {circle.role}
        </div>
      </div>
      <AvatarStack members={circle.members.slice(0, 3)} size={22} />
    </div>
  );
}

function CircleListPanel({ selected, onSelect, isMobile }) {
  return (
    <div style={{
      width: isMobile ? "100%" : 360, height: "100%",
      background: "#fff",
      borderRight: isMobile ? "none" : "1px solid #E9E9E9",
      display: "flex", flexDirection: "column", flexShrink: 0,
    }}>
      {/* Panel header */}
      <div style={{
        height: 64, padding: "0 16px",
        display: "flex", alignItems: "center",
        borderBottom: "1px solid #F0F2F7", flexShrink: 0,
      }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: "#1B1E28" }}>Circles</span>
      </div>

      {/* Action buttons */}
      <div style={{
        display: "flex", gap: 8, padding: "16px 16px 12px",
        borderBottom: "1px solid #F0F2F7", flexShrink: 0,
      }}>
        <button style={{
          flex: 1, height: 44, borderRadius: 100,
          background: "#0F6EFF", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          fontSize: 15, fontWeight: 500, color: "#fff",
          transition: "background 0.15s",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
            <path d="M11.053 5.053H6.947V.947a.947.947 0 1 0-1.894 0v4.106H.947a.947.947 0 1 0 0 1.894h4.106v4.106a.947.947 0 1 0 1.894 0V6.947h4.106a.947.947 0 1 0 0-1.894Z"/>
          </svg>
          New circle
        </button>
        <button style={{
          flex: 1, height: 44, borderRadius: 100,
          background: "transparent", border: "none", cursor: "pointer",
          fontSize: 15, fontWeight: 500, color: "#0F6EFF",
        }}>
          Join with code
        </button>
      </div>

      {/* Circle list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {CIRCLES.map(c => (
          <CircleListItem key={c.id} circle={c} isActive={selected?.id === c.id} onSelect={onSelect} />
        ))}
        {/* Hint row */}
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

function CircleDetail({ circle, onBack, isMobile }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      background: "#F5F7FA", overflow: "hidden",
    }}>
      {/* Detail header */}
      <div style={{
        height: 64, background: "#fff",
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
        <span style={{ fontSize: 18, fontWeight: 700, color: "#1B1E28" }}>Edit Circle</span>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Info card */}
        <div style={{
          background: "#fff", borderRadius: 20,
          padding: "24px 20px 20px",
          display: "flex", flexDirection: "column", alignItems: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          marginBottom: 16,
        }}>
          <CircleAvatar gradient={circle.gradient} size={72} />
          <div style={{ marginTop: 14, fontSize: 24, fontWeight: 700, color: "#1B1E28" }}>
            {circle.name}
          </div>
          <div style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
            {circle.type} · {circle.role}
          </div>
          <button style={{
            marginTop: 16, height: 44, borderRadius: 100, padding: "0 24px",
            background: "#EBF2FF", border: "none", cursor: "pointer",
            fontSize: 15, fontWeight: 500, color: "#0F6EFF",
            transition: "background 0.15s",
          }}>
            + Invite people
          </button>
        </div>

        {/* Members card */}
        <div style={{
          background: "#fff", borderRadius: 16, overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          marginBottom: 16,
        }}>
          <div style={{
            padding: "14px 16px", borderBottom: "1px solid #F0F2F7",
            fontSize: 14, fontWeight: 700, color: "#1B1E28",
          }}>
            Members · {CIRCLE_MEMBERS_DETAIL.length}
          </div>
          {CIRCLE_MEMBERS_DETAIL.map((m, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 16px",
              borderBottom: i < CIRCLE_MEMBERS_DETAIL.length - 1 ? "1px solid #F0F2F7" : "none",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                background: m.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 700, color: "#fff",
              }}>
                {m.initial}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1B1E28" }}>{m.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 1 }}>{m.status}</div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#6B7280",
                background: "#F5F7FA", borderRadius: 100, padding: "3px 10px",
              }}>
                {m.role}
              </span>
            </div>
          ))}
        </div>

        {/* Leave */}
        <button style={{
          width: "100%", height: 44, borderRadius: 100,
          background: "#FFF0F0", border: "none", cursor: "pointer",
          fontSize: 15, fontWeight: 600, color: "#FF3B30",
          transition: "background 0.15s",
        }}>
          Leave Circle
        </button>
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
  const [view, setView] = useState("list"); // "list" | "detail" (mobile only)

  const handleSelect = (c) => {
    setSelected(c);
    if (isMobile) setView("detail");
  };

  if (isMobile) {
    return (
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {view === "detail" && selected ? (
          <CircleDetail circle={selected} onBack={() => setView("list")} isMobile={true} />
        ) : (
          <CircleListPanel selected={selected} onSelect={handleSelect} isMobile={true} />
        )}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <CircleListPanel selected={selected} onSelect={handleSelect} isMobile={false} />
      {selected ? (
        <CircleDetail circle={selected} isMobile={false} />
      ) : (
        <CirclesEmptyState />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   PLACEHOLDER for future screens
───────────────────────────────────────────────── */
function ComingSoon({ label }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F5F7FA", gap: 10,
    }}>
      <div style={{ fontSize: 32 }}>🚧</div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1B1E28" }}>{label}</div>
      <div style={{ fontSize: 14, color: "#9CA3AF" }}>Coming soon</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────
   DESIGN SYSTEM SCREEN
───────────────────────────────────────────────── */
const ALL_ICONS = [
  { id: "map",              label: "map" },
  { id: "circles",          label: "circles" },
  { id: "places",           label: "places" },
  { id: "chat",             label: "chat" },
  { id: "history",          label: "history" },
  { id: "settings",         label: "settings" },
  { id: "search",           label: "search" },
  { id: "chevron-right",    label: "chevron-right" },
  { id: "chevron-down",     label: "chevron-down" },
  { id: "filter",           label: "filter" },
  { id: "close",            label: "close" },
  { id: "bell-filled",      label: "bell-filled" },
  { id: "location-arrow",   label: "location-arrow" },
  { id: "map-mode",         label: "map-mode" },
  { id: "route",            label: "route" },
  { id: "drop",             label: "drop" },
  { id: "pic-circle-famify",label: "pic-circle-famify" },
];

const MEMBER_AVATARS = [
  { initial: "S", name: "Sara",    gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
  { initial: "B", name: "Ben",     gradient: "linear-gradient(135deg,#F857A6,#FF5858)" },
  { initial: "M", name: "Mom",     gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)" },
  { initial: "T", name: "Tanya",   gradient: "linear-gradient(135deg,#F0922A,#EFC03A)" },
  { initial: "D", name: "Dad",     gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)" },
  { initial: "A", name: "Alex",    gradient: "linear-gradient(135deg,#A18CD1,#FBC2EB)" },
  { initial: "J", name: "Julia",   gradient: "linear-gradient(135deg,#4F5BD5,#A44FD5)" },
];

const DS_GRADIENTS = [
  { name: "Sunrise", from: "#F0922A", to: "#EFC03A" },
  { name: "Violet",  from: "#9B87F5", to: "#7EC8E3" },
  { name: "Coral",   from: "#FF6B6B", to: "#FFA552" },
  { name: "Ocean",   from: "#0F6EFF", to: "#00C7BE" },
  { name: "Rose",    from: "#F857A6", to: "#FF5858" },
  { name: "Mint",    from: "#2DD16A", to: "#1EDEC2" },
  { name: "Dusk",    from: "#A18CD1", to: "#FBC2EB" },
  { name: "Indigo",  from: "#4F5BD5", to: "#A44FD5" },
];

const PLACE_TYPES = [
  { name: "Home",    gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
  { name: "Work",    gradient: "linear-gradient(135deg,#FF6B6B,#FFA552)" },
  { name: "School",  gradient: "linear-gradient(135deg,#2DD16A,#1EDEC2)" },
  { name: "Custom",  gradient: "linear-gradient(135deg,#9B87F5,#7EC8E3)" },
];

function DSSection({ title, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: "#9CA3AF",
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 20, paddingBottom: 10,
        borderBottom: "1px solid #F0F2F7",
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function DSLabel({ children }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, color: "#C5CBD7", marginBottom: 12, marginTop: 20 }}>
      {children}
    </div>
  );
}

function DSCheckbox({ label, defaultChecked = false, indeterminate = false, disabled = false, hoverStyle = false }) {
  const [checked, setChecked] = useState(defaultChecked);
  const [hovered, setHovered] = useState(false);
  const isHovered = hoverStyle || hovered;
  let bg = "#fff", border = "1px solid #E2E6EF";
  if (disabled)      { bg = "#F5F7FA"; border = "1px solid #E2E6EF"; }
  else if (checked)  { bg = "#0F6EFF"; border = "none"; }
  else if (isHovered){ bg = "#F0F5FF"; border = "1px solid #0F6EFF"; }
  return (
    <div onClick={() => !disabled && setChecked(v => !v)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: 8, cursor: disabled ? "default" : "pointer", userSelect: "none" }}>
      <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: bg, border, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        {checked && !indeterminate && (
          <svg width="11" height="8" viewBox="0 0 10.611 7.688" fill="white">
            <path d="M10.341 1.576L4.494 7.417C4.321 7.591 4.087 7.688 3.842 7.688c-.245 0-.48-.097-.653-.271L.27 4.496a.75.75 0 011.306-.75l2.266 2.268 5.193-5.189a.75.75 0 011.306.751z"/>
          </svg>
        )}
        {indeterminate && (
          <div style={{ width: 10, height: 2, borderRadius: 1, background: "#fff" }} />
        )}
      </div>
      <span style={{ fontSize: 15, color: disabled ? "#C5CBD7" : "#1B1E28" }}>{label}</span>
    </div>
  );
}

function DSCheckboxRow() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      <DSCheckbox label="Default" />
      <DSCheckbox label="Checked" defaultChecked={true} />
      <DSCheckbox label="Indeterminate" defaultChecked={false} indeterminate={true} />
      <DSCheckbox label="Disabled" disabled={true} />
      <DSCheckbox label="Hover" hoverStyle={true} />
    </div>
  );
}

function DSRadioGroup() {
  const [sel, setSel] = useState("option1");
  const [hovered, setHovered] = useState(null);
  const options = [
    { id: "option1", label: "Option 1" },
    { id: "option2", label: "Option 2" },
    { id: "option3", label: "Option 3" },
    { id: "disabled", label: "Disabled", disabled: true },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      {options.map(opt => {
        const isActive = sel === opt.id && !opt.disabled;
        const isHov = hovered === opt.id && !opt.disabled && !isActive;
        return (
          <div key={opt.id}
            onClick={() => !opt.disabled && setSel(opt.id)}
            onMouseEnter={() => setHovered(opt.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ display: "flex", alignItems: "center", gap: 8, cursor: opt.disabled ? "default" : "pointer", userSelect: "none" }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
              background: opt.disabled ? "#F5F7FA" : isHov ? "#F0F5FF" : "#fff",
              border: `1px solid ${isActive ? "#0F6EFF" : isHov ? "#0F6EFF" : "#E2E6EF"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>
              {isActive && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0F6EFF" }} />}
            </div>
            <span style={{ fontSize: 15, color: opt.disabled ? "#C5CBD7" : "#1B1E28" }}>{opt.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function DSInputField({ placeholder, defaultValue, iconSrc, disabled, error, errorMsg, autoFocusDemo }) {
  const [active, setActive] = useState(!!autoFocusDemo);
  const inputRef = React.useRef();
  const border = error
    ? "1px solid #FF3B30"
    : active ? "1px solid #0F6EFF" : "1px solid #E2E6EF";
  const bg = disabled ? "#F5F7FA" : "#fff";
  const iconColor = active ? "#0F6EFF" : "#9CA3AF";
  return (
    <div>
      <div
        onClick={() => !disabled && inputRef.current?.focus()}
        onMouseEnter={() => !disabled && !error && setActive(true)}
        onMouseLeave={() => { if (!inputRef.current || document.activeElement !== inputRef.current) setActive(false); }}
        style={{ height: 44, borderRadius: 12, border, background: bg, display: "flex", alignItems: "center", gap: 8, padding: "0 12px", transition: "border-color 0.15s", cursor: disabled ? "default" : "text" }}
      >
        {iconSrc && <Icon src={iconSrc} size={20} color={disabled ? "#C5CBD7" : iconColor} />}
        <input
          ref={inputRef}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: disabled ? "#C5CBD7" : "#1B1E28", background: "transparent", fontFamily: '"Google Sans", sans-serif' }}
        />
      </div>
      {errorMsg && <div style={{ fontSize: 12, color: "#FF3B30", marginTop: 4 }}>{errorMsg}</div>}
    </div>
  );
}

function DesignScreen() {
  const [togOn, setTogOn] = useState(true);
  const [copiedIcon, setCopiedIcon] = useState(null);

  const copyIcon = (id) => {
    navigator.clipboard?.writeText(`assets/icons/${id}.svg`);
    setCopiedIcon(id);
    setTimeout(() => setCopiedIcon(null), 1200);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F5F7FA" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 32px 64px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <img src="assets/logo-icon.svg" width="28" height="36" alt="" />
            <span style={{ fontSize: 28, fontWeight: 700, color: "#1B1E28" }}>FamSync Design System</span>
          </div>
          <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: "22px" }}>
            Living component library. Click icons to copy their path.
          </p>
        </div>

        {/* ── CHECKBOXES & RADIO ──────────────────────────────── */}
        <DSSection title="Checkboxes & Radio">
          <DSLabel>Checkbox States</DSLabel>
          <DSCheckboxRow />
          <DSLabel>Radio States</DSLabel>
          <DSRadioGroup />
        </DSSection>

        {/* ── INPUTS ─────────────────────────────────────────── */}
        <DSSection title="Inputs">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div style={{ minWidth: 280, flex: 1 }}>
              <DSLabel>Default</DSLabel>
              <DSInputField placeholder="Search Place" iconSrc="assets/icons/search.svg" />
            </div>
            <div style={{ minWidth: 280, flex: 1 }}>
              <DSLabel>Focus</DSLabel>
              <DSInputField placeholder="Type to search…" iconSrc="assets/icons/search.svg" autoFocusDemo />
            </div>
            <div style={{ minWidth: 280, flex: 1 }}>
              <DSLabel>Error</DSLabel>
              <DSInputField defaultValue="invalid@" error errorMsg="Invalid email address" />
            </div>
            <div style={{ minWidth: 280, flex: 1 }}>
              <DSLabel>Disabled</DSLabel>
              <DSInputField placeholder="Disabled input" disabled />
            </div>
          </div>
        </DSSection>

        {/* ── BUTTONS ─────────────────────────────────────────── */}
        <DSSection title="Buttons">
          <DSLabel>Primary</DSLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <button style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "#0F6EFF", border: "none", color: "#fff", fontSize: 15, fontWeight: 500 }}>New circle</button>
            <button style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "#EBF2FF", border: "none", color: "#0F6EFF", fontSize: 15, fontWeight: 500 }}>+ Invite people</button>
            <button style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "transparent", border: "none", color: "#0F6EFF", fontSize: 15, fontWeight: 500 }}>Join with code</button>
          </div>

          <DSLabel>Map Overlay Pills</DSLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", background: "#C8D9EE", padding: 16, borderRadius: 12 }}>
            <button style={{ height: 44, borderRadius: 12, padding: "0 16px", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)", border: "none", display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 700, color: "#6B7280" }}>
              Members
              <div style={{ display: "flex" }}>
                {MEMBER_AVATARS.slice(0, 3).map((m, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: m.gradient, border: "1.5px solid #fff", marginLeft: i === 0 ? 0 : -8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>{m.initial}</div>
                ))}
              </div>
            </button>
            <button style={{ height: 44, width: 128, borderRadius: 12, padding: "0 14px", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)", border: "none", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#6B7280" }}>
              <Icon src="assets/icons/route.svg" size={18} color="#6B7280" />
              Follow Me
            </button>
            <button style={{ height: 44, width: 128, borderRadius: 12, padding: "0 14px", background: "rgba(15,110,255,0.12)", backdropFilter: "blur(24px)", border: "1px solid rgba(15,110,255,0.4)", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#0F6EFF" }}>
              <Icon src="assets/icons/route.svg" size={18} color="#0F6EFF" />
              Follow Me
            </button>
          </div>

          <DSLabel>Danger</DSLabel>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "#FFF0F0", border: "none", color: "#FF3B30", fontSize: 15, fontWeight: 600 }}>Leave Circle</button>
            <button style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "#FF3B30", border: "none", color: "#fff", fontSize: 15, fontWeight: 600 }}>Delete</button>
          </div>

          <DSLabel>Toggle</DSLabel>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div onClick={() => setTogOn(v => !v)} style={{ width: 44, height: 26, borderRadius: 13, background: togOn ? "#0F6EFF" : "#E2E6EF", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: togOn ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </div>
            <span style={{ fontSize: 14, color: "#6B7280" }}>{togOn ? "On" : "Off"}</span>
          </div>
        </DSSection>

        {/* ── MEMBER AVATARS ───────────────────────────────────── */}
        <DSSection title="Member Avatars">
          <DSLabel>Sizes — 72 · 56 · 48 · 40 · 32 · 24</DSLabel>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
            {[72, 56, 48, 40, 32, 24].map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: s, height: s, borderRadius: "50%", background: "linear-gradient(135deg,#0F6EFF,#00C7BE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(s * 0.38), fontWeight: 700, color: "#fff" }}>S</div>
                <span style={{ fontSize: 10, color: "#9CA3AF" }}>{s}px</span>
              </div>
            ))}
          </div>

          <DSLabel>Gradient Palette</DSLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {MEMBER_AVATARS.map(m => (
              <div key={m.initial} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: m.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff" }}>{m.initial}</div>
                <span style={{ fontSize: 11, color: "#6B7280" }}>{m.name}</span>
              </div>
            ))}
          </div>

          <DSLabel>Stacked — 1 · 2 · 3 · 5+</DSLabel>
          <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { count: 1, label: "1" },
              { count: 2, label: "2" },
              { count: 3, label: "3" },
              { count: 5, label: "5+" },
            ].map(({ count, label }) => {
              const size = 36;
              const overlap = size * 0.35;
              const visible = MEMBER_AVATARS.slice(0, Math.min(count, 3));
              const extra = count > 3 ? count - 3 : 0;
              return (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "flex" }}>
                    {visible.map((m, i) => (
                      <div key={i} style={{
                        width: size, height: size, borderRadius: "50%",
                        background: m.gradient,
                        border: "2px solid #F5F7FA",
                        marginLeft: i === 0 ? 0 : -overlap,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700, color: "#fff",
                        zIndex: i + 1, position: "relative",
                      }}>{m.initial}</div>
                    ))}
                    {extra > 0 && (
                      <div style={{
                        width: size, height: size, borderRadius: "50%",
                        background: "#EBF2FF",
                        border: "2px solid #F5F7FA",
                        marginLeft: -overlap,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700, color: "#0F6EFF",
                        zIndex: 4, position: "relative",
                      }}>{extra}+</div>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{label} member{count > 1 ? "s" : ""}</span>
                </div>
              );
            })}
          </div>
        </DSSection>

        {/* ── CIRCLE AVATARS ───────────────────────────────────── */}
        <DSSection title="Circle Avatars">
          <DSLabel>Sizes — 72 · 56 · 48 · 40</DSLabel>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
            {[72, 56, 48, 40].map((s, idx) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <CircleAvatar gradient={`linear-gradient(135deg,${DS_GRADIENTS[idx].from},${DS_GRADIENTS[idx].to})`} size={s} />
                <span style={{ fontSize: 10, color: "#9CA3AF" }}>{s}px</span>
              </div>
            ))}
          </div>

          <DSLabel>All Gradients</DSLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {DS_GRADIENTS.map(g => (
              <div key={g.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <CircleAvatar gradient={`linear-gradient(135deg,${g.from},${g.to})`} size={56} />
                <span style={{ fontSize: 11, color: "#6B7280" }}>{g.name}</span>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── PLACE AVATARS ────────────────────────────────────── */}
        <DSSection title="Place Avatars">
          <DSLabel>Types</DSLabel>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {PLACE_TYPES.map(p => (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: p.gradient, border: "2px solid #fff", boxShadow: "0 4px 8px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #fff" }} />
                </div>
                <span style={{ fontSize: 11, color: "#6B7280", marginTop: 6 }}>{p.name}</span>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── ICONS ────────────────────────────────────────────── */}
        <DSSection title="Icons">
          <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 16 }}>Click to copy path</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {ALL_ICONS.map(ic => (
              <div
                key={ic.id}
                onClick={() => copyIcon(ic.id)}
                style={{
                  width: 88, padding: "14px 8px 12px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  borderRadius: 12, cursor: "pointer",
                  background: copiedIcon === ic.id ? "#EBF2FF" : "#fff",
                  border: `1px solid ${copiedIcon === ic.id ? "#0F6EFF" : "#F0F2F7"}`,
                  transition: "all 0.15s",
                }}
              >
                <Icon src={`assets/icons/${ic.id}.svg`} size={24} color={copiedIcon === ic.id ? "#0F6EFF" : "#1B1E28"} />
                <span style={{ fontSize: 10, color: copiedIcon === ic.id ? "#0F6EFF" : "#9CA3AF", textAlign: "center", lineHeight: "13px", fontWeight: copiedIcon === ic.id ? 600 : 400 }}>
                  {copiedIcon === ic.id ? "Copied!" : ic.label}
                </span>
              </div>
            ))}
          </div>
        </DSSection>

      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("map");
  const [activeCircle, setActiveCircle] = useState(CIRCLES[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const renderScreen = () => {
    switch (tab) {
      case "map":     return <MapScreen isMobile={isMobile} activeCircle={activeCircle} onCircleChange={setActiveCircle} />;
      case "circles": return <CirclesScreen isMobile={isMobile} />;
      case "chat":    return <ComingSoon label="Chat" />;
      case "history": return <ComingSoon label="History" />;
      case "settings":return <ComingSoon label="Settings" />;
      case "design":   return <DesignScreen />;
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {!isMobile && <SidebarNav activeTab={tab} onTabChange={setTab} />}
        {renderScreen()}
      </div>
      {isMobile && <BottomTabBar activeTab={tab} onTabChange={setTab} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
