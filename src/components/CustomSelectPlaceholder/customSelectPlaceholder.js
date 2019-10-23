import React, { Component, Fragment } from 'react';

import { CustomInput, Label } from 'reactstrap';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import { MessagesFunctions } from '@pleedtech/pt-components';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.array,
  floatingLabelText: PropTypes.string,
  defaultValue: PropTypes.string,
  isVisible: PropTypes.bool,
  errorText: PropTypes.bool,
  value: PropTypes.string,
};

class CustomSelectPlaceholder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.messagesFunctions = new MessagesFunctions(props.selectMessages);
  }

  componentDidMount() {
    if (isNil(this.props.value === false)) {
      this.setState({ value: this.props.value });
    } else if (this.props.defaultValue) {
      this.setState({ value: this.props.defaultValue });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { idLanguage, selectMessages } = this.props;
    if (
      selectMessages !== nextProps.selectMessages &&
      isNil(nextProps.selectMessages) === false &&
      isEmpty(nextProps.selectMessages) === false
    ) {
      this.messagesFunctions = new MessagesFunctions(nextProps.selectMessages);
    }
    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(selectMessages);
    }
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
    return true;
  }

  setRef = (element) => {
    if (isNil(element) === false) {
      this.select = element;
      this.select.value = this.state.value;
    }
  };

  setClassName() {
    const { className, errorText } = this.props;
    let classText = '';

    if (isNil(errorText) === false && isEmpty(errorText) === false) {
      classText = 'roundedControl validationInput';
    } else if (isNil(className) === false && isEmpty(className) === false) {
      classText = className;
    }

    return classText;
  }

  handleChange = (event) => {
    const { onChange } = this.props;
    const object =
      isNil(this.props.data) === false
        ? this.props.data.filter((item) => {
            return item.id == event.target.value;
          })
        : {};

    onChange(event, event.target.selectedIndex, event.target.value, object[0]);
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    let component = <div />;
    const {
      id,
      name,
      disabled,
      className,
      data,
      floatingLabelText,
      defaultValue,
      isVisible,
      errorText,
      placeholder,
      placeholderValue,
    } = this.props;
    const { value } = this.state;

    if (isNil(isVisible) || isVisible === true) {
      component = (
        <Fragment>
          <CustomInput
            include="form-input-select()"
            innerRef={this.setRef}
            id={isNil(id) === false ? id : 'exampleCustomSelect'}
            className={this.setClassName()}
            name={isNil(name) === false ? name : 'customSelect'}
            placeholder="Prueba"
            type="select"
            value={value}
            disabled={isBoolean(disabled) === true ? disabled : false}
            onChange={this.handleChange}
          >
            {isNil(placeholder) === false && isEmpty(placeholder) === false ? (
              <option
                style={{ display: 'none' }}
                disabled
                key=""
                value={isNil(placeholderValue) ? '' : placeholderValue}
                selected
              >
                {isString(placeholder) ? placeholder : ''}
              </option>
            ) : (
              <option style={{ display: 'none' }} disabled key="" value="" />
            )}
            {isNil(data) === false &&
              data.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {this.messagesFunctions.getMessageFromListMessagesCode(
                      item.text,
                      item.text,
                    )}
                  </option>
                );
              })}
          </CustomInput>
          {isNil(errorText) === false && isEmpty(errorText) === false ? (
            <Label className="validationHelpText">{errorText}</Label>
          ) : (
            ''
          )}
        </Fragment>
      );
    }
    return component;
  }
}

CustomSelectPlaceholder.propTypes = propTypes;

export default CustomSelectPlaceholder;
