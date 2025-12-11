import React from 'react';

const styles = {
  colors: {
    primary: '#1A4C40',
    secondary: '#4A8574',
    background: '#F8F8F8',
    accent: '#D3D3D3',
    text: '#333',
    link: '#4A8574',
    dynamicAccent: '#E74C3C',
    validationSuccess: '#5cb85c',
  },

  authPageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F8F8F8',
    padding: '40px',
  },

  panel: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1000px',
    overflow: 'hidden',
  },

  illustrationContainer: {
    flex: '1',
    backgroundColor: 'white',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #D3D3D3',
  },

  illustrationPlaceholder: {
    width: '100%',
    height: '350px',
    backgroundColor: '#E6F4EA',
    borderRadius: '12px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1A4C40',
    fontWeight: 'bold',
    fontSize: '18px',
  },

  formContainer: {
    flex: '1',
    padding: '50px',
    textAlign: 'left',
  },

  mainHeading: {
    color: '#1A4C40',
    marginBottom: '10px',
    fontSize: '38px',
    fontWeight: '700',
  },

  subHeading: {
    color: '#4A8574',
    marginBottom: '40px',
    fontSize: '16px',
    fontWeight: '400',
  },

  label: {
    display: 'block',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    marginTop: '20px',
    fontSize: '14px',
  },

  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '12px 15px',
    border: `1px solid #D3D3D3`,
    transition: 'border-color 0.3s',
  },

  input: {
    flexGrow: 1,
    border: 'none',
    background: 'none',
    outline: 'none',
    padding: '0 10px',
    fontSize: '16px',
    color: '#333',
    width: '100%',
  },

  icon: {
    color: '#4A8574',
    fontSize: '20px',
  },

  inputValidationIcon: {
    color: '#5cb85c',
    fontSize: '20px',
  },

  viewButton: {
    marginLeft: '10px',
    color: '#E74C3C',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },

  forgotPassword: {
    textAlign: 'right',
    marginTop: '10px',
    marginBottom: '30px',
  },

  forgotPasswordLink: {
    color: '#E74C3C',
    textDecoration: 'none',
    fontSize: '14px',
  },

  button: {
    padding: '15px 25px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    width: '100%',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    background: `linear-gradient(90deg, #4A8574, #1A4C40)`,
    color: 'white',
    boxShadow: '0 4px 15px rgba(74, 133, 116, 0.4)',
  },

  authLink: {
    fontSize: '15px',
    color: '#666',
    textAlign: 'center',
    marginTop: '20px',
  },

  authLinkAnchor: {
    color: '#4A8574',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};


const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Simulasi Login berhasil!');
  };

  return (
    <div style={styles.authPageContainer}>
      <div style={styles.panel}>

        <div style={styles.illustrationContainer}>
          <div style={styles.illustrationPlaceholder}>
            [foto bunga nya ga si]
          </div>
          <p style={styles.illustrationText}>
            ini deskripsi toko kita
          </p>
        </div>

        <div style={styles.formContainer}>
          <h1 style={styles.mainHeading}>Getting Started</h1>
          <p style={styles.subHeading}>Let's login for explore continues</p>

          <form onSubmit={handleSubmit}>

            <label style={styles.label} htmlFor="emailOrPhone">Email or Phone Number</label>
            <div style={styles.inputGroup}>
              <i style={styles.icon}>✉️</i>
              <input
                style={styles.input}
                type="text"
                id="emailOrPhone"
                placeholder="example@gmail.com"
                required
                defaultValue=""
              />
            </div>

            <label style={styles.label} htmlFor="password">Password</label>
            <div style={styles.inputGroup}>
              <i style={styles.icon}>🔒</i>
              <input
                style={styles.input}
                type="password"
                id="password"
                placeholder="••••••"
                required
                defaultValue=""
              />
              <button style={styles.viewButton} type="button">View</button>
            </div>

            <div style={styles.forgotPassword}>
              <a style={styles.forgotPasswordLink} href="/forgot-password">Forgot Password?</a>
            </div>

            <button
              style={styles.button}
              type="submit"
            >
              Sign In
            </button>
          </form>

          <p style={styles.authLink}>
            Don't have an account? <a style={styles.authLinkAnchor} href="/register">Sign Up here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;