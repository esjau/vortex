import React, { useState, useEffect } from 'react';

const CookiePolicy = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          backgroundColor: '#333',
          color: '#fff',
          textAlign: 'center',
          padding: '1em',
          zIndex: '1000',
        }}>
          <p>
            This website uses cookies to ensure you get the best experience on our website.
            <a href="/cookie-policy" style={{ color: '#fff', textDecoration: 'underline' }}> Learn more</a>
          </p>
          <button onClick={handleAccept} style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            margin: '10px',
            border: 'none',
            cursor: 'pointer',
          }}>
            Accept
          </button>
        </div>
      )}
    </>
  );
};

export default CookiePolicy;
