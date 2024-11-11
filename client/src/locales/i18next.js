import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translation.json';

export const resources = {
  he: {
    translation: translations,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'he', // default language
    // keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources,
  });

export default i18n;
