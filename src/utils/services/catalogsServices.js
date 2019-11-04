import isNil from 'lodash/isNil';

import { AxiosRequester } from '../requester';
import { API_CONSTANTS } from '../constants/apiConstants';

class CatalogsServices {
  constructor(domain, headers) {
    this.domain = domain;
    this.headers = headers;
    this.requester = new AxiosRequester(domain);
    this.defualtIsComboBox = true;
  }

  getQueryFieldByIdSection = async (
    idCompany = '',
    idScreenCode = '',
    idSection = '',
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_QUERY_FIELD_BY_ID_SECTION_COMBO_BOX}/${idCompany}/${idScreenCode}/${idSection}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_QUERY_FIELD_BY_ID_SECTION}/${idCompany}/${idScreenCode}/${idSection}`;
    }
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getOperatorsByIdQueryField = async (
    idCompany = '',
    idScreenCode = '',
    idSection = '',
    idQueryField = '',
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_OPERATORS_BY_ID_QUERY_FIELD_COMBO_BOX}/${idCompany}/${idScreenCode}/${idSection}`;
      if (isNil(idQueryField) === false) {
        endpoint = `${endpoint}/${idQueryField}`;
      }
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_OPERATORS_BY_ID_QUERY_FIELD}/${idCompany}/${idScreenCode}/${idSection}`;

      if (isNil(idQueryField) === false) {
        endpoint = `${endpoint}/${idQueryField}`;
      }
    }
    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllCountriesCatalog = async (data = {}) => {
    try {
      const response = await this.requester.post(
        API_CONSTANTS.ALPHA.GET_COUNTRY_CATALOG,
        data,
        this.headers,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  postAllNationalitiesCatalog = async (data = {}) => {
    try {
      const response = await this.requester.post(
        API_CONSTANTS.ALPHA.GET_NATIONALITIES_CATALOG,
        data,
        this.headers,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  postAllStatesCatalog = async (data = {}) => {
    try {
      const response = await this.requester.post(
        API_CONSTANTS.ALPHA.GET_STATES_CATALOG,
        data,
        this.headers,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  postAllOccupationCatalog = async (data = {}) => {
    try {
      const response = await this.requester.post(
        API_CONSTANTS.ALPHA.GET_OCCUPATION_CATALOG,
        data,
        this.headers,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllCatalogClosing = async (data = {}) => {
    try {
      const response = await this.requester.post(
        API_CONSTANTS.CATALOGS.GET_ALL_CATALOGS_CLOSING,
        data,
        this.headers,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllCountries = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_COUNTRIES_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_COUNTRIES;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllBanks = async (data = {}, isComboBox = this.defualtIsComboBox) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_BANKS_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_BANKS;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllCurrency = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_CURRENCY_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_CURRENCY;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllAccountType = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_ACCOUNT_TYPE_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_ACCOUNT_TYPE;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllBrokersByUser = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_BROKERS_BY_USER_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_BROKERS_BY_USER;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionCategory = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CATEGORY_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CATEGORY;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionType = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_TYPE_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_TYPE;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionOrigin = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_ORIGIN_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_ORIGIN;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionConcept = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CONCEPT_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CONCEPT;
    }
    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllExchangeRates = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_EXCHANGE_RATES_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_EXCHANGE_RATES;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postAllIBOffice = async (data = {}, isComboBox = this.defualtIsComboBox) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_ALL_IB_OFFICE_COMBOBOX}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_ALL_IB_OFFICE}`;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllEnterprisesByIdUser = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_ALL_ENTERPRISES_BY_ID_USER_COMBOBOX}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_ALL_ENTERPRISES_BY_ID_USER}`;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllTransactionMove = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_ALL_TRANSACTION_MOVE_COMBOBOX}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_ALL_TRANSACTION_MOVE}`;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postAddBroker = async (data = {}) => {
    let endpoint = null;

    endpoint = `${API_CONSTANTS.CATALOGS.POST_ADD_BROKER}`;

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postTransactionView = async (data, isComboBox = this.defualtIsComboBox) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.GET_TRANSACTION_VIEW_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.GET_TRANSACTION_VIEW;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllPaymentMethod = async (data, isComboBox = this.defualtIsComboBox) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.GET_PAYMENT_METHOD_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.GET_PAYMENT_METHOD;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllConceptBank = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CONCEPT_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CONCEPT;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllIBOffice = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_IB_OFFICE_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_IB_OFFICE;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getIncomeStatementViews = async (
    idCompany = '',
    idP2GOUser = '',
    type = '',
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_INCOME_STATEMENT_VIEWS_COMBOBOX}/${idCompany}/${idP2GOUser}/${type}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_INCOME_STATEMENT_VIEWS}/${idCompany}/${idP2GOUser}/${type}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getEmailTemplatesCatalog = async (
    idCompany,
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_EMAIL_TEMPLATES_COMBO_BOX}/${idCompany}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_EMAIL_TEMPLATES}/${idCompany}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postAllCatalogs = async (data = {}, isComboBox = this.defualtIsComboBox) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_ALL_CATALOGS_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_ALL_CATALOGS;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getTransactionStatus = async (
    idCompany = '',
    idP2GOUser = '',
    type = '',
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_TRANSACTION_STATUS_COMBOBOX}/${idCompany}/${type}/${idP2GOUser}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_TRANSACTION_STATUS}/${idCompany}/${type}/${idP2GOUser}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllMonth = async (data = {}, isComboBox = this.defualtIsComboBox) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_MONTH_COMBO_BOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_MONTH;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllYears = async (idCompany = '', isComboBox = this.defualtIsComboBox) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.POST_GET_ALL_YEAR_COMBO_BOX}/${idCompany}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.POST_GET_ALL_YEAR}/${idCompany}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetSystemViews = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_SYSTEM_VIEWS_COMBO_BOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_SYSTEM_VIEWS;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getReportTypeAll = async (
    idCompany = '',
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_REPORT_TYPE_ALL_COMBO_BOX}${idCompany}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_REPORT_TYPE_ALL}${idCompany}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getBalance = async (
    idCompany = '',
    idP2GOUser = '',
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_CATALOG_BALANCE_COMBO_BOX}${idCompany}/${idP2GOUser}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_CATALOG_BALANCE}${idCompany}/${idP2GOUser}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getAllOfficeType = async (
    idCompany = '',
    idP2GOUser = '',
    type = '',
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_ALL_OFFICE_TYPE_COMBOBOX}${idCompany}/${idP2GOUser}/${type}`;
    } else {
      endpoint = `${API_CONSTANTS.CATALOGS.GET_ALL_OFFICE_TYPE}${idCompany}/${idP2GOUser}/${type}`;
    }

    try {
      const response = await this.requester.get(endpoint, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllBrokerOffice = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;

    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_BROKERS_OFFICE_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_BROKERS_OFFICE;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionBrokers = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_BROKERS_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_BROKERS;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionOffices = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_OFFICES_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_OFFICES;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionCurrencies = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CURRENCIES_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CURRENCIES;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionConceptBank = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CONCEPT_BANK_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_CONCEPT_BANK;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetTransactionIt = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_TRANSACTION_IT_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_TRANSACTION_IT;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionCountries = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_COUNTRIES_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_COUNTRIES;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionPaymentMethod = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_PAYMENT_METHOD_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_PAYMENT_METHOD;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllEnterprisesByIdUser = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_ENTERPRISES_BY_ID_USER_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_ENTERPRISES_BY_ID_USER;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionMethodsOutput = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_METHODS_OUTPUT_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_TRANSACTION_METHODS_OUTPUT;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllTransactionFunctionary = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.GET_ALL_TRANSACTION_FUNCTIONARY_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.GET_ALL_TRANSACTION_FUNCTIONARY;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllAccountClosing = async (
    data = {},
    isComboBox = this.defualtIsComboBox,
  ) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint =
        API_CONSTANTS.CATALOGS.POST_GET_ACCOUNT_CLOSING_YEARS_ALL_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ACCOUNT_CLOSING_YEARS_ALL;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);
      return response;
    } catch (error) {
      throw error;
    }
  };

  postGetAllLanguages = async (data, isComboBox = this.defualtIsComboBox) => {
    let endpoint = null;
    if (isComboBox) {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_LANGUAGES_COMBOBOX;
    } else {
      endpoint = API_CONSTANTS.CATALOGS.POST_GET_ALL_LANGUAGES;
    }

    try {
      const response = await this.requester.post(endpoint, data, this.headers);

      return response;
    } catch (error) {
      throw error;
    }
  };
}
export default CatalogsServices;
