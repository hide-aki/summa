import AlphaAssetsServices from '../../../utils/services/alphaAssetsServices';

import { API_CONSTANTS, HEADER } from '../../../utils/constants/apiConstants';

const postGetFrequentQuestions = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.postGetFrequentQuestions(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const postGetProfitLoss = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.postGetProfitLoss(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const postGetLastMovements = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.postGetLastMovements(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const postGetDataTable = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.postGetDataTable(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getDataUser = (userId) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.getDataUser(userId);
    return response;
  } catch (error) {
    throw error;
  }
};

const postUserBalance = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.postUserBalance(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const postGetUserDeals = (data) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const alphaAssetsServices = new AlphaAssetsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    const response = await alphaAssetsServices.postGetUserDeals(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const actionsAlpha = {
  postGetFrequentQuestions,
  postGetProfitLoss,
  postGetLastMovements,
  postGetDataTable,
  getDataUser,
  postUserBalance,
  postGetUserDeals,
};

export default actionsAlpha;
