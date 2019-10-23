/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { FormGroup, Label } from 'reactstrap';
import {
  CustomCardBody,
  CustomCard,
  CustomCol,
  CustomRow,
  CustomCardHeader,
  DateFunctions,
  ALERT_TYPE,
  MESSAGES_CODES_GENERICS,
} from '@pleedtech/pt-components';

import { notification } from 'antd';

// Constants

import DOCUMENT_TYPES from './documentsConstants';

// Selectors
import { selectFrontParameters } from '../../../../../utils/selectors/frontParametersSelectors';
import {
  makeSelectDataProfile,
  selectIdSystemUser,
} from '../../../../../utils/selectors/dataUserProfileSelectors';
import {
  selectMessages,
  selectIdLanguage,
} from '../../../../../containers/languageProvider/selectors';

// Actions

import {
  postDocumentAlpha,
  getDocumentAlpha,
} from '../../../../../utils/actions/repositoryActions';
import {
  customerDocumentAttach,
  getCustomerDocument,
  deactivateCustomerDocument,
} from './documetsActions';

// Components

import CustomAddDocument from '../../../../../components/customAddDocument';
import { MessagesFunctions } from '@pleedtech/pt-components/dist';

const offset = sessionStorage.setItem('globalOffset', '-05:00');

const dateFunctions = new DateFunctions(offset);

const openNotification = (description, messageType) => {
  let className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';

  switch (messageType) {
    case ALERT_TYPE.SUCCESS:
      className = 'ntfctnANTCtrl_bb successNtfctnCtrl';
      break;
    case ALERT_TYPE.WARNING:
      className = 'ntfctnANTCtrl_bb warningNtfctnCtrl';
      break;
    case ALERT_TYPE.ERROR:
      className = 'ntfctnANTCtrl_bb dangerNtfctnCtrl';
      break;
    case ALERT_TYPE.INFO:
      className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
      break;

    default:
      className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
      break;
  }

  notification.open({
    message: '',
    description,
    style: {},
    className,
  });
};

const CardsAccountDocuments = (props) => {
  const [idDocumentCustomer, setIdDocumentCustomer] = useState('');
  const [idDocument, setIdDocument] = useState('');
  const [state, setState] = useState({});

  const setDocumentsByIdType = (stateName, value, blockButton) => {
    setState((prevState) => ({
      ...prevState,
      [stateName]: value,
      [`${stateName}BlockButton`]: blockButton,
    }));
  };

  const blockButton8 =
    isEmpty(state) === false && isNil(state.documentsType4BlockButton) === false
      ? state.documentsType4BlockButton
      : false;

  const dataImage = 'data:image/jpg;base64,';
  const {
    messages,
    idSystemUser,
    postCustomerDocumentAttach,
    getCustomerDocumentData,
    deactivateDocumentCustomer,
    dataProfile,
    idLanguage,
    idTransactionCL,
    idPaymentType,
    documentType,
    // TO DO
    // fronParameters,
  } = props;

  let messagesFunctions = new MessagesFunctions(messages);

  const transformDataDocument = (documents) => {
    let arrayDocuments = [];

    if (Array.isArray(documents) && isEmpty(documents) === false) {
      arrayDocuments = documents.map((document) => {
        return {
          fileName: document.documentName,
          idDocument: document.idDocument,
          image: dataImage + document.thumbnail,
          url: '',
          date:
            isEmpty(document.uploadedAt) === false
              ? `${dateFunctions.dateFormat(
                  dateFunctions.globalDateToLocalDate(document.uploadedAt),
                  dateFunctions._dateFormat_2,
                )} ${dateFunctions.dateFormat(
                  dateFunctions.globalDateToLocalDate(document.uploadedAt),
                  dateFunctions._timeFormat_1,
                )}hrs`
              : '',
        };
      });
    }
    return arrayDocuments;
  };

  const getCustomerDocumentIdDocumentType = async (idDocumentType) => {
    const dataObject = {
      idSystemUser,
      idDocumentType,
      idCustomer:
        isNil(dataProfile) === false && isEmpty(dataProfile) === false
          ? dataProfile.idCustomer
          : null,
      idDocument: null,
    };
    try {
      dataObject.idTransactionCL = idTransactionCL;
      const response = await getCustomerDocumentData(dataObject);
      const documents =
        Array.isArray(response.result) && isEmpty(response.result) === false
          ? response.result
          : [];
      const blockButton = isEmpty(documents) === false;
      if (isNil(response.result) === false) {
        setDocumentsByIdType(
          `documentsType${idDocumentType}`,
          transformDataDocument(response.result),
          blockButton,
        );
      }
    } catch (error) {
      const { messageCode } = error;
      openNotification(
        messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  useEffect(() => {
    let documentTypeId = 5;
    if (idPaymentType === 6 || idPaymentType === 5) {
      documentTypeId = 7;
    }
    setIdDocument(documentTypeId);
    getCustomerDocumentIdDocumentType(8);
    getCustomerDocumentIdDocumentType(documentTypeId);
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    messagesFunctions = new MessagesFunctions(messages);
  }, [idLanguage]);

  const documentAttach = async (data) => {
    const dataObject = {
      ...data,
      idSystemUser,
      idCustomer:
        isNil(dataProfile) === false && isEmpty(dataProfile) === false
          ? dataProfile.idCustomer
          : null,
    };
    try {
      getCustomerDocumentIdDocumentType(data.idDocumentType);
    } catch (error) {
      const { messageCode } = error;
      openNotification(
        messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  const onChangeDocument = async (file, data) => {
    const dataObject = {
      ...data,
      idTransactionCL,
      idSystemUser,
      idReleaseStatus: 1,
    };

    try {
      const response = await postCustomerDocumentAttach(file, dataObject);
      if (isNil(response.result) === false) {
        setIdDocumentCustomer(response.result.idDocument);
        documentAttach({
          idDocumentType: data.idDocumentType,
          idDocument: response.result.idDocument,
        });
      }
    } catch (error) {
      const { messageCode } = error;
      openNotification(
        messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };
  const onClickDeactivateCustomerDocument = async (
    idDocument,
    idDocumentType,
  ) => {
    const dataObject = {
      idSystemUser,
      idCustomer:
        isNil(dataProfile) === false && isEmpty(dataProfile) === false
          ? dataProfile.idCustomer
          : null,
      idDocument,
      idScreenCode: null,
      idSection: null,
    };
    try {
      dataObject.idTransactionCL = idTransactionCL;
      const response = await deactivateDocumentCustomer(dataObject);
      if (isNil(response.result) === false) {
        getCustomerDocumentIdDocumentType(idDocumentType);
      }
    } catch (error) {
      const { messageCode } = error;
      openNotification(
        messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  return (
    <CustomRow>
      <CustomCol xs="12" md="11">
        <p>
          {messagesFunctions.getMessageFromListMessagesCode(
            'FRL0000000000032',
            'FRL0000000000032',
          )}{' '}
          <strong>
            {messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000033',
              'FRL0000000000033',
            )}
          </strong>
        </p>
      </CustomCol>
      <CustomCol xs="12" md="6">
        <CustomCard className="">
          <CustomCardHeader>
            <h5 className="m-0 p-0">
              <i className="fa fa-check-circle mt-0 yellow" />{' '}
              {messagesFunctions.getMessageFromListMessagesCode(
                documentType,
                documentType,
              )}
            </h5>
          </CustomCardHeader>
          <CustomCardBody className="wrap-files">
            <CustomRow>
              <CustomCol xs="12">
                <CustomAddDocument
                  messages={messages}
                  isVisibleDropZone={true}
                  labelDropZone={
                    ' ' +
                    messagesFunctions.getMessageFromListMessagesCode(
                      'FRL0000000000047',
                      '',
                    )
                  }
                  files={
                    isEmpty(state) === false &&
                    isNil(state[`documentsType${idDocument}`]) === false
                      ? state[`documentsType${idDocument}`]
                      : []
                  }
                  className="btn btn-md buttonControlCheck text-center button-load-file"
                  classNameIcon="fa fa-upload mr-1"
                  maxSize={5242880}
                  alertSize={5242880}
                  formatSize="mb"
                  validFormats={['pdf', 'png', 'jpg']}
                  id="identity-document"
                  labelAlert={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000000.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000000.CODE,
                  )}
                  labelFileSize={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000001.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000001.CODE,
                  )}
                  labelConfirmation={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000002.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000002.CODE,
                  )}
                  sizeErrorLabel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000009.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000009.CODE,
                  )}
                  formatErrorLabel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000010.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000010.CODE,
                  )}
                  labelCancel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000003.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000003.CODE,
                  )}
                  labelAccept={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000004.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000004.CODE,
                  )}
                  isVisibleDeleteFile
                  isVisibleDownloadFile={false}
                  isVisibleStatusLabel={false}
                  hidePrevImage={false}
                  toBlockOnchange={false}
                  onChange={(file) => {
                    onChangeDocument(file, {
                      idDocumentType: idDocument,
                    });
                  }}
                  deleteFileThumbnail={(document) => {
                    const { idDocument } = document;
                    onClickDeactivateCustomerDocument(
                      idDocument,
                      DOCUMENT_TYPES.ID_CARD_ID_DOCUMENT,
                    );
                  }}
                />
              </CustomCol>
            </CustomRow>
          </CustomCardBody>
        </CustomCard>
      </CustomCol>
      <CustomCol xs="12" md="6">
        <CustomCard className="">
          <CustomCardHeader>
            <h5 className="m-0 p-0">
              <i className="fa fa-check-circle mt-0 yellow" />{' '}
              {messagesFunctions.getMessageFromListMessagesCode(
                'FRL0000000000045',
                '',
              )}
            </h5>
          </CustomCardHeader>
          <CustomCardBody className="wrap-files">
            <CustomRow>
              <CustomCol xl="12" lg="12" md="12" sm="12" xs="12">
                <CustomAddDocument
                  messages={messages}
                  isVisibleDropZone={!blockButton8}
                  labelDropZone={
                    ' ' +
                    messagesFunctions.getMessageFromListMessagesCode(
                      'FRL0000000000047',
                      '',
                    )
                  }
                  files={
                    isEmpty(state) === false &&
                    isNil(state.documentsType8) === false
                      ? state.documentsType8
                      : []
                  }
                  className="btn btn-md buttonControlCheck text-center button-load-file"
                  classNameIcon="fa fa-upload mr-1"
                  maxSize={5242880}
                  alertSize={5242880}
                  formatSize="mb"
                  validFormats={['pdf', 'png', 'jpg']}
                  id="identity-document"
                  labelAlert={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000000.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000000.CODE,
                  )}
                  labelFileSize={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000001.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000001.CODE,
                  )}
                  labelConfirmation={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000002.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000002.CODE,
                  )}
                  sizeErrorLabel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000009.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000009.CODE,
                  )}
                  formatErrorLabel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000010.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000010.CODE,
                  )}
                  labelCancel={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000003.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000003.CODE,
                  )}
                  labelAccept={messagesFunctions.getMessageFromListMessagesCode(
                    MESSAGES_CODES_GENERICS.UISGEN0000000004.CODE,
                    MESSAGES_CODES_GENERICS.UISGEN0000000004.CODE,
                  )}
                  isVisibleDeleteFile
                  isVisibleDownloadFile={false}
                  isVisibleStatusLabel={false}
                  hidePrevImage={false}
                  toBlockOnchange={blockButton8}
                  onChange={(file) => {
                    if (blockButton8 === false) {
                      onChangeDocument(file, {
                        idDocumentType: 8,
                      });
                    }
                  }}
                  deleteFileThumbnail={(document) => {
                    const { idDocument } = document;
                    onClickDeactivateCustomerDocument(idDocument, 8);
                  }}
                />
              </CustomCol>
            </CustomRow>
          </CustomCardBody>
        </CustomCard>
      </CustomCol>
    </CustomRow>
  );
};

const mapStateToProps = createStructuredSelector({
  idLanguage: selectIdLanguage(),
  messages: selectMessages(),
  fronParameters: selectFrontParameters(),
  dataProfile: makeSelectDataProfile(),
  idSystemUser: selectIdSystemUser(),
});
const mapDispatchToProps = (dispatch) => ({
  postCustomerDocumentAttach: (file, dataObject) =>
    dispatch(customerDocumentAttach(file, dataObject)),
  getCustomerDocumentData: (data) => dispatch(getCustomerDocument(data)),
  deactivateDocumentCustomer: (data) =>
    dispatch(deactivateCustomerDocument(data)),
});
CardsAccountDocuments.defaultProps = {
  messages: {},
  dataProfile: {},
};
CardsAccountDocuments.propTypes = {
  idLanguage: PropTypes.number.isRequired,
  messages: PropTypes.oneOfType([PropTypes.object]),
  dataProfile: PropTypes.oneOfType([PropTypes.object]),
  postDocument: PropTypes.func.isRequired,
  postCustomerDocumentAttach: PropTypes.func.isRequired,
  getCustomerDocumentData: PropTypes.func.isRequired,
  idSystemUser: PropTypes.string.isRequired,
  deactivateDocumentCustomer: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsAccountDocuments);
