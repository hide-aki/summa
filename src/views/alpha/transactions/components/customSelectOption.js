import React, { Component, Fragment } from 'react';

import { Input, Label } from 'reactstrap';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import { MessagesFunctions } from '@pleedtech/pt-components/dist';
import PropTypes from 'prop-types';

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

class CustomSelectOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.messagesFunctions = new MessagesFunctions(props.selectMessages);
  }

  componentDidMount() {}

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

    return true;
  }

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
    const object =
      isNil(this.props.data) === false
        ? this.props.data.filter((item) => {
            return item.id == event.target.value;
          })
        : {};

    this.props.onChange(
      event,
      event.target.selectedIndex,
      event.target.value,
      object[0],
    );
  };

  render() {
    let componet = <div />;
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
      onClick,
      value,
    } = this.props;

    if (isNil(isVisible) || isVisible === true) {
      componet = (
        <Fragment>
          <Input
            include="form-input-select()"
            id={isNil(id) === false ? id : 'exampleCustomSelect'}
            className={this.setClassName()}
            name={isNil(name) === false ? name : 'customSelect'}
            placeholder="Prueba"
            type="select"
            value={value}
            disabled={isBoolean(disabled) === true ? disabled : false}
            onChange={this.handleChange}
            onClick={(event, value) => {
              onClick(event, value);
            }}
          >
            <option style={{ display: 'none' }} disabled key="" value="" />
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
          </Input>
          {isNil(errorText) === false && isEmpty(errorText) === false ? (
            <Label className="validationHelpText">{errorText}</Label>
          ) : (
            ''
          )}
        </Fragment>
      );
    }
    return componet;
  }
}

CustomSelectOption.propTypes = propTypes;
CustomSelectOption.defaultProps = {
  onClick: (event, value) => {},
};

export { CustomSelectOption };
