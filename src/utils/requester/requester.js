/* eslint-disable class-methods-use-this */
/* eslint lines-between-class-members: ["error", "always"] */
/* eslint class-methods-use-this: "error" */

import axios from 'axios';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import isNaN from 'lodash/isNaN';

import { MESSAGES_CODES_GENERICS } from '@pleedtech/pt-components';

import { STATUS_CODES, API_REQUEST, NETWORK_CONECTION } from './constants';

import {
  GENERICS_MESSAGES_REQUESTER,
  ERROR_NETWORK_CONNECTION_MESSAGE_CODE,
} from './genericMessagesRequester';
import GLOBAL_CONSTANTS from '../constants/globalConstants';

const axiosInstance = axios.create({
  timeout: 35000,
  validateStatus: (status) => status >= 200 && status < 600,
});

class Requester {
  constructor(domain, idLoaderElement = 'top-loader') {
    this.domain = domain;
    this.idLoaderElement = idLoaderElement;
    this.STATUS_CODES = STATUS_CODES;
  }

  validateTokenExpired(error = {}) {
    const path = `/${GLOBAL_CONSTANTS.ROOT_NAME}/logout`;
    if (error.response) {
      if (error.response.status) {
        if (error.response.status === STATUS_CODES.status401Unauthorized) {
          window.location.href = path;
          return null;
        }
      }
    } else if (error.status) {
      if (error.status === STATUS_CODES.status401Unauthorized) {
        window.location.href = path;
        return null;
      }
    }
    return null;
  }

  handleErrorNetwork(error) {
    let isShowErrorNetwork = false;
    try {
      // Error Network Connection
      if (error.code === 'ECONNABORTED') {
        isShowErrorNetwork = true;
      } else if (error.message === 'Network Error') {
        isShowErrorNetwork = true;
      } else if (error.response === false) {
        // Error Server Uncontrolled by Backend
        isShowErrorNetwork = true;
      }
      if (isShowErrorNetwork === true) {
        // TO DO: DO STUFF ON NETWORK CONNECTION ERROR
      }
      return isShowErrorNetwork;
    } catch (err) {
      return isShowErrorNetwork;
    }
  }

  replaceHash() {
    let currentUrl = window.location.href;
    if (window.location.href.indexOf('#') > -1) {
      currentUrl = window.location.href.replace('#', '');
    } else {
      currentUrl = window.location.href;
    }
    return currentUrl;
  }

  loader(currentUrl = '') {
    /**
     * If initialUrl which is setted in routes is equal to url from api when is started its execution,
     * else it added its response to negativeCount, if not ignores the request because request doesn´t belong to its screen.
     */
    if (isNil(sessionStorage.getItem('initialUrl')) === false) {
      if (sessionStorage.getItem('initialUrl') === currentUrl) {
        this.apiHiddenLoaderCount();
      }
    }
  }

  apiShowLoaderCount() {
    // It also exists in Login Component
    if (document.getElementById(this.idLoaderElement)) {
      document.getElementById(this.idLoaderElement).style.display = 'inherit';

      const loaderCount = sessionStorage.getItem('countCall');
      if (loaderCount == null || isNaN(loaderCount) === true) {
        sessionStorage.setItem('countCall', 1);
        sessionStorage.setItem('total', 1);
      } else {
        const temporalCount =
          parseInt(sessionStorage.getItem('countCall'), 10) + 1;
        sessionStorage.setItem('countCall', temporalCount);
        sessionStorage.setItem('total', temporalCount);
      }
      sessionStorage.setItem('beforeUrl', window.location.href);
    }
  }

  apiHiddenLoaderCount() {
    if (document.getElementById(this.idLoaderElement)) {
      document.getElementById(this.idLoaderElement).style.display = 'inherit';

      const loaderCount = sessionStorage.getItem('countCallNegative');
      if (loaderCount == null || isNaN(loaderCount) === true) {
        sessionStorage.setItem('countCallNegative', 1);
      } else {
        const temporalCount =
          parseInt(sessionStorage.getItem('countCallNegative'), 10) + 1;
        sessionStorage.setItem('countCallNegative', temporalCount);
      }
      sessionStorage.setItem('beforeUrl', window.location.href);
      if (
        sessionStorage.getItem('countCallNegative') ===
        sessionStorage.getItem('countCall')
      ) {
        const count =
          parseInt(sessionStorage.getItem('countCall'), 10) -
          parseInt(sessionStorage.getItem('countCallNegative'), 10);
        sessionStorage.setItem('total', count);
        if (count === 0) {
          document.getElementById(this.idLoaderElement).style.display = 'none';
          sessionStorage.setItem('countCall', 0);
          sessionStorage.setItem('total', 0);
          sessionStorage.setItem('countCallNegative', 0);
        }
      }
    }
  }

  errorToResponse(response) {
    let resultError = {
      errorType: null,
      error:
        isNil(response.data) === false &&
        isEmpty(response.data) === false &&
        isBoolean(response.data.error)
          ? response.data.error
          : true,
      status:
        isNil(response.data) === false &&
        isEmpty(response.data) === false &&
        isBoolean(response.data.stateCode)
          ? response.data.stateCode
          : response.status,
      message:
        isNil(response.data) === false &&
        isString(response.data.message) &&
        isEmpty(response.data.message) === false
          ? response.data.message
          : null,
      messageCode:
        isNil(response.data) === false &&
        isString(response.data.messageCode) &&
        isEmpty(response.data.messageCode) === false
          ? response.data.messageCode
          : null,
      result:
        isNil(response.data) === false &&
        isEmpty(response.data) === false &&
        isNil(response.data.result) === false
          ? response.data.result
          : null,
    };

    try {
      if (response.code === 'ECONNABORTED') {
        resultError.errorType = NETWORK_CONECTION;
        resultError.message =
          isNil(response.data) === false &&
          isString(response.data.message) &&
          isEmpty(response.data.message) === false
            ? response.data.message
            : ERROR_NETWORK_CONNECTION_MESSAGE_CODE;
        resultError.messageCode =
          isNil(response.data) === false &&
          isString(response.data.messageCode) &&
          isEmpty(response.data.messageCode) === false
            ? response.data.messageCode
            : ERROR_NETWORK_CONNECTION_MESSAGE_CODE;
        resultError.result =
          isNil(response.data) === false &&
          isEmpty(response.data) === false &&
          isNil(response.data.result) === false
            ? response.data.result
            : null;
        resultError.status =
          isNil(response.data) === false &&
          isEmpty(response.data) &&
          isNumber(response.data.stateCode)
            ? response.data.stateCode
            : response.status;
      } else if (response.status === STATUS_CODES.status400BadRequest) {
        resultError.errorType = API_REQUEST;
        resultError.message =
          isNil(response.data) === false &&
          isString(response.data.message) &&
          isEmpty(response.data.message) === false
            ? response.data.message
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000001
                .DEFAULT;
        resultError.messageCode =
          isNil(response.data) === false &&
          isString(response.data.messageCode) &&
          isEmpty(response.data.messageCode) === false
            ? response.data.messageCode
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000001.CODE;
        resultError.result =
          isNil(response.data) === false &&
          isEmpty(response.data) === false &&
          isNil(response.data.result) === false
            ? response.data.result
            : null;
        resultError.status =
          isNil(response.data) === false &&
          isEmpty(response.data) &&
          isNumber(response.data.stateCode)
            ? response.data.stateCode
            : response.status;
      } else if (response.status === STATUS_CODES.status401Unauthorized) {
        resultError.errorType = API_REQUEST;
        resultError.message =
          isNil(response.data) === false &&
          isString(response.data.message) &&
          isEmpty(response.data.message) === false
            ? response.data.message
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000002
                .DEFAULT;
        resultError.messageCode =
          isNil(response.data) === false &&
          isString(response.data.messageCode) &&
          isEmpty(response.data.messageCode) === false
            ? response.data.messageCode
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000002.CODE;
        resultError.result =
          isNil(response.data) === false &&
          isEmpty(response.data) === false &&
          isNil(response.data.result) === false
            ? response.data.result
            : null;
        resultError.status =
          isNil(response.data) === false &&
          isEmpty(response.data) &&
          isNumber(response.data.stateCode)
            ? response.data.stateCode
            : response.status;
      } else if (response.status === STATUS_CODES.status403Forbidden) {
        resultError.errorType = API_REQUEST;
        resultError.message =
          isNil(response.data) === false &&
          isString(response.data.message) &&
          isEmpty(response.data.message) === false
            ? response.data.message
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000003
                .DEFAULT;
        resultError.messageCode =
          isNil(response.data) === false &&
          isString(response.data.messageCode) &&
          isEmpty(response.data.messageCode) === false
            ? response.data.messageCode
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000003.CODE;
        resultError.result =
          isNil(response.data) === false &&
          isEmpty(response.data) === false &&
          isNil(response.data.result) === false
            ? response.data.result
            : null;
        resultError.status =
          isNil(response.data) === false &&
          isEmpty(response.data) &&
          isNumber(response.data.stateCode)
            ? response.data.stateCode
            : response.status;
      } else if (response.status === STATUS_CODES.status404NotFound) {
        resultError.errorType = API_REQUEST;
        resultError.message =
          isNil(response.data) === false &&
          isString(response.data.message) &&
          isEmpty(response.data.message) === false
            ? response.data.message
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000004
                .DEFAULT;
        resultError.messageCode =
          isNil(response.data) === false &&
          isString(response.data.messageCode) &&
          isEmpty(response.data.messageCode) === false
            ? response.data.messageCode
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000004.CODE;
        resultError.result =
          isNil(response.data) === false &&
          isEmpty(response.data) === false &&
          isNil(response.data.result) === false
            ? response.data.result
            : null;
        resultError.status =
          isNil(response.data) === false &&
          isEmpty(response.data) &&
          isNumber(response.data.stateCode)
            ? response.data.stateCode
            : response.status;
      } else if (
        response.status === STATUS_CODES.status500InternalServerError
      ) {
        resultError.errorType = API_REQUEST;
        resultError.message =
          isNil(response.data) === false &&
          isString(response.data.message) &&
          isEmpty(response.data.message) === false
            ? response.data.message
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000005
                .DEFAULT;
        resultError.messageCode =
          isNil(response.data) === false &&
          isString(response.data.messageCode) &&
          isEmpty(response.data.messageCode) === false
            ? response.data.messageCode
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000005.CODE;
        resultError.result =
          isNil(response.data) === false &&
          isEmpty(response.data) === false &&
          isNil(response.data.result) === false
            ? response.data.result
            : null;
        resultError.status =
          isNil(response.data) === false &&
          isEmpty(response.data) &&
          isNumber(response.data.stateCode)
            ? response.data.stateCode
            : response.status;
      } else if (response.status < STATUS_CODES.status200OK) {
        resultError.errorType = API_REQUEST;
        resultError.error = true;
        resultError.message =
          isNil(response.data) === false &&
          isString(response.data.message) &&
          isEmpty(response.data.message) === false
            ? response.data.message
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000006
                .DEFAULT;
        resultError.messageCode =
          isNil(response.data) === false &&
          isString(response.data.messageCode) &&
          isEmpty(response.data.messageCode) === false
            ? response.data.messageCode
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000006.CODE;
        resultError.result =
          isNil(response.data) === false &&
          isEmpty(response.data) === false &&
          isNil(response.data.result) === false
            ? response.data.result
            : null;
        resultError.status =
          isNil(response.data) === false &&
          isEmpty(response.data) &&
          isNumber(response.data.stateCode)
            ? response.data.stateCode
            : response.status;
      } else if (response.status > 299) {
        resultError.errorType = API_REQUEST;
        resultError.error = true;
        resultError.status = response.status;
        resultError.message =
          isNil(response.data) === false &&
          isString(response.data.message) &&
          isEmpty(response.data.message) === false
            ? response.data.message
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000006
                .DEFAULT;
        resultError.messageCode =
          isNil(response.data) === false &&
          isString(response.data.messageCode) &&
          isEmpty(response.data.messageCode) === false
            ? response.data.messageCode
            : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000006.CODE;
        resultError.result =
          isNil(response.data) === false &&
          isEmpty(response.data) === false &&
          isNil(response.data.result) === false
            ? response.data.result
            : null;
        resultError.status =
          isNil(response.data) === false &&
          isEmpty(response.data) &&
          isNumber(response.data.stateCode)
            ? response.data.stateCode
            : response.status;
      }
    } catch (error) {
      resultError.errorType = API_REQUEST;
      resultError.error = true;
      resultError.status = null;
      resultError.message =
        isNil(response.data) === false &&
        isString(response.data.message) &&
        isEmpty(response.data.message) === false
          ? response.data.message
          : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000006.DEFAULT;
      resultError.messageCode =
        isNil(response.data) === false &&
        isString(response.data.messageCode) &&
        isEmpty(response.data.messageCode) === false
          ? response.data.messageCode
          : GENERICS_MESSAGES_REQUESTER.MESSAGES_CODES.UIREQ00000000006.CODE;
      resultError.result = null;
      resultError.status =
        isNil(response.data) === false &&
        isEmpty(response.data) &&
        isNumber(response.data.stateCode)
          ? response.data.stateCode
          : response.status;
    } finally {
      // eslint-disable-next-line no-self-assign
      resultError = resultError;
    }
    return resultError;
  }

  validateResponse(response) {
    const result = this.errorToResponse(response);
    let error = false;
    if (result.error === false) {
      error = false;
    } else {
      error = true;
    }
    return { error, result };
  }

  exceptionProcess(error, errorCodeGeneric) {
    const resultError = {
      error: true,
      errorType: null,
      status: null,
      message: null,
      messageCode: null,
      result: null,
    };
    if (this.handleErrorNetwork(error) === true) {
      resultError.error = true;
      resultError.errorType = 2;
      resultError.status = STATUS_CODES.networkConnection;
      resultError.message = ERROR_NETWORK_CONNECTION_MESSAGE_CODE;
      resultError.messageCode = ERROR_NETWORK_CONNECTION_MESSAGE_CODE;
    }

    if (isNil(error) === false && isEmpty(error) === false) {
      resultError.error = error.error;
      resultError.message =
        isString(error.message) && isEmpty(error.message) === false
          ? error.message
          : errorCodeGeneric;
      resultError.messageCode =
        isString(error.messageCode) && isEmpty(error.messageCode) === false
          ? error.messageCode
          : errorCodeGeneric;
      resultError.result = error.result;
      resultError.status = error.status;
      resultError.errorType = API_REQUEST;
    }
    return resultError;
  }

  async get(endpoint = '', headers = {}) {
    const currentUrl = this.replaceHash();

    const url = this.domain + endpoint;
    const config = { headers };
    this.apiShowLoaderCount(url);

    try {
      const response = await axiosInstance.get(url, config);
      this.loader(currentUrl);
      this.validateTokenExpired(response);
      const { error, result } = this.validateResponse(response);
      if (error === true) {
        throw result;
      } else {
        return result;
      }
    } catch (error) {
      this.loader(currentUrl);
      this.validateTokenExpired(error);
      throw this.exceptionProcess(
        error,
        MESSAGES_CODES_GENERICS.UISGEN0000000006,
      );
    }
  }

  async post(endpoint = '', data = {}, headers = {}) {
    const currentUrl = this.replaceHash();
    const url = this.domain + endpoint;
    const config = { headers };
    this.apiShowLoaderCount(url);
    try {
      const response = await axiosInstance.post(url, data, config);

      this.loader(currentUrl);
      this.validateTokenExpired(response);
      const { error, result } = this.validateResponse(response);
      if (error === true) {
        throw result;
      } else {
        return result;
      }
    } catch (error) {
      this.loader(currentUrl);
      this.validateTokenExpired(error);
      throw this.exceptionProcess(
        error,
        MESSAGES_CODES_GENERICS.UISGEN0000000007,
      );
    }
  }

  async put(endpoint = '', data = {}, headers = {}) {
    const currentUrl = this.replaceHash();

    const url = this.domain + endpoint;
    const config = { headers };
    try {
      const response = await axiosInstance.put(url, data, config);
      this.loader(currentUrl);
      this.validateTokenExpired(response);

      const { error, result } = this.validateResponse(response);
      if (error === true) {
        throw result;
      } else {
        return result;
      }
    } catch (error) {
      this.loader(currentUrl);
      this.validateTokenExpired(error);
      throw this.exceptionProcess(
        error,
        MESSAGES_CODES_GENERICS.UISGEN0000000007,
      );
    }
  }

  async delete(endpoint = '', headers = {}) {
    const currentUrl = this.replaceHash();
    const url = this.domain + endpoint;
    const config = { headers };
    try {
      const response = await axiosInstance.delete(url, config);
      if (response) {
        this.loader(currentUrl);
        this.validateTokenExpired(response);
        const { error, result } = this.validateResponse(response);
        if (error === true) {
          throw response;
        } else {
          return result;
        }
      } else {
        throw response;
      }
    } catch (error) {
      this.loader(currentUrl);
      this.validateTokenExpired(error);
      return this.exceptionProcess(
        error,
        MESSAGES_CODES_GENERICS.UISGEN0000000007,
      );
    }
  }
}

export { Requester, STATUS_CODES, GENERICS_MESSAGES_REQUESTER };
