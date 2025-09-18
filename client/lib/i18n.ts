import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import hi from "../locales/hi.json";
import bn from "../locales/bn.json";
import ta from "../locales/ta.json";
import te from "../locales/te.json";
import gu from "../locales/gu.json";
import mr from "../locales/mr.json";
import pa from "../locales/pa.json";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      bn: { translation: bn },
      ta: { translation: ta },
      te: { translation: te },
      gu: { translation: gu },
      mr: { translation: mr },
      pa: { translation: pa },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
