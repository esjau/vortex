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
        <div ref={bannerRef} style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          backgroundColor: '#F9E042',
          color: '#333',
          textAlign: 'center',
          padding: '1em',
          borderRadius: '12px 12px 0 0',
          zIndex: '1000',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          {/* ... */}
          <button onClick={handleAccept} style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            margin: '10px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
          >
            Accept All
          </button>
        </div>
      )}

      {showModal && (
        <div ref={modalRef} style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '2em',
          borderRadius: '12px',
          zIndex: '1001',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          {/* ... */}
          <button onClick={handleAccept} style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            margin: '10px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
          >
            Save Preferences
          </button>
          <button onClick={closeModal} style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '10px 20px',
            margin: '10px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2a2a2a"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#333"}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default CookiePolicy;
