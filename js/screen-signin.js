function SignInScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const handleSubmit = () => {
    const e = {};
    if (!email.trim()) e.email = 'Enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Enter your password';
    setErrors(e);
  };

  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-primary-light)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      padding: isMobile ? '0' : '24px',
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: isMobile ? '100%' : 960,
        borderRadius: isMobile ? 0 : 20,
        boxShadow: isMobile ? 'none' : 'var(--shadow-card)',
        overflow: 'hidden',
        background: 'white',
      }}>
        <div style={{
          background: 'white',
          padding: isMobile ? '48px 24px 32px' : '56px 48px',
          width: isMobile ? '100%' : '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'center',
        }}>
          <div style={{ marginBottom:28 }}>
            <AuthLogo isMobile={isMobile} />
          </div>

          <h2 className="fs-h2" style={{ marginBottom:6 }}>Welcome back</h2>
          <p className="fs-caption" style={{ marginBottom:28 }}>Sign in to your FamSync account.</p>

          <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:10 }}>
            <AuthLabeledInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: undefined }); }}
              error={errors.email}
            />
            <PasswordAuthInput
              label="Password"
              value={password}
              onChange={e => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
              error={errors.password}
            />
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
            <AuthLink href="ForgotPassword.html" variant="tertiary" style={{ fontSize:14 }}>
              Forgot password?
            </AuthLink>
          </div>

          <div style={{ marginBottom:20 }}>
            <AuthButton onClick={handleSubmit}>Sign in</AuthButton>
          </div>

          <p style={{ textAlign:'center', fontSize:16, color:'#6B7280', fontFamily:'"Google Sans",sans-serif' }}>
            Don't have an account?{' '}
            <AuthLink href="SignUp.html">Sign up</AuthLink>
          </p>
        </div>

        {!isMobile && <AuthIllustration />}
      </div>
      <AuthDisclaimer />
    </div>
  );
}
