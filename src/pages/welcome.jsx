import React from 'react';

// Style Definitions (Idealnya diimpor dari file style terpisah)
const styles = {
    colors: {
        primary: '#5cb85c',
        secondary: '#90ee90',
        background: '#f0fff0',
        accent: '#c6e2c6',
        text: '#333',
    },

    authPageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: `linear-gradient(to right, #f0fff0, #c6e2c6)`,
        padding: '20px',
    },

    panel: {
        backgroundColor: 'white',
        padding: '50px 40px',
        borderRadius: '20px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },

    heading: {
        color: '#5cb85c',
        marginBottom: '40px',
        fontSize: '32px',
        fontWeight: 'bold',
    },

    illustration: {
        height: '180px', // Lebih tinggi dari form Login/Register
        backgroundColor: '#90ee90',
        borderRadius: '12px',
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
    },

    // Style Tombol
    button: {
        padding: '14px 25px', // Tombol dibuat sedikit lebih besar
        border: 'none',
        borderRadius: '50px',
        fontSize: '16px',
        cursor: 'pointer',
        margin: '10px auto',
        width: '80%', // Lebih kecil dari tombol form
        display: 'block',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },

    buttonPrimary: { // Tombol Register
        backgroundColor: '#5cb85c',
        color: 'white',
    },

    buttonSecondary: { // Tombol Login
        backgroundColor: 'transparent',
        color: '#5cb85c',
        border: '2px solid #5cb85c',
    },
};


const WelcomeScreen = () => {
    // Di komponen nyata, fungsi ini akan menggunakan React Router
    // (atau router lain) untuk navigasi, bukan hanya window.location.
    const handleRegister = () => {
        window.location.href = '/register';
    };

    const handleLogin = () => {
        window.location.href = '/login';
    };

    return (
        <div style={styles.authPageContainer}>
            <div style={styles.panel}>
                <h2 style={styles.heading}>Welcome</h2>

                <div style={styles.illustration}>Selamat Datang di Toko Terraplan Anda!</div>

                <button
                    style={{ ...styles.button, ...styles.buttonPrimary }}
                    onClick={handleRegister}
                >
                    Register
                </button>

                <button
                    style={{ ...styles.button, ...styles.buttonSecondary }}
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default WelcomeScreen;