import { API_CONSTANTS } from '../constants/apiConstants';
import { AxiosRequester } from '../requester';

class CommunicationsServices {
  constructor(domain, headers) {
    this.domain = domain;
    this.headers = headers;
    this.requester = new AxiosRequester(domain);
  }

  postPreviewHtmlEmailTemplateRh = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.COMMUNICATIONS.POST_PREVIEW_HTML_EMAIL_TEMPLATE_RH;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };

  postPreviewEmailTemplate = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.COMMUNICATIONS.POST_PREVIEW_HTML_EMAIL_TEMPLATE;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };

  postSendEmail = async (data = {}) => {
    const endpoint = API_CONSTANTS.COMMUNICATIONS.POST_SEND_EMAIL;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };

  postSendEmailSentInfo = async (data = {}) => {
    const endpoint = API_CONSTANTS.COMMUNICATIONS.POST_GET_EMAIL_SENT_INFO;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };

  postEmailRequestEmployeeConfig = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.COMMUNICATIONS.POST_EMAIL_REQUEST_EMPLOYEE_CONFIG;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetRequestEmployeeConfig = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.COMMUNICATIONS.POST_GET_REQUEST_EMPLOYEE_CONFIG;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };

  getEmployeeConfigInfo = async (data = {}) => {
    const endpoint = API_CONSTANTS.COMMUNICATIONS.GET_EMPLOYEE_CONFIG_INFO;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };

  postSendEmailEmployeeConfiguration = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.COMMUNICATIONS.POST_SEND_EMAIL_EMPLOYEE_CONFIGURATION;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetEmailSentConfigInfo = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.COMMUNICATIONS.POST_GET_EMAIL_SENT_CONFIG_INFO;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };
}
export default CommunicationsServices;
