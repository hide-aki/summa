import {
  GenericValidators,
  HandlerErrorResponse,
  MESSAGES_CODES_GENERICS,
  Requester,
} from '@pleedtech/pt-components';

import { API_CONSTANTS, HEADER } from '../constants/apiConstants';
import { ENVIRONMENT_CONSTANTS } from '../constants/environmentConstants';

const handlerErrorResponse = new HandlerErrorResponse(
  ENVIRONMENT_CONSTANTS.NAME,
  ENVIRONMENT_CONSTANTS.LOGS,
);
const genericValidators = new GenericValidators();
const resultError = { error: true };

export const get = (uri) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const endpoint = ENVIRONMENT_CONSTANTS.PORT + uri;

    this.requester = new Requester(API_CONSTANTS.DOMAIN);

    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    resultError.message = MESSAGES_CODES_GENERICS.UISGEN0000000006;
    if (!genericValidators.validateValueIsStringNotEmpty(token)) {
      return reject(resultError);
    }

    this.requester
      .get(endpoint, HEADER)
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

          return resolve(response);
        } else {
          return reject({
            error: true,
            response: response,
            message: MESSAGES_CODES_GENERICS.UISGEN0000000006,
          });
        }
        resolve(response);
      }) // the-axiosInstance
      .catch((error) => {
        error.messagesCode = MESSAGES_CODES_GENERICS.UISGEN0000000006;
        error.endpoint = endpoint;
        reject(error);
      }); // catch-axiosInstance
  });
};

export const post = (uri, data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const endpoint = ENVIRONMENT_CONSTANTS.PORT + uri;

    this.requester = new Requester(API_CONSTANTS.DOMAIN);

    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;
    if (!genericValidators.validateValueIsStringNotEmpty(token)) {
      return reject(resultError);
    }

    this.requester
      .post(endpoint, data, HEADER)
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

          return resolve(response);
        } else {
          return reject({
            error: true,
            response: response,
            message: MESSAGES_CODES_GENERICS.UISGEN0000000006,
          });
        }
      })
      .catch((error) => {
        error.messagesCode = MESSAGES_CODES_GENERICS.UISGEN0000000006;
        error.endpoint = endpoint;
        reject(error);
      });
  });
};

export const put = (uri, data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const endpoint = ENVIRONMENT_CONSTANTS.PORT + uri;

    const requester = new Requester(API_CONSTANTS.DOMAIN);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    resultError.message = MESSAGES_CODES_GENERICS.UISCA00000000007;

    if (!genericValidators.validateValueIsStringNotEmpty(token)) {
      return reject(resultError);
    }

    requester
      .put(endpoint, data, HEADER)
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

          return resolve(response);
        } else {
          return reject({
            error: true,
            response: response,
            message: MESSAGES_CODES_GENERICS.UISGEN0000000006,
          });
        }
      })
      .catch((error) => {
        error.messagesCode = MESSAGES_CODES_GENERICS.UISGEN0000000006;
        error.endpoint = endpoint;
        reject(error);
      });
  });
};
