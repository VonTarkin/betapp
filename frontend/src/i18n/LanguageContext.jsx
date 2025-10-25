import { createContext, useContext, useState, useEffect } from "react";
import { setLanguage as i18nSetLanguage, t as i18nTranslate } from "./i18n";

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "pl");

  useEffect(() => {
    i18nSetLanguage(lang);
  }, []);

  const changeLanguage = (newLang) => {
    i18nSetLanguage(newLang);
    localStorage.setItem("lang", newLang);
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const { lang } = useLanguage();
  useEffect(() => {}, [lang]);
  return { t: i18nTranslate, lang };
}
