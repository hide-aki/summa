import React, { Component, Fragment } from 'react';
import spanish from 'antd/lib/date-picker/locale/es_ES';
import english from 'antd/lib/date-picker/locale/en_US';
import { LocaleProvider } from 'antd';
import es_ES from 'antd/lib/locale-provider/es_ES';

import { DatePicker } from 'antd';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
} from 'reactstrap';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import moment from 'moment';

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.defaultValue = moment();
  }

  onChange = (date, dateString, dateFormat) => {
    const momentFormDate = moment(dateString);
    const DateForm = momentFormDate.format('DD/MM/YYYY');
    const format = isNil(dateFormat) === false ? dateFormat : 'DD/MM/YYYY';
    const formatedDate = momentFormDate.format(format);
    this.setState(() => ({
      formatDate: DateForm,
      momentDate: date,
    }));
    return this.props.onChange(formatedDate, dateString);
  };

  render() {
    const {
      datePickerClassName,
      isVisible,
      dateFormat,
      language,
      defaultValue,
      errorText,
    } = this.props;

    let component = <div />;
    if (isVisible === true) {
      component = (
        <LocaleProvider locale={isNil(language) === false ? language : es_ES}>
          <div className="datePickerDad">
            <Fragment>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText
                      className="toggleControl"
                      id="calendariobtn"
                    >
                      <i className="fa fa-calendar" />
                    </InputGroupText>
                  </InputGroupAddon>
                  {isNil(errorText) === false &&
                  isEmpty(errorText) === false ? (
                    <Label className="validationHelpText">{errorText}</Label>
                  ) : (
                    ''
                  )}
                </InputGroup>
              </FormGroup>
              <DatePicker
                format="YYYY/MM/DD"
                onChange={(date, dateString) => {
                  this.onChange(date, dateString, dateFormat);
                }}
                value={
                  isNil(this.state.momentDate) === false &&
                  isEmpty(this.state.momentDate) === false
                    ? moment(this.state.momentDate, 'YYYY/MM/DD')
                    : isNil(this.props.defaultValue) === false &&
                      isEmpty(this.props.defaultValue) === false
                    ? moment(this.props.defaultValue, 'YYYY/MM/DD')
                    : moment(this.defaultValue, 'YYYY/MM/DD')
                }
              />
            </Fragment>
          </div>
        </LocaleProvider>
      );
    }
    return component;
  }
}

CustomDatePicker.propTypes = {
  onChange: PropTypes.func,
  isVisible: PropTypes.bool,
};
export default CustomDatePicker;
