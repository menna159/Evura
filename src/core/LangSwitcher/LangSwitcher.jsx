// src/components/LanguageSwitcher.js
import React from 'react';
// import { getCurrentLang, setLang } from '../translate/autoTranslate';

const LanguageSwitcher = () => {
  const current = getCurrentLang();

  const handleSwitch = () => {
    const newLang = current === 'en' ? 'ar' : 'en';
    setLang(newLang);
  };

  return (
    <button className="btn btn-outline-primary" onClick={handleSwitch}>
      {current === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
