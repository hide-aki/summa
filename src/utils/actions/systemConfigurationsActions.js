import {
  GenericValidators,
  HandlerErrorResponse,
  MESSAGES_CODES_GENERICS,
} from '@pleedtech/pt-components';

import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { createError } from '../indexedDB/appErrorIndexedDB';

import ActionApiValidator from '../functions/actionApiValidator';

import SystemConfigurationsServices from '../services/systemConfigurationsServices';
import AlphaAssetsServices from '../services/alphaAssetsServices';
import { API_CONSTANTS, HEADER } from '../constants/apiConstants';
import { ENVIRONMENT_CONSTANTS } from '../constants/environmentConstants';
import SYSTEM_CONFIGURATIONS_CONSTANTS from '../constants/systemConfigurationsConstants';
import GLOBAL_CONSTANTS from '../constants/globalConstants';
import { transformApiMessages } from '../apiTransformers/transformApiMessages';
import { LANGUAGE_PROVIDER } from '../../containers/languageProvider/constants';
import { translationMessages } from '../../i18n';

const transformer = transformApiMessages;
const setMessages = (messages) => ({
  type: LANGUAGE_PROVIDER.ACTIONS.SET_MESSAGES,
  messages,
}); // setMessages
const setIdLanguage = (idLanguage) => ({
  type: LANGUAGE_PROVIDER.ACTIONS.SET_ID_LANGUAGE_MESSAGES,
  idLanguage,
}); // setIdLanguage

const handlerErrorResponse = new HandlerErrorResponse(
  ENVIRONMENT_CONSTANTS.NAME,
  ENVIRONMENT_CONSTANTS.LOGS,
);

const actionApiValidator = new ActionApiValidator();

const genericValidators = new GenericValidators();

const resultError = {
  error: true,
  status: null,
  message: 'Some parameters are missing',
  messageCode: 'Error inesperado. Favor de contactar al área de sistemas',
  result: null,
};

export const actionCleanComponentsToScreen = () => ({
  type: SYSTEM_CONFIGURATIONS_CONSTANTS.ACTIONS.CLEAN_COMPONENTS_TO_SCREEN,
});
export const actionSetFrontParameters = (parameters) => ({
  type: SYSTEM_CONFIGURATIONS_CONSTANTS.ACTIONS.SET_FRONT_PARAMETERS,
  parameters,
});
export const actionSetDateDataBase = (date) => ({
  type: SYSTEM_CONFIGURATIONS_CONSTANTS.ACTIONS.SET_DATE_DATABASE,
  date,
});

export const getProfileBySystemUser = (data, tokenArg) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = isNil(tokenArg)
      ? state.dataProfile.getIn(['dataProfile', 'token'])
      : tokenArg;
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }
    const response = await alphaAssetsServices.getProfileBySystemUser({
      ...data,
    });
    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    createError(error);
    throw error;
  }
};

export const alfaLogin = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }
    const response = await systemConfigurationsServices.alfaLogin({
      ...data,
      idClientApp: GLOBAL_CONSTANTS.idClientApp,
      mobileIdNumber: GLOBAL_CONSTANTS.idClientApp,
    });

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    createError(error);
    throw error;
  }
};

export const login = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }
    const response = await systemConfigurationsServices.login({
      ...data,
      idClientApp: GLOBAL_CONSTANTS.idClientApp,
      mobileIdNumber: GLOBAL_CONSTANTS.idClientApp,
    });

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    createError(error);
    throw error;
  }
};

export const getComponentsByIdCompanyIdSection = (idSection = null) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
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

    const response = await systemConfigurationsServices.getComponentsByIdCompanyIdSection(
      idCompany,
      idSection,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    createError(error);
    throw error;
  }
};

export const getComponentsByIdCompanyIdScreenCode = (
  idCompanyStr,
  idScreenCode,
  idSystemUser,
) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
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

    const response = await systemConfigurationsServices.getComponentsByIdCompanyIdScreenCode(
      idCompany,
      idScreenCode,
      idSystemUser,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    createError(error);
    throw error;
  }
};

export const postSendEmailSentInfo = (data = {}) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
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

    const response = await systemConfigurationsServices.postSendEmailSentInfo(
      data,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    createError(error);
    throw error;
  }
};

export const cleanComponentsToScreen = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(actionCleanComponentsToScreen());
    resolve(true);
  });
};

export const getFrontParameters = (idCompany) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
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
    const response = await systemConfigurationsServices.getFrontParameters(
      idCompany,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const getScreenNavi = (
  idCompany,
  idScreenCode,
  idScreenCodeRedirected = null,
) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
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
    const response = await systemConfigurationsServices.getScreenNavi(
      idCompany,
      idScreenCode,
      idScreenCodeRedirected,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * startSession. Registra el inicio de sesión del usuario.
 */
export const startSession = (data = {}) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
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

    const response = await systemConfigurationsServices.startSession(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const actionGetDateDataBase = (tokenStr = '') => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token =
      isEmpty(tokenStr) === false
        ? tokenStr
        : state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (isEmpty(token)) {
      throw actionApiValidator.resultError();
    }

    const response = await systemConfigurationsServices.getDateDataBase();

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const postEmployeeConfig = (data = {}) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
    if (
      !genericValidators.validateValueIsStringNotEmpty(token) ||
      !genericValidators.validateValueIsStringNotEmpty(idCompany)
    ) {
      return reject(resultError);
    }
    data.idCompany = idCompany;
    systemConfigurationsServices
      .postEmployeeConfig(data)
      .then((response) => {
        if (
          !genericValidators.validateValueIsUndefinedOrNull(response.data) ||
          genericValidators.validateValueIsStringNotEmpty(response.data) ||
          genericValidators.validateValueIsObjectNotEmpty(response.data)
        ) {
          let resultError = handlerErrorResponse.processResponse(response);
          if (resultError.error) {
            return reject(resultError);
          }
          resultError = handlerErrorResponse.validateIsResultIsNullOrArrayEmpty(
            response,
          );
          if (resultError.error) {
            resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
            return reject(resultError);
          }
          return resolve({
            response: response,
            message:
              systemConfigurationsServices.MESSAGES_CODES.UISSC000000000004,
          });
        } else {
          return reject({
            error: true,
            response: response,
            message: MESSAGES_CODES_GENERICS.UISCA00000000007,
          });
        }
      })
      .catch((error) => {
        error.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
        error = handlerErrorResponse.processResponseError(error);
        return reject(error);
      });
  });
};
export const putEmployeeConfig = (
  idManager = '',
  idEmployee = '',
  data = {},
) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
    if (
      !genericValidators.validateValueIsStringNotEmpty(token) ||
      !genericValidators.validateValueIsStringNotEmpty(idCompany)
    ) {
      return reject(resultError);
    }
    data.idCompany = idCompany;

    systemConfigurationsServices
      .putEmployeeConfig(idManager, idEmployee, data)
      .then((response) => {
        if (
          !genericValidators.validateValueIsUndefinedOrNull(response.data) ||
          genericValidators.validateValueIsStringNotEmpty(response.data) ||
          genericValidators.validateValueIsObjectNotEmpty(response.data)
        ) {
          let resultError = handlerErrorResponse.processResponse(response);
          if (resultError.error) {
            return reject(resultError);
          }
          resultError = handlerErrorResponse.validateIsResultIsNullOrArrayEmpty(
            response,
          );
          if (resultError.error) {
            resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
            return reject(resultError);
          }
          return resolve({
            response: response,
            message:
              systemConfigurationsServices.MESSAGES_CODES.UISSC000000000004,
          });
        } else {
          return reject({
            error: true,
            response: response,
            message: MESSAGES_CODES_GENERICS.UISCA00000000007,
          });
        }
      })
      .catch((error) => {
        error.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
        error = handlerErrorResponse.processResponseError(error);
        return reject(error);
      });
  });
};

export const postAudiTrail = (data = {}) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
    if (
      !genericValidators.validateValueIsStringNotEmpty(token) ||
      !genericValidators.validateValueIsStringNotEmpty(idCompany)
    ) {
      return reject(resultError);
    }
    systemConfigurationsServices
      .postAudiTrail(data)
      .then((response) => {
        if (
          !genericValidators.validateValueIsUndefinedOrNull(response.data) ||
          genericValidators.validateValueIsStringNotEmpty(response.data) ||
          genericValidators.validateValueIsObjectNotEmpty(response.data)
        ) {
          let resultError = handlerErrorResponse.processResponse(response);
          if (resultError.error) {
            return reject(resultError);
          }
          resultError = handlerErrorResponse.validateIsResultIsNullOrArrayEmpty(
            response,
          );
          if (resultError.error) {
            resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
            return reject(resultError);
          }
          return resolve({
            response: response,
            message:
              systemConfigurationsServices.MESSAGES_CODES.UISSC000000000004,
          });
        } else {
          return reject({
            error: true,
            response: response,
            message: MESSAGES_CODES_GENERICS.UISCA00000000007,
          });
        }
      })
      .catch((error) => {
        error.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
        error = handlerErrorResponse.processResponseError(error);
        return reject(error);
      });
  });
};

export const getDateDataBase = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(token)
    ) {
      throw actionApiValidator.resultError();
    }

    const response = await systemConfigurationsServices.getDateDataBase();

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const postGetEmployeeConfigSearch = (data = {}) => (
  dispatch,
  getState,
) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
    if (
      !genericValidators.validateValueIsStringNotEmpty(token) ||
      !genericValidators.validateValueIsStringNotEmpty(idCompany)
    ) {
      return reject(resultError);
    }

    systemConfigurationsServices
      .postGetEmployeeConfigSearch(data)
      .then((response) => {
        if (
          !genericValidators.validateValueIsUndefinedOrNull(response.data) ||
          genericValidators.validateValueIsStringNotEmpty(response.data) ||
          genericValidators.validateValueIsObjectNotEmpty(response.data)
        ) {
          let resultError = handlerErrorResponse.processResponse(response);
          if (resultError.error) {
            return reject(resultError);
          }
          resultError = handlerErrorResponse.validateIsResultIsNullOrArrayEmpty(
            response,
          );
          if (resultError.error) {
            resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
            return reject(resultError);
          }
          return resolve({
            response: response,
            message:
              systemConfigurationsServices.MESSAGES_CODES.UISSC000000000004,
          });
        } else {
          return reject({
            error: true,
            response: response,
            message: MESSAGES_CODES_GENERICS.UISCA00000000007,
          });
        }
      })
      .catch((error) => {
        error.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
        error = handlerErrorResponse.processResponseError(error);
        return reject(error);
      });
  });
};

export const postAcceptTerms = (data = {}) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idSystemUser = state.dataProfile.getIn([
      'dataProfile',
      'idSystemUser',
    ]);
    const idCustomer = state.dataProfile.getIn(['dataProfile', 'idCustomer']);
    const idUserSecurityKey = state.dataProfile.getIn([
      'dataProfile',
      'idUserSecurityKey',
    ]);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(token)
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }

    data.idCustomer = idCustomer;
    data.idCompany = idCompany;
    data.idSystemUser = idSystemUser;
    data.idUserSecurityKey = idUserSecurityKey;
    const response = await systemConfigurationsServices.postAcceptTerms(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMenuTemplate = (data = {}) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(token)
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await systemConfigurationsServices.getMenuTemplate(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLanguageMessages = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const locale = state.language.getIn(['locale']);
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idUserSecurityKey = state.dataProfile.getIn([
      'dataProfile',
      'idUserSecurityKey',
    ]);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await systemConfigurationsServices
      .getLanguageMessages({
        ...data,
        idCompany,
        idUserSecurityKey,
      })
      .then((messages) => {
        const listMessages = isNil(messages.result) ? [] : messages.result;
        const transformedListMessages = transformer(listMessages);
        //dispatch(setMessages(transformedListMessages));
        dispatch(setIdLanguage(data.idLanguage));
        dispatch(setMessages(transformer(listMessages)));
        translationMessages[locale] = transformedListMessages;
        // resolve(messages.data.result);
        messages.result = translationMessages[locale];
        return messages;
      }) // then-getLanguageMessages
      .catch((error) => {
        throw error;
      });

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    createError(error);
    throw error;
  }
};

export const postGetDBdate = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.postGetDBdate(data);
    return response;
  } catch (error) {
    throw error;
  }
};
