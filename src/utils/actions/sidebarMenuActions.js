import { API_CONSTANTS, HEADER } from '../constants/apiConstants';
import SystemConfigurationsServices from '../services/systemConfigurationsServices';

let systemConfigurationsServices = null;
const resultError = { error: true };

export const setSidebarMenuToState = (sidebarMenu) => ({
  type: 'SET_SIDEBAR_MENU_TO_STATE',
  sidebarMenu,
});

export const setDefaultUrlToState = (sidebarMenuActiveData) => ({
  type: 'SET_SIDEBAR_MENU_ACTIVE_URL_TO_STATE',
  sidebarMenuActiveData,
});

export const actionGetMenuByIdUser = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);

    HEADER.Authorization = API_CONSTANTS.Authorization + token;
    systemConfigurationsServices = new SystemConfigurationsServices(
      API_CONSTANTS.DOMAIN,
      HEADER,
    ); // systemConfigurationsServices
    resultError.messageCode =
      systemConfigurationsServices.MESSAGES_CODES.UISSC000000000003.CODE;
    systemConfigurationsServices
      .getMenuByIdUser(data) // idSystemUser, idCompany,0,0
      .then((response) => {
        resolve(response);
      }) // then
      .catch((error) => {
        error.messageCode =
          systemConfigurationsServices.MESSAGES_CODES.UISSC000000000003.CODE;
        reject(error);
      }); // catch
  });
};
