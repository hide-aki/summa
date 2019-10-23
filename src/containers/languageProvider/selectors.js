import { createSelector } from 'reselect';
import isFunction from 'lodash/isFunction';

const selectLanguage = () =>
  createSelector(
    [(state) => state.get('language')],
    (languageState) => {
      languageState.get('idLanguage');
    },
  );

const selectLocale = () =>
  createSelector(
    [(state) => state.get('language')],
    (languageState) => languageState.get('locale'),
  );

const selectMessages = () =>
  createSelector(
    [(state) => state.language.getIn(['messages'])],
    (messages) => {
      let messagesTojs = {};
      if (isFunction(messages.toJS)) {
        messagesTojs = messages.toJS();
      }
      return messagesTojs;
    },
  );

const selectIdLanguage = () =>
  createSelector(
    [(state) => state.language.getIn(['idLanguage'])],
    (idLanguage) => {
      let idLanguageTojs = {};
      if (idLanguage) {
        if (typeof idLanguage.toJS === 'function') {
          idLanguageTojs = idLanguage.toJS();
        } else {
          idLanguageTojs = idLanguage;
        }
      }

      return idLanguageTojs;
    },
  );

const selectTemporalLoginMessages = () =>
  createSelector(
    (state) => {
      return state.language.getIn(['temporalLoginMessages']);
    },
    (messages) => {
      if (messages) {
        if (typeof messages.toJS === 'function') {
          return messages.toJS();
        }
      }
      return messages;
    },
  );

export {
  selectLanguage,
  selectLocale,
  selectMessages,
  selectIdLanguage,
  selectTemporalLoginMessages,
};
