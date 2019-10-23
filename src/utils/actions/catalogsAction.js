import isEmpty from 'lodash/isEmpty';

import CatalogsServices from '../services/catalogsServices';
import { API_CONSTANTS, HEADER } from '../constants/apiConstants';
import ActionApiValidator from '../functions/actionApiValidator';
import CATALOGS_CONSTANTS from '../constants/catalogsConstants';

import SystemConfigurationsServices from '../services/systemConfigurationsServices';

const actionApiValidator = new ActionApiValidator();

const actionSetCatalog = (catalog, catalogs) => ({
  type: CATALOGS_CONSTANTS.ACTIONS.SET_CATALOG,
  catalog,
  catalogs,
});

const cleanCatalog = () => ({
  type: CATALOGS_CONSTANTS.ACTIONS.CLEAN_CATALOGS,
});

const actionCleanCatalog = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(cleanCatalog());
    resolve();
  });
};

const setCatalog = (catalog, catalogs) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(actionSetCatalog(catalog, catalogs));
    resolve();
  });
};

const postAllCatalogs = (data = {}) => async (dispatch, getState) => {
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

    const response = await systemConfigurationsServices.postAllCatalogs(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const getQueryFieldByIdSection = (
  idScreenCode = null,
  idSection = null,
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
        true ||
      isEmpty(token)
    ) {
      throw actionApiValidator.resultError();
    }
    const response = await systemConfigurationsServices.getQueryFieldByIdSection(
      idScreenCode,
      idSection,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
const getOperatorsByIdQueryField = (
  idScreenCode = null,
  idSection = null,
  idQueryField = null,
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
        true ||
      isEmpty(idScreenCode) ||
      isEmpty(idSection) ||
      idQueryField(idSection)
    ) {
      throw actionApiValidator.resultError();
    }

    const response = await systemConfigurationsServices.getOperatorsByIdQueryField(
      idScreenCode,
      idSection,
      idQueryField,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
const postGetAllCountries = (data) => async (dispatch, getState) => {
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

const postGetAllCurrency = (data) => async (dispatch, getState) => {
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

const postGetAllLanguages = (dataObject = {}, tokenStr = '') => async (
  dispatch,
  getState,
) => {
  try {
    const data = dataObject;
    const state = getState();
    const token =
      isEmpty(tokenStr) === false
        ? tokenStr
        : state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const catalogsServices = new CatalogsServices(API_CONSTANTS.DOMAIN, HEADER);

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }

    const response = await catalogsServices.postGetAllLanguages(data, true);
    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const actions = {
  actionCleanCatalog,
  setCatalog,
  getQueryFieldByIdSection,
  getOperatorsByIdQueryField,
  postGetAllCountries,
  postGetAllCurrency,
  postGetAllLanguages,
  postAllCatalogs,
};
const catalogsAction = actions;
export default catalogsAction;
