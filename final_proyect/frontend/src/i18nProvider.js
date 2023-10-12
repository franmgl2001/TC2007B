import polyglotI18nProvider from 'ra-i18n-polyglot';
import en from 'ra-language-english';
import esp from 'ra-language-spanish';

const translations = { en, esp };

export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale],
    'en', // default locale
    [{ locale: 'en', name: 'English' }, { locale: 'esp', name: 'Español' }],
);



