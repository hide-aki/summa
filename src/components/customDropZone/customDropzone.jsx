import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { GenericValidators, CustomButton } from '@pleedtech/pt-components';
// TO DO
// import { GenericValidators } from '../functions';
// import { CustomButton } from '../customButton';
/**
 * @function getStyle
 * @param {Boolean} isVisibleDropZone - is visible dropzone component.
 * @param {Object} genericValidators - instance validator.
 */
const getStyle = (isVisibleDropZone, genericValidators) => {
  return genericValidators.validateValueIsUndefinedOrNull(isVisibleDropZone)
    ? 'ihnerit'
    : isVisibleDropZone
    ? 'ihnerit'
    : 'none';
};
/**
 * @function CustomDropzone
 * @param {String} id
 * @param {Function} onDrop
 * @param {Object} genericValidators - instance validator.
 * @param {Object} inputProps
 * @param {String} label
 * @param {Boolean} isVisibleDropZone - is visible dropzone component.
 */
class CustomDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.toBlockValue = null;
    this.toBlockButtonOnDropValue = null;
    this.genericValidators = new GenericValidators();
  }

  componentWillUpdate(nextProps, nextState) {
    return this.props.isVisibleDropZone !== nextProps.isVisibleDropZone;
  }

  render() {
    const {
      onDrop,
      inputProps,
      label,
      isVisibleDropZone,
      toBlock,
      toBlockButtonOnDrop,
      size,
      alertSize,
      className,
      iconCode,
      classIcon,
    } = this.props;

    this.toBlockValue = this.genericValidators.validateValueIsBoolean(toBlock)
      ? toBlock
      : false;
    this.toBlockButtonOnDropValue = this.genericValidators.validateValueIsBoolean(
      toBlockButtonOnDrop,
    )
      ? toBlockButtonOnDrop
      : false;
    if (isVisibleDropZone) {
      return (
        <div
          className="dropzone"
          style={{
            display: getStyle(isVisibleDropZone, this.genericValidators),
          }}
        >
          <Dropzone
            noClick={this.props.noClick ? this.props.noClick : false}
            disabled={this.props.disabled ? this.props.disabled : false}
            noDrag={this.props.noDrag ? this.props.noDrag : false}
            onDrop={(accepted, rejected) => {
              if (size > alertSize) {
              }
              if (this.toBlockValue) {
                return;
              }
              if (this.toBlockButtonOnDropValue) {
                return;
              }
              if (this.genericValidators.validateValueIsFunction(onDrop)) {
                onDrop(accepted, rejected);
              }
            }}
            inputProps={
              !this.genericValidators.validateValueIsUndefinedOrNull(inputProps)
                ? this.genericValidators.validateValueIsObjectNotEmpty(
                    inputProps,
                  )
                  ? inputProps
                  : {}
                : {}
            }
            multiple={false}
            accept={this.props.accept}
          >
            <CustomButton
              isVisible={this.props.isVisibleDropZone}
              toBlock={
                this.toBlockButtonOnDropValue
                  ? this.toBlockButtonOnDropValue
                  : toBlock
              }
              className={
                this.genericValidators.validateValueIsStringNotEmpty(className)
                  ? className
                  : 'roundedControl addControl fileUpload btn btn-success btn-block'
              }
              classIcon={
                this.genericValidators.validateValueIsStringNotEmpty(classIcon)
                  ? classIcon
                  : 'fa fa-upload fileNameControl'
              }
              iconCode={
                this.genericValidators.validateValueIsStringNotEmpty(iconCode)
                  ? iconCode
                  : ''
              }
              label={
                !this.genericValidators.validateValueIsUndefinedOrNull(label)
                  ? label
                  : ''
              }
            />
          </Dropzone>
        </div>
      );
    }
    return null;
  }
}

CustomDropzone.propTypes = {
  id: PropTypes.object,
  onDrop: PropTypes.func,
  inputProps: PropTypes.object,
  label: PropTypes.string,
  isVisibleDropZone: PropTypes.bool,
  toBlock: PropTypes.bool,
  toBlockButtonOnDrop: PropTypes.bool,
};

export { CustomDropzone };
