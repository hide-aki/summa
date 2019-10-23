npimport React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

// Utils
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import {
  CustomButton,
  CustomCard,
  CustomCardBody,
  CustomCol,
  CustomInput,
  CustomForm,
  CustomRow,
  // CustomToastr,
} from '@pleedtech/pt-components';
import Clock from 'react-live-clock';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

// Constants
import { MESSAGES_CODE, KEY_ENTER, TEXT_ENTER } from './constants';
import { LANGUAGE_CATALOG } from '../../components/customSelectLanguage/constants';
import GLOBAL_CONSTANTS from '../../utils/constants/globalConstants';

// Selectors
import { translationMessages } from '../../i18n';
import { selectTemporalLoginMessages } from '../languageProvider/selectors';
import { makeSelectToastr } from '../../utils/selectors/toastrSelectors';

// Actions
import { login } from '../../utils/actions/systemConfigurationsActions';
import actions from './actions';
import { showToastrMessage } from '../../utils/actions/toastrActions';

// Components
import { CustomToastr, ALERT_TYPE } from '../../components/customToastr';
import { CustomSelectLanguage } from '../../components/customSelect';

import '../../utils/indexedDB/appErrorIndexedDB';

const {
  LOGIN_BUTTON_MC,
  FORGET_PASSWORD_MC,
  RECOVERY_FORM_MC,
  LOGIN_FORM_MC,
  USER_INPUT_MC,
  PASSWORD_INPUT_MC,
  CANCEL_RECOVERY_MC,
  RECOVERY_BUTTON_MC,
  EMAIL_ADDRESS_RECOVERY_MC,
} = MESSAGES_CODE;

const Login = (props) => {
  const [isBlockLoginButton, setBlockLoginButton] = useState(false);
  const [messages, setMessages] = useState(translationMessages.es);
  const [openToaster, setOpenToastr] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState(ALERT_TYPE.ALERT_TYPE);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first, setFirst] = useState(false);
  const [isRecoveryPassword, setRecoveryPassword] = useState(false);
  const [recoverUsername, setRecoverUsername] = useState('');
  const [isRecoverUsernameErrorText, setRecoverUsernameErrorText] = useState(
    false,
  );
  const {
    loginMessages,
    setLocalMessages,
    postGetPasswordRequest,
    userLogin,
    history,
    triggerShowToastrMessage,
    toaster,
  } = props;

  const languagesCatalog = LANGUAGE_CATALOG;
  const getDefaultCountryByIdLanguage = (defaultCountry) => {
    let countryId = 'MX';
    let defaultCountryParam = defaultCountry;
    if (
      window.localStorage.idLanguageSession !== undefined &&
      window.localStorage.idLanguageSession !== '' &&
      window.localStorage.idLanguageSession !== null
    ) {
      defaultCountryParam = window.localStorage.idLanguageSession;
    } else {
      return defaultCountryParam;
    }

    switch (defaultCountryParam) {
      case '1':
        countryId = 'US';
        break;
      case '2':
        countryId = 'MX';
        break;
      default:
        countryId = 'US';
        break;
    }
    return countryId;
  };

  const selectLanguageJson = async (idCountry = '') => {
    let translationMessagesObject = translationMessages.es;
    switch (idCountry) {
      case 'MX':
        await localStorage.setItem(
          'idLanguageSession',
          languagesCatalog[idCountry]
            ? languagesCatalog[idCountry].idLanguage
            : '',
        );
        translationMessagesObject = translationMessages.es;

        break;
      case 'US':
        await localStorage.setItem(
          'idLanguageSession',
          languagesCatalog[idCountry]
            ? languagesCatalog[idCountry].idLanguage
            : '',
        );
        translationMessagesObject = translationMessages.en;
        break;
      default:
        await localStorage.setItem(
          'idLanguageSession',
          languagesCatalog.MX ? languagesCatalog.MX.idLanguage : '',
        );
        translationMessagesObject = translationMessages.es;
        break;
    }

    setMessages(translationMessagesObject);
    return true;
  };

  useEffect(() => {
    selectLanguageJson(
      getDefaultCountryByIdLanguage('MX'),
      translationMessages,
    );

    if (
      isNil(loginMessages) === false &&
      Object.keys(loginMessages).length <= 0
    ) {
      setLocalMessages(translationMessages);
    } else {
      translationMessages.en = loginMessages.en;
      translationMessages.es = loginMessages.es;
      translationMessages['es-co'] = loginMessages['es-co'];
    }
    sessionStorage.setItem('isSetProfile', false);
    sessionStorage.setItem('data', '');
  }, []);

  const getMessageTranslation = (messagesObject = {}, messageCode = '') => {
    return messagesObject[messageCode] ? messagesObject[messageCode] : '';
  };

  const validateUsername = (recoverUsrname = '') => {
    let error = false;
    if (recoverUsrname === '' || recoverUsrname === null) {
      error = true;
    }
    return error;
  };

  const submitValidator = (usrname = '', passwrd = '') => {
    let error = false;
    if (isEmpty(usrname) || isEmpty(passwrd)) {
      setBlockLoginButton(false);
      setMessage(getMessageTranslation(messages, 'UIL0000000000023'));
      setAlertType(ALERT_TYPE.ERROR);
      // setOpenToastr(!openToaster);
      triggerShowToastrMessage('No 1', ALERT_TYPE.ERROR);
      error = true;
    }
    if (isEmpty(username) && isEmpty(password) === false) {
      setMessage(getMessageTranslation(messages, 'UIL0000000000015'));
      setAlertType(ALERT_TYPE.ERROR);
      setBlockLoginButton(false);
      // setOpenToastr(!openToaster);
      triggerShowToastrMessage('No 2', ALERT_TYPE.ERROR);
      error = true;
    }
    if (isEmpty(username) === false && isEmpty(password)) {
      setBlockLoginButton(false);
      setMessage(getMessageTranslation(messages, 'UIL0000000000017'));
      // setAlertType(ALERT_TYPE.ERROR);
      // setOpenToastr(!openToaster);
      triggerShowToastrMessage('No 3', ALERT_TYPE.ERROR);
      error = true;
    }
    return error;
  };

  const redirectTo = (token = '', idSystemUser = '') => {
    if (
      isNil(token) === false &&
      isEmpty(idSystemUser) === false &&
      isNil(token) === false &&
      isEmpty(idSystemUser) === false
    ) {
      setBlockLoginButton(false);
      history.push(`/${GLOBAL_CONSTANTS.ROOT_NAME}/modules/AuthUser`);
    } else {
      setBlockLoginButton(false);
      setMessage(getMessageTranslation(messages, 'UIL0000000000024'));
      setAlertType(ALERT_TYPE.ERROR);
      setOpenToastr(!openToaster);
    }
  };

  const handleSendRecoverPassword = () => {
    if (isRecoverUsernameErrorText === true) {
      setRecoverUsernameErrorText(
        getMessageTranslation(messages, 'UIL0000000000050'),
      );
      setRecoverUsernameErrorText(true);

      return true;
    }
    if (validateUsername(recoverUsername) === true) {
      setRecoverUsernameErrorText(
        getMessageTranslation(messages, 'UIL0000000000046'),
      );
      setRecoverUsernameErrorText(true);
    }
    if (isBlockLoginButton === false) {
      setMessage(getMessageTranslation(messages, 'UIL0000000000049'));
      setAlertType(ALERT_TYPE.INFO);
      setBlockLoginButton(true);
      setOpenToastr(!openToaster);

      postGetPasswordRequest({
        emailaddress: recoverUsername,
        idLanguage: window.localStorage.idLanguageSession,
        idClientApp: GLOBAL_CONSTANTS.idClientApp,
        mobileIdNumber: GLOBAL_CONSTANTS.mobileIdNumber,
      })
        .then(() => {
          setMessage(getMessageTranslation(messages, 'UIL0000000000047'));
          setAlertType(ALERT_TYPE.SUCCESS);
          setRecoverUsername('');
          setBlockLoginButton(false);
          setRecoveryPassword(false);
          setOpenToastr(true);
        })
        .catch(() => {
          setMessage(getMessageTranslation(messages, 'AUI0000000000031'));
          setAlertType(ALERT_TYPE.ERROR);
          setBlockLoginButton(false);
          setRecoveryPassword(false);
          setOpenToastr(true);
        });
    }
  };

  const loginAction = () => {
    if (isBlockLoginButton) {
      return;
    }

    const data = {
      user: username.trim(),
      password: password.trim(),
    };

    if (submitValidator(data.user, data.password) === false) {
      // setBlockLoginButton(true);
      userLogin(data)
        .then(async (response) => {
          const { result } = response;
          const token = result.accessToken;
          const { idSystemUser } = result;
          await sessionStorage.setItem('token', token);
          await sessionStorage.setItem('idSystemUser', idSystemUser);

          redirectTo(token, idSystemUser);
        })
        .catch((error) => {
          // setBlockLoginButton(false);
          setMessage(getMessageTranslation(messages, 'UIL0000000000023'));
          setAlertType(ALERT_TYPE.ERROR);
          setOpenToastr(!openToaster);
        });
    }
  };

  const onKeyPress = (event) => {
    if (event.key === KEY_ENTER || event.key === TEXT_ENTER) {
      if (isBlockLoginButton === false) {
        loginAction();
      }
    }
  };

  const loginForm = (
    <Fragment>
      <CustomForm>
        <CustomRow>
          <CustomCol>
            <h1 className="title-login">
              {getMessageTranslation(messages, LOGIN_FORM_MC)}
            </h1>
          </CustomCol>
        </CustomRow>
        <CustomRow>
          <CustomCol>
            <InputGroup className="m-bottom-20 input-group-login">
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="icon-rounded-left">
                  <i className="icon-user" />
                </InputGroupText>
              </InputGroupAddon>
              <CustomInput
                type="text"
                placeholder={getMessageTranslation(messages, USER_INPUT_MC)}
                autoComplete="username"
                isVisible
                toBlock={false}
                disabled={false}
                value={username}
                className="input-form input-rounded"
                floatingLabelText={getMessageTranslation(
                  messages,
                  USER_INPUT_MC,
                )}
                onChange={(event, value) => {
                  setUsername(value);
                }}
                onKeyPress={onKeyPress}
              />
            </InputGroup>
            <InputGroup className="m-bottom-20 input-group-login">
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="icon-rounded-left">
                  <i className="icon-lock" />
                </InputGroupText>
              </InputGroupAddon>
              <CustomInput
                type="password"
                floatingLabelText={getMessageTranslation(
                  messages,
                  PASSWORD_INPUT_MC,
                )}
                placeholder={getMessageTranslation(messages, PASSWORD_INPUT_MC)}
                autoComplete="current-password"
                className="input-form input-rounded"
                isVisible
                toBlock={false}
                disabled={false}
                value={password}
                onChange={(event, value) => {
                  setPassword(value);
                }}
                onKeyPress={onKeyPress}
              />
            </InputGroup>
          </CustomCol>
        </CustomRow>
        <CustomRow className="row-buttons">
          <CustomCol xs="12" md="6">
            <div className="c-button">
              <CustomButton
                block
                color=""
                className="customBtn customBtn--mainBtn btn-rounded btn-rounded--fill btn-block"
                onClick={() => {
                  if (isBlockLoginButton === false) {
                    loginAction();
                  }
                }}
                disabled={false}
                label={getMessageTranslation(messages, LOGIN_BUTTON_MC)}
                isVisible
                toBlock={false}
              />
            </div>
          </CustomCol>
          <CustomCol xs="12" md="6" className="">
            <CustomButton
              isVisible
              color="link"
              className="customLink"
              label={getMessageTranslation(messages, FORGET_PASSWORD_MC)}
              disabled={false}
              onClick={() => setRecoveryPassword(!isRecoveryPassword)}
            />
          </CustomCol>
        </CustomRow>
      </CustomForm>
      <CustomRow className="m-top-30">
        <CustomCol>
          <Clock
            format="HH:mm:ss A"
            className="date-login"
            ticking
            timezone="MX/Mexico_City"
          />
        </CustomCol>
      </CustomRow>
    </Fragment>
  );

  const recoveryForm = (
    <CustomForm>
      <CustomRow>
        <CustomCol>
          <h1 className="title-login">
            {getMessageTranslation(messages, RECOVERY_FORM_MC)}
          </h1>
        </CustomCol>
      </CustomRow>
      <CustomRow>
        <CustomCol>
          <InputGroup className="m-bottom-20 input-group-login">
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="icon-rounded-left">
                <i className="icon-envelope" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              className="input-form input-rounded"
              placeholder={getMessageTranslation(
                messages,
                EMAIL_ADDRESS_RECOVERY_MC,
              )}
              autoComplete="email-address"
            />
          </InputGroup>
        </CustomCol>
      </CustomRow>
      <CustomRow className="row-buttons">
        <CustomCol xs="12" md="6">
          <CustomButton
            isVisible
            block
            color=""
            toBlock={false}
            className="customBtnBorder customBtnBorder--cancelBtn btn-rounded btn-block"
            label={getMessageTranslation(messages, CANCEL_RECOVERY_MC)}
            disabled={false}
            onClick={() => setRecoveryPassword(!isRecoveryPassword)}
          />
        </CustomCol>
        <CustomCol xs="12" md="6" className="">
          <CustomButton
            isVisible
            className="customBtn customBtn--mainBtn btn-rounded btn-block"
            label={getMessageTranslation(messages, RECOVERY_BUTTON_MC)}
            disabled={false}
          />
        </CustomCol>
      </CustomRow>
    </CustomForm>
  );

  const content = (
    <Fragment>
      <div className="animated fadeIn">
        <div className="main-login">
          <div className="languagePicker">
            <ButtonDropdown isOpen={first} toggle={() => setFirst(!first)}>
              <DropdownToggle caret color="">
                <i className="flag-icon flag-icon-mx" />
                <h4>ES</h4>
              </DropdownToggle>
              <DropdownMenu
                className={first === true ? 'show' : ''}
                id="langOptions"
              >
                <DropdownItem>
                  ES <i className="flag-icon flag-icon-mx flag-icon-xx" />
                </DropdownItem>
                <DropdownItem>
                  EN <i className="flag-icon flag-icon-us flag-icon-xx" />
                </DropdownItem>
                <DropdownItem>
                  CO <i className="flag-icon flag-icon-co flag-icon-xx" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <div className="back-login" />
          <CustomCard className="cardLogin">
            <CustomCardBody>
              {isRecoveryPassword === true ? recoveryForm : loginForm}
            </CustomCardBody>
          </CustomCard>
          <div className="version-pleed">
            <h3>{`${GLOBAL_CONSTANTS.FOOTER_TEXT_LOGIN}`}</h3>
          </div>
        </div>
      </div>

      <CustomToastr
        triggerAlert={toaster.isOpen}
        // TO DO: triggerAlert
        message={toaster.message}
        // TO DO: message="Hello"
        alertType={toaster.messageType}
        // TO DO: alertType={ALERT_TYPE.ERROR}
        showToaster={() =>
          // TO DO: triggerShowToastrMessage('show toaster', ALERT_TYPE.INFO)
          triggerShowToastrMessage('', '')
        }
      />
    </Fragment>
  );

  return content;
};

const mapStateToProps = createStructuredSelector({
  loginMessages: selectTemporalLoginMessages(),
  toaster: makeSelectToastr(),
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (data) => dispatch(login(data)),
  triggerShowToastrMessage: (message, type) =>
    dispatch(showToastrMessage(message, type)),
  goToRoute: (route) => dispatch(push(route)),
  setLocalMessages: (data) => dispatch(actions.setLocalMessages(data)),
  postGetPasswordRequest: (data) =>
    dispatch(actions.postGetPasswordRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
