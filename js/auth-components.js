// Shared auth UI components — loaded by SignIn.html, SignUp.html, ForgotPassword.html

function AuthLogo() {
  return <img src="assets/logo/logo-mobile.svg" height={30} alt="FamSync" style={{ display: 'block' }} />;
}

function AuthLabeledInput({ label, type, placeholder, value, onChange, disabled, error }) {
  const inputRef = React.useRef();
  const [active, setActive] = React.useState(false);
  const borderColor = error ? '#FF3B30' : (active ? '#0F6EFF' : '#E2E6EF');
  const bg = disabled ? '#F5F7FA' : '#fff';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 14, fontWeight: 600, color: '#1B1E28', userSelect: 'none', fontFamily: '"Google Sans", sans-serif' }}>
        {label}
      </label>
      <div
        onClick={() => !disabled && inputRef.current?.focus()}
        onMouseEnter={() => !disabled && setActive(true)}
        onMouseLeave={() => { if (!inputRef.current || document.activeElement !== inputRef.current) setActive(false); }}
        style={{ height: 44, borderRadius: 12, border: `1px solid ${borderColor}`, background: bg, display: 'flex', alignItems: 'center', padding: '0 12px', transition: 'border-color 0.15s', cursor: disabled ? 'default' : 'text' }}
      >
        <input
          ref={inputRef}
          type={type || 'text'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: disabled ? '#C5CBD7' : '#1B1E28', background: 'transparent', fontFamily: '"Google Sans", sans-serif' }}
        />
      </div>
      {error && (
        <span style={{ fontSize: 13, color: '#FF3B30', fontFamily: '"Google Sans", sans-serif' }}>{error}</span>
      )}
    </div>
  );
}

function PasswordAuthInput({ label, value, onChange, error }) {
  const inputRef = React.useRef();
  const [active, setActive] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const borderColor = error ? '#FF3B30' : (active ? '#0F6EFF' : '#E2E6EF');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 14, fontWeight: 600, color: '#1B1E28', userSelect: 'none', fontFamily: '"Google Sans", sans-serif' }}>
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.focus()}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => { if (!inputRef.current || document.activeElement !== inputRef.current) setActive(false); }}
        style={{ height: 44, borderRadius: 12, border: `1px solid ${borderColor}`, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 12px', transition: 'border-color 0.15s', cursor: 'text' }}
      >
        <input
          ref={inputRef}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#1B1E28', background: 'transparent', fontFamily: '"Google Sans", sans-serif' }}
        />
        <button
          type="button"
          onClick={e => { e.stopPropagation(); setShow(s => !s); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: '#9CA3AF', flexShrink: 0 }}
        >
          {show ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>
      {error && (
        <span style={{ fontSize: 13, color: '#FF3B30', fontFamily: '"Google Sans", sans-serif' }}>{error}</span>
      )}
    </div>
  );
}

function AuthLink({ href, children, variant = 'primary', style }) {
  const [hovered, setHovered] = React.useState(false);
  const base = variant === 'muted'
    ? { color: '#6B7280', fontWeight: 400 }
    : variant === 'tertiary'
    ? { color: '#9CA3AF', fontWeight: 600 }
    : { color: '#0F6EFF', fontWeight: 700 };
  const hoverColor = variant === 'muted' ? '#1B1E28' : variant === 'tertiary' ? '#6B7280' : '#0D60E0';
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        fontFamily: '"Google Sans", sans-serif',
        transition: 'color 0.15s',
        ...base,
        color: hovered ? hoverColor : base.color,
        ...style,
      }}
    >
      {children}
    </a>
  );
}

function AuthButton({ children, onClick, type }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: 44,
        borderRadius: 100,
        background: hovered ? '#0D60E0' : '#0F6EFF',
        color: 'white',
        border: 'none',
        fontSize: 16,
        fontWeight: 700,
        fontFamily: '"Google Sans", sans-serif',
        cursor: 'pointer',
        transition: 'background 0.15s ease',
      }}
    >
      {children}
    </button>
  );
}

function AuthDisclaimer({ maxWidth = 960 }) {
  return (
    <div style={{
      maxWidth,
      margin: '24px auto 32px',
      padding: '0 24px',
      fontFamily: '"Google Sans", sans-serif',
      fontSize: 12,
      lineHeight: '18px',
      color: '#6B7280',
      textAlign: 'center',
    }}>
      <p style={{ marginBottom: 10 }}>
        Location data is provided only with user consent and may be approximate, delayed, or unavailable due to technical limitations.
        {' '}This service is intended for personal, non-commercial use and must not be relied upon for emergency response, law-enforcement activities, or any purpose requiring verified real-time accuracy.
        {' '}Users are solely responsible for ensuring they have lawful permission to request or share any location information.
      </p>
      <p style={{ marginBottom: 10, fontWeight: 700 }}>
        The service processes location data only with device-level consent and does not allow tracking without permission.
      </p>
      <p style={{ marginTop: 14 }}>&copy; 2026 LogicFusion LLC.</p>
    </div>
  );
}

function AuthIllustration() {
  return (
    <div style={{
      flex: 1,
      minHeight: 520,
      backgroundImage: 'url(assets/bg-signin.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} />
  );
}
