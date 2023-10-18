import polyglotI18nProvider from 'ra-i18n-polyglot';
import { spanishMessages } from './spanishMessages.js';

export const i18nProvider = polyglotI18nProvider(
    locale => spanishMessages, 'es',
    [{ locale: 'en', name: 'English' }, { locale: 'esp', name: 'Español' }], // Default locale
);


