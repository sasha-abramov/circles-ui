function SignUpScreen() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const handleSubmit = () => {
    const e = {};
    if (!name.trim()) e.name = 'Enter your name';
    if (!email.trim()) e.email = 'Enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Enter a password';
    else if (password.length < 8) e.password = 'At least 8 characters';
    if (!confirmPassword) e.confirmPassword = 'Confirm your password';
    else if (password && confirmPassword !== password) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
  };

  const clearError = field => { if (errors[field]) setErrors({ ...errors, [field]: undefined }); };

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

          <h2 className="fs-h2" style={{ marginBottom:6 }}>Create your account</h2>
          <p className="fs-caption" style={{ marginBottom:28 }}>Start a circle and stay close to the people who matter.</p>

          <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:24 }}>
            <AuthLabeledInput
              label="Name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={e => { setName(e.target.value); clearError('name'); }}
              error={errors.name}
            />
            <AuthLabeledInput
              label="Email"
              type="email"
              placeholder=""
              value={email}
              onChange={e => { setEmail(e.target.value); clearError('email'); }}
              error={errors.email}
            />
            <PasswordAuthInput
              label="Password"
              value={password}
              onChange={e => { setPassword(e.target.value); clearError('password'); }}
              error={errors.password}
            />
            <PasswordAuthInput
              label="Confirm password"
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
              error={errors.confirmPassword}
            />
          </div>

          <div style={{ marginBottom:20 }}>
            <AuthButton onClick={handleSubmit}>Create account</AuthButton>
          </div>

          <p style={{ textAlign:'center', fontSize:16, color:'#6B7280', fontFamily:'"Google Sans",sans-serif' }}>
            Already have an account?{' '}
            <AuthLink href="SignIn.html">Sign in</AuthLink>
          </p>
        </div>

        {!isMobile && <AuthIllustration />}
      </div>
      <AuthDisclaimer />
    </div>
  );
}
