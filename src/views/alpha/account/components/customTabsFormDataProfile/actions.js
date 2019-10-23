import {
  GenericValidators,
  HandlerErrorResponse,
  MESSAGES_CODES_GENERICS,
} from '@pleedtech/pt-components';

import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { createError } from '../../../../../utils/indexedDB/appErrorIndexedDB';

import ActionApiValidator from '../../../../../utils/functions/actionApiValidator';

import AlphaAssetsServices from '../../../../../utils/services/alphaAssetsServices';
import { API_CONSTANTS, HEADER } from '../../../../../utils/constants/apiConstants';
import { ENVIRONMENT_CONSTANTS } from '../../../../../utils/constants/environmentConstants';
import SYSTEM_CONFIGURATIONS_CONSTANTS from '../../../../../utils/constants/systemConfigurationsConstants';
import GLOBAL_CONSTANTS from '../../../../../utils/constants/globalConstants';

const handlerErrorResponse = new HandlerErrorResponse(
  ENVIRONMENT_CONSTANTS.NAME,
  ENVIRONMENT_CONSTANTS.LOGS,
);

const actionApiValidator = new ActionApiValidator();

const resultError = {
  error: true,
  status: null,
  message: 'Some parameters are missing',
  messageCode: 'Error inesperado. Favor de contactar al área de sistemas',
  result: null,
};

export const postGetAnswersAccount = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }
    const response = await alphaAssetsServices.postGetAnswersAccount({
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


export const putAnswersAccount = (data, idCustomer) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }
    const response = await alphaAssetsServices.putAnswersAccount({
      ...data,
    }, idCustomer);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    createError(error);
    throw error;
  }
};