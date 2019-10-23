import isEmpty from 'lodash/isEmpty';

import AlphaAssetsServices from '../../../../../utils/services/alphaAssetsServices';
import {
  API_CONSTANTS,
  HEADER,
} from '../../../../../utils/constants/apiConstants';
import ActionApiValidator from '../../../../../utils/functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

export const customerDocumentAttach = (file, fileProperties) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
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

    fileProperties.idCompany = idCompany;
    fileProperties.idUserSecurityKey = idUserSecurityKey;
    const response = await alphaAssetsServices.customerDocumentAttach(
      file,
      fileProperties,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCustomerDocument = (data = {}) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
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
    const response = await alphaAssetsServices.getCustomerDocument(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
export const deactivateCustomerDocument = (data = {}) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
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
    data.idCompany = idCompany;
    data.idUserSecurityKey = idUserSecurityKey;
    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await alphaAssetsServices.deactivateCustomerDocument(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
