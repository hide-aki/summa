import isEmpty from 'lodash/isEmpty';

import { API_CONSTANTS, HEADER } from '../constants/apiConstants';
import CatalogsServices from '../services/catalogsServices';
import CommunicationsServices from '../services/communicationsServices';

import ActionApiValidator from '../functions/actionApiValidator';

const actionApiValidator = new ActionApiValidator();

export const setEmailEditorADataToState = (
  isTemplateVisible,
  idTemplate,
  isOpenModal,
  isShowSecondaryEmailsRow,
  secondaryEmailsToCopy,
  defaulthtmlEmail,
  subject,
  idEmailEditor,
  idScreenCode,
  idSection,
  idRecruitmentPhase,
  idCandidate,
  idRecruitment,
) => ({
  type: 'SET_ALL_DATA_EMAIL_EDITOR',
  isTemplateVisible,
  idTemplate,
  isOpenModal,
  isShowSecondaryEmailsRow,
  secondaryEmailsToCopy,
  defaulthtmlEmail,
  subject,
  idEmailEditor,
  idScreenCode,
  idSection,
  idRecruitmentPhase,
  idCandidate,
  idRecruitment,
});

export const setClearEmailEditor = () => ({ type: 'SET_CLEAR_EMAIL_EDITOR' });

export const setCloseEmailEditor = () => ({ type: 'SET_CLOSE_EMAIL_EDITOR' });

export const setEmailTemplatesCatalog = (emailTemplatesCatalog) => ({
  type: 'SET_EMAIL_TEMPLATES_CATALOG',
  emailTemplatesCatalog,
});

export const setPreviewEmailTemplate = (emailTemplateHtml) => ({
  type: 'SET_PPREVIEW_EMAIL_TEMPLATE',
  emailTemplateHtml,
});

export const setSubjectEmailTemplate = (subject) => ({
  type: 'SET_SUBJECT_EMAIL_TEMPLATE',
  subject,
});

export const setIsSendEmail = (isSendEmail) => ({
  type: 'SET_IS_SEND_EMAIL',
  isSendEmail,
});

export const actionsShowEmailEditor = (data = {}) => (dispatch, getState) => {
  const state = getState();
  if (state.emailEditor.idEmailEditor !== data.idEmailEditor) {
    if (state.emailEditor.idEmailEditor !== '' && data.idEmailEditor !== '') {
      dispatch(setIsSendEmail(false));
      dispatch(setClearEmailEditor());
    }
  }
  const dataObject = {
    idEmailEditor: data.idEmailEditor,
    isTemplateVisible: data.isTemplateVisible,
    idTemplate: data.idTemplate,
    isOpenModal: data.isOpenModal,
    isShowSecondaryEmailsRow: data.isShowSecondaryEmailsRow,
    secondaryEmailsToCopy: data.secondaryEmailsToCopy,
    defaulthtmlEmail: data.defaulthtmlEmail,
    subject: data.subject,
    idScreenCode: data.idScreenCode,
    idSection: data.idSection,
    idRecruitmentPhase: data.idRecruitmentPhase,
    idCandidate: data.idCandidate,
    idRecruitment: data.idRecruitment,
  };
  return dispatch(
    setEmailEditorADataToState(
      dataObject.isTemplateVisible,
      dataObject.idTemplate,
      dataObject.isOpenModal,
      dataObject.isShowSecondaryEmailsRow,
      data.secondaryEmailsToCopy,
      dataObject.defaulthtmlEmail,
      dataObject.subject,
      dataObject.idEmailEditor,
      dataObject.idScreenCode,
      dataObject.idSection,
      dataObject.idRecruitmentPhase,
      dataObject.idCandidate,
      dataObject.idRecruitment,
    ),
  );
};

export const actionsClearEmailEditor = () => (dispatch) => {
  dispatch(setClearEmailEditor());
};

export const actionsCloseEmailEditor = () => (dispatch) => {
  dispatch(setCloseEmailEditor());
};

export const getEmailTemplatesCatalog = (idCompanyStr = '') => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const token = state.dataProfile.getIn(['dataProfile', 'token']);
    const idCompany =
      isEmpty(idCompanyStr) === false
        ? idCompanyStr
        : state.dataProfile.getIn(['dataProfile', 'idCompany']);
    HEADER.Authorization = API_CONSTANTS.Authorization + token;

    const catalogsServices = new CatalogsServices(API_CONSTANTS.DOMAIN, HEADER);

    if (
      actionApiValidator.validateTokenIdcompanyNotEmpty(token, idCompany) ===
        true ||
      isEmpty(token)
    ) {
      throw actionApiValidator.resultError();
    }

    const response = await catalogsServices.getEmailTemplatesCatalog(idCompany);

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    dispatch(setEmailTemplatesCatalog(response.result));
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTemplateData = (data = {}) => async (dispatch, getState) => {
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
        true ||
      isEmpty(token)
    ) {
      throw actionApiValidator.resultError();
    }

    if (actionApiValidator.validateDataNotEmpty(data) === true) {
      throw actionApiValidator.resultError();
    }

    const response = await communicationsServices.getEmailTemplatesCatalog(
      idCompany,
    );

    if (actionApiValidator.validateResponseDataEmpty(response) === true) {
      throw actionApiValidator.resultError();
    }
    if (response.result === null) {
      dispatch(setSubjectEmailTemplate(''));
      dispatch(setPreviewEmailTemplate(''));
      return {
        template: '',
        subject: '',
      };
    }
    dispatch(setPreviewEmailTemplate(response.result.mailBody));
    dispatch(setSubjectEmailTemplate(response.result.subject));
    return {
      template: response.result.mailBody,
      subject: response.result.subject,
    };
  } catch (error) {
    throw error;
  }
};
