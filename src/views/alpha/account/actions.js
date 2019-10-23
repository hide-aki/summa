import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import AlphaAssetsServices from '../../../utils/services/alphaAssetsServices';
import CatalogsServices from '../../../utils/services/catalogsServices';

import { API_CONSTANTS, HEADER } from '../../../utils/constants/apiConstants';

const postGetAllCountriesCatalog = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const catalogsServices = new CatalogsServices(API_CONSTANTS.DOMAIN, HEADER);
    const response = await catalogsServices.postGetAllCountriesCatalog(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const postGetAccountCustomer = (data) => async (dispatch, getState) => {
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
    const response = await alphaAssetsServices.postGetAccountCustomer(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const updateAccountCustomer = (data, idCustomer) => async (
  dispatch,
  getState,
) => {
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
    const response = await alphaAssetsServices.updateAccountCustomer(
      data,
      idCustomer,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const actionsAlpha = {
  postGetAccountCustomer,
  updateAccountCustomer,
  postGetAllCountriesCatalog,
};

export default actionsAlpha;
