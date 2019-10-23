import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import {
  CustomAddDocument,
  CustomCard,
  CustomCardHeader,
  CustomCardBody,
  CustomRow,
  CustomCol,
  CustomForm,
  MESSAGES_CODES_GENERICS,
  GenericValidators,
  MessagesFunctions,
  ALERT_TYPE,
} from '@pleedtech/pt-components';
import {
  selectMessages,
  selectIdLanguage,
} from '../../containers/languageProvider/selectors';
import { showToastrMessage } from '../../utils/actions/toastrActions';
import { getComponentsByIdCompanyIdScreenCode } from '../../utils/actions/systemConfigurationsActions';

import { FRONT_PARAMETERS_CONSTANTS } from '../../utils/constants/frontParametersConstants';
import { API_CONSTANTS } from '../../utils/constants/apiConstants';
import { EVIDENCE } from './constants';

class CustomEvidence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.genericValidators = new GenericValidators();
    this.selectMessages = props.selectMessages;
    this.messagesFunctions = new MessagesFunctions(this.selectMessages);
  }

  shouldComponentUpdate(nextProps) {
    const { idLanguage, selectMessages } = this.props;
    if (idLanguage !== nextProps.idLanguage) {
      this.selectMessages = selectMessages;
      this.messagesFunctions = new MessagesFunctions(selectMessages);
    }

    return true;
  }

  showToastrMessage = (error, alertType = ALERT_TYPE.ERROR) => {
    const { showToasterMessage } = this.props;
    const messageCode = this.handlerErrorResponse.getMessageErrorResponse(
      error,
    );

    if (this.genericValidators.validateValueIsStringNotEmpty(messageCode)) {
      showToasterMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        alertType,
      );
    }
  };

  render() {
    let component = <div />;
    const {
      label,
      isVisible,
      title,
      isVisibleDropZone,
      isVisibleDeleteFile,
      isVisibleDownloadFile,
      isVisibleStatusLabel,
      openThumbnail,
      onChange,
      deleteFileThumbnail,
      files,
      id,
      isVisibleTitleSection,
      isVisibleSubtitleSection,
    } = this.props;

    if (isVisible === true) {
      component = (
        <CustomCard className="cardControlSpacing flMngrCtrl_bb">
          <CustomCardHeader className="DarkHeader">
            <strong className="headerTittle">
              {' '}
              <i className="fa fa-copy headerIcon" />{' '}
              {isVisibleTitleSection !== false ? (
                <span className="headerTittle">
                  {isNil(title) === false ? `${title} ` : ''}
                </span>
              ) : (
                ''
              )}
            </strong>
          </CustomCardHeader>
          <CustomCardBody className="CbodyControl">
            <CustomRow>
              <CustomCol>
                <CustomForm>
                  {isVisibleSubtitleSection !== false ? (
                    <label>{isNil(label) === false ? label : ''}</label>
                  ) : (
                    <label />
                  )}
                </CustomForm>
              </CustomCol>
            </CustomRow>
            <CustomRow>
              <CustomCol
                xl="12"
                lg="12"
                md="12"
                sm="12"
                className=" uploadsControl"
              >
                <CustomForm>
                  <CustomAddDocument
                    id={id}
                    files={files}
                    messages={this.selectMessages}
                    maxSize={
                      !this.genericValidators.validateValueIsUndefinedOrNull(
                        this.props.selectFrontParameters,
                      )
                        ? !this.genericValidators.validateValueIsUndefinedOrNull(
                            this.props.selectFrontParameters[
                              FRONT_PARAMETERS_CONSTANTS.PARAMETERS.MAX_SIZE
                            ],
                          )
                          ? this.props.selectFrontParameters[
                              FRONT_PARAMETERS_CONSTANTS.PARAMETERS.MAX_SIZE
                            ].paramValue
                          : 5000000
                        : 5000000
                    }
                    alertSize={
                      !this.genericValidators.validateValueIsUndefinedOrNull(
                        this.props.selectFrontParameters,
                      )
                        ? !this.genericValidators.validateValueIsUndefinedOrNull(
                            this.props.selectFrontParameters[
                              FRONT_PARAMETERS_CONSTANTS.PARAMETERS.ALERT_SIZE
                            ],
                          )
                          ? this.props.selectFrontParameters[
                              FRONT_PARAMETERS_CONSTANTS.PARAMETERS.ALERT_SIZE
                            ].paramValue
                          : 5000000
                        : 5000000
                    }
                    formatSize={
                      !this.genericValidators.validateValueIsUndefinedOrNull(
                        this.props.selectFrontParameters,
                      )
                        ? !this.genericValidators.validateValueIsUndefinedOrNull(
                            this.props.selectFrontParameters[
                              FRONT_PARAMETERS_CONSTANTS.PARAMETERS.FORMAT_SIZE
                            ],
                          )
                          ? this.props.selectFrontParameters[
                              FRONT_PARAMETERS_CONSTANTS.PARAMETERS.FORMAT_SIZE
                            ].paramValue
                          : 'mb'
                        : 'mb'
                    }
                    validFormats={[
                      'csv',
                      'jpg',
                      'pdf',
                      'docx',
                      'doc',
                      'jpeg',
                      'jpg',
                      'png',
                      'xlsx',
                    ]}
                    sizeErrorLabel={this.messagesFunctions.getMessageFromListMessagesCode(
                      MESSAGES_CODES_GENERICS.UISGEN0000000009.CODE,
                      MESSAGES_CODES_GENERICS.UISGEN0000000009.CODE,
                    )}
                    formatErrorLabel={this.messagesFunctions.getMessageFromListMessagesCode(
                      MESSAGES_CODES_GENERICS.UISGEN0000000010.CODE,
                      MESSAGES_CODES_GENERICS.UISGEN0000000010.CODE,
                    )}
                    labelAlert={this.messagesFunctions.getMessageFromListMessagesCode(
                      MESSAGES_CODES_GENERICS.UISGEN0000000000.CODE,
                      MESSAGES_CODES_GENERICS.UISGEN0000000000.CODE,
                    )}
                    labelFileSize={this.messagesFunctions.getMessageFromListMessagesCode(
                      MESSAGES_CODES_GENERICS.UISGEN0000000001.CODE,
                      MESSAGES_CODES_GENERICS.UISGEN0000000001.CODE,
                    )}
                    labelConfirmation={this.messagesFunctions.getMessageFromListMessagesCode(
                      MESSAGES_CODES_GENERICS.UISGEN0000000002.CODE,
                      MESSAGES_CODES_GENERICS.UISGEN0000000002.CODE,
                    )}
                    labelCancel={this.messagesFunctions.getMessageFromListMessagesCode(
                      MESSAGES_CODES_GENERICS.UISGEN0000000003.CODE,
                      MESSAGES_CODES_GENERICS.UISGEN0000000003.CODE,
                    )}
                    labelAccept={this.messagesFunctions.getMessageFromListMessagesCode(
                      MESSAGES_CODES_GENERICS.UISGEN0000000004.CODE,
                      MESSAGES_CODES_GENERICS.UISGEN0000000004.CODE,
                    )}
                    labelDropZone={this.messagesFunctions.getMessageFromListMessagesCode(
                      MESSAGES_CODES_GENERICS.UISGEN0000000005.CODE,
                      MESSAGES_CODES_GENERICS.UISGEN0000000005.CODE,
                    )}
                    uriDownload={
                      API_CONSTANTS.DOMAIN +
                      API_CONSTANTS.REPOSITORY.DOWNLOAD_DOCUMENT
                    }
                    isVisibleDropZone={
                      isNil(isVisibleDropZone) === false
                        ? isVisibleDropZone
                        : true
                    }
                    isVisibleDeleteFile={
                      isNil(isVisibleDeleteFile) === false
                        ? isVisibleDeleteFile
                        : true
                    }
                    isVisibleDownloadFile={
                      isNil(isVisibleDownloadFile) === false
                        ? isVisibleDownloadFile
                        : true
                    }
                    isVisibleStatusLabel={
                      isNil(isVisibleStatusLabel) === false
                        ? isVisibleStatusLabel
                        : true
                    }
                    openThumbnail={(event, object) => {
                      return openThumbnail(object);
                    }}
                    onChange={(file) => {
                      return onChange(file);
                    }}
                    deleteFileThumbnail={(document, objectOut) => {
                      return deleteFileThumbnail(
                        document.idDocument.idDocument,
                      );
                    }}
                  />
                </CustomForm>
              </CustomCol>
            </CustomRow>
          </CustomCardBody>
        </CustomCard>
      );
    }
    return component;
  }
}

CustomEvidence.propTypes = {
  id: PropTypes.string,
  isVisible: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string,
  isVisibleDeleteFile: PropTypes.bool,
  isVisibleDownloadFile: PropTypes.bool,
  isVisibleStatusLabel: PropTypes.bool,
  openThumbnail: PropTypes.func,
  onChange: PropTypes.func,
  deleteFileThumbnail: PropTypes.func,
  files: PropTypes.array,
  selectFrontParameters: PropTypes.object,
  showToasterMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectMessages: selectMessages(),
  idLanguage: selectIdLanguage(),
});

const mapDispatchToProps = (dispatch) => ({
  showToasterMessage: (message, messageType) =>
    dispatch(showToastrMessage(message, messageType)),
  componentsByIdCompanyIdScreenCode: (idScreenCode) =>
    dispatch(getComponentsByIdCompanyIdScreenCode(idScreenCode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomEvidence);
