import isEmpty from 'lodash/isEmpty';

import ReportsServices from '../services/reportsServices';
import { API_CONSTANTS, HEADER } from '../constants/apiConstants';

import ActionApiValidator from '../functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

export const getExcel = (idReport = '', dataEncripted = {}) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const reportsServices = new ReportsServices(API_CONSTANTS.DOMAIN, HEADER);

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(idReport)
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(dataEncripted) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await reportsServices.getExcel(idReport, dataEncripted);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const postEncryptTransaction = (data = {}) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idSystemUser = state.dataProfile.getIn([
      'dataProfile',
      'idSystemUser',
    ]);
    const idUserSecurityKey = state.dataProfile.getIn([
      'dataProfile',
      'idUserSecurityKey',
    ]);
    const idCustomer = state.dataProfile.getIn(['dataProfile', 'idCustomer']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const reportsServices = new ReportsServices(API_CONSTANTS.DOMAIN, HEADER);

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }
    data.idCompany = idCompany;
    data.idSystemUser = idSystemUser;
    data.idCustomer = idCustomer;
    data.idUserSecurityKey = idUserSecurityKey;
    const response = await reportsServices.postEncryptTransaction(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const postExcelParametersEncrypt = (data = {}) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const reportsServices = new ReportsServices(API_CONSTANTS.DOMAIN, HEADER);

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await reportsServices.postExcelParametersEncrypt(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const postGetPdfDocument = (data = {}) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const reportsServices = new ReportsServices(API_CONSTANTS.DOMAIN, HEADER);

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await reportsServices.postGetPdfDocument(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
