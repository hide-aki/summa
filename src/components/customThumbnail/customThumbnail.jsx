import React from 'react';
import PropTypes from 'prop-types';
import {
  MessagesFunctions,
  GenericValidators,
  ListComponentsHandler,
  MESSAGES_CODES_GENERICS,
  CustomModal,
  CustomButton,
  // } from '../functions';
} from '@pleedtech/pt-components';
// import { MESSAGES_CODES_GENERICS } from '../constants';
// import { CustomButton } from '../customButton';
// import { CUSTOM_THUMBNAIL_CONSTANTS } from '../customThumbnail/constants';
import { Col, Row } from 'reactstrap';
import { CUSTOM_THUMBNAIL_CONSTANTS } from './constants';
import 'antd/dist/antd.css';
// import { CustomModal } from '../customModal';

/**
 * Creates a new CustomThumbnail component.
 * @class
 * @classdesc CustomThumbnail component displays a small preview list of documents.
 */
class CustomThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.function = 'function';
    this.false = 'false';
    this.genericValidators = new GenericValidators();
    this.getStyle = this.getStyle.bind(this);
    this.handlerPropToBlock = this.handlerPropToBlock.bind(this);
    this.listComponentsHandler = new ListComponentsHandler();
  }
  /**
   * @function getStyle
   * @param {Boolean} isVisibleDropZone - is visible dropzone component.
   * @param {Object} genericValidators - instance validator.
   */

  handleOk = (event) => {
    if (this.handlerPropToBlock(this.props.toBlock)) {
      return;
    }

    if (this.handlerPropToBlock(this.props.toBlockOnClickDelete)) {
      return;
    }

    if (
      this.genericValidators.validateValueIsFunction(this.props.onClickDelete)
    ) {
      this.setState({
        visible: false,
      });
      return this.props.onClickDelete(event, {
        idDocument: this.props.idDocument,
      });
    }
    return event.preventDefault();
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  getStyle(isVisibleDropZone, genericValidators) {
    return genericValidators.validateValueIsUndefinedOrNull(isVisibleDropZone)
      ? 'ihnerit'
      : isVisibleDropZone
      ? 'ihnerit'
      : 'none';
  }
  handlerPropToBlock(prop) {
    if (this.genericValidators.validateValueIsBoolean(prop)) {
      return prop;
    }
    return false;
  }

  render() {
    if (this.genericValidators == null) {
      this.genericValidators = new GenericValidators();
    }
    this.messagesFunctions = new MessagesFunctions(this.props.messages);
    // const files = this.props.files ? this.props.files : [];
    return (
      <Row className="cardFileList  cursor">
        <Col xl="3" lg="3" md="2" sm="2" xs="2" className="">
          <div
            style={
              this.props.hidePrevImage
                ? { display: 'none' }
                : { display: 'inline' }
            }
            onClick={(event) => {
              if (this.handlerPropToBlock(this.props.toBlock)) {
                return;
              }

              if (this.handlerPropToBlock(this.props.toBlockOnClickThumbnail)) {
                return;
              }
              if (
                this.genericValidators.validateValueIsFunction(
                  this.props.onClick,
                )
              ) {
                return this.props.onClick(event, {
                  idDocument: !this.genericValidators.validateValueIsUndefinedOrNull(
                    this.props.idDocument,
                  )
                    ? this.props.idDocument
                    : '',

                  fileName: !this.genericValidators.validateValueIsUndefinedOrNull(
                    this.props.fileName,
                  )
                    ? this.props.fileName
                    : '',
                });
              }
              return 'CustomThumbnail';
            }}
          >
            <img
              className="previewFile"
              src={
                !this.genericValidators.validateValueIsUndefinedOrNull(
                  this.props.image,
                )
                  ? this.props.image
                  : ''
              }
            />
            <div className="caption">
              <div className="blur" />
              <div className="caption-text">
                <CustomButton
                  className={'btn-secondarys light-blue'}
                  toBlock={false}
                />
              </div>
            </div>
          </div>
        </Col>
        {/* AQUI TERMINAN LA IMAGEN */}
        {this.props.isVisibleStatusLabel ? (
          <p
            className={
              'small-text ' +
              (!this.genericValidators.validateValueIsUndefinedOrNull(
                this.props.statusLabelClassName,
              )
                ? this.props.statusLabelClassName
                : '')
            }
          >
            {!this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.statusLabel,
            )
              ? this.props.statusLabel
              : ''}
          </p>
        ) : (
          ''
        )}

        <Col
          xl="7"
          lg="7"
          md="8"
          sm="8"
          xs="8"
          className="containerNameCtrl_bb"
        >
          <div className="fileName">
            <h5
              className={this.props.classFileName && this.props.classFileName}
            >
              {this.props.fileName}
            </h5>
            <h6>
              {!this.genericValidators.validateValueIsUndefinedOrNull(
                this.props.date,
              )
                ? this.props.date
                : ''}
            </h6>
          </div>
        </Col>
        <Col xl="2" lg="2" md="2" sm="2" xs="2">
          <CustomButton
            isVisible={this.props.isVisibleDeleteFile}
            className={'btn-secondarys light-blue eraseButtonCtr_al'}
            classIcon={'fa fa-trash fileControls '}
            toBlock={false}
            style={{
              display: this.getStyle(
                this.props.isVisibleDeleteFile,
                this.genericValidators,
              ),
            }}
            onClick={(e) => {
              this.setState((e) => ({
                visible: true,
              }));
            }}
          />

          {this.genericValidators.validateValueIsStringNotEmpty(
            this.props.url,
          ) ? (
            <CustomButton
              isVisible={this.props.isVisibleDownloadFile}
              className={'btn-secondarys light-blue'}
              classIcon={'fa fa-download fileControls'}
              toBlock={
                this.handlerPropToBlock(this.props.toBlockOnClickDownload)
                  ? this.props.toBlockOnClickDownload
                  : this.props.toBlock
              }
              style={{
                display: this.getStyle(
                  this.props.isVisibleDownloadFile,
                  this.genericValidators,
                ),
              }}
              url={
                this.props.uriDownload +
                CUSTOM_THUMBNAIL_CONSTANTS.DOWNLOAD_DOCUMENT +
                this.props.url
              }
            />
          ) : (
            <CustomButton
              isVisible={this.props.isVisibleStatusLabel}
              className={'btn-secondarys light-blue'}
              classIcon={'fa fa-download fileControls'}
              toBlock={
                this.handlerPropToBlock(this.props.toBlockOnClickDownload)
                  ? this.props.toBlockOnClickDownload
                  : this.props.toBlock
              }
              style={{
                display: this.getStyle(
                  this.props.isVisibleDownloadFile,
                  this.genericValidators,
                ),
              }}
            />
          )}
        </Col>
        <CustomModal
          titleLabel={
            <p>
              {this.messagesFunctions.getMessageFromListMessagesCode(
                MESSAGES_CODES_GENERICS.UISGEN0000000022.CODE,
                MESSAGES_CODES_GENERICS.UISGEN0000000022.CODE,
              )}
            </p>
          }
          visible={this.state.visible}
          onOk={() => {
            this.handleOk();
          }}
          onCancel={() => {
            this.handleCancel();
          }}
          messages={this.props.messages}
          okText={this.messagesFunctions.getMessageFromListMessagesCode(
            MESSAGES_CODES_GENERICS.UISGEN0000000019.CODE,
            MESSAGES_CODES_GENERICS.UISGEN0000000019.CODE,
          )}
          cancelText={this.messagesFunctions.getMessageFromListMessagesCode(
            MESSAGES_CODES_GENERICS.UISGEN0000000020.CODE,
            MESSAGES_CODES_GENERICS.UISGEN0000000020.CODE,
          )}
          centered
          label={this.messagesFunctions.getMessageFromListMessagesCode(
            MESSAGES_CODES_GENERICS.UISGEN0000000021.CODE,
            MESSAGES_CODES_GENERICS.UISGEN0000000021.CODE,
          )}
        />
      </Row>
    );
  }
}
CustomThumbnail.propTypes = {
  files: PropTypes.array,
  onClick: PropTypes.func,
  image: PropTypes.string,
  fileName: PropTypes.string,
  onClickDelete: PropTypes.func,
  url: PropTypes.string,
  idFile: PropTypes.string,
  idDocument: PropTypes.string,
  date: PropTypes.string,
  statusLabelClassName: PropTypes.string,
  statusLabel: PropTypes.string,
  isVisibleStatusLabel: PropTypes.bool,
  isVisibleDeleteFile: PropTypes.bool,
  isVisibleDownloadFile: PropTypes.bool,
  toBlockOnClickDelete: PropTypes.bool,
  toBlockOnClickDownload: PropTypes.bool,
  toBlockOnClickThumbnail: PropTypes.bool,
};

export { CustomThumbnail };
