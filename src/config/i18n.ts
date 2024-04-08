import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { STORAGE_KEY } from "../constants/enum";
import { LOCALES } from "../constants/locale";
import translationEn from "../locales/en.json";
import translationVi from "../locales/vi.json";
import { getLocalStorage } from "../utils/storage";

const localeStorage = getLocalStorage(STORAGE_KEY.LOCALES);

const resources = {
  en: { translation: translationEn },
  vi: { translation: translationVi },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: localeStorage ?? LOCALES.EN,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
