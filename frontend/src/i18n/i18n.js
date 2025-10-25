import pl from "../locales/pl.json";
import en from "../locales/en.json";

const translations = { pl, en };

let currentLang = "pl";

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
  }
}

export function t(path) {
  const keys = path.split(".");
  let result = translations[currentLang];

  for (const key of keys) {
    result = result?.[key];
    if (!result) return path;
  }

  return result;
}
