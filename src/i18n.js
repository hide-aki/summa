/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';

import DEFAULT_LOCALE from './App/constants'; // eslint-disable-line
import enTranslationMessages from './translations/en.json';
import esTranslationMessages from './translations/es.json';
import esCoTranslationMessages from './translations/es-co.json';

addLocaleData(enLocaleData);
addLocaleData(esLocaleData);

export const appLocales = ['en', 'es', 'es-co'];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key];
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return Object.assign(formattedMessages, { [key]: message });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages),
  'es-co': formatTranslationMessages('es-co', esCoTranslationMessages),
};
