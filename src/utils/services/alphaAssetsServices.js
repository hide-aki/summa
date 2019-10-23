import { AxiosRequester } from '../requester/index';
import { API_CONSTANTS } from '../constants/apiConstants';

class AlphaAssetsServices {
  constructor(domain, headers) {
    this.domain = domain;
    this.headers = headers;
    this.requester = new AxiosRequester(domain);
  }

  postGetTransactionById = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.GET_TRANSACTION_BY;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postPaymentType = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_PAYMENT_TYPE;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetTransactionCoincidences = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.GET_TRANSACTIONS_COINCIDENCES;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAnswersAccount = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_ANSWERS_ACCOUNT;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  putAnswersAccount = async (data = {}, idCustomer) => {
    const endpoint = API_CONSTANTS.ALPHA.PUT_ANSWERS_ACCOUNT + idCustomer;
    try {
      const response = await this.requester.put(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getProfileBySystemUser = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.GET_PROFILE_BY_SYSTEM_USER;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAccountCustomer = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_ACCOUNT_CUSTOMER;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  updateAccountCustomer = async (data = {}, idCustomer) => {
    const endpoint = `${API_CONSTANTS.ALPHA.PUT_ACCOUNT_CUSTOMER}${idCustomer}`;
    try {
      const response = await this.requester.put(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  customerDocumentAttach = async (file, fileProperties) => {
    const formData = new FormData();
    formData.append('file', file.file[0]);
    formData.append('fileProperties', JSON.stringify(fileProperties));
    const endpoint = API_CONSTANTS.ALPHA.CUSTOMER_DOCUMENT_ATTACH;

    try {
      const response = await this.requester.post(
        endpoint,
        formData,
        this.headers,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  getCustomerDocument = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.GET_CUSTOMER_DOCUMENT;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllAccount = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_ALL_ACCOUNT;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postTransaction = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_TRANSACTION;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  deactivateCustomerDocument = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.DEACTIVATE_CUSTOMER_DOCUMENT;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetFrequentQuestions = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_FREQUENT_QUESTIONS;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetProfitLoss = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_PROFIT_LOSS;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetLastMovements = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_LAST_MOVEMENTS;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetDataTable = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_DATA_TABLE;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getDataUser = async (userId = '') => {
    const endpoint = `${API_CONSTANTS.ALPHA.GET_DATA_USER}/${userId}`;
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postUserBalance = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_USER_BALANCE;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetUserDeals = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_USER_DEALS;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetDBdate = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.POST_GET_DB_DATE;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default AlphaAssetsServices;
