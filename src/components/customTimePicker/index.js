import React, { Component, Fragment } from 'react';
import spanish from 'antd/lib/date-picker/locale/es_ES';
import english from 'antd/lib/date-picker/locale/en_US';
import { LocaleProvider } from 'antd';
import es_ES from 'antd/lib/locale-provider/es_ES';

import { TimePicker } from 'antd';
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

class CustomTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.defaultValue = moment();
  }

  render() {
    const { format = 'HH:mm', language } = this.props;
    return (
      <LocaleProvider locale={isNil(language) === false ? language : es_ES}>
        <div className="timePickerDad">
          <Fragment>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText className="toggleControl" id="timepickerbtn">
                    <i className="fa fa-clock-o" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <TimePicker
              defaultValue={moment('12:08', format)}
              format={format}
            />
          </Fragment>
        </div>
      </LocaleProvider>
    );
  }
}
export default CustomTimePicker;
