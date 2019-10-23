import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';

import RepositoryServices from '../services/repositoryServices';

import { API_CONSTANTS, HEADER_FORM_DATA } from '../constants/apiConstants';

import ActionApiValidator from '../functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

export const postPhotoLoadAvatar = (data) => async (dispatch, getState) => {
  const dataDocument = data;
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idSystemUser = state.dataProfile.getIn([
      'dataProfile',
      'idSystemUser',
    ]);
    HEADER_FORM_DATA.Authorization = API_CONSTANTS.Authorization + token;

    const repositoryServices = new RepositoryServices(
      API_CONSTANTS.DOMAIN,
      HEADER_FORM_DATA,
    );

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(idSystemUser)
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }
    dataDocument.idCompany = idCompany;
    dataDocument.uploadedBySystemUser = idSystemUser;

    const response = await repositoryServices.postPhotoLoadAvatar(data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPreviewDocument = (idDocument) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);

    HEADER_FORM_DATA.Authorization = API_CONSTANTS.Authorization + token;

    const repositoryServices = new RepositoryServices(
      API_CONSTANTS.DOMAIN,
      HEADER_FORM_DATA,
    );

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(idDocument)
    ) {
      throw actionApiValidator.resultError();
    }

    const response = await repositoryServices.getPreviewDocument(idDocument);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postDocument = (file, fileProperties) => async (
  dispatch,
  getState,
) => {
  const filePropertiesObject = fileProperties;
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idSystemUser = state.dataProfile.getIn([
      'dataProfile',
      'idSystemUser',
    ]);

    HEADER_FORM_DATA.Authorization = API_CONSTANTS.Authorization + token;
    const repositoryServices = new RepositoryServices(
      API_CONSTANTS.DOMAIN,
      HEADER_FORM_DATA,
    );

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }

    filePropertiesObject.idCompany = idCompany;
    filePropertiesObject.uploadedBySystemUser = idSystemUser;

    const response = await repositoryServices.postDocument(
      file,
      filePropertiesObject,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const postDocumentAlpha = (file, fileProperties) => async (
  dispatch,
  getState,
) => {
  const filePropertiesObject = fileProperties;
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idSystemUser = state.dataProfile.getIn([
      'dataProfile',
      'idSystemUser',
    ]);

    HEADER_FORM_DATA.Authorization = API_CONSTANTS.Authorization + token;
    const repositoryServices = new RepositoryServices(
      API_CONSTANTS.DOMAIN,
      HEADER_FORM_DATA,
    );

    if (isEmpty(token)) {
      throw actionApiValidator.resultError();
    }

    filePropertiesObject.idCompany = idCompany;
    filePropertiesObject.uploadedBySystemUser = idSystemUser;

    const response = await repositoryServices.postDocumentAlpha(
      file,
      filePropertiesObject,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const putDocument = (file = null, data = {}) => async (
  dispatch,
  getState,
) => {
  const dataDocument = data;
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);
    const idSystemUser = state.dataProfile.getIn([
      'dataProfile',
      'idSystemUser',
    ]);
    HEADER_FORM_DATA.Authorization = API_CONSTANTS.Authorization + token;

    const repositoryServices = new RepositoryServices(
      API_CONSTANTS.DOMAIN,
      HEADER_FORM_DATA,
    );
    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
      true
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(dataDocument) === true) {
      throw actionApiValidator.resultError();
    }
    dataDocument.idCompany = idCompany;
    dataDocument.uploadedBySystemUser = idSystemUser;

    const response = await repositoryServices.putDocument(file, dataDocument);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDocument = (idDocument, showThumbnail = false) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);

    HEADER_FORM_DATA.Authorization = API_CONSTANTS.Authorization + token;

    const repositoryServices = new RepositoryServices(
      API_CONSTANTS.DOMAIN,
      HEADER_FORM_DATA,
    );
    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(idDocument) ||
      isBoolean(showThumbnail) === false
    ) {
      throw actionApiValidator.resultError();
    }

    const response = await repositoryServices.getDocument(
      idDocument,
      showThumbnail,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDocumentAlpha = (idDocument, showThumbnail = false) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany = state.dataProfile.getIn(['dataProfile', 'idCompany']);

    HEADER_FORM_DATA.Authorization = API_CONSTANTS.Authorization + token;

    const repositoryServices = new RepositoryServices(
      API_CONSTANTS.DOMAIN,
      HEADER_FORM_DATA,
    );
    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(idDocument) ||
      isBoolean(showThumbnail) === false
    ) {
      throw actionApiValidator.resultError();
    }

    const response = await repositoryServices.getDocumentAlpha(
      idDocument,
      showThumbnail,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
