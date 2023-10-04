import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CookiePolicy = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const bannerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const cookieConsent = JSON.parse(localStorage.getItem('cookieConsent'));

    if (!cookieConsent) {
      setShowBanner(true);
      gsap.fromTo(bannerRef.current, { y: 100 }, { y: 0, duration: 0.5 });
    } else {
      setPreferences(cookieConsent);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    gsap.to(bannerRef.current, { y: 100, duration: 0.5 }).then(() => {
      setShowBanner(false);
    });
  };

  const handlePreferenceChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  const openModal = () => {
    setShowModal(true);
    gsap.fromTo(modalRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
  };

  const closeModal = () => {
    gsap.to(modalRef.current, { scale: 0.7, opacity: 0, duration: 0.3 }).then(() => {
      setShowModal(false);
    });
  };

  return (
    <>
      {showBanner && (
        <div ref={bannerRef} style={bannerStyle}>
          <p>
            This website uses cookies to ensure you get the best experience.
            <button onClick={openModal} style={buttonStyle}>
              Customize
            </button>
          </p>
          <button onClick={handleAccept} style={acceptButtonStyle}>
            Accept All
          </button>
        </div>
      )}

      {showModal && (
        <div ref={modalRef} style={modalStyle}>
          <h2>Cookie Preferences</h2>
          <label>
            <input
              type="checkbox"
              name="essential"
              checked={preferences.essential}
              onChange={handlePreferenceChange}
              disabled
            />
            Essential
          </label>
          <label>
            <input
              type="checkbox"
              name="analytics"
              checked={preferences.analytics}
              onChange={handlePreferenceChange}
            />
            Analytics
          </label>
          <label>
            <input
              type="checkbox"
              name="marketing"
              checked={preferences.marketing}
              onChange={handlePreferenceChange}
            />
            Marketing
          </label>
          <button onClick={handleAccept} style={acceptButtonStyle}>
            Save Preferences
          </button>
          <button onClick={closeModal} style={buttonStyle}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

const bannerStyle = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1em',
  zIndex: '1000',
};

const buttonStyle = {
  backgroundColor: '#555',
  color: 'white',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  cursor: 'pointer',
};

const acceptButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#4CAF50',
};

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '2em',
  zIndex: '1001',
};

export default CookiePolicy;
