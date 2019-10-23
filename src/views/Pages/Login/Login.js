/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { notification } from 'antd';
import { Link } from 'react-router-dom';

// Utils
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import {
  CustomCardBody,
  CustomCard,
  CustomCol,
  CustomContainer,
  CustomForm,
  CustomInput,
  CustomInputGroup,
  CustomInputGroupAddon,
  CustomInputGroupText,
  CustomRow,
} from '@pleedtech/pt-components';

// Constants
import { MESSAGES_CODE, KEY_ENTER, TEXT_ENTER } from './constants';
import { LANGUAGE_CATALOG } from '../../../components/customSelectLanguage/constants';
import GLOBAL_CONSTANTS from '../../../utils/constants/globalConstants';
import img1 from '../../../assets/img/logo.png';

// Selectors
import { translationMessages } from '../../../i18n';
import { selectTemporalLoginMessages } from '../../../containers/languageProvider/selectors';
import { makeSelectToastr } from '../../../utils/selectors/toastrSelectors';

// Actions
import { alfaLogin } from '../../../utils/actions/systemConfigurationsActions';
import actions from './actions';
import { showToastrMessage } from '../../../utils/actions/toastrActions';
import languageActions from '../../../containers/languageProvider/actions';

// Components
import { ALERT_TYPE } from '../../../components/customToastr';
import { CustomSelectLanguage } from '../../../components/customSelect';

import '../../../utils/indexedDB/appErrorIndexedDB';

// TO DO
// const {
//   LOGIN_BUTTON_MC,
//   FORGET_PASSWORD_MC,
//   RECOVERY_FORM_MC,
//   LOGIN_FORM_MC,
//   USER_INPUT_MC,
//   PASSWORD_INPUT_MC,
//   CANCEL_RECOVERY_MC,
//   RECOVERY_BUTTON_MC,
//   EMAIL_ADDRESS_RECOVERY_MC,
// } = MESSAGES_CODE;
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
  const [defaultValue, setDefaultValue] = useState(
    getDefaultCountryByIdLanguage('MX'),
  );
  const [data, setData] = useState([
    {
      id: 'MX',
      text: 'MX',
      value: {
        isSelected: false,
        isSelectedAll: true,
        style: '[{"classIcon":"flag-icon flag-icon-mx flag-icon-xx"}]',
        idLanguage: '2',
      },
    },
    /*
    {
      id: 'US',
      text: 'US',
      value: {
        isSelected: false,
        isSelectedAll: true,
        style: '[{"classIcon":"flag-icon flag-icon-us flag-icon-xx"}]',
        idLanguage: '1',
      },
    },
    */
  ]);
  const {
    loginMessages,
    setLocalMessages,
    postGetPasswordRequest,
    userLogin,
    triggerShowToastrMessage,
    history,
  } = props;

  const languagesCatalog = LANGUAGE_CATALOG;

  const openNotification = (description, messageType) => {
    let className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';

    switch (messageType) {
      case ALERT_TYPE.SUCCESS:
        className = 'ntfctnANTCtrl_bb successNtfctnCtrl';
        break;
      case ALERT_TYPE.WARNING:
        className = 'ntfctnANTCtrl_bb warningNtfctnCtrl';
        break;
      case ALERT_TYPE.ERROR:
        className = 'ntfctnANTCtrl_bb dangerNtfctnCtrl';
        break;
      case ALERT_TYPE.INFO:
        className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
        break;

      default:
        className = 'ntfctnANTCtrl_bb infoNtfctnCtrl';
        break;
    }

    notification.open({
      message: '',
      description,
      style: {},
      className,
    });
  };

  const selectLanguageJson = async (idCountry = '') => {
    const { setIdLanguage } = props;
    let translationMessagesObject = translationMessages.es;
    switch (idCountry) {
      case 'MX':
        await localStorage.setItem(
          'idLanguageSession',
          languagesCatalog[idCountry]
            ? languagesCatalog[idCountry].idLanguage
            : '',
        );
        setIdLanguage(
          languagesCatalog[idCountry]
            ? languagesCatalog[idCountry].idLanguage.toString()
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
        setIdLanguage(
          languagesCatalog[idCountry]
            ? languagesCatalog[idCountry].idLanguage.toString()
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
    selectLanguageJson(getDefaultCountryByIdLanguage(), translationMessages);

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
    setDefaultValue(getDefaultCountryByIdLanguage());
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

      openNotification('Ingrese usuario y/o contraseña', ALERT_TYPE.ERROR);

      setMessage(getMessageTranslation(messages, 'UIL0000000000023'));
      setAlertType(ALERT_TYPE.ERROR);
      triggerShowToastrMessage('No 1', ALERT_TYPE.ERROR);
      error = true;
    }
    if (isEmpty(username) && isEmpty(password) === false) {
      setMessage(getMessageTranslation(messages, 'UIL0000000000015'));

      openNotification(
        getMessageTranslation(messages, 'UIL0000000000015'),
        ALERT_TYPE.ERROR,
      );

      setAlertType(ALERT_TYPE.ERROR);
      setBlockLoginButton(false);
      triggerShowToastrMessage('No 2', ALERT_TYPE.ERROR);
      error = true;
    }
    if (isEmpty(username) === false && isEmpty(password)) {
      setBlockLoginButton(false);
      openNotification(
        getMessageTranslation(messages, 'UIL0000000000017'),
        ALERT_TYPE.ERROR,
      );

      setMessage(getMessageTranslation(messages, 'UIL0000000000017'));
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
      history.push(`/AuthUser`);
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
      userLogin(data)
        .then(async (response) => {
          const { result } = response;
          const token = result.accessToken;
          const { idSystemUser } = result;
          await sessionStorage.setItem('token', token);
          await sessionStorage.setItem('idSystemUser', idSystemUser);

          redirectTo(token, idSystemUser);
        })
        .catch(() => {
          openNotification(
            getMessageTranslation(messages, 'UIL0000000000023'),
            ALERT_TYPE.ERROR,
          );
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

  const handleOnChangeLanguage = (event, index, value) => {
    selectLanguageJson(value, translationMessages);
  };

  /*   const loginForm = (
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
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <div>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={username}
                          onChange={(event) => {
                            setUsername(event.target.value);
                          }}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>

                        <Input
                          type="password"
                          placeholder="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            onClick={() => {
                              loginAction();
                            }}
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: '44%' }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  ); */

  return (
    <div className="app login">
      <Fragment>
        <CustomRow>
          <div
            className="custom-select-right"
            style={{
              paddingTop: '50px',
              textAlign: 'right',
              position: 'absolute',
              right: '20px',
            }}
          >
            <CustomSelectLanguage
              id="idCustomInput-3"
              right={false} // true o false -icon position
              className="languagePicker alfa-languagePicker"
              left // true o false - icon position
              disabled={false}
              defaultValue={defaultValue}
              def
              data={data}
              onChange={handleOnChangeLanguage}
            />
          </div>
        </CustomRow>
        <CustomRow className="size-logo">
          <div>
            <img src={img1} alt="logo" />
          </div>
        </CustomRow>
        <CustomRow className="">
          <CustomCol xl="4" lg="4" md="3" />
          <CustomCol xl="4" lg="4" md="6" sm="12" xs="12">
            <CustomCard className="card_login">
              <CustomCardBody>
                <div>
                  <h1>{getMessageTranslation(messages, 'UIL0000000000056')}</h1>
                  <p className="text-muted">
                    {getMessageTranslation(messages, 'UIL0000000000057')}.
                  </p>
                  <CustomInputGroup className="mb-3">
                    <CustomInputGroupAddon addonType="prepend">
                      <CustomInputGroupText>
                        <i className="icon-user" />
                      </CustomInputGroupText>
                    </CustomInputGroupAddon>
                    <CustomInput
                      value={username}
                      isVisible
                      toBlock={false}
                      disabled={false}
                      type="text"
                      placeholder="Usuario"
                      autoComplete="username"
                      onChange={(event, value) => {
                        setUsername(value);
                      }}
                      onKeyPress={(event) => {
                        onKeyPress(event);
                      }}
                    />
                  </CustomInputGroup>
                  <CustomInputGroup className="mb-4">
                    <CustomInputGroupAddon addonType="prepend">
                      <CustomInputGroupText>
                        <i className="icon-lock" />
                      </CustomInputGroupText>
                    </CustomInputGroupAddon>
                    <CustomInput
                      toBlock={false}
                      disabled={false}
                      value={password}
                      isVisible
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="current-password"
                      onChange={(event, value) => {
                        setPassword(value);
                      }}
                      onKeyPress={(event) => {
                        onKeyPress(event);
                      }}
                    />
                  </CustomInputGroup>
                  <CustomRow>
                    <CustomCol xs="6">
                      <button
                        onClick={() => {
                          loginAction();
                        }}
                        className="btn btn-warning"
                      >
                        {' '}
                        {getMessageTranslation(messages, 'UIL0000000000009')}
                      </button>
                    </CustomCol>
                    <CustomCol xs="6" className="text-right ">
                      <Link color="link" to="/recoverPass">
                        {' '}
                        {getMessageTranslation(messages, 'UIL0000000000054')}
                      </Link>
                    </CustomCol>
                  </CustomRow>
                </div>
              </CustomCardBody>
            </CustomCard>
          </CustomCol>
          <CustomCol xl="4" lg="4" md="3" />
        </CustomRow>
        <p className="text-right small-text pw-pt" style={{}}>
          {GLOBAL_CONSTANTS.FOOTER_TEXT_LOGIN}
        </p>
        <CustomRow className="ftrCtrl_al">
          <CustomCol md="12">
            <p className="legal">
              {' '}
              De conformidad con la disposición octava transitoria de la Ley
              para se hace constar que, previo a la fecha de entrada en vigor de
              dicha Ley ...{' '}
              <a
                href="https://ypc.biz/terms_of_use.html"
                target="_blank"
                className="info"
              >
                Más información
              </a>
            </p>
          </CustomCol>
        </CustomRow>
      </Fragment>
    </div>
  );
};

Login.defaultProps = {
  loginMessages: {},
  toaster: {},
};

Login.propTypes = {
  loginMessages: PropTypes.oneOfType([PropTypes.object]),
  setLocalMessages: PropTypes.func.isRequired,
  postGetPasswordRequest: PropTypes.func,
  userLogin: PropTypes.func,
  triggerShowToastrMessage: PropTypes.func,
  toaster: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  loginMessages: selectTemporalLoginMessages(),
  toaster: makeSelectToastr(),
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (data) => dispatch(alfaLogin(data)),
  triggerShowToastrMessage: (message, type) =>
    dispatch(showToastrMessage(message, type)),
  goToRoute: (route) => dispatch(push(route)),
  setLocalMessages: (data) => dispatch(actions.setLocalMessages(data)),
  postGetPasswordRequest: (data) =>
    dispatch(actions.postGetPasswordRequest(data)),
  setIdLanguage: (idLanguage) =>
    dispatch(languageActions.setIdLanguage(idLanguage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
