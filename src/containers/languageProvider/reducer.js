import { Map, fromJS } from 'immutable';
import { LANGUAGE_PROVIDER } from './constants';

const initialState = new Map({
  locale: 'en',
  messages: {},
  temporalLoginMessages: {},
  idLanguage: 1,
  catalogLanguages: [],
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case LANGUAGE_PROVIDER.CHANGE_LOCALE:
      return state.set('locale', action.languageLocale);
    case LANGUAGE_PROVIDER.ACTIONS.SET_MESSAGES:
      return state.set('messages', fromJS(action.messages));
    case LANGUAGE_PROVIDER.ACTIONS.SET_TEMPORAL_LOGIN_MESSAGES:
      return state.set(
        'temporalLoginMessages',
        fromJS(action.temporalLoginMessages),
      );
    case LANGUAGE_PROVIDER.ACTIONS.SET_CURRENT_MESSAGES:
      return state.set('currentMessages', () => action.currentMessages);
    case LANGUAGE_PROVIDER.ACTIONS.SET_ID_LANGUAGE_MESSAGES:
      return state.set('idLanguage', action.idLanguage);
    case LANGUAGE_PROVIDER.ACTIONS.SET_CATALOG_LANGUAGES:
      return state.set('catalogLanguages', action.catalog);
    case LANGUAGE_PROVIDER.ACTIONS.CLEAR_LANGUAGE_PROVIDER_STATE:
      return state.set('messages', {});
    default:
      return state;
  }
}

// DESCRIPTION
// I did not delete "temporalLoginMessages" because the messages must persist

export default languageProviderReducer;
