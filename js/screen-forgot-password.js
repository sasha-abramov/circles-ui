function ForgotPasswordScreen() {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const isMobile = window.innerWidth < 768;

  const handleSubmit = () => {
    if (!email.trim()) { setEmailError('Enter your email'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Enter a valid email'); return; }
    setEmailError('');
    setSent(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-primary-light)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      padding: isMobile ? '0' : '16px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: isMobile ? 0 : 20,
        boxShadow: isMobile ? 'none' : 'var(--shadow-card)',
        padding: isMobile ? '48px 24px 32px' : '48px 40px',
        width: '100%',
        maxWidth: isMobile ? '100%' : 480,
      }}>
        <div style={{ marginBottom:28 }}>
          <AuthLogo isMobile={isMobile} />
        </div>

        {!sent ? (
          <React.Fragment>
            <h2 className="fs-h2" style={{ marginBottom:6 }}>Reset password</h2>
            <p className="fs-caption" style={{ marginBottom:28 }}>We'll email you a link to set a new password.</p>

            <div style={{ marginBottom:24 }}>
              <AuthLabeledInput
                label="Email"
                type="email"
                placeholder=""
                value={email}
                onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                error={emailError}
              />
            </div>

            <div style={{ marginBottom:20 }}>
              <AuthButton onClick={handleSubmit}>Send reset link</AuthButton>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{
              width:64, height:64, borderRadius:'50%',
              background:'#E5F8EA',
              display:'flex', alignItems:'center', justifyContent:'center',
              margin:'0 auto 20px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" fill="var(--color-success)"
                  d="m18.4881 6.43057c.3145.26957.3509.74304.0814 1.05754l-8.57147 9.99999c-.14249.1662-.3505.2619-.56945.2619-.21894 0-.42695-.0957-.56944-.2619l-3.42857-4c-.26957-.3145-.23314-.788.08135-1.0575.31449-.2696.78797-.2332 1.05754.0813l2.85912 3.3357 8.00202-9.33568c.2695-.31449.743-.35092 1.0575-.08135z"/>
              </svg>
            </div>
            <h2 className="fs-h2" style={{ marginBottom:8, textAlign:'center' }}>Check your email</h2>
            <p className="fs-caption" style={{ marginBottom:28, textAlign:'center' }}>
              We've sent a reset link to{' '}
              <strong style={{ color:'#1B1E28' }}>{email}</strong>
            </p>
          </React.Fragment>
        )}

        <p style={{ textAlign:'center', fontSize:16, fontFamily:'"Google Sans",sans-serif' }}>
          <AuthLink href="SignIn.html" variant="muted">
            ← Back to sign in
          </AuthLink>
        </p>
      </div>
      <AuthDisclaimer maxWidth={480} />
    </div>
  );
}
