import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#3D342C] text-[#DCD3C7] p-4 z-50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm">
        <p>We use cookies to improve your experience, analyze site traffic, and serve targeted advertisements. By continuing to use this site, you consent to our use of cookies in accordance with our <a href="https://ruralopstools.com/privacy-policy" target="_blank" rel="noreferrer" className="underline hover:text-white">Privacy Policy</a>.</p>
      </div>
      <button 
        onClick={accept}
        className="bg-[#DCD3C7] text-[#3D342C] hover:bg-white px-6 py-2 rounded-sm font-bold text-sm whitespace-nowrap min-h-[48px] transition-colors"
      >
        Accept & Continue
      </button>
    </div>
  );
}
