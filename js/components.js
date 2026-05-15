const placeIcon = (key) => `assets/icons/places/${(PLACE_ICON_DEFS[key] || PLACE_ICON_DEFS.home).file}`;

/* Icon with CSS color filter */
function Icon({ src, size = 24, color = "#9CA3AF" }) {
  const filters = {
    "#0F6EFF": "invert(33%) sepia(99%) saturate(2000%) hue-rotate(207deg) brightness(100%) contrast(104%)",
    "#1B1E28": "invert(9%) sepia(14%) saturate(700%) hue-rotate(192deg) brightness(35%) contrast(95%)",
    "#6B7280": "invert(47%) sepia(7%) saturate(600%) hue-rotate(180deg) brightness(90%)",
    "#9CA3AF": "invert(70%) sepia(6%) saturate(400%) hue-rotate(180deg) brightness(95%)",
    "#22C55E": "invert(62%) sepia(60%) saturate(500%) hue-rotate(95deg) brightness(95%)",
    "#FF3B30": "invert(26%) sepia(95%) saturate(2000%) hue-rotate(348deg) brightness(108%) contrast(101%)",
    "#fff":    "brightness(0) invert(1)",
    "#ffffff": "brightness(0) invert(1)",
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

let _paIdx = 0;
function PlacesAvatar({ gradient, icon, size = 56 }) {
  const colors = (gradient.match(/#[0-9a-fA-F]{3,6}/g) || ["#F0922A", "#EFC03A"]);
  const from = colors[0] || "#F0922A";
  const to   = colors[1] || from;
  const iconSize = size === 32 ? 16 : size === 40 ? 20 : size === 56 ? 24 : Math.round(size * 0.43);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: "1px solid transparent",
      background:
        `linear-gradient(135deg, ${from}1A, ${to}1A) padding-box, ` +
        `linear-gradient(#fff, #fff) padding-box, ` +
        `linear-gradient(135deg, ${from}, ${to}) border-box`,
      flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxSizing: "border-box",
    }}>
      {icon && (
        <img src={icon} width={iconSize} height={iconSize} alt="" style={{ display: "block" }} />
      )}
    </div>
  );
}

let _caIdx = 0;
function CircleAvatar({ gradient, icon, initial, size = 56 }) {
  const id = React.useRef(`ca-${_caIdx++}`).current;
  const iconSize = Math.round(size * 0.52);
  const colors = (gradient.match(/#[0-9a-fA-F]{3,6}/g) || ["#0F6EFF", "#00C7BE"]);
  const from = colors[0] || "#0F6EFF";
  const to   = colors[1] || from;
  const bgGradient = initial
    ? `linear-gradient(135deg, ${from}, ${to})`
    : `linear-gradient(135deg, ${from}4D, ${to}4D)`;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bgGradient,
      flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {icon ? (
        <img src={icon} width={iconSize} height={iconSize} alt="" style={{ display: "block" }} />
      ) : initial ? (
        <span style={{ fontSize: Math.round(size * 0.4), fontWeight: 700, color: "#fff", lineHeight: 1 }}>{initial}</span>
      ) : (
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
      )}
    </div>
  );
}

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
          +{extra}
        </div>
      )}
    </div>
  );
}

function Logo() {
  return (
    <img src="assets/logo-icon.svg" width="32" height="40" alt="FamSync" style={{ display: "block" }} />
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

function CloseBtn({ onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32, height: 32, borderRadius: "50%",
        background: hovered ? "#E9ECF2" : "#F5F7FA",
        border: "none", cursor: "pointer", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#6B7280", fontSize: 16,
        transition: "background 0.15s",
      }}
    >✕</button>
  );
}

function InvitePeopleModal({ onClose, circle, isMobile }) {
  const INVITE_CODE = "8Y6V6T";
  const SHARE_LINK  = `https://famsync.app/join?code=${INVITE_CODE}`;
  const [codeCopied, setCodeCopied]   = React.useState(false);
  const [linkCopied, setLinkCopied]   = React.useState(false);
  const [hovCopyCode, setHovCopyCode] = React.useState(false);
  const [hovCopyLink, setHovCopyLink] = React.useState(false);
  const [hovGenerate, setHovGenerate] = React.useState(false);
  const qrRef = React.useRef();

  React.useEffect(() => {
    if (!qrRef.current || typeof QRCode === "undefined") return;
    qrRef.current.innerHTML = "";
    new QRCode(qrRef.current, {
      text: SHARE_LINK,
      width: 200, height: 200,
      colorDark: "#1B1E28", colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
  }, [SHARE_LINK]);

  const copy = (text, setter) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const inner = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      {/* QR code */}
      <div style={{ marginBottom: 24 }}>
        <div ref={qrRef} />
      </div>

      {/* Big invite code — H1: 32/700 */}
      <div style={{ fontSize: 32, fontWeight: 700, color: "#1B1E28", letterSpacing: "0.18em", marginBottom: 8, lineHeight: "40px" }}>
        {INVITE_CODE}
      </div>

      {/* Share link — Body: 16/400 */}
      <div style={{ fontSize: 16, fontWeight: 400, lineHeight: "24px", color: "#6B7280", marginBottom: 24, textAlign: "center" }}>
        {SHARE_LINK}
      </div>

      {/* Two copy buttons */}
      <div style={{ display: "flex", gap: 10, width: "100%", marginBottom: 20 }}>
        <button
          onClick={() => copy(INVITE_CODE, setCodeCopied)}
          onMouseEnter={() => setHovCopyCode(true)}
          onMouseLeave={() => setHovCopyCode(false)}
          style={{ flex: 1, height: 44, borderRadius: 100, padding: "0 24px", background: codeCopied ? "#16A34A" : hovCopyCode ? "#2563EB" : "#0F6EFF", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "#fff", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif', display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
        >
          {codeCopied ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Copied!</>) : "Copy code"}
        </button>
        <button
          onClick={() => copy(SHARE_LINK, setLinkCopied)}
          onMouseEnter={() => setHovCopyLink(true)}
          onMouseLeave={() => setHovCopyLink(false)}
          style={{ flex: 1, height: 44, borderRadius: 100, padding: "0 24px", background: linkCopied ? "#16A34A" : hovCopyLink ? "#2563EB" : "#0F6EFF", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "#fff", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif', display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
        >
          {linkCopied ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Copied!</>) : "Copy link"}
        </button>
      </div>

      {/* Expires · Generate new invite */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "#9CA3AF" }}>Expires 05.05.2026 ·</span>
        <button
          onMouseEnter={() => setHovGenerate(true)}
          onMouseLeave={() => setHovGenerate(false)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, lineHeight: "20px", color: hovGenerate ? "#0D60E0" : "#0F6EFF", transition: "color 0.15s", fontFamily: '"Google Sans", sans-serif', padding: 0 }}
        >Generate new invite</button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 1001, background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 56, background: "#fff", borderBottom: "1px solid #E9E9E9", display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1B1E28", flex: 1 }}>Invite people</span>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
            <div style={{ width: "100%", maxWidth: 400 }}>
              {inner}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: 420, background: "#fff", borderRadius: 20,
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      padding: "28px 28px 24px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#1B1E28" }}>Invite people</span>
        <CloseBtn onClick={onClose} />
      </div>
      {inner}
    </div>
  );
}

function InvalidInviteModal({ onClose }) {
  const [hovBtn, setHovBtn] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      {/* Icon */}
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#FFF0F0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" fill="#FF3B30" d="m5.0721 9c2.27358-3.93796 3.41037-5.90694 4.89452-6.56773 1.29448-.57636 2.77278-.57636 4.06728 0 1.4842.66079 2.621 2.62977 4.8946 6.56773 2.2735 3.938 3.4103 5.9069 3.2405 7.5226-.1481 1.4093-.8872 2.6896-2.0337 3.5225-1.3143.9549-3.5879.9549-8.135.9549-4.54717 0-6.82075 0-8.13508-.9549-1.14641-.8329-1.88556-2.1132-2.03368-3.5225-.16982-1.6157.96697-3.5846 3.24056-7.5226zm6.9281-2.75c.4142 0 .75.33579.75.75v6c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-6c0-.41421.3358-.75.75-.75zm0 10.75c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1z"/>
        </svg>
      </div>
      {/* Title */}
      <div style={{ fontSize: 20, fontWeight: 700, color: "#1B1E28", lineHeight: "28px", marginBottom: 10 }}>
        Invite is no longer valid
      </div>
      {/* Description */}
      <div style={{ fontSize: 16, fontWeight: 400, color: "#6B7280", lineHeight: "24px", marginBottom: 28, maxWidth: 320 }}>
        The invite code or link is incorrect or has already expired. Ask the circle admin to send you a new one.
      </div>
      {/* Button */}
      <button
        onMouseEnter={() => setHovBtn(true)}
        onMouseLeave={() => setHovBtn(false)}
        onClick={onClose}
        style={{ width: "100%", height: 44, borderRadius: 100, background: hovBtn ? "#2563EB" : "#0F6EFF", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "#fff", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif' }}
      >Got it</button>
    </div>
  );
}

function ModalBackdrop({ onClose, children, align = "center" }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: align === "bottom" ? "flex-end" : "center",
        justifyContent: "center",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ width: align === "bottom" ? "100%" : "auto" }}>{children}</div>
    </div>
  );
}

function ConfirmModal({ title, highlightName, description, confirmLabel, tone = "danger", onConfirm, onClose, isMobile }) {
  const [hovCancel, setHovCancel]   = React.useState(false);
  const [hovConfirm, setHovConfirm] = React.useState(false);
  const isDanger = tone === "danger";
  const confirmBg      = isDanger ? "#FF3B30" : "#0F6EFF";
  const confirmBgHover = isDanger ? "#E0322A" : "#2563EB";

  const content = (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, color: "#1B1E28" }}>{title}</span>
        {!isMobile && <CloseBtn onClick={onClose} />}
      </div>
      {description && (
        <div style={{ fontSize: 14, fontWeight: 400, color: "#6B7280", lineHeight: "20px", marginBottom: 28 }}>
          {description}
        </div>
      )}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onMouseEnter={() => setHovCancel(true)}
          onMouseLeave={() => setHovCancel(false)}
          onClick={onClose}
          style={{ flex: 1, height: 48, borderRadius: 100, background: hovCancel ? "#F5F7FA" : "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif' }}
        >Cancel</button>
        <button
          onMouseEnter={() => setHovConfirm(true)}
          onMouseLeave={() => setHovConfirm(false)}
          onClick={() => { onConfirm && onConfirm(); onClose && onClose(); }}
          style={{ flex: 1, height: 48, borderRadius: 100, background: hovConfirm ? confirmBgHover : confirmBg, border: "none", fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer", transition: "background 0.15s", fontFamily: '"Google Sans", sans-serif' }}
        >{confirmLabel}</button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <ModalBackdrop onClose={onClose} align="bottom">
        <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "24px 16px 32px", display: "flex", flexDirection: "column" }}>
          {content}
        </div>
      </ModalBackdrop>
    );
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{ width: 440, background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.18)", padding: "28px 28px 24px", display: "flex", flexDirection: "column" }}>
        {content}
      </div>
    </ModalBackdrop>
  );
}

function CreateCircleModal({ onClose, isMobile }) {
  const [selectedIcon, setSelectedIcon] = React.useState(0);
  const [selectedType, setSelectedType] = React.useState("Family");
  const [hovCancel, setHovCancel] = React.useState(false);
  const [hovCreate, setHovCreate] = React.useState(false);

  const iconRow = (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {CIRCLE_ICON_OPTIONS.map((opt, i) => {
        const isSelIcon = selectedIcon === i;
        const [hovIcon, setHovIcon] = React.useState(false);
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
  );

  const typeRow = (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {CIRCLE_TYPES.map(t => {
        const isActive = selectedType === t;
        const [hov, setHov] = React.useState(false);
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
  );

  if (isMobile) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 1001, background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 56, background: "#fff", borderBottom: "1px solid #E9E9E9", display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1B1E28", flex: 1 }}>Create a circle</span>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
          <div style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 8 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#EBF2FF,#E0F0FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon src="assets/icons/circles.svg" size={32} color="#0F6EFF" />
            </div>
            <div style={{ marginTop: 10, fontSize: 14, color: "#9CA3AF", lineHeight: "20px", textAlign: "center" }}>
              Private group for sharing location and chat.
            </div>
          </div>
          <div style={{ padding: "4px 0 8px" }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 8 }}>Name</div>
              <DSInputField placeholder="The Smiths" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 10 }}>Icon</div>
              {iconRow}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 10 }}>Type</div>
              {typeRow}
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #F0F2F7", display: "flex", gap: 8, flexShrink: 0 }}>
          <button onClick={onClose} style={{ flex: 1, height: 48, borderRadius: 100, background: "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", fontFamily: '"Google Sans", sans-serif' }}>Cancel</button>
          <button style={{ flex: 1, height: 48, borderRadius: 100, background: "#0F6EFF", border: "none", fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: '"Google Sans", sans-serif', transition: "background 0.15s" }}>Create circle</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: 600, background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.18)", padding: "28px 28px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1B1E28", lineHeight: "28px" }}>Create a circle</div>
          <div style={{ fontSize: 14, color: "#6B7280", marginTop: 4, lineHeight: "20px" }}>Private group for sharing location and chat.</div>
        </div>
        <CloseBtn onClick={onClose} />
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 8 }}>Name</div>
        <DSInputField placeholder="The Smiths" />
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 10 }}>Icon</div>
        {iconRow}
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 10 }}>Type</div>
        {typeRow}
      </div>
      <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onMouseEnter={() => setHovCancel(true)} onMouseLeave={() => setHovCancel(false)} onClick={onClose} style={{ height: 44, borderRadius: 100, padding: "0 20px", background: hovCancel ? "#F5F7FA" : "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", transition: "background 0.15s" }}>Cancel</button>
        <button onMouseEnter={() => setHovCreate(true)} onMouseLeave={() => setHovCreate(false)} style={{ height: 44, borderRadius: 100, padding: "0 24px", background: hovCreate ? "#2563EB" : "#0F6EFF", border: "none", fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer", transition: "background 0.15s" }}>Create circle</button>
      </div>
    </div>
  );
}

function JoinCircleModal({ onClose, isMobile }) {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const [hovCancel, setHovCancel] = React.useState(false);
  const [hovJoin, setHovJoin] = React.useState(false);
  const [showInvalid, setShowInvalid] = React.useState(false);
  const inputsRef = React.useRef([]);
  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (code[i] === "" && i > 0) inputsRef.current[i - 1]?.focus();
      else { const n = [...code]; n[i] = ""; setCode(n); }
    } else if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus();
    else if (e.key === "ArrowRight" && i < 5) inputsRef.current[i + 1]?.focus();
  };
  const handleInput = (i, val) => {
    const ch = val.replace(/[^a-zA-Z0-9]/g, "").slice(-1).toUpperCase();
    const n = [...code]; n[i] = ch; setCode(n);
    if (ch && i < 5) inputsRef.current[i + 1]?.focus();
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const p = e.clipboardData.getData("text").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6);
    const n = [...code]; for (let i = 0; i < 6; i++) n[i] = p[i] || ""; setCode(n);
    inputsRef.current[Math.min(p.length, 5)]?.focus();
  };
  const isFilled = code.every(c => c !== "");
  const VALID_CODE = "8Y6V6T";
  const handleJoin = () => {
    if (!isFilled) return;
    if (code.join("") === VALID_CODE) { onClose(); }
    else { setShowInvalid(true); }
  };

  const invalidOverlay = showInvalid && (
    <div onClick={() => { setShowInvalid(false); onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", animation: "fadeIn 0.15s ease" }}>
      <div onClick={e => e.stopPropagation()}
        style={isMobile
          ? { width: "100%", background: "#fff", borderRadius: "20px 20px 0 0", padding: "32px 24px 40px" }
          : { width: 400, background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.18)", padding: "32px 28px 28px" }}>
        <InvalidInviteModal onClose={() => { setShowInvalid(false); onClose(); }} />
      </div>
    </div>
  );

  const codeInputs = (inputW, inputH, fontSize) => (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {code.map((ch, i) => (
        <input key={i} ref={el => inputsRef.current[i] = el} value={ch} maxLength={1}
          onChange={e => handleInput(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste} onFocus={e => e.target.select()}
          style={{ width: inputW, height: inputH, borderRadius: 14, border: ch ? "2px solid #0F6EFF" : "2px solid #E2E6EF", background: ch ? "#EBF2FF" : "#F5F7FA", textAlign: "center", fontSize, fontWeight: 700, color: "#1B1E28", fontFamily: '"Google Sans", sans-serif', outline: "none", transition: "border-color 0.15s, background 0.15s", caretColor: "#0F6EFF" }}
        />
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div style={{ position: "fixed", inset: 0, zIndex: 1001, background: "#fff", display: "flex", flexDirection: "column" }}>
          <div style={{ height: 56, background: "#fff", borderBottom: "1px solid #E9E9E9", display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1B1E28", flex: 1 }}>Join a circle</span>
            <CloseBtn onClick={onClose} />
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            <div style={{ fontSize: 14, color: "#6B7280", lineHeight: "20px", marginBottom: 28 }}>Enter the 6-character invite code shared with you.</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 12 }}>Invite code</div>
            {codeInputs(44, 52, 22)}
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid #F0F2F7", display: "flex", gap: 8, flexShrink: 0 }}>
            <button onClick={onClose} style={{ flex: 1, height: 48, borderRadius: 100, background: "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", fontFamily: '"Google Sans", sans-serif' }}>Cancel</button>
            <button onClick={handleJoin} style={{ flex: 1, height: 48, borderRadius: 100, background: isFilled ? "#0F6EFF" : "#E2E6EF", border: "none", fontSize: 16, fontWeight: 700, color: isFilled ? "#fff" : "#9CA3AF", cursor: isFilled ? "pointer" : "default", fontFamily: '"Google Sans", sans-serif', transition: "background 0.15s" }}>Join</button>
          </div>
        </div>
        {invalidOverlay}
      </>
    );
  }

  return (
    <>
      <div style={{ width: 440, background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.18)", padding: "28px 28px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1B1E28", lineHeight: "28px" }}>Join a circle</div>
            <div style={{ fontSize: 14, color: "#6B7280", marginTop: 4, lineHeight: "20px" }}>Enter the 6-character invite code shared with you.</div>
          </div>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1B1E28", marginBottom: 12 }}>Invite code</div>
          {codeInputs(52, 60, 24)}
        </div>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onMouseEnter={() => setHovCancel(true)} onMouseLeave={() => setHovCancel(false)} onClick={onClose} style={{ height: 44, borderRadius: 100, padding: "0 20px", background: hovCancel ? "#F5F7FA" : "#fff", border: "1px solid #E2E6EF", fontSize: 16, fontWeight: 700, color: "#1B1E28", cursor: "pointer", transition: "background 0.15s" }}>Cancel</button>
          <button onMouseEnter={() => setHovJoin(true)} onMouseLeave={() => setHovJoin(false)} onClick={handleJoin} style={{ height: 44, borderRadius: 100, padding: "0 28px", background: isFilled ? (hovJoin ? "#2563EB" : "#0F6EFF") : "#E2E6EF", border: "none", fontSize: 16, fontWeight: 700, color: isFilled ? "#fff" : "#9CA3AF", cursor: isFilled ? "pointer" : "default", transition: "background 0.15s" }}>Join</button>
        </div>
      </div>
      {invalidOverlay}
    </>
  );
}

function DSCheckbox({ label, checked, onChange, disabled = false, labelStyle }) {
  const [hovered, setHovered] = useState(false);
  let bg = "#fff", border = "1px solid #E2E6EF";
  if (disabled)     { bg = "#F5F7FA"; border = "1px solid #E2E6EF"; }
  else if (checked) { bg = "#0F6EFF"; border = "none"; }
  else if (hovered) { bg = "#F0F5FF"; border = "1px solid #0F6EFF"; }
  return (
    <div onClick={() => !disabled && onChange && onChange(!checked)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: 8, cursor: disabled ? "default" : "pointer", userSelect: "none" }}>
      <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: bg, border, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        {checked && (
          <svg width="11" height="8" viewBox="0 0 10.611 7.688" fill="white">
            <path d="M10.341 1.576L4.494 7.417C4.321 7.591 4.087 7.688 3.842 7.688c-.245 0-.48-.097-.653-.271L.27 4.496a.75.75 0 011.306-.75l2.266 2.268 5.193-5.189a.75.75 0 011.306.751z"/>
          </svg>
        )}
      </div>
      {label && <span style={{ fontSize: 15, color: disabled ? "#C5CBD7" : "#1B1E28", ...labelStyle }}>{label}</span>}
    </div>
  );
}
