import React, { Component, Fragment } from 'react';
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
import 'moment/locale/es';

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      flag: false,
    };

    this.defaultValue = moment();
    if (props.idLanguage === 1) {
      moment.locale('moment/locale/en');
    } else if (props.idLanguage === 2 || props.idLanguage === 4) {
      moment.locale('moment/locale/es');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.idLanguage === 1) {
      moment.locale('moment/locale/en');
    } else if (this.props.idLanguage === 2 || this.props.idLanguage === 4) {
      moment.locale('moment/locale/es');
    }
    if (nextProps.clean !== this.props.clean) {
      this.setState({ momentDate: null });
    }
    return true;
  }

  onChange = (date, dateString, dateFormat) => {
    const momentFormDate = moment(dateString);
    const DateForm = momentFormDate.format('DD/MM/YYYY');
    const format = isNil(dateFormat) === false ? dateFormat : 'DD/MM/YYYY';
    const formatedDate = momentFormDate.format(format);
    this.setState(() => ({
      formatDate: DateForm,
      momentDate: date,
      flag: true,
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
        <div className="datePickerDad">
          <Fragment>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText className="toggleControl" id="calendariobtn">
                    <i className="fa fa-calendar" />
                  </InputGroupText>
                </InputGroupAddon>
                {isNil(errorText) === false && isEmpty(errorText) === false ? (
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
                  : ''
              }
            />
          </Fragment>
        </div>
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
