import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from "next/link";
import ArrowIcon from "@layouts/svg-icons/Arrow";
import Pentagon from "@layouts/pentagon/Index";

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
          bottom: '50%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: 'auto',
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
          padding: '1em',
          borderRadius: '12px',
          zIndex: '1000',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <p>This website uses cookies to ensure you get the best experience.</p>
          <button onClick={openModal} className="mil-button mil-arrow-place mil-btn-space">
            Configure
          </button>
          <button onClick={handleAccept} className="mil-button mil-arrow-place mil-btn-space">
            Consent
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
          <h2>Cookie Preferences</h2>
          {/* ... No changes here for checkboxes ... */}
          <button onClick={handleAccept} className="mil-button mil-arrow-place mil-btn-space">
            Save Preferences
          </button>
          <button onClick={closeModal} className="mil-button mil-arrow-place mil-btn-space">
            Cancel
          </button>
        </div>
      )}
    </>
  );
};


export default CookiePolicy;
