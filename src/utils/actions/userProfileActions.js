import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';
import { AxiosRequester } from '../requester/index';
import { API_CONSTANTS } from '../constants/apiConstants';

import ActionApiValidator from '../functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

const requester = new AxiosRequester(API_CONSTANTS.DOMAIN, 'top-loader');

export const setProfileDataToState = (dataProfile) => ({
  type: 'SET_PROFILE_DATA_TO_STATE',
  dataProfile,
});

export const setEmailsEmployeeAddress = (emailsAddresses) => ({
  type: 'SET_PROFILE_EMAILS_ADDRESSES_TO_STATE',
  emailsAddresses,
});

export const setProfileData = (dataProfile) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(setProfileDataToState(dataProfile));
    resolve();
  });
};

export const getUserDataProfile = (idSystemUser, tokenStr, idModule) => async (
  dispatch,
  getState,
) => {
  const ID_MODULE = `${isNumber(idModule) ? `/${idModule}` : ''}`;
  const endpoint = `${
    API_CONSTANTS.HUMAN_RESOURCES.USER_PROFILE
  }${idSystemUser}${ID_MODULE}`;
  try {
    const state = getState();
    const token =
      isEmpty(tokenStr) === false
        ? tokenStr
        : state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    if (isEmpty(token) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await requester.get(endpoint, {
      Authorization: `Bearer ${token}`,
    });

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
