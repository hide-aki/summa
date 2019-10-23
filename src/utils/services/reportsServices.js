import { AxiosRequester } from '../requester';
import { API_CONSTANTS } from '../constants/apiConstants';

class ReportsServices {
  constructor(domain, headers) {
    this.domain = domain;
    this.headers = headers;

    this.requester = new AxiosRequester(domain);
    this.defualtIsComboBox = true;
  }

  getExcel = async (idReport = null, dataEncripted = null) => {
    const endpoint =
      API_CONSTANTS.REPORTS.GET_EXCEL + '/' + idReport + '?v=' + dataEncripted;
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postExcelParametersEncrypt = async (data = {}) => {
    const endpoint =
      API_CONSTANTS.REPORTS.POST_EXCEL_PARAMENTERS_ENCRIPT +
      '/' +
      data.idReport;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postEncryptTransaction = async (data = {}) => {
    const endpoint = API_CONSTANTS.ALPHA.ENCRYPT_TRANSACTION;
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetPdfDocument = async (data = {}) => {
    const endpoint = API_CONSTANTS.REPORTS.GET_PDF_TRANSACTION_PM_INFO;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      return error;
    }
  };
}
export default ReportsServices;
