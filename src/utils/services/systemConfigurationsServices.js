/* eslint lines-between-class-members: ["error", "always"] */

import { AxiosRequester } from '../requester/index';
import { API_CONSTANTS } from '../constants/apiConstants';

class SystemConfigurationsServices {
  constructor(domain, headers) {
    this.domain = domain;
    this.headers = headers;
    this.requester = new AxiosRequester(domain);
  }

  alfaLogin = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.ALFA_LOGIN;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (data = {}) => {
    const endpoint = API_CONSTANTS.SYSTEM_CONFIGURATION.LOGIN;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postAcceptTerms = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_ACCEPT_TERMS;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAcceptTermsAndConditions = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.GET_TERMS_AND_CONDITIONS;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getMenuTemplate = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.GET_MENU_TEMPLATE;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getLanguageMessages = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.GET_MESSAGES_BY_ID_LANGUAGE;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postAudiTrail = async (data = {}) => {
    const endpoint = API_CONSTANTS.SYSTEM_CONFIGURATION.POST_AUDI_TRAIL;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  startSession = async (data = {}) => {
    const endpoint = API_CONSTANTS.LOGIN_USER.START_SESSION;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  endSession = async (data = {}) => {
    const endpoint = API_CONSTANTS.LOGIN_USER.END_SESSION;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getComponentsByIdCompanyIdSection = async (idCompany, idSection) => {
    const endpoint = `${API_CONSTANTS.SYSTEM_CONFIGURATIONGET_COMPONENTS_BY_ID_COMPANY_ID_SECTION}/${idCompany}/${idSection}`;

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getComponentsByIdCompanyIdScreenCode = async (
    idCompany,
    idScreenCode,
    idSystemUser,
  ) => {
    const endpoint = `${API_CONSTANTS.SYSTEM_CONFIGURATION.GET_COMPONENTS_BY_ID_COMPANY_ID_SCREEN_CODE}/${idCompany}/${idScreenCode}/${idSystemUser}`;

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getComponentsByIdCompanyIdSystemUserIdScreenCode = async (
    idCompany,
    idSystemUser,
    idScreenCode,
  ) => {
    const endpoint = `${API_CONSTANTS.SYSTEM_CONFIGURATION.GET_SECTION_BY_ID_COMPANY}/${idCompany}/${idSystemUser}/${idScreenCode}`;

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getMenuByIdUser = async (data) => {
    const endpoint = API_CONSTANTS.SYSTEM_CONFIGURATION.GET_MENU_BY_ID_USER;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      return error;
    }
  };

  getFrontParameters = async (idCompany) => {
    const endpoint =
      API_CONSTANTS.SYSTEM_CONFIGURATION.GET_FRONT_PARAMETERS + idCompany;
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getScreenNavi = async (
    idCompany = '',
    idScreenCode = '',
    idScreenCodeRedirected = null,
  ) => {
    let endpoint = '';
    if (idScreenCodeRedirected == null) {
      endpoint = `${API_CONSTANTS.SYSTEM_CONFIGURATION.GET_SCREEN_NAVI +
        idCompany}/${idScreenCode}`;
    } else {
      endpoint = `${API_CONSTANTS.SYSTEM_CONFIGURATION.GET_SCREEN_NAVI +
        idCompany}/${idScreenCode}/${idScreenCodeRedirected}`;
    }
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getDateDataBase = async () => {
    const endpoint = API_CONSTANTS.SYSTEM_CONFIGURATION.GET_DATE_FROM_DATABASE;
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getTimeZonesByIdCompany = async (idCompany) => {
    const endpoint =
      API_CONSTANTS.SYSTEM_CONFIGURATION.GET_TIME_ZONES_BY_ID_COMPANY +
      idCompany;
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getResultButtonByIdSection = async (idCompany, idScreenCode, idSection) => {
    const endpoint = `${API_CONSTANTS.SYSTEM_CONFIGURATION
      .GET_RESULT_BUTTON_BY_ID_SECTION +
      idCompany}/${idScreenCode}/${idSection}`;
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postEmployeeConfig = async (data = {}) => {
    const endpoint = API_CONSTANTS.SYSTEM_CONFIGURATION.POST_EMPLOYEE_CONFIG;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  putEmployeeConfig = async (idManager = '', idEmployee = '', data = {}) => {
    const endpoint = `${API_CONSTANTS.SYSTEM_CONFIGURATION.PUT_EMPLOYEE_CONFIG +
      idManager}/${idEmployee}`;
    try {
      const response = await this.requester.put(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  putEmployeeConfigCheckAll = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.SYSTEM_CONFIGURATION.PUT_EMPLOYEE_CONFIG_CHECK_ALL;
    try {
      const response = await this.requester.put(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getEmployeeConfigByIdManager = async (idEmployee = '', idCompany = '') => {
    const endpoint = `${API_CONSTANTS.SYSTEM_CONFIGURATION
      .GET_EMPLOYEE_CONFIG_BY_ID_MANAGER + idEmployee}/${idCompany}`;
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetEmployeeConfigSearch = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.SYSTEM_CONFIGURATION.POST_GET_EMPLOYEE_CONFIG_SEARCH;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetReviewResultsReviewSurveyById = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.SYSTEM_CONFIGURATION
        .POST_GET_REVIEW_RESULTS_REVIEW_SURVEY_BY_ID;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postReviewResultAnswerReviewSurveyGrade = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.SYSTEM_CONFIGURATION
        .POST_REVIEW_RESULT_ANSWER_REVIEW_SURVEY_GRADE;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetCoincidencesColumns = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.SYSTEM_CONFIGURATION.POST_GET_COINCIDENCES_COLUMNS;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default SystemConfigurationsServices;
