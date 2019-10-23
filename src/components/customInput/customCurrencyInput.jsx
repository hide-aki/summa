import React, { Component, Fragment } from 'react';
import NumberFormat from 'react-number-format';
import isFunction from 'lodash/isFunction';
import { Input, Label } from 'reactstrap';
import {
  GenericValidators,
  ComponentPermissions,
  CustomInput,
} from '@pleedtech/pt-components';

import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

class CustomInputCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toBlock = false;
    this.genericValidators = null;
    this.componentPermissions = null;
    this.precision = null;
    this.decimalPrecision = null;
    this.thousandSeparator = null;
    this.decimalSeparator = null;
    this.prefix = null;
    this.suffix = null;

    this.genericValidators = new GenericValidators();
    this.componentPermissions = new ComponentPermissions();
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

  render() {
    const {
      toBlock,
      onChange,
      onClick,
      onBlur,
      onFocus,
      disabled,
      id,
      thousandSeparator,
      decimalSeparator,
      decimalPrecision,
      allowNegative,
      prefix,
      suffix,
      value,
      floatingLabelText,
      className,
      errorText,
      defaultValue,
    } = this.props;

    return (
      <Fragment>
        <NumberFormat
          ref="refInputNumberFormat"
          id={id || null}
          // ----------values NumberFormat----------//
          customInput={CustomInput}
          thousandSeparator={thousandSeparator || ','} //	mixed: single character string or boolean true (true is default to ,)	none	Add thousand separators on number
          decimalSeparator={decimalSeparator || '.'} //	single character string	.	Support decimal point on a number
          decimalPrecision={decimalPrecision || 2} //	number	none	If defined it limits to given decimal precision
          allowNegative={allowNegative || false} //	boolean	true	allow negative numbers (Only when format option is not provided)
          prefix={prefix || ''} //	String (ex : $)	none	Add a prefix before the number
          suffix={suffix || ''} //	String (ex : /-)	none	Add a prefix after the number
          value={value || ''} //	Number or String	null	Value to the number format. If passed as string it should have same decimal separator as the decimalSeparator props
          // displayType = {""} //	String: text / input	input	If input it renders a input element where formatting happens as you input characters. If text it renders it as a normal text in a span formatting the given value
          // type = {"text"} //	One of ['text', 'tel']	text	Input type attribute
          // format = {""} //	String : Hash based ex (#### #### #### ####) Or Function	none	If format given as hash string allow number input inplace of hash. If format given as function, component calls the function with unformatted number and expects formatted number.
          // mask = {""} //	String (ex : _)	none	If mask defined, component will show non entered placed with masked value.
          // ----------values materia-ui----------//
          // defaultValue={defaultValue ? defaultValue : null}
          // hintText                    = {hintText?hintText:''}
          className={this.setClassName()}
          floatingLabelText={floatingLabelText || ''}
          isVisible
          toBlock={toBlock}
          disable={disabled}
          onValueChange={(values) => {
            const { formattedValue, value, floatValue } = values;
            if (
              toBlock === false &&
              disabled === false &&
              isFunction(onChange)
            ) {
              return onChange(value, formattedValue, floatValue);
            }
          }}
          // onChange={() => {
          //   if (toBlock && disabled) {
          //     return;
          //   }
          // }}
          onClick={(event) => {
            event.target.select();
            if (toBlock === false && isFunction(onClick)) {
              return onClick(event);
            }
          }}
          onFocus={(event) => {
            if (toBlock === false && isFunction(onFocus)) {
              return onFocus(event);
            }
          }}
          onBlur={(event) => {
            const { target } = event;
            if (toBlock === false && isFunction(onBlur)) {
              return onBlur(event, target.value);
            }
          }}
        />
        {isNil(errorText) === false && isEmpty(errorText) === false ? (
          <Label className="validationHelpText">{errorText}</Label>
        ) : (
          ''
        )}
      </Fragment>
    ); // return
  } // render
}

export default CustomInputCurrency;
