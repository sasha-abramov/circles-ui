function CreateNewPasswordScreen() {
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const isMobile = window.innerWidth < 768;

  const handleSubmit = () => {
    if (!password) { setPasswordError('Enter a new password'); return; }
    if (password.length < 8) { setPasswordError('Password must be at least 8 characters'); return; }
    setPasswordError('');
    setSaved(true);
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

        {!saved ? (
          <React.Fragment>
            <h2 className="fs-h2" style={{ marginBottom:6, fontSize:24, lineHeight:'32px' }}>Create new password</h2>
            <p className="fs-caption" style={{ marginBottom:28 }}>Your new password must be different from previously used passwords.</p>

            <div style={{ marginBottom:24 }}>
              <PasswordAuthInput
                label="New password"
                value={password}
                onChange={e => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
                error={passwordError}
              />
            </div>

            <div style={{ marginBottom:20 }}>
              <AuthButton onClick={handleSubmit}>Save</AuthButton>
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
            <h2 className="fs-h2" style={{ marginBottom:8, textAlign:'center', fontSize:24, lineHeight:'32px' }}>Password Reset Successful</h2>
            <p className="fs-caption" style={{ marginBottom:28, textAlign:'center' }}>
              Your password has been successfully changed
            </p>
            <AuthButton onClick={() => { window.location.href = 'SignIn.html'; }}>Go to Log In</AuthButton>
          </React.Fragment>
        )}

        {!saved && (
          <p style={{ textAlign:'center', fontSize:16, fontFamily:'"Google Sans",sans-serif' }}>
            <AuthLink href="SignIn.html" variant="muted">
              ← Back to sign in
            </AuthLink>
          </p>
        )}
      </div>
      <AuthDisclaimer maxWidth={480} />
    </div>
  );
}
