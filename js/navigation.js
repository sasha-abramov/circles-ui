const NAV_ITEMS = [
  { id: "map",      label: "Map",      icon: "assets/icons/map.svg",         href: "Map.html" },
  { id: "circles",  label: "Circles",  icon: "assets/icons/circles.svg",     href: "Circles.html" },
  { id: "places",   label: "Places",   icon: "assets/icons/places.svg",      href: "Places.html" },
  { id: "chat",     label: "Chat",     icon: "assets/icons/chat.svg",        href: "Chat.html", unread: 2 },
  { id: "history",  label: "History",  icon: "assets/icons/history.svg",     href: "History.html" },
  { id: "activity", label: "Activity", icon: "assets/icons/bell-filled.svg", href: "Activity.html" },
  { id: "design",   label: "Design",   icon: "assets/icons/drop.svg",        href: "Design.html", desktopOnly: true },
];
const SETTINGS_ITEM = { id: "settings", label: "Settings", icon: "assets/icons/settings.svg", href: "Settings.html" };
const ALL_TABS = [...NAV_ITEMS.filter(t => !t.desktopOnly), SETTINGS_ITEM];

function isActivePage(href) {
  const pathname = window.location.pathname;
  if (pathname.endsWith(href)) return true;
  const hrefBase = href.replace(/\.html$/i, "").toLowerCase();
  const pathBase = pathname.split("/").pop().toLowerCase();
  return pathBase === hrefBase;
}

function NavButton({ item }) {
  const [hovered, setHovered] = React.useState(false);
  const active = isActivePage(item.href);
  const color = active ? "#0F6EFF" : hovered ? "#6B7280" : "#9CA3AF";
  return (
    <a
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 72, height: 58,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 3,
        borderRadius: 10, margin: "0 4px",
        background: "transparent", textDecoration: "none",
        padding: "8px 0", transition: "background 0.15s",
      }}
    >
      <div style={{ position: "relative", width: 24, height: 24 }}>
        <Icon src={item.icon} size={24} color={color} />
        {item.unread && (
          <div style={{
            position: "absolute", top: -4, right: -6,
            width: 18, height: 18, borderRadius: "50%",
            background: "#0F6EFF", border: "2px solid #fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 700, color: "#fff",
          }}>
            {item.unread}
          </div>
        )}
      </div>
      <span style={{
        fontSize: 11, fontWeight: 500, lineHeight: "16px",
        color, transition: "color 0.15s",
      }}>
        {item.label}
      </span>
    </a>
  );
}

function SidebarNav() {
  const designItem = NAV_ITEMS.find(t => t.id === "design");
  return (
    <nav style={{
      width: 80, height: "100%", background: "#fff",
      borderRight: "1px solid #F0F2F7",
      display: "flex", flexDirection: "column", alignItems: "center",
      flexShrink: 0, zIndex: 20,
    }}>
      <a href="Map.html" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 80, height: 64, flexShrink: 0 }}>
        <Logo />
      </a>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        width: "100%", alignItems: "center", paddingTop: 8, gap: 4,
      }}>
        {NAV_ITEMS.filter(t => !t.desktopOnly).map(item => (
          <NavButton key={item.id} item={item} />
        ))}
      </div>
      <div style={{ paddingBottom: 12, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        {designItem && <NavButton item={designItem} />}
        <NavButton item={SETTINGS_ITEM} />
      </div>
    </nav>
  );
}

function BottomTabBarButton({ item }) {
  const [hovered, setHovered] = React.useState(false);
  const active = isActivePage(item.href);
  return (
    <a
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 2,
        background: hovered && !active ? "#F5F7FA" : "none",
        padding: "8px 0",
        textDecoration: "none",
        transition: "background 0.15s",
      }}
    >
      <div style={{ position: "relative", width: 24, height: 24 }}>
        <Icon src={item.icon} size={24} color={active ? "#0F6EFF" : "#9CA3AF"} />
        {item.unread && (
          <div style={{
            position: "absolute", top: -4, right: -6,
            width: 18, height: 18, borderRadius: "50%",
            background: "#0F6EFF", border: "2px solid #fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 700, color: "#fff",
          }}>
            {item.unread}
          </div>
        )}
      </div>
      <span style={{
        fontSize: 11, fontWeight: 500,
        color: active ? "#0F6EFF" : "#9CA3AF",
      }}>
        {item.label}
      </span>
    </a>
  );
}

function BottomTabBar() {
  return (
    <div style={{
      height: 56, background: "#fff", borderTop: "1px solid #F0F2F7",
      display: "flex", flexShrink: 0, zIndex: 100,
    }}>
      {NAV_ITEMS.filter(t => !t.desktopOnly).map(item => (
        <BottomTabBarButton key={item.id} item={item} />
      ))}
    </div>
  );
}
