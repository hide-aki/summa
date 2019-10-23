import React, { useState } from 'react';
// TO DO
// import { CustomDropzone } from '../customDropzone';
// import { CustomUploadFileConfirmation } from '../customUploadFileConfirmation';
// import { GenericValidators } from '../functions';
import {
  // TO DO
  // CustomDropzone,
  // CustomThumbnail,
  CustomUploadFileConfirmation,
  GenericValidators,
} from '@pleedtech/pt-components';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

import { CustomThumbnail } from '../customThumbnail';
import { CustomDropzone } from '../customDropZone';

const UNIT = {
  MB: {
    SIZE: 1048576,
    LABEL: 'MB',
  },
  KB: {
    SIZE: 1024,
    LABEL: 'KB',
  },
  GB: {
    SIZE: 1073741824,
    LABEL: 'GB',
  },
};

/**
 * Creates a new AddDocument component.
 * @class
 * @classdesc component wich add, load, download, and preview a document.
 */

const genericValidators = new GenericValidators();
const AddDocument = (props) => {
  let formatSizeValue = null;
  let accept = '';

  const [acceptState, setAccept] = useState('');

  const {
    confirmation,
    dropzone,
    thumbnail,
    fileObject,
    files,
    maxSize,
    formatSize,
    size,
    alertSize,
    sizeErrorLabel,
    id,
    validFormats,
    formatError,
    formatErrorLabel,
    labelFileSize,
    isVisibleThumbnail,
    messages,
  } = props;

  const handlerConvertFormatSize = (fSize, sizeValue) => {
    switch (fSize) {
      case UNIT.KB.LABEL:
        return (sizeValue / UNIT.KB.SIZE).toFixed(2); // 1024
      case UNIT.MB.LABEL:
        return (sizeValue / UNIT.MB.SIZE).toFixed(2); // 1048576
      case UNIT.GB.LABEL:
        return (sizeValue / UNIT.GB.SIZE).toFixed(2); // 1073741824
      default:
        return (sizeValue / UNIT.MB.SIZE).toFixed(2); // 1048576
    }
  };
  const handlerFormatSize = (fSize, sizeValue) => {
    formatSizeValue = fSize.toUpperCase();
    switch (formatSizeValue) {
      case UNIT.KB.LABEL:
        return `${handlerConvertFormatSize(
          formatSizeValue,
          sizeValue,
        )} ${formatSizeValue}`;
      case UNIT.MB.LABEL:
        return `${handlerConvertFormatSize(
          formatSizeValue,
          sizeValue,
        )} ${formatSizeValue}`;
      case UNIT.GB.LABEL:
        return `${handlerConvertFormatSize(
          formatSizeValue,
          sizeValue,
        )} ${formatSizeValue}`;
      default:
        return `${handlerConvertFormatSize(
          UNIT.GB.LABEL,
          sizeValue,
        )} ${formatSizeValue}`;
    }
  };

  const replaceFormat = (label, sizeValue, replace) => {
    if (replace === true) {
      const regularExpresion = label.match(/@@@/g);
      let result = null;
      if (genericValidators.validateValueIsArrayNotEmpty(regularExpresion)) {
        result = regularExpresion.map((val) => {
          label = label.replace(val, sizeValue);
        });
      }
      return label;
    }
    return null;
  };

  const handlerValidFormats = (array) => {
    let str = '';
    if (genericValidators.validateValueIsArrayNotEmpty(array)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item in array) {
        if (item === array.length - 1) {
          str += `.${array[item]}`;
        } else {
          str += `.${array[item]},`;
        }
      }
      accept = str;

      if (acceptState === '') {
        setAccept(str);
      }
    }

    if (formatError === true) {
      return accept;
    }
    return '';
  };
  return (
    <div className="">
      <section className="margin-buttom-px ">
        {size > maxSize && size <= alertSize && (
          <CustomUploadFileConfirmation
            {...confirmation}
            accepted={fileObject}
            id={id}
            labelFileSize={
              !genericValidators.validateValueIsUndefinedOrNull(labelFileSize)
                ? replaceFormat(
                    labelFileSize,
                    // size,
                    handlerFormatSize(formatSize, size),
                    size > maxSize && size <= alertSize,
                  )
                : ''
            }
          />
        )}

        <div
          style={{
            visibility:
              size > maxSize && size <= alertSize ? 'hidden' : 'visible',
            height: size > maxSize && size <= alertSize ? '0px' : 'auto',
          }}
          className="btn btn-md buttonControlCheck"
        >
          <CustomDropzone
            {...dropzone}
            id={id}
            accept={accept}
            size={size}
            alertSize={alertSize}
          />
          {genericValidators.validateValueIsStringNotEmpty(formatErrorLabel) &&
            size > alertSize && (
              <div className="labelErrorFile">
                <strong>
                  {replaceFormat(
                    sizeErrorLabel,
                    handlerFormatSize(formatSize, alertSize),
                    size > alertSize,
                  )}
                </strong>
              </div>
            )}
        </div>
        {genericValidators.validateValueIsStringNotEmpty(formatErrorLabel) ? (
          <div className="labelErrorFile">
            <strong>
              {replaceFormat(
                formatErrorLabel,
                handlerValidFormats(validFormats),
                formatError,
              )}
            </strong>
          </div>
        ) : null}
      </section>
      <div
        className="contenedor-files-repositorio"
        style={{
          display: isVisibleThumbnail ? 'block' : 'none',
        }}
      >
        {files.length > 0 &&
          files.map((file, index) => {
            if (file.idDocument !== '') {
              return (
                <CustomThumbnail
                  {...file}
                  files={files}
                  key={index}
                  {...thumbnail}
                  messages={messages}
                />
              );
            }
            return <div />;
          })}
      </div>
    </div>
  );
};

AddDocument.propTypes = {
  confirmation: PropTypes.object,
  dropzone: PropTypes.object,
  thumbnail: PropTypes.object,
  fileObject: PropTypes.object,
  files: PropTypes.array,
  maxSize: PropTypes.number,
  size: PropTypes.number,
  alertSize: PropTypes.number,
  id: PropTypes.string,
  hidePrevImage: PropTypes.bool,
  messages: PropTypes.object,
  isVisibleThumbnail: PropTypes.bool,
};

const customState = {
  file: [],
  open: true,
  formatError: false,
  temporalFile: [],
};
/**
 * Creates a new CustomAddDocument component.
 * @class
 * @classdesc CustomAddDocument wrapps AddDocument component.
 */
class CustomAddDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = customState;
    this.id = null;
    this.maxSize = 2000000;
    this.style = null;
    this.className = null;
    this.toBlock = false;
    this.file = null;
    this.size = 40000;
    this.name = null;
    this.date = null;
    this.formatSize = null;
    this.toBlockOnChange = false;
    this.toBlockOpenThumbnail = false;
    this.toBlockDeleteFileThumbnail = false;
    this.hidePrevImage = false;
    this.isVisibleThumbnail = false;
    this.validateFormatSize = this.validateFormatSize.bind(this);
    this.handlerConvertFormatSize = this.handlerConvertFormatSize.bind(this);
    this.genericValidators = new GenericValidators();
  }

  componentWillMount() {
    this.setState(customState);
  }

  shouldComponentUpdate(nextProps) {
    //  TO DO
    // if (isNil(nextProps.files) === false) {
    //   this.setState(customState);
    // }

    // if (nextProps.files) {
    //   if (isEmpty(nextProps.files) === true) {
    //     this.setState(customState);
    //   }
    //   return true;
    // }
    return true;
  }

  componentWillUnmount() {
    this.setState(customState);
  }

  validateFormatSize(name, validFormats) {
    let formatError = false;
    if (isString(name) && isEmpty(name) === false) {
      let extension = name.split('.');
      extension = extension[extension.length - 1];

      if (Array.isArray(validFormats) && isEmpty(validFormats) === false) {
        const nameLowerCase = name.toLowerCase();
        // eslint-disable-next-line no-restricted-syntax
        for (const ext of validFormats) {
          if (nameLowerCase.indexOf(ext) > -1) {
            formatError = false;
            this.setState({
              formatError,
            });
            break;
          } else {
            formatError = true;
            this.setState({
              formatError,
            });
          }
        }
      }
    }
    return formatError;
  }

  handlerConvertFormatSize(formatSize, size) {
    switch (formatSize) {
      case UNIT.KB.LABEL:
        return size / UNIT.KB.SIZE;
      case UNIT.MB.LABEL:
        return size / UNIT.MB.SIZE;
      case UNIT.GB.LABEL:
        return size / UNIT.GB.SIZE;
      default:
        return size / UNIT.MB.SIZE;
    }
  }

  render() {
    this.id = this.genericValidators.validateValueIsStringNotEmpty(
      this.props.id,
    )
      ? this.props.id
      : 'SET_ID';
    this.maxSize = this.genericValidators.validateValueIsNumber(
      this.props.maxSize,
    )
      ? this.props.maxSize
      : 2000000;
    this.alertSize = this.genericValidators.validateValueIsNumber(
      this.props.alertSize,
    )
      ? this.props.alertSize
      : 5000000;
    this.style = this.genericValidators.validateValueIsObject(this.props.style)
      ? this.props.style
      : {};
    this.className = this.genericValidators.validateValueIsString(
      this.props.className,
    )
      ? this.props.className
      : '';
    this.toBlock = this.genericValidators.validateValueIsBoolean(
      this.props.toBlock,
    )
      ? this.props.toBlock
      : false;
    this.file = this.state.file.length > 0 ? this.state.file[0] : '';
    // this.size = this.state.file.length > 0 ? this.state.file[0].size : 0;
    this.name = this.state.file.length > 0 ? this.state.file[0].name : '';
    this.date =
      this.state.file.length > 0
        ? this.state.file[0].lastModifiedDate.toString()
        : '';
    this.formatSize = this.genericValidators.validateValueIsStringNotEmpty(
      this.props.formatSize,
    )
      ? this.props.formatSize
      : '';
    this.hidePrevImage = this.genericValidators.validateValueIsBoolean(
      this.props.hidePrevImage,
    )
      ? this.props.hidePrevImage
      : false;
    this.isVisibleThumbnail = this.genericValidators.validateValueIsBoolean(
      this.props.isVisibleThumbnail,
    )
      ? this.props.isVisibleThumbnail
      : true;

    return (
      <div className={'no class'} style={this.style}>
        {/* <div className={this.className} style={this.style}> */}
        <AddDocument
          confirmation={{
            //size,
            confirmation: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.labelConfirmation,
            )
              ? this.props.labelConfirmation
              : '',
            fileName: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.name,
            )
              ? this.name
              : '',
            size: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.size,
            )
              ? this.size
              : '',
            //date,
            onCancel: () => {
              if (this.toBlock) {
                return;
              }
              this.setState({
                temporalFile: this.state.file,
                file: [],
              });
              if (isFunction(this.props.onCancelUploadFile)) {
                return this.props.onCancelUploadFile();
              }
            },
            onAccept: (e) => {
              if (this.toBlock) {
                return null;
              }
              if (isFunction(this.props.onChange)) {
                this.props.onChange({ file: this.state.file });
              }
              return null;
            },
            cancel: this.genericValidators.validateValueIsStringNotEmpty(
              this.props.labelCancel,
            )
              ? this.props.labelCancel
              : '',
            accept: this.genericValidators.validateValueIsStringNotEmpty(
              this.props.labelAccept,
            )
              ? this.props.labelAccept
              : '',
            //open,
            id: this.id,
            maxSize: this.maxSize,
            alertSize: this.alertSize,
          }}
          messages={this.props.messages}
          isVisibleThumbnail={this.isVisibleThumbnail}
          dropzone={{
            noClick: this.props.toBlockOnchange
              ? this.props.toBlockOnchange
              : false,
            disabled: this.props.toBlockOnchange
              ? this.props.toBlockOnchange
              : false,
            onDrop: async (accepted, rejected) => {
              this.size = accepted[0].size;
              if (
                isEmpty(accepted[0]) === false &&
                this.validateFormatSize(
                  accepted[0].name,
                  this.props.validFormats,
                ) === true
              ) {
                return;
              }

              if (this.toBlock) {
                return;
              }
              if (this.props.toBlockOnChange) {
                return;
              }

              //if - rejected
              if (rejected.length > 0) {
                return this.setState({
                  file: rejected,
                  formatError: true,
                });
              }

              //if - accepted
              if (accepted.length > 0) {
                await this.setState({
                  formatError: false,
                  file: accepted,
                });

                if (
                  this.handlerConvertFormatSize(
                    this.formatSize,
                    accepted[0].size,
                  ) >
                    this.handlerConvertFormatSize(
                      this.formatSize,
                      this.maxSize,
                    ) &&
                  this.handlerConvertFormatSize(
                    this.formatSize,
                    accepted[0].size,
                  ) <=
                    this.handlerConvertFormatSize(
                      this.formatSize,
                      this.alertSize,
                    )
                ) {
                  return;
                } else if (
                  this.handlerConvertFormatSize(
                    this.formatSize,
                    accepted[0].size,
                  ) >
                  this.handlerConvertFormatSize(this.formatSize, this.alertSize)
                ) {
                  return;
                }
                if (isFunction(this.props.onChange)) {
                  return this.props.onChange({ file: accepted });
                }
              }
            },
            label: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.labelDropZone,
            )
              ? this.props.labelDropZone
              : '',
            inputProps: { id: 'input' + this.id },
            id: this.id,
            isVisibleDropZone: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.isVisibleDropZone,
            )
              ? this.props.isVisibleDropZone
              : false,
            className: this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.classNameDropZone,
            )
              ? ''
              : this.props.classNameDropZone,
            classNameIcon: this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.classNameIconDropZone,
            )
              ? ''
              : this.props.classNameIconDropZone,
            iconCode: this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.iconCodeDropZone,
            )
              ? ''
              : this.props.iconCodeDropZone,
          }}
          thumbnail={{
            onClick: (event, object) => {
              if (this.toBlock) {
                return;
              }
              if (this.toBlockOpenThumbnail) {
                return;
              }
              if (isFunction(this.props.openThumbnail)) {
                return this.props.openThumbnail(event, object);
              } //if-this.props.openThumbnail
              //return 'CustomAddDocument'
            }, //onClick
            onClickDelete: (event, document) => {
              if (this.toBlock) {
                return;
              }
              if (this.toBlockDeleteFileThumbnail) {
                return;
              }
              if (isFunction(this.props.deleteFileThumbnail)) {
                return this.props.deleteFileThumbnail(document);
              }
            },
            isVisibleDeleteFile: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.isVisibleDeleteFile,
            )
              ? this.props.isVisibleDeleteFile
              : false,
            isVisibleDownloadFile: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.isVisibleDownloadFile,
            )
              ? this.props.isVisibleDownloadFile
              : false,
            isVisibleStatusLabel: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.isVisibleStatusLabel,
            )
              ? this.props.isVisibleStatusLabel
              : false,
            uriDownload: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.props.uriDownload,
            )
              ? this.props.uriDownload
              : '',
            hidePrevImage: !this.genericValidators.validateValueIsUndefinedOrNull(
              this.hidePrevImage,
            )
              ? this.hidePrevImage
              : false,
            classFileName: this.props.classFileName && this.props.classFileName,
          }}
          fileObject={this.file}
          files={
            this.genericValidators.validateValueIsArrayNotEmpty(
              this.props.files,
            )
              ? this.props.files
              : []
          }
          maxSize={this.maxSize}
          alertSize={this.alertSize}
          formatSize={
            this.genericValidators.validateValueIsStringNotEmpty(
              this.formatSize,
            )
              ? this.formatSize
              : ''
          }
          validFormats={
            this.genericValidators.validateValueIsArrayNotEmpty(
              this.props.validFormats,
            )
              ? this.props.validFormats
              : []
          }
          size={
            this.size
            // !this.genericValidators.validateValueIsUndefinedOrNull(this.size)
            //   ? this.size
            //   : ''
          }
          sizeErrorLabel={
            this.genericValidators.validateValueIsStringNotEmpty(
              this.props.sizeErrorLabel,
            )
              ? this.props.sizeErrorLabel
              : ''
          }
          formatErrorLabel={
            this.genericValidators.validateValueIsStringNotEmpty(
              this.props.formatErrorLabel,
            )
              ? this.props.formatErrorLabel
              : ''
          }
          formatError={this.state.formatError}
          id={this.id}
          labelFileSize={
            this.genericValidators.validateValueIsStringNotEmpty(
              this.props.labelFileSize,
            )
              ? this.props.labelFileSize
              : ''
          }
        />
      </div>
    );
  }
}
CustomAddDocument.propTypes = {
  files: PropTypes.array.isRequired,
  maxSize: PropTypes.number,
  alertSize: PropTypes.number,
  labelAlert: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelFileSize: PropTypes.string.isRequired,
  labelConfirmation: PropTypes.string.isRequired,
  labelCancel: PropTypes.string.isRequired,
  labelAccept: PropTypes.string.isRequired,
  labelDropZone: PropTypes.string.isRequired,
  style: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  openThumbnail: PropTypes.func,
  deleteFileThumbnail: PropTypes.func,
  messages: PropTypes.object,
};

export default CustomAddDocument;
