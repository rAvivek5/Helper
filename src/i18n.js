import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import translationEng from "./locale/en/translation.json";
import translationHin from "./locale/hi/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";




i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      en: {
        translations: translationEng
      },
      hin: {
        translations: translationHin
      },
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations"
  });

export default i18n;