const CIRCLE_ICONS = [
  { file: "star 1.svg",     label: "Star" },
  { file: "home 1.svg",     label: "Home" },
  { file: "happy 1.svg",    label: "Happy" },
  { file: "work 1.svg",     label: "Work" },
  { file: "heart 1.svg",    label: "Heart" },
  { file: "user 1.svg",     label: "People" },
  { file: "pet 1.svg",      label: "Pet" },
  { file: "category 1.svg", label: "Category" },
];

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
  { id: "plus",             label: "plus" },
  { id: "minus",            label: "minus" },
  { id: "send",             label: "send" },
  { id: "route",            label: "route" },
  { id: "drop",             label: "drop" },
  { id: "profile",          label: "profile" },
  { id: "account-settings", label: "account-settings" },
  { id: "subscription",     label: "subscription" },
  { id: "logout",           label: "logout" },
  { id: "pic-circle-famify",  label: "pic-circle-famify" },
  { id: "pic-places-work",    label: "pic-places-work" },
];

const MEMBER_AVATARS = [
  { initial: "S", name: "Sasha",   gradient: "linear-gradient(135deg,#0F6EFF,#00C7BE)" },
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

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <img src="assets/logo-icon.svg" width="28" height="36" alt="" />
            <span style={{ fontSize: 28, fontWeight: 700, color: "#1B1E28" }}>FamSync Design System</span>
          </div>
          <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: "22px" }}>
            Living component library. Click icons to copy their path.
          </p>
        </div>

        {/* ── COLORS ──────────────────────────────────────────── */}
        <DSSection title="Colors">
          {[
            {
              label: "Brand",
              swatches: [
                { name: "Primary",       hex: "#0F6EFF", var: "--color-primary" },
                { name: "Primary Hover", hex: "#0D60E0", var: "--color-primary-hover" },
                { name: "Primary Light", hex: "#EBF2FF", var: "--color-primary-light", dark: true },
              ],
            },
            {
              label: "Text",
              swatches: [
                { name: "Primary",   hex: "#1B1E28", var: "--color-text-primary" },
                { name: "Secondary", hex: "#6B7280", var: "--color-text-secondary" },
                { name: "Tertiary",  hex: "#9CA3AF", var: "--color-text-tertiary" },
                { name: "Disabled",  hex: "#C5CBD7", var: "--color-text-disabled", dark: true },
                { name: "Inverse",   hex: "#FFFFFF",  var: "--color-text-inverse",  dark: true, border: true },
              ],
            },
            {
              label: "Surfaces & Neutrals",
              swatches: [
                { name: "White",   hex: "#FFFFFF", var: "--color-white",   dark: true, border: true },
                { name: "Surface", hex: "#F5F7FA", var: "--color-surface", dark: true },
                { name: "Border",  hex: "#E2E6EF", var: "--color-border",  dark: true },
                { name: "Divider", hex: "#F0F2F7", var: "--color-divider", dark: true },
                { name: "Dark",    hex: "#1B1E28", var: "--color-dark" },
              ],
            },
            {
              label: "Status",
              swatches: [
                { name: "Success", hex: "#34C55A", var: "--color-success" },
                { name: "Error",   hex: "#FF3B30", var: "--color-error" },
                { name: "Warning", hex: "#FF9500", var: "--color-warning" },
              ],
            },
          ].map(group => (
            <React.Fragment key={group.label}>
              <DSLabel>{group.label}</DSLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
                {group.swatches.map(s => (
                  <div key={s.name} style={{ display: "flex", flexDirection: "column", gap: 8, width: 112 }}>
                    <div style={{
                      height: 64, borderRadius: 12,
                      background: s.hex,
                      border: s.border ? "1px solid #E2E6EF" : "none",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                    }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", lineHeight: "18px" }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", fontFamily: "monospace", lineHeight: "16px" }}>{s.hex}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "monospace", lineHeight: "16px", marginTop: 1 }}>{s.var}</div>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}

          <DSLabel>Avatar Gradients</DSLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { name: "Sunrise", from: "#FFB347", to: "#FFD460" },
              { name: "Ocean",   from: "#0F6EFF", to: "#00C7BE" },
              { name: "Rose",    from: "#F857A6", to: "#FF5858" },
              { name: "Mint",    from: "#43E97B", to: "#38F9D7" },
              { name: "Violet",  from: "#9B87F5", to: "#7EC8E3" },
              { name: "Coral",   from: "#FF6B6B", to: "#FFA552" },
              { name: "Dusk",    from: "#A18CD1", to: "#FBC2EB" },
              { name: "Indigo",  from: "#4F5BD5", to: "#A44FD5" },
            ].map(g => (
              <div key={g.name} style={{ display: "flex", flexDirection: "column", gap: 8, width: 112 }}>
                <div style={{
                  height: 64, borderRadius: 12,
                  background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", lineHeight: "18px" }}>{g.name}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "monospace", lineHeight: "16px" }}>{g.from}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "monospace", lineHeight: "16px" }}>{g.to}</div>
                </div>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── TYPOGRAPHY ──────────────────────────────────────── */}
        <DSSection title="Typography">
          <DSLabel>Typeface — Google Sans (Variable 100–900)</DSLabel>
          <div style={{
            background: "#fff", borderRadius: 12, padding: "20px 24px",
            border: "1px solid #E2E6EF", marginBottom: 4,
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: "#1B1E28", letterSpacing: "-0.5px" }}>Aa</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1B1E28" }}>Google Sans</div>
              <div style={{ fontSize: 12, color: "#9CA3AF" }}>Variable · 100–900 · fonts/GoogleSans-Variable.ttf</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4, letterSpacing: "0.02em" }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ&nbsp;&nbsp;abcdefghijklmnopqrstuvwxyz&nbsp;&nbsp;0123456789
              </div>
            </div>
          </div>

          <DSLabel>Type Scale</DSLabel>
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E6EF", overflow: "hidden" }}>
            {[
              { label: "H1",            size: 32, weight: 700, lh: 40, color: "#12121A", cls: "fs-h1" },
              { label: "H2",            size: 24, weight: 700, lh: 32, color: "#12121A", cls: "fs-h2" },
              { label: "H3",            size: 20, weight: 500, lh: 28, color: "#12121A", cls: "fs-h3" },
              { label: "Headline",      size: 17, weight: 500, lh: 20, color: "#1B1E28", cls: "fs-headline" },
              { label: "Body",          size: 16, weight: 400, lh: 24, color: "#1B1E28", cls: "fs-body" },
              { label: "Body Bold",     size: 16, weight: 700, lh: 24, color: "#1B1E28", cls: "fs-body-bold" },
              { label: "Caption",       size: 14, weight: 400, lh: 20, color: "#6B7280", cls: "fs-caption" },
              { label: "Caption Bold",  size: 14, weight: 700, lh: 20, color: "#6B7280", cls: "fs-caption-bold" },
              { label: "Footnote",      size: 11, weight: 500, lh: 16, color: "#9CA3AF", cls: "fs-footnote" },
              { label: "Footnote Bold", size: 11, weight: 700, lh: 16, color: "#9CA3AF", cls: "fs-footnote-bold" },
            ].map((t, i, arr) => (
              <div key={t.label} style={{
                display: "flex", alignItems: "center",
                padding: "14px 20px",
                borderBottom: i < arr.length - 1 ? "1px solid #F0F2F7" : "none",
                gap: 16,
              }}>
                <div style={{ width: 180, flexShrink: 0 }}>
                  <span style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: t.lh + "px", color: t.color }}>
                    {t.label}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>{t.size}px</span>
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>/{t.lh}px</span>
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>w{t.weight}</span>
                  <span style={{ fontSize: 11, color: "#C5CBD7", fontFamily: "monospace" }}>.{t.cls}</span>
                </div>
              </div>
            ))}
          </div>
        </DSSection>

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
            {[
              { label: "New circle",      bg: "#0F6EFF", bgHover: "#2563EB", color: "#fff",    border: "none" },
              { label: "+ Invite people", bg: "#fff",    bgHover: "#F0F2F7", color: "#1B1E28", border: "1px solid #E2E6EF" },
              { label: "Join with code",  bg: "#fff",    bgHover: "#F0F2F7", color: "#1B1E28", border: "1px solid #E2E6EF" },
            ].map(btn => {
              const [hov, setHov] = React.useState(false);
              return (
                <button key={btn.label}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    height: 44, borderRadius: 100, padding: "0 24px",
                    background: hov ? btn.bgHover : btn.bg,
                    border: btn.border, color: btn.color,
                    fontSize: 16, fontWeight: 700, cursor: "pointer",
                    transition: "background 0.15s",
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >{btn.label}</button>
              );
            })}
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
            <button style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "#FFF0F0", border: "none", color: "#FF3B30", fontSize: 16, fontWeight: 700 }}>Leave Circle</button>
            <button style={{ height: 44, borderRadius: 100, padding: "0 24px", background: "#FF3B30", border: "none", color: "#fff", fontSize: 16, fontWeight: 700 }}>Delete</button>
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

          <DSLabel>Stacked — 1 · 2 · 3 · 4 · 5+</DSLabel>
          <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { count: 1, label: "1" },
              { count: 2, label: "2" },
              { count: 3, label: "3" },
              { count: 4, label: "4" },
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
                      }}>+{extra}</div>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{label} member{count > 1 ? "s" : ""}</span>
                </div>
              );
            })}
          </div>

          <DSLabel>Stacked 24px — 1 · 2 · 3 · 4 · 5+</DSLabel>
          <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { count: 1, label: "1" },
              { count: 2, label: "2" },
              { count: 3, label: "3" },
              { count: 4, label: "4" },
              { count: 5, label: "5+" },
            ].map(({ count, label }) => {
              const size = 24;
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
                        fontSize: 9, fontWeight: 700, color: "#fff",
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
                        fontSize: 8, fontWeight: 700, color: "#0F6EFF",
                        zIndex: 4, position: "relative",
                      }}>+{extra}</div>
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
                <CircleAvatar gradient={`linear-gradient(135deg,${DS_GRADIENTS[idx].from},${DS_GRADIENTS[idx].to})`} icon={`assets/icons/circles/${CIRCLE_ICONS[idx].file}`} size={s} />
                <span style={{ fontSize: 10, color: "#9CA3AF" }}>{s}px</span>
              </div>
            ))}
          </div>
          <DSLabel>All Icons</DSLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {CIRCLE_ICONS.map((ci, idx) => (
              <div key={ci.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <CircleAvatar gradient={`linear-gradient(135deg,${DS_GRADIENTS[idx].from},${DS_GRADIENTS[idx].to})`} icon={`assets/icons/circles/${ci.file}`} size={56} />
                <span style={{ fontSize: 11, color: "#6B7280" }}>{ci.label}</span>
              </div>
            ))}
          </div>
        </DSSection>

        {/* ── PLACES AVATARS ───────────────────────────────────── */}
        <DSSection title="Places Avatars">
          <DSLabel>Sizes — 56 · 40 · 32</DSLabel>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
            {[56, 40, 32].map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <PlacesAvatar gradient={PLACE_ICON_DEFS.home.gradient} icon={`assets/icons/places/${PLACE_ICON_DEFS.home.file}`} size={s} />
                <span style={{ fontSize: 10, color: "#9CA3AF" }}>{s}px</span>
              </div>
            ))}
          </div>
          <DSLabel>All Variants — 56px</DSLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {PLACE_ICON_KEYS.map(key => (
              <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <PlacesAvatar gradient={PLACE_ICON_DEFS[key].gradient} icon={`assets/icons/places/${PLACE_ICON_DEFS[key].file}`} size={56} />
                <span style={{ fontSize: 11, color: "#6B7280" }}>{PLACE_ICON_DEFS[key].label}</span>
              </div>
            ))}
          </div>
          <DSLabel>All Variants — 40px</DSLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {PLACE_ICON_KEYS.map(key => (
              <PlacesAvatar key={key} gradient={PLACE_ICON_DEFS[key].gradient} icon={`assets/icons/places/${PLACE_ICON_DEFS[key].file}`} size={40} />
            ))}
          </div>
          <DSLabel>All Variants — 32px</DSLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {PLACE_ICON_KEYS.map(key => (
              <PlacesAvatar key={key} gradient={PLACE_ICON_DEFS[key].gradient} icon={`assets/icons/places/${PLACE_ICON_DEFS[key].file}`} size={32} />
            ))}
          </div>
        </DSSection>

        {/* ── TOAST NOTIFICATIONS ──────────────────────────────── */}
        <DSSection title="Toast Notifications">
          <DSLabel>Variants</DSLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 380 }}>
            {[
              { type: "success", message: "Location shared with your circle" },
              { type: "warning", message: "Your location isn't updating" },
              { type: "error",   message: "Failed to load family members" },
            ].map(({ type, message }) => {
              const bg = { success: "#34C55A", warning: "#FF9500", error: "#FF3B30" }[type];
              return (
                <div key={type} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: bg, color: "#fff", borderRadius: 14,
                  padding: "12px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                  fontSize: 15, fontWeight: 500,
                  fontFamily: '"Google Sans", sans-serif',
                }}>
                  <span style={{ flex: 1, lineHeight: "20px" }}>{message}</span>
                  <div style={{
                    background: "rgba(255,255,255,0.25)", borderRadius: "50%",
                    width: 24, height: 24, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
                  }}>✕</div>
                </div>
              );
            })}
          </div>

          <DSLabel>Live Demo — click to trigger</DSLabel>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { type: "success", label: "Success", msg: "Location shared with your circle" },
              { type: "warning", label: "Warning", msg: "Your location isn't updating" },
              { type: "error",   label: "Error",   msg: "Failed to load family members" },
            ].map(({ type, label, msg }) => {
              const [hov, setHov] = React.useState(false);
              const bg      = { success: "#34C55A", warning: "#FF9500", error: "#FF3B30" }[type];
              const bgHover = { success: "#2AAF4E", warning: "#E08500", error: "#E0322A" }[type];
              return (
                <button key={type}
                  onClick={() => window.showToast && window.showToast(msg, type)}
                  onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{
                    height: 44, borderRadius: 100, padding: "0 24px",
                    background: hov ? bgHover : bg,
                    border: "none", color: "#fff",
                    fontSize: 16, fontWeight: 700, cursor: "pointer",
                    transition: "background 0.15s",
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >{label}</button>
              );
            })}
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
