import SystemConfigurationsServices from '../../utils/services/systemConfigurationsServices';
import { API_CONSTANTS, HEADER } from '../../utils/constants/apiConstants';
import { transformApiMessages } from '../../utils/apiTransformers/transformApiMessages';
import { translationMessages } from '../../i18n';
import { LANGUAGE_PROVIDER } from './constants';

import ActionApiValidator from '../../utils/functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

const transformer = transformApiMessages;
const setLocale = (languageLocale) => ({
  type: LANGUAGE_PROVIDER.CHANGE_LOCALE,
  languageLocale,
});

const setLanguagesCatalog = (catalog) => ({
  type: LANGUAGE_PROVIDER.ACTIONS.SET_CATALOG_LANGUAGES,
  catalog,
});

const clearLanguageProviderState = () => ({
  type: LANGUAGE_PROVIDER.ACTIONS.CLEAR_LANGUAGE_PROVIDER_STATE,
});

const setMessages = (messages) => ({
  type: LANGUAGE_PROVIDER.ACTIONS.SET_MESSAGES,
  messages,
});
const setIdLanguage = (idLanguage) => ({
  type: LANGUAGE_PROVIDER.ACTIONS.SET_ID_LANGUAGE_MESSAGES,
  idLanguage,
});
const getMessages = (data = {}) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idUserSecurityKey = state.dataProfile.getIn([
      'dataProfile',
      'idUserSecurityKey',
    ]);
    const locale = state.language.getIn(['locale']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }
    data.idUserSecurityKey = idUserSecurityKey;
    const response = await systemConfigurationsServices.getLanguageMessages(
      data,
    );

    const listMessages = response.result;
    const transformedListMessages = transformer(listMessages);
    dispatch(setMessages(transformedListMessages));
    dispatch(setIdLanguage(data.idLanguage));
    dispatch(setMessages(transformer(response.result)));
    translationMessages[locale] = transformedListMessages; // aqui sobreescribe los messages que venian del json hardcode de login

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const message = (messageCode) => (dispatch, getState) => {
  const state = getState();
  const list = state.language.getIn(['messages']);
  const messages = list;
  return messages[messageCode];
};

const changeLocale = (languageLocale) => (dispatch) => {
  let idLanguage;
  switch (languageLocale) {
    case LANGUAGE_PROVIDER.LANGUAGE.ENGLISH.LOCALE: // Inglés(1 en api)
      idLanguage = LANGUAGE_PROVIDER.LANGUAGE.ENGLISH.ID_LANGUAGE;
      break;
    case LANGUAGE_PROVIDER.LANGUAGE.SPANISH_MEXICO.LOCALE: // español Colimbia(2 en api)
      idLanguage = LANGUAGE_PROVIDER.LANGUAGE.SPANISH_MEXICO.ID_LANGUAGE;
      break;
    case LANGUAGE_PROVIDER.LANGUAGE.SPANISH_COLOMBIA.LOCALE: // español Colimbia(5 en api)
      idLanguage = LANGUAGE_PROVIDER.LANGUAGE.SPANISH_COLOMBIA.ID_LANGUAGE;
      break;
    default:
      idLanguage = LANGUAGE_PROVIDER.LANGUAGE.ENGLISH.ID_LANGUAGE;
      break;
  }
  dispatch(setLocale(languageLocale));
  if (window.sessionStorage.token) {
    dispatch(getMessages({ idLanguage }));
    dispatch(setIdLanguage(idLanguage));
  }
};

const languageActions = {
  getMessages,
  message,
  changeLocale,
  clearLanguageProviderState,
  setLocale,
  setLanguagesCatalog,
  setIdLanguage,
};

export default languageActions;
