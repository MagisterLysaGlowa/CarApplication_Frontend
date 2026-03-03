"use client";
import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookie_consent");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie("cookie_consent", "true", 365);
    setShowPopup(false);
  };

  const getCookie = (name: string) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  const setCookie = (name: string, value: any, days: any) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <p>
          Ta strona używa plików cookie, aby zapewnić najlepsze doświadczenie
          użytkownika.
        </p>
        <button
          onClick={acceptCookies}
          className="ml-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
        >
          Akceptuję
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
