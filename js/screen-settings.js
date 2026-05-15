/* ─── Settings screen ───────────────────────────────────────── */

const SETTINGS_NAV = [
  { id: "profile",    label: "Profile",             desc: "Name, avatar, contact info.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#0F6EFF" strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { id: "security",   label: "Security",            desc: "Password & login.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "identity",   label: "Safety & Emergency",  desc: "SOS, trusted contacts, safe check-ins, medical details, and identity alerts for the people in your Circles.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#0F6EFF" strokeWidth="1.8"/><path d="M3 9l9 6 9-6" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { id: "notifs",     label: "Notifications",       desc: "Push, quiet hours and per-event alerts.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { id: "privacy",    label: "Privacy & safety",    desc: "Pause sharing, ghost mode, precision.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "whocansee",  label: "Who can see me",      desc: "Revoke circle viewers at any time.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#0F6EFF" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="#0F6EFF" strokeWidth="1.8"/></svg> },
  { id: "accesslog",  label: "Location access log", desc: "Audit every time your location was viewed.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" stroke="#0F6EFF" strokeWidth="1.8"/><path d="M9 7h6M9 11h6M9 15h4" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { id: "emergency",  label: "Emergency contacts",  desc: "People we reach out to if something's wrong.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0F6EFF" strokeWidth="1.8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="17" r="0.8" fill="#0F6EFF"/></svg> },
  { id: "shareloc",   label: "Share live location", desc: "Public link with expiry for a one-off share.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "units",      label: "Units",               desc: "Metric or imperial.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0F6EFF" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#0F6EFF" strokeWidth="1.8"/></svg> },
  { id: "appearance", label: "Appearance",          desc: "Dark mode and theme.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "consent",    label: "Consent center",      desc: "Analytics, marketing, data retention.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#0F6EFF" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { id: "yourdata",   label: "Your data",           desc: "Export or delete everything we store.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="#0F6EFF" strokeWidth="1.8"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#0F6EFF" strokeWidth="1.8"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="#0F6EFF" strokeWidth="1.8"/></svg> },
];

/* ── Shared UI helpers ── */
function SLabel({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.07em", marginBottom: 10, marginTop: 24 }}>{children}</div>;
}
function SField({ label, value, onChange, placeholder, type = "text", readOnly }) {
  const [active, setActive] = useState(false);
  const inputRef = React.useRef();
  const border = (!readOnly && active) ? "1px solid #0F6EFF" : "1px solid #E2E6EF";
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28", marginBottom: 6 }}>{label}</div>
      <div
        onClick={() => !readOnly && inputRef.current?.focus()}
        onMouseEnter={() => !readOnly && setActive(true)}
        onMouseLeave={() => { if (!inputRef.current || document.activeElement !== inputRef.current) setActive(false); }}
        style={{ height: 44, borderRadius: 10, border, background: readOnly ? "#F5F7FA" : "#fff", display: "flex", alignItems: "center", padding: "0 14px", transition: "border-color 0.15s", cursor: readOnly ? "default" : "text" }}
      >
        <input
          ref={inputRef} type={type} value={value} onChange={onChange}
          placeholder={placeholder} readOnly={readOnly}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: readOnly ? "#9CA3AF" : "#1B1E28", background: "transparent", fontFamily: '"Google Sans", sans-serif' }}
        />
      </div>
    </div>
  );
}
function STextarea({ value, onChange, placeholder, minHeight = 64, style: extraStyle }) {
  const [hov, setHov]       = useState(false);
  const [focus, setFocus]   = useState(false);
  const border = (focus || hov) ? "1px solid #0F6EFF" : "1px solid #E2E6EF";
  return (
    <textarea
      value={value} onChange={onChange} placeholder={placeholder}
      onMouseEnter={() => setHov(true)}  onMouseLeave={() => setHov(false)}
      onFocus={() => setFocus(true)}     onBlur={() => { setFocus(false); setHov(false); }}
      style={{ width: "100%", minHeight, padding: "10px 12px", borderRadius: 10, border, fontSize: 14, color: "#1B1E28", outline: "none", resize: "vertical", fontFamily: '"Google Sans", sans-serif', boxSizing: "border-box", transition: "border-color 0.15s", ...extraStyle }}
    />
  );
}
function SSelect({ value, onChange, style: extraStyle, children }) {
  const [hov, setHov]     = useState(false);
  const [focus, setFocus] = useState(false);
  const border = (hov || focus) ? "1px solid #0F6EFF" : "1px solid #E2E6EF";
  const iconColor = (hov || focus) ? "#0F6EFF" : "#9CA3AF";
  return (
    <div style={{ position: "relative", display: "flex", ...extraStyle }}>
      <select
        value={value} onChange={onChange}
        onMouseEnter={() => setHov(true)}  onMouseLeave={() => setHov(false)}
        onFocus={() => setFocus(true)}     onBlur={() => { setFocus(false); setHov(false); }}
        style={{ flex: 1, height: 44, borderRadius: 12, border, padding: "0 36px 0 12px", fontSize: 14, color: "#1B1E28", outline: "none", fontFamily: '"Google Sans", sans-serif', background: "#fff", appearance: "none", transition: "border-color 0.15s", cursor: "pointer" }}
      >
        {children}
      </select>
      <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "flex", alignItems: "center" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
function SBtn({ children, onClick, danger, outline, disabled }) {
  const [hov, setHov] = useState(false);
  const bg = danger ? (hov ? "#E0322A" : "#FF3B30") : outline ? (hov ? "#F5F7FA" : "#fff") : (hov ? "#2563EB" : "#0F6EFF");
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ height: 44, borderRadius: 100, padding: "0 24px", background: bg, border: outline ? "1px solid #E2E6EF" : "none", color: (danger || !outline) ? "#fff" : "#1B1E28", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif', opacity: disabled ? 0.5 : 1 }}>
      {children}
    </button>
  );
}
function SToggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)} style={{ width: 44, height: 26, borderRadius: 100, background: on ? "#0F6EFF" : "#E2E6EF", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
    </div>
  );
}
function SCard({ children, title, danger }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: danger ? "none" : "0 1px 4px rgba(0,0,0,0.06)", border: danger ? "1px solid #FFCDD2" : "none", marginBottom: 16 }}>
      {title && (
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F2F7", fontSize: 17, fontWeight: 500, color: "#1B1E28", lineHeight: "20px", borderRadius: "16px 16px 0 0" }}>
          {title}
        </div>
      )}
      <div style={{ padding: 20 }}>
        {children}
      </div>
    </div>
  );
}
function SDetailShell({ title, desc, children }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#F5F7FA", padding: "28px 28px 40px" }}>
      <div style={{ maxWidth: 640, width: "100%", margin: "0 auto" }}>
        {desc && <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 24, lineHeight: "20px", textAlign: "center" }}>{desc}</div>}
        {children}
      </div>
    </div>
  );
}

/* ── Sessions data & row ── */
const SESSIONS = [
  { id: 1, device: "Safari (iOS)",              location: "Almaty, Almaty, KZ", created: "Apr 25, 2026, 12:40 AM", updated: "Apr 25, 2026, 12:40 AM", isCurrent: false },
  { id: 2, device: "Chrome (Mac OS X)",         location: "Almaty, Almaty, KZ", created: "Apr 21, 2026, 9:15 PM",  updated: "May 3, 2026, 10:05 PM",  isCurrent: false },
  { id: 3, device: "Safari (Mac OS X)",         location: "Almaty, Almaty, KZ", created: "Apr 21, 2026, 9:23 AM",  updated: "May 5, 2026, 12:11 PM",  isCurrent: true  },
  { id: 4, device: "Chrome (Mac OS X)",         location: "Almaty, Almaty, KZ", created: "Apr 21, 2026, 9:21 AM",  updated: "Apr 21, 2026, 9:21 AM",  isCurrent: false },
];
function SessionRow({ session, last }) {
  const [open, setOpen] = useState(false);
  const [hovMore, setHovMore] = useState(false);
  const [hovSignOut, setHovSignOut] = useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    if (!open) return;
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 32px", gap: 12, alignItems: "center", padding: "12px 16px", borderBottom: last ? "none" : "1px solid #F0F2F7" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span style={{ fontSize: 14, color: "#1B1E28", fontWeight: 500 }}>{session.device}</span>
        {session.isCurrent && (
          <span style={{ fontSize: 11, fontWeight: 600, color: "#0F6EFF", background: "#EEF4FF", borderRadius: 100, padding: "2px 8px", flexShrink: 0 }}>Current</span>
        )}
      </div>
      <div style={{ fontSize: 13, color: "#6B7280" }}>{session.location}</div>
      <div style={{ fontSize: 13, color: "#6B7280" }}>{session.updated}</div>
      <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
        <button
          onMouseEnter={() => setHovMore(true)}
          onMouseLeave={() => setHovMore(false)}
          onClick={() => setOpen(o => !o)}
          style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: hovMore || open ? "#F0F2F7" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5"  r="1.6" fill={hovMore || open ? "#0F6EFF" : "#9CA3AF"} />
            <circle cx="12" cy="12" r="1.6" fill={hovMore || open ? "#0F6EFF" : "#9CA3AF"} />
            <circle cx="12" cy="19" r="1.6" fill={hovMore || open ? "#0F6EFF" : "#9CA3AF"} />
          </svg>
        </button>
        {open && (
          <div style={{ position: "absolute", right: 0, top: 36, zIndex: 1100, background: "#fff", borderRadius: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)", minWidth: 190, overflow: "hidden", animation: "slideDown 0.12s ease" }}>
            <button
              onMouseEnter={() => setHovSignOut(true)}
              onMouseLeave={() => setHovSignOut(false)}
              onClick={() => setOpen(false)}
              style={{ width: "100%", height: 42, padding: "0 16px", border: "none", background: hovSignOut ? "#FFF5F5" : "#fff", textAlign: "left", display: "flex", alignItems: "center", fontSize: 16, fontWeight: 700, color: "#FF3B30", cursor: "pointer", transition: "background 0.12s", fontFamily: '"Google Sans", sans-serif' }}
            >Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Profile screen ── */
function ProfileScreen() {
  const [name, setName]  = useState("Sasha");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);
  const [hovAvatar, setHovAvatar] = useState(false);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <SDetailShell desc="Name, avatar, contact info.">
      <SCard title="Profile &amp; account">
        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#0F6EFF,#00C7BE)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>S</span>
          </div>
          <div>
            <button onMouseEnter={() => setHovAvatar(true)} onMouseLeave={() => setHovAvatar(false)} style={{ height: 36, borderRadius: 100, padding: "0 16px", background: hovAvatar ? "#F5F7FA" : "#fff", border: "1px solid #E2E6EF", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: '"Google Sans", sans-serif', transition: "background 0.15s" }}>Change avatar</button>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>PNG, JPG, WebP, or HEIC. We resize to 512×512 automatically.</div>
          </div>
        </div>
        <SField label="Email" value="sasha@heartify.io" readOnly />
        <SField label="Display name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        <SField label="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" type="tel" />
        <SBtn onClick={save}>{saved ? "Saved ✓" : "Save profile"}</SBtn>
      </SCard>

      <SCard title="Sessions">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 32px", gap: 12, padding: "0 16px 8px", borderBottom: "1px solid #F0F2F7", margin: "0 -20px" }}>
          <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>Device</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>Location</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>Updated</div>
          <div />
        </div>
        <div style={{ margin: "0 -20px" }}>
          {SESSIONS.map((s, i) => <SessionRow key={s.id} session={s} last={i === SESSIONS.length - 1} />)}
        </div>
        <div style={{ padding: "16px 0 4px" }}>
          <SBtn outline>Sign out of all devices</SBtn>
        </div>
      </SCard>

      <SCard title="Danger zone">
        <div style={{ fontSize: 13, color: "#6B7280", lineHeight: "18px", marginBottom: 16 }}>
          Soft delete hides your profile but retains data for 30 days. Hard delete removes your account and all data permanently.
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <SBtn outline>Soft delete account</SBtn>
          <SBtn danger>Delete account permanently</SBtn>
        </div>
      </SCard>
    </SDetailShell>
  );
}

/* ── Privacy & safety screen ── */
function PrivacyScreen() {
  const circles = CIRCLES.filter(c => !c.archived);
  const [sharing, setSharing] = useState(() => Object.fromEntries(circles.map(c => [c.id, true])));
  const [precision, setPrecision] = useState("precise");
  return (
    <SDetailShell desc="Pause sharing per circle, hide yourself entirely, or broadcast a lower-precision location.">
      <SCard>
        <SLabel>PER-CIRCLE SHARING</SLabel>
        {circles.map((c, i) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: i < circles.length - 1 ? "1px solid #F0F2F7" : "none" }}>
            <CircleAvatar gradient={c.gradient} icon={c.icon} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1B1E28" }}>{c.name}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{sharing[c.id] ? "Your live location is visible to this circle." : "Location sharing is paused."}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: sharing[c.id] ? "#0F6EFF" : "#9CA3AF", fontWeight: 600 }}>{sharing[c.id] ? "Sharing" : "Paused"}</span>
              <SToggle on={sharing[c.id]} onChange={v => setSharing(s => ({ ...s, [c.id]: v }))} />
            </div>
          </div>
        ))}
      </SCard>

      <SCard>
        <SLabel>PRECISION</SLabel>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1B1E28", marginBottom: 4 }}>Location precision</div>
          <div style={{ fontSize: 13, color: "#6B7280", lineHeight: "18px", marginBottom: 14 }}>Approximate mode snaps your location to a roughly 1 km grid before it leaves your device.</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["precise", "approximate"].map(v => {
              const active = precision === v;
              return (
                <button key={v} onClick={() => setPrecision(v)} style={{ height: 40, borderRadius: 100, padding: "0 20px", background: active ? "#0F6EFF" : "#fff", border: active ? "none" : "1px solid #E2E6EF", color: active ? "#fff" : "#1B1E28", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: '"Google Sans", sans-serif' }}>
                  {v === "precise" ? "Precise" : "Approximate (~1 km)"}
                </button>
              );
            })}
          </div>
        </div>
      </SCard>

      <SCard>
        <SLabel>PHONE-OFF EVENTS ON MY PHONE</SLabel>
        <div style={{ fontSize: 13, color: "#6B7280", lineHeight: "18px", marginBottom: 10 }}>Times when your phone was inferred to be off (extended silence + no push deliveries acknowledged). Visible only to you.</div>
        <div style={{ fontSize: 14, color: "#9CA3AF", fontStyle: "italic" }}>No phone-off events recorded.</div>
      </SCard>

      <SCard>
        <SLabel>WHO IS ALERTED ABOUT MY PHONE</SLabel>
        <div style={{ fontSize: 13, color: "#6B7280", lineHeight: "18px", marginBottom: 10 }}>People in your circles who have subscribed to your phone-safety signals. Alerts are off whenever you're paused or in ghost mode.</div>
        <div style={{ fontSize: 14, color: "#9CA3AF", fontStyle: "italic" }}>Nobody is currently subscribed.</div>
      </SCard>
    </SDetailShell>
  );
}

/* ── Notifications screen ── */
function NotificationsScreen() {
  const [push, setPush]   = useState(true);
  const [arrive, setArrive] = useState(true);
  const [leave, setLeave]   = useState(true);
  const [sos, setSos]       = useState(true);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd]     = useState("08:00");
  return (
    <SDetailShell desc="Push, quiet hours and per-event alerts.">
      <SCard>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1B1E28" }}>Push notifications</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>Receive alerts on this device</div>
          </div>
          <SToggle on={push} onChange={setPush} />
        </div>
      </SCard>

      <SCard>
        <SLabel>PER-EVENT ALERTS</SLabel>
        {[
          { label: "Member arrives at a place", val: arrive, set: setArrive },
          { label: "Member leaves a place",     val: leave,  set: setLeave },
          { label: "SOS / emergency trigger",   val: sos,    set: setSos },
        ].map((row, i, arr) => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: i < arr.length - 1 ? "1px solid #F0F2F7" : "none" }}>
            <div style={{ fontSize: 14, color: "#1B1E28" }}>{row.label}</div>
            <SToggle on={row.val} onChange={row.set} />
          </div>
        ))}
      </SCard>

      <SCard>
        <SLabel>QUIET HOURS</SLabel>
        <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 14 }}>No notifications will be sent during this window.</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 6 }}>From</div>
            <input type="time" value={quietStart} onChange={e => setQuietStart(e.target.value)} style={{ height: 40, borderRadius: 10, border: "1px solid #E2E6EF", padding: "0 12px", fontSize: 14, fontFamily: '"Google Sans", sans-serif', outline: "none" }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 6 }}>To</div>
            <input type="time" value={quietEnd} onChange={e => setQuietEnd(e.target.value)} style={{ height: 40, borderRadius: 10, border: "1px solid #E2E6EF", padding: "0 12px", fontSize: 14, fontFamily: '"Google Sans", sans-serif', outline: "none" }} />
          </div>
        </div>
      </SCard>
    </SDetailShell>
  );
}

/* ── Appearance screen ── */
function AppearanceScreen() {
  const [theme, setTheme] = useState("system");
  return (
    <SDetailShell desc="Dark mode and theme.">
      <SCard>
        <SLabel>COLOR SCHEME</SLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[["light", "Light"], ["dark", "Dark"], ["system", "Use system default"]].map(([val, label]) => (
            <div key={val} onClick={() => setTheme(val)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 10, background: theme === val ? "#E8F1FF" : "transparent", cursor: "pointer", transition: "background 0.15s" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${theme === val ? "#0F6EFF" : "#E2E6EF"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {theme === val && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0F6EFF" }} />}
              </div>
              <div style={{ fontSize: 15, fontWeight: theme === val ? 600 : 400, color: "#1B1E28" }}>{label}</div>
            </div>
          ))}
        </div>
      </SCard>
    </SDetailShell>
  );
}

/* ── Units screen ── */
function UnitsScreen() {
  const [unit, setUnit] = useState("metric");
  return (
    <SDetailShell desc="Metric or imperial.">
      <SCard>
        <SLabel>DISTANCE UNITS</SLabel>
        {[["metric", "Metric", "Kilometres, metres"], ["imperial", "Imperial", "Miles, feet"]].map(([val, label, sub]) => (
          <div key={val} onClick={() => setUnit(val)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: val === "metric" ? "1px solid #F0F2F7" : "none", cursor: "pointer" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${unit === val ? "#0F6EFF" : "#E2E6EF"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {unit === val && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#0F6EFF" }} />}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1B1E28" }}>{label}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{sub}</div>
            </div>
          </div>
        ))}
      </SCard>
    </SDetailShell>
  );
}

/* ── Safety & Emergency screen ── */
function SafetyPill({ active, onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        height: 32, padding: "0 14px", borderRadius: 100,
        background: active ? "#0F6EFF" : hov ? "#F0F4FF" : "#fff",
        border: active ? "none" : "1px solid #E2E6EF",
        color: active ? "#fff" : "#1B1E28",
        fontSize: 13, fontWeight: 600, cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s",
        fontFamily: '"Google Sans", sans-serif',
        display: "inline-flex", alignItems: "center", gap: 6,
      }}>
      {children}
    </button>
  );
}

function SafetyStatusCard({ title, valueBig, valueLabel, valueColor = "#1B1E28", sub }) {
  return (
    <div style={{ flex: "1 1 220px", minWidth: 0, background: "#fff", borderRadius: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 10 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        {valueBig && <div style={{ fontSize: 28, fontWeight: 700, color: valueColor, lineHeight: "32px" }}>{valueBig}</div>}
        {valueLabel && <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 400 }}>{valueLabel}</div>}
      </div>
      {sub && <div style={{ fontSize: 14, color: "#6B7280", marginTop: 8, lineHeight: "20px" }}>{sub}</div>}
    </div>
  );
}

function SafetyStat({ label, value, accent }) {
  return (
    <div style={{ flex: "1 1 140px", minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#9CA3AF" strokeWidth="1.6"/></svg>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent || "#1B1E28", lineHeight: "26px" }}>{value}</div>
    </div>
  );
}

function SafetyRowDivider() {
  return <div style={{ height: 1, background: "#F0F2F7", margin: "16px -20px" }} />;
}

function SafetyChannelPill({ label, ok }) {
  const bg    = ok === "warning" ? "#FFF8ED" : ok === false ? "#FFF0EF" : ok === true ? "#EAF7EE" : "#F0F4FF";
  const color = ok === "warning" ? "#FF9500" : ok === false ? "#FF3B30" : ok === true ? "#1F9D45" : "#0F6EFF";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color, background: bg, borderRadius: 100, padding: "3px 10px" }}>
      {label}
    </span>
  );
}

/* ── Audit log row (used inside Recent SOS) ── */
function AuditLogRow({ log }) {
  const isFailed = log.kind.toLowerCase().includes("failed");
  const isPushQ  = log.kind === "Push queued";
  const isQueued = log.kind.toLowerCase().includes("queued") || log.kind === "Agent handoff";
  const color    = isFailed ? "#FF3B30" : isPushQ ? "#34C55A" : isQueued ? "#FF9500" : "#9CA3AF";

  const icon = isFailed ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8v4M12 16h.01" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ) : isPushQ ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8"/>
      <path d="M8 12l3 3 5-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8"/>
      <path d="M12 7v5l3 2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 0" }}>
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>{icon}</div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#1B1E28", whiteSpace: "nowrap" }}>{log.kind}</span>
        {log.sub && (
          <>
            <span style={{ color: "#E2E6EF", flexShrink: 0 }}>·</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.sub}</span>
          </>
        )}
      </div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", flexShrink: 0, whiteSpace: "nowrap" }}>{log.when}</div>
    </div>
  );
}

/* ── SOS arming modal ── */
function SOSArmingModal({ onCancel, onSendNow, onTimeout }) {
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    if (seconds <= 0) { onTimeout(); return; }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);
  const [hovCancel, setHovCancel] = useState(false);
  const [hovSend, setHovSend]     = useState(false);
  return (
    <ModalBackdrop onClose={onCancel}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 24, width: 460, maxWidth: "calc(100vw - 32px)", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FFF0EF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v2M5.6 5.6l1.4 1.4M3 12h2M19 12h2M17 7l1.4-1.4M7 18a5 5 0 1 1 10 0H7z" stroke="#FF3B30" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1B1E28", marginBottom: 6 }}>Silent SOS arms in {seconds}s</div>
            <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px" }}>Contacts will receive your location, timestamp, and note.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onMouseEnter={() => setHovCancel(true)} onMouseLeave={() => setHovCancel(false)}
            onClick={onCancel}
            style={{ flex: 1, height: 48, borderRadius: 100, background: hovCancel ? "#F5F7FA" : "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif' }}>
            I'm okay
          </button>
          <button
            onMouseEnter={() => setHovSend(true)} onMouseLeave={() => setHovSend(false)}
            onClick={onSendNow}
            style={{ flex: 1, height: 48, borderRadius: 100, background: hovSend ? "#E0322A" : "#FF3B30", border: "none", fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif' }}>
            Send now
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

function SafetyScreen() {
  const circles = CIRCLES.filter(c => !c.archived);
  const [circleId, setCircleId] = useState(circles[0]?.id);
  const [note, setNote] = useState("");
  const [sosState, setSosState] = useState("idle"); // idle | arming | active
  const [sosStartedAt, setSosStartedAt] = useState(null);

  function startSosArming()  { setSosState("arming"); }
  function cancelSosArming() { setSosState("idle"); }
  function activateSos() {
    const d = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const h = d.getHours(), m = String(d.getMinutes()).padStart(2,"0");
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    setSosStartedAt(`${months[d.getMonth()]} ${d.getDate()}, ${h12}:${m} ${ampm}`);
    setSosState("active");
  }
  function endSos() { setSosState("idle"); setSosStartedAt(null); }
  const [name, setName] = useState("");
  const [rel, setRel]  = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [responderLink, setResponderLink] = useState("");
  const [blood, setBlood] = useState("");
  const [hospital, setHospital] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [meds, setMeds] = useState("");
  const [physician, setPhysician] = useState("");
  const [responderNotes, setResponderNotes] = useState("");
  const [checkInCircle, setCheckInCircle] = useState(circles[0]?.id);
  const [hovCreateLink, setHovCreateLink] = useState(false);
  const [hovAddEmail, setHovAddEmail] = useState(false);
  const [hovHere, setHovHere]   = useState(false);
  const [hovHelp, setHovHelp]   = useState(false);
  const [expandedLogs, setExpandedLogs] = useState({});

  const circle = circles.find(c => c.id === circleId) || circles[0];
  const memberCount = circle?.members.length || 0;

  const sosRows = [
    {
      active: true,
      time: "Started May 13, 4:34 PM",
      channels: [["Push 1", true], ["Email 0", null], ["SMS 0/1 failed", false]],
      failDetail: "May 13, 4:34 PM · jo · failed · Authenticate",
      logs: [
        { kind: "SMS failed",       when: "May 13, 4:34 PM", sub: "status: failed · contact name: jo · error: Authenticate" },
        { kind: "Push queued",      when: "May 13, 4:34 PM", sub: "status: queued · notification count: 1" },
        { kind: "Agent handoff",    when: "May 13, 4:34 PM", sub: "status: not_configured" },
        { kind: "Case started",     when: "May 13, 4:34 PM", sub: null },
        { kind: "Broadcast queued", when: "May 13, 4:34 PM", sub: null },
        { kind: "SMS queued",       when: "May 13, 4:34 PM", sub: "contact name: jo" },
      ],
    },
    {
      active: false,
      time: "Started Mar 12, 1:48 PM",
      channels: [["Push 1", true], ["Email 0", false], ["SMS 0/1 failed", false]],
      note: "Cancelled by user May 11, 1:52 PM",
      logs: [
        { kind: "Cancelled by user", when: "Mar 12, 1:52 PM", sub: null },
        { kind: "SMS failed",        when: "Mar 12, 1:48 PM", sub: "status: failed · contact name: jo" },
        { kind: "Push queued",       when: "Mar 12, 1:48 PM", sub: "status: queued · notification count: 1" },
        { kind: "Agent handoff",     when: "Mar 12, 1:48 PM", sub: "status: not_configured" },
      ],
    },
    {
      active: false,
      time: "Started Mar 11, 6:31 PM",
      channels: [["Push 1", true], ["Email 0", false], ["SMS 0/1 failed", false]],
      note: "Cancelled by user May 11, 6:34 PM",
      logs: [
        { kind: "Cancelled by user", when: "Mar 11, 6:34 PM", sub: null },
        { kind: "SMS failed",        when: "Mar 11, 6:31 PM", sub: "status: failed" },
        { kind: "Push queued",       when: "Mar 11, 6:31 PM", sub: "status: queued · notification count: 1" },
      ],
    },
  ];

  return (
    <SDetailShell desc="Fast, trusted contacts, safe check-ins, medical details, and identity alerts for the people in your Circles.">
      <SCard title="Safety &amp; Emergency">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <SBtn outline>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.92z" stroke="#1B1E28" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Fake call
            </span>
          </SBtn>
          <button
            onClick={startSosArming}
            disabled={sosState !== "idle"}
            style={{ height: 44, borderRadius: 100, padding: "0 24px", background: sosState === "idle" ? "#FF3B30" : "#F5A5A0", border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: sosState === "idle" ? "pointer" : "default", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif', display: "inline-flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { if (sosState === "idle") e.currentTarget.style.background = "#E0322A"; }}
            onMouseLeave={e => { if (sosState === "idle") e.currentTarget.style.background = "#FF3B30"; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Need help?
          </button>
        </div>
      </SCard>

      {/* Active SOS */}
      {sosState === "active" && (
        <SCard danger title="Active SOS">
          <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", marginBottom: 16 }}>
            Started {sosStartedAt}. Contacts were queued from the web flow.
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            <SBtn outline onClick={endSos}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#1B1E28" strokeWidth="1.8"/><path d="M8 12l3 3 5-6" stroke="#1B1E28" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                I'm safe
              </span>
            </SBtn>
            <SBtn outline onClick={endSos}>Mark false alarm</SBtn>
          </div>
          <SBtn danger onClick={endSos}>Cancel SOS</SBtn>
        </SCard>
      )}

      {/* Arming modal */}
      {sosState === "arming" && (
        <SOSArmingModal
          onCancel={cancelSosArming}
          onSendNow={activateSos}
          onTimeout={activateSos}
        />
      )}

      {/* Status row */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <SafetyStatusCard title="Contacts" valueBig="1" valueLabel="SOS recipients" />
        <SafetyStatusCard title="Location" valueLabel="Last known location" valueColor="#FF9500" sub="Sent only when you trigger a safety action." />
        <SafetyStatusCard title="Medical card" valueLabel="Not set" sub="Not filled in." />
      </div>

      {/* SOS broadcast */}
      <SCard title="SOS broadcast">
        <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", marginBottom: 16 }}>
          The web flow sends available push, SMS, and email alerts to your emergency contacts. Live-agent handoff only runs when a partner webhook is configured.
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28", marginBottom: 6 }}>Optional note</div>
        <STextarea value={note} onChange={e => setNote(e.target.value)} placeholder="I feel unsafe walking home. Please check on me." style={{ marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 160px" }}><SBtn danger>Silent SOS</SBtn></div>
          <div style={{ flex: "1 1 160px" }}><SBtn outline>I've fallen</SBtn></div>
          <div style={{ flex: "1 1 160px" }}><SBtn outline>I'm safe</SBtn></div>
        </div>
      </SCard>

      {/* Check-in */}
      <SCard title="Check-in">
        <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", marginBottom: 16 }}>
          Calm broadcasts for normal coordination.
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px" }}>
            <button
              onMouseEnter={() => setHovHere(true)} onMouseLeave={() => setHovHere(false)}
              style={{ width: "100%", height: 44, borderRadius: 100, background: hovHere ? "#F0F2F7" : "#fff", border: "1px solid #E2E6EF", color: "#1B1E28", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: '"Google Sans", sans-serif', display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.15s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#0F6EFF" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="#0F6EFF" strokeWidth="1.8"/></svg>
              I'm here
            </button>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <button
              onMouseEnter={() => setHovHelp(true)} onMouseLeave={() => setHovHelp(false)}
              style={{ width: "100%", height: 44, borderRadius: 100, background: hovHelp ? "#F0F2F7" : "#fff", border: "1px solid #E2E6EF", color: "#1B1E28", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: '"Google Sans", sans-serif', display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.15s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#FF9500" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              I need help
            </button>
          </div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28", marginBottom: 6 }}>Request check-in</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <SSelect value={checkInCircle} onChange={e => setCheckInCircle(Number(e.target.value))} style={{ flex: "1 1 220px" }}>
            {circles.map(c => <option key={c.id} value={c.id}>Select Circle member · {c.name}</option>)}
          </SSelect>
          <SBtn>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Request
            </span>
          </SBtn>
        </div>
      </SCard>

      {/* Emergency contacts */}
      <SCard title="Emergency contacts">
        <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", marginBottom: 14 }}>
          These contacts are personal to you. Circle admins cannot edit or remove them.
        </div>

        <SLabel>SUGGESTED FROM YOUR CIRCLE</SLabel>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {["Ella", "Test User", "Bella"].map(n => (
            <SafetyPill key={n}>+ Add {n}</SafetyPill>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", marginBottom: 18, lineHeight: "16px" }}>
          Members without a profile phone need to be added manually with phone or email.
        </div>

        {/* Existing contact */}
        <div style={{ border: "1px solid #F0F2F7", borderRadius: 12, padding: 14, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#F0922A,#EFC03A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>J</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1B1E28" }}>jo</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", marginTop: 2 }}>Circle member · <span style={{ color: "#9CA3AF" }}>scancascacscao</span></div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E2E6EF", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E2E6EF", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #FFCDD2", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="#FF3B30" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <SField label="Name"         value={name}  onChange={e => setName(e.target.value)}  placeholder="Alex Morgan" />
          <SField label="Relationship" value={rel}   onChange={e => setRel(e.target.value)}   placeholder="Parent" />
          <SField label="Phone"        value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 0120" type="tel" />
          <SField label="Email"        value={email} onChange={e => setEmail(e.target.value)} placeholder="alex@example.com" type="email" />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
          <SBtn>Add contact</SBtn>
        </div>
      </SCard>

      {/* Medical information */}
      <SCard title="Medical information">
        <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", marginBottom: 16 }}>
          Minimal responder details for emergency sharing. Keep sensitive identity documents out of this card.
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 240px", minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28", marginBottom: 6 }}>Public responder link</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", lineHeight: "16px", marginBottom: 8 }}>Anyone with this link can view every saved field on this medical card.</div>
            <input
              value={responderLink} onChange={e => setResponderLink(e.target.value)}
              placeholder="No link created"
              style={{ width: "100%", height: 40, borderRadius: 10, border: "1px solid #E2E6EF", padding: "0 12px", fontSize: 14, color: "#1B1E28", outline: "none", fontFamily: '"Google Sans", sans-serif', boxSizing: "border-box" }}
            />
          </div>
          <button
            onMouseEnter={() => setHovCreateLink(true)} onMouseLeave={() => setHovCreateLink(false)}
            style={{ height: 40, borderRadius: 100, padding: "0 18px", background: hovCreateLink ? "#F0F4FF" : "#fff", border: "1px solid #E2E6EF", color: "#0F6EFF", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: '"Google Sans", sans-serif', display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#0F6EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Create link
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <SField label="Blood type"         value={blood}    onChange={e => setBlood(e.target.value)}    placeholder="O+" />
          <SField label="Preferred hospital" value={hospital} onChange={e => setHospital(e.target.value)} placeholder="City General" />
        </div>

        {[
          ["Allergies",   allergies,  setAllergies,  "Peanuts, penicillin"],
          ["Conditions",  conditions, setConditions, "Asthma, diabetes"],
          ["Medications", meds,       setMeds,       "Albuterol inhaler"],
        ].map(([label, val, setter, ph]) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28", marginBottom: 6 }}>{label}</div>
            <STextarea value={val} onChange={e => setter(e.target.value)} placeholder={ph} minHeight={56} />
          </div>
        ))}

        <SField label="Primary physician" value={physician} onChange={e => setPhysician(e.target.value)} placeholder="Dr. Lee · +1 555 0112" />

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28", marginBottom: 6 }}>Responder notes</div>
          <STextarea value={responderNotes} onChange={e => setResponderNotes(e.target.value)} placeholder="Anything a responder should know" minHeight={56} />
        </div>

        <SBtn onClick={() => {}}>Save medical card</SBtn>
      </SCard>

      {/* Recent SOS */}
      <SCard title="Recent SOS Log">
        <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", marginBottom: 14 }}>
          Compact delivery status for the latest emergency cases.
        </div>
        {sosRows.map((r, i) => (
          <div key={i} style={{ padding: "14px 20px", margin: "0 -20px", borderTop: "1px solid #F0F2F7" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1B1E28" }}>{r.active ? "Active SOS" : "Cancelled SOS"}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", flexShrink: 0 }}>{r.time}</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: r.active ? 0 : 6 }}>
              {r.channels.map(([label, ok], j) => <SafetyChannelPill key={j} label={label} ok={ok} />)}
              <SafetyChannelPill label="Agent not configured" ok={r.active ? "warning" : undefined} />
            </div>
            {r.logs && r.logs.length > 0 && (() => {
              const expanded = !!expandedLogs[i];
              const visible  = expanded ? r.logs : [r.logs[0]];
              return (
                <div style={{ marginTop: 8 }}>
                  {visible.map((log, li) => (
                    <AuditLogRow key={li} log={log} />
                  ))}
                  {r.logs.length > 1 && (
                    <button
                      onClick={() => setExpandedLogs(s => ({ ...s, [i]: !s[i] }))}
                      style={{ marginTop: 4, background: "none", border: "none", color: "#0F6EFF", fontSize: 11, fontWeight: 700, cursor: "pointer", padding: "4px 0", fontFamily: '"Google Sans", sans-serif' }}
                    >
                      {expanded ? "Hide" : `Show all ${r.logs.length} events`}
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
        ))}
      </SCard>

    </SDetailShell>
  );
}

/* ── Generic placeholder ── */
function PlaceholderScreen({ item }) {
  return (
    <SDetailShell desc={item.desc}>
      <SCard>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0", gap: 10 }}>
          <div style={{ fontSize: 32 }}>🚧</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#1B1E28" }}>{item.label}</div>
          <div style={{ fontSize: 14, color: "#9CA3AF" }}>Coming soon</div>
        </div>
      </SCard>
    </SDetailShell>
  );
}

function SettingDetailHeader({ item, onBack, isMobile }) {
  return (
    <div style={{ height: isMobile ? 56 : 64, background: "#fff", borderBottom: "1px solid #F0F2F7", display: "flex", alignItems: "center", padding: "0 16px", gap: 4, flexShrink: 0 }}>
      {isMobile && (
        <button onClick={onBack} style={{ width: 40, height: 40, marginLeft: -8, marginRight: 4, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1B1E28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <span style={{ fontSize: 20, fontWeight: 500, color: "#1B1E28" }}>{item.label}</span>
    </div>
  );
}

function SettingDetailPanel({ item, onBack, isMobile }) {
  const content = (() => {
    switch (item.id) {
      case "profile":    return <ProfileScreen />;
      case "privacy":    return <PrivacyScreen />;
      case "notifs":     return <NotificationsScreen />;
      case "identity":   return <SafetyScreen />;
      case "appearance": return <AppearanceScreen />;
      case "units":      return <UnitsScreen />;
      default:           return <PlaceholderScreen item={item} />;
    }
  })();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
      <SettingDetailHeader item={item} onBack={onBack} isMobile={isMobile} />
      {content}
    </div>
  );
}

/* ── Left list ── */
function SettingsListItem({ item, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", cursor: "pointer", background: active ? "#F2F7FF" : hov ? "#F5F7FA" : "transparent", borderBottom: "1px solid #F0F2F7", transition: "background 0.15s", minHeight: 72 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: active ? "#E8F1FF" : "#F0F4FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {item.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#1B1E28" }}>{item.label}</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#C5CBD7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}

function SettingsListPanel({ selected, onSelect, isMobile }) {
  return (
    <div style={{ width: isMobile ? "100%" : 360, height: "100%", background: "#fff", borderRight: isMobile ? "none" : "1px solid #E9E9E9", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ height: isMobile ? 56 : 64, padding: "0 16px", display: "flex", alignItems: "center", borderBottom: "1px solid #F0F2F7", flexShrink: 0 }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: "#1B1E28" }}>Settings</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {SETTINGS_NAV.map(item => (
          <SettingsListItem key={item.id} item={item} active={selected?.id === item.id} onClick={() => onSelect(item)} />
        ))}
      </div>
    </div>
  );
}

function SettingsEmptyState() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F5F7FA", gap: 12 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EBF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#0F6EFF" strokeWidth="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#0F6EFF" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#1B1E28" }}>Select a setting</div>
      <div style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center", maxWidth: 220, lineHeight: "20px" }}>Choose a category from the list to configure it</div>
    </div>
  );
}

/* ── Main screen ── */
function SettingsScreen({ isMobile }) {
  const hashId = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  const hashItem = SETTINGS_NAV.find(i => i.id === hashId);
  const [selected, setSelected] = useState(hashItem || (isMobile ? null : SETTINGS_NAV[0]));
  const [view, setView] = useState(hashItem && isMobile ? "detail" : "list");

  function handleSelect(item) {
    setSelected(item);
    if (isMobile) setView("detail");
  }

  if (isMobile) {
    return (
      <div style={{ flex: 1, display: "flex", width: "100%", minWidth: 0, overflow: "hidden" }}>
        {view === "detail" && selected ? (
          <SettingDetailPanel key={selected.id} item={selected} onBack={() => setView("list")} isMobile={true} />
        ) : (
          <SettingsListPanel selected={selected} onSelect={handleSelect} isMobile={true} />
        )}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", width: "100%", minWidth: 0, overflow: "hidden" }}>
      <SettingsListPanel selected={selected} onSelect={handleSelect} isMobile={false} />
      {selected
        ? <SettingDetailPanel key={selected.id} item={selected} onBack={() => {}} isMobile={false} />
        : <SettingsEmptyState />
      }
    </div>
  );
}
