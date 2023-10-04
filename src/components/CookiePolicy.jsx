import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow, addDays } from 'date-fns';
import { gsap } from 'gsap';

const CookiePolicy = () => {
  const [showBanner, setShowBanner] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
      setShowBanner(true);
      gsap.from(bannerRef.current, {
        duration: 1,
        y: '100%',
        ease: 'power3.out',
      });
    }
  }, []);

  const handleAccept = () => {
    const expirationDate = addDays(new Date(), 30);
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentExpiry', expirationDate.toString());

    gsap.to(bannerRef.current, {
      duration: 1,
      y: '100%',
      ease: 'power3.in',
      onComplete: () => setShowBanner(false),
    });
  };

  const remainingDays = formatDistanceToNow(new Date(localStorage.getItem('cookieConsentExpiry')));

  return (
    <>
      {showBanner && (
        <div ref={bannerRef} style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          backgroundColor: '#2C3E50',
          color: '#ECF0F1',
          textAlign: 'center',
          padding: '1em',
          zIndex: '1000',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        }}>
          <p style={{ fontSize: '1.1em' }}>
            This website uses cookies to ensure you get the best experience. 
            <a href="/cookie-policy" style={{ color: '#3498DB', textDecoration: 'underline' }}>Learn more</a>
          </p>
          <p style={{ fontSize: '0.8em', color: '#95A5A6' }}>
            Consent expires in {remainingDays}
          </p>
          <button onClick={handleAccept} style={{
            backgroundColor: '#3498DB',
            color: '#ECF0F1',
            padding: '10px 20px',
            margin: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          }}>
            Accept
          </button>
        </div>
      )}
    </>
  );
};

export default CookiePolicy;
