import isEmpty from 'lodash/isEmpty';
import SystemConfigurationsServices from '../../utils/services/systemConfigurationsServices';
import { API_CONSTANTS, HEADER } from '../../utils/constants/apiConstants';
import { WORKSTATION_CONSTANTS } from './constants';

import ActionApiValidator from '../../utils/functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

export const actionSetTimeZones = (zones) => ({
  type: WORKSTATION_CONSTANTS.EVENTS.SET_TIMEZONES_ARRAY,
  zones,
});
export const actionGetTimeZones = (tokenStr = '', idCompanyStr = '') => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token =
      isEmpty(tokenStr) === false
        ? tokenStr
        : state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany =
      isEmpty(idCompanyStr) === false
        ? idCompanyStr
        : state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    const systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    );

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }
    const response = await systemConfigurationsServices.getTimeZonesByIdCompany(
      idCompany,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    return response;
  } catch (error) {
    throw error;
  }
};
