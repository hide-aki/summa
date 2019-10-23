import isEmpty from 'lodash/isEmpty';

import AlphaAssetsServices from '../services/alphaAssetsServices';
import { API_CONSTANTS, HEADER } from '../constants/apiConstants';
import ActionApiValidator from '../functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

const postGetTransactionById = (data) => async (dispatch, getState) => {
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
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
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

    data.idCompany = idCompany;
    data.idSystemUser = idSystemUser;
    data.idUserSecurityKey = idUserSecurityKey;
    const response = await alphaAssetsServices.postGetTransactionById(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const postGetTransactionCoincidences = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idCustomer = state.dataProfile.getIn(['dataProfile', 'idCustomer']);
    const idSystemUser = state.dataProfile.getIn([
      'dataProfile',
      'idSystemUser',
    ]);
    const idUserSecurityKey = state.dataProfile.getIn([
      'dataProfile',
      'idUserSecurityKey',
    ]);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
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

    data.idCompany = idCompany;
    data.idSystemUser = idSystemUser;
    data.idCustomer = idCustomer;
    data.idUserSecurityKey = idUserSecurityKey;
    const response = await alphaAssetsServices.postGetTransactionCoincidences(
      data,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const postPaymentType = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idSystemUser = state.dataProfile.getIn([
      'dataProfile',
      'idSystemUser',
    ]);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
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

    data.idCompany = idCompany;
    data.idSystemUser = idSystemUser;

    const response = await alphaAssetsServices.postPaymentType(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const postGetAllAccount = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.postGetAllAccount(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const postTransaction = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idUserSecurityKey = state.dataProfile.getIn([
      'dataProfile',
      'idUserSecurityKey',
    ]);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    data.idUserSecurityKey = idUserSecurityKey;
    const response = await alphaAssetsServices.postTransaction(data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const actions = {
  postGetTransactionById,
  postGetTransactionCoincidences,
  postGetAllAccount,
  postTransaction,
  postPaymentType,
};

const alphaDepositActions = actions;
export default alphaDepositActions;
