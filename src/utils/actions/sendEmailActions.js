import isEmpty from 'lodash/isEmpty';

import { API_CONSTANTS, HEADER } from '../constants/apiConstants';
import CommunicationsServices from '../services/communicationsServices';

import ActionApiValidator from '../functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

export const actionsSetIsOpenSoftphoneToState = (isOpen) => ({
  type: 'SET_IS_OPEN_SOFTPHONE',
  isOpen,
});

export const actionsSendEmail = (data = {}) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const communicationsServices = new CommunicationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );
    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await communicationsServices.postSendEmail(data);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
