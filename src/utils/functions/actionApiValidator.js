import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

class ActionApiValidator {
  constructor() {
    this.error = {
      error: true,
      message: 'UISGEN0000000043',
      messageCode: 'UISGEN0000000042',
      result: null,
      status: null,
    };
  }

  resultError = () => {
    return this.error;
  };

  validateTokenIdcompanyNotEmpty = (token, idCompany) => {
    let triggerError = false;
    if (isEmpty(token) || isEmpty(idCompany)) {
      triggerError = true;
    }
    return triggerError;
  };

  validateDataNotEmpty = (data) => {
    let triggerError = false;
    if (isEmpty(data)) {
      triggerError = true;
    }
    return triggerError;
  };

  validateResponseDataNill = (data) => {
    let triggerError = false;
    if (isNil(data)) {
      triggerError = true;
    }
    return triggerError;
  };

  validateResponseDataEmpty = (data) => {
    let triggerError = false;
    if (isNil(data) || isEmpty(data)) {
      triggerError = true;
    }
    return triggerError;
  };
}

export default ActionApiValidator;
