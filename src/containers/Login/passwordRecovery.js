import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import {
  CustomButton,
  CustomCard,
  CustomCardBody,
  CustomCardGroup,
  CustomCol,
  CustomInput,
  CustomForm,
  CustomInputGroup,
  CustomInputGroupAddon,
  CustomInputGroupText,
  CustomRow,
} from '@pleedtech/pt-components';
import { Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';
import { translationMessages } from '../../i18n';
import { selectTemporalLoginMessages } from '../languageProvider/selectors';
import GLOBAL_CONSTANTS from '../../utils/constants/globalConstants';
import { LANGUAGE_CATALOG } from '../../components/customSelectLanguage/constants';
import { CustomToastr, ALERT_TYPE } from '../../components/customToastr';
import { CustomSelectLanguage } from '../../components/customSelect';
import actions from './actions';

class NewPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      password: '',
      secondPassword: '',
      openToastr: false,
      alertType: ALERT_TYPE.ALERT_TYPE,
      blockButtonChngePass: false,
      modal: false,
    };
    this.languagesCatalog = LANGUAGE_CATALOG;
  }

  componentWillMount() {
    this.idLanguageToLocalStorage = window.localStorage.idLanguageSession;
    this.setInitialLanguage(this.idLanguageToLocalStorage);
    this.checkLifeToken();
  }

  setInitialLanguage = (idLanguage) => {
    this.initialIdLanguage = translationMessages.es;
    switch (idLanguage) {
      case '1':
        this.initialIdLanguage = translationMessages.en;
        break;
      case '2':
        this.initialIdLanguage = translationMessages.es;
        break;
      case '4':
        this.initialIdLanguage = translationMessages['es-co'];
        break;
      default:
        this.initialIdLanguage = translationMessages.en;
        break;
    }
    this.setState({ messages: this.initialIdLanguage });
  };

  toggle = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  checkLifeToken = async () => {
    const { goToRoute, postGetPasswordCheck, match } = this.props;
    const data = {
      idPasswordRequest: match.params.idEmail,
      idLanguage: this.idLanguageToLocalStorage,
      idClientApp: GLOBAL_CONSTANTS.idClientApp,
      mobileIdNumber: GLOBAL_CONSTANTS.mobileIdNumber,
    };
    try {
      await postGetPasswordCheck(data);
    } catch (error) {
      const catchError = error.response.data.messageCode;
      this.setState({ modal: true, labelModal: catchError });
    }
  };

  passwordPutRequest = async (passData) => {
    const { putGetPasswordRecovered, match, goToRoute } = this.props;
    const data = {
      password: passData,
      idClientApp: GLOBAL_CONSTANTS.idClientApp,
      mobileIdNumber: GLOBAL_CONSTANTS.mobileIdNumber,
    };
    const { idEmail } = match.params;

    try {
      await putGetPasswordRecovered(data, idEmail);
      this.setState({ modal: true, labelModal: 'UIL0000000000018' });
    } catch (error) {
      this.setState({ modal: true, labelModal: 'UIL0000000000038' });
    }
  };

  getDefaultCountryByIdLanguage = (defaultCountry) => {
    let countryId = 'MX';
    let defaultCountryParam = defaultCountry;
    this.idLanguageToLocalStorage = window.localStorage.idLanguageSession;
    if (
      this.idLanguageToLocalStorage !== undefined &&
      this.idLanguageToLocalStorage !== '' &&
      this.idLanguageToLocalStorage !== null
    ) {
      defaultCountryParam = this.idLanguageToLocalStorage;
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

  selectLanguageJson = async (idCountry = '') => {
    let translaitonMessages = translationMessages.es;
    switch (idCountry) {
      case 'MX':
        await localStorage.setItem(
          'idLanguageSession',
          this.languagesCatalog[idCountry]
            ? this.languagesCatalog[idCountry].idLanguage
            : '',
        );
        translaitonMessages = translationMessages.es;

        break;
      case 'US':
        await localStorage.setItem(
          'idLanguageSession',
          this.languagesCatalog[idCountry]
            ? this.languagesCatalog[idCountry].idLanguage
            : '',
        );
        translaitonMessages = translationMessages.en;
        break;
      default:
        await localStorage.setItem(
          'idLanguageSession',
          this.languagesCatalog.MX ? this.languagesCatalog.MX.idLanguage : '',
        );
        translaitonMessages = translationMessages.es;
        break;
    }

    this.setState({ messages: translaitonMessages });
    return true;
  };

  getMessageTranslation = (messages = {}, messageCode = '') => {
    return messages[messageCode] ? messages[messageCode] : '';
  };

  actionChangePass = (password = '', secondPassword = '') => {
    if (isEmpty(password) || isEmpty(secondPassword)) {
      this.alertToastrCleanPass('UIL0000000000037', ALERT_TYPE.ERROR);
    } else if (
      password !== secondPassword &&
      (isEmpty(password) && isEmpty(secondPassword)) === false
    ) {
      this.alertToastrCleanPass('UIL0000000000027', ALERT_TYPE.ERROR);
    } else if (
      password === secondPassword &&
      (isEmpty(password) && isEmpty(secondPassword)) === false
    ) {
      if (this.checkPasswordRegExp(secondPassword)) {
        this.passwordPutRequest(secondPassword);
      } else if (this.checkPasswordRegExp(secondPassword) === false) {
        this.alertToastrCleanPass('UIL0000000000051', ALERT_TYPE.INFO);
      }
    }
  };

  alertToastrCleanPass = async (mesageCode, alertType, buttonBlock = false) => {
    const { openToastr, messages } = this.state;
    try {
      await this.setState({
        openToastr: !openToastr,
        alertType,
        message: this.getMessageTranslation(messages, mesageCode),
        password: '',
        secondPassword: '',
        blockButtonChngePass: buttonBlock,
      });
      return true;
    } catch (error) {
      //error de parametros
    }
  };

  checkPasswordRegExp = (str) => {
    const re = /^((?=.*[a-z])|(?=.*[0-9]))((?=.*[A-Z])|(?=.*[a-z])|(?=.*[0-9])).{8,}$/;
    return re.test(str);
  };

  render() {
    const {
      messages,
      secondPassword,
      blockButtonChngePass,
      password,
      openToastr,
      message,
      alertType,
      modal,
      labelModal,
    } = this.state;
    const { goToRoute } = this.props;

    return (
      <div className="app">
        <div className="languagePicker">
          <CustomSelectLanguage
            id="idCustomInput-3"
            right={false}
            left
            disabled={false}
            defaultValue={this.getDefaultCountryByIdLanguage()}
            def
            data={[
              {
                id: 'MX',
                text: 'MX',
                value: {
                  isSelected: false,
                  isSelectedAll: true,
                  style:
                    '[{"classIcon":"flag-icon flag-icon-mx flag-icon-xx"}]',
                },
              },
              {
                id: 'US',
                text: 'US',
                value: {
                  isSelected: false,
                  isSelectedAll: true,
                  style:
                    '[{"classIcon":"flag-icon flag-icon-us flag-icon-xx"}]',
                },
              },
            ]}
            onChange={(event, index, value, data) => {
              this.selectLanguageJson(data.id);
            }}
          />
        </div>

        <div className="brandingLogin" />
        <CustomRow className="backgroundRow ">
          <Label for="version" className="pledVersionControl_bb">
            {`${GLOBAL_CONSTANTS.FOOTER_TEXT_LOGIN} `}
          </Label>
          <CustomCol>
            <CustomCardGroup className="cardLogin">
              <CustomCard className="p-4" id="inicioSS">
                <CustomCardBody>
                  <CustomForm>
                    <h1 className="LoginHeader">
                      {this.getMessageTranslation(messages, 'UIL0000000000041')}
                    </h1>
                    <p className="text-muted">
                      {this.getMessageTranslation(messages, 'UIL0000000000033')}
                    </p>
                    <CustomInputGroup className="mb-3 loginInputControl">
                      <CustomInputGroupAddon addonType="prepend">
                        <CustomInputGroupText className="icon-rounded-left">
                          <i className="icon-lock " />
                        </CustomInputGroupText>
                      </CustomInputGroupAddon>
                      <CustomInput
                        type="password"
                        floatingLabelText={this.getMessageTranslation(
                          messages,
                          'UIL0000000000004',
                        )}
                        autoComplete="current-password"
                        className=" roundedControl inputControl"
                        isVisible
                        toBlock={false}
                        disabled={false}
                        value={password}
                        onChange={(event, value) => {
                          this.setState({ password: value });
                        }}
                      />
                    </CustomInputGroup>
                    <CustomInputGroup className="mb-4 loginInputControl">
                      <CustomInputGroupAddon addonType="prepend">
                        <CustomInputGroupText className="icon-rounded-left">
                          <i className="icon-lock solid " />
                        </CustomInputGroupText>
                      </CustomInputGroupAddon>
                      <CustomInput
                        type="password"
                        floatingLabelText={this.getMessageTranslation(
                          messages,
                          'UIL0000000000032',
                        )}
                        autoComplete="current-password"
                        className=" roundedControl inputControl"
                        isVisible
                        toBlock={false}
                        disabled={false}
                        value={secondPassword}
                        onChange={(event, value) => {
                          this.setState({ secondPassword: value });
                        }}
                      />
                    </CustomInputGroup>
                    <CustomRow>
                      <CustomCol xs="12">
                        <CustomButton
                          block
                          disabled={blockButtonChngePass}
                          onClick={() => {
                            this.actionChangePass(password, secondPassword);
                          }}
                          color=""
                          className="roundedControl btnControl"
                          label={this.getMessageTranslation(
                            messages,
                            'UIL0000000000041',
                          )}
                          isVisible
                          toBlock={false}
                        />
                      </CustomCol>
                    </CustomRow>
                  </CustomForm>
                </CustomCardBody>
              </CustomCard>
            </CustomCardGroup>
          </CustomCol>
        </CustomRow>
        <CustomToastr
          triggerAlert={openToastr}
          message={message}
          alertType={alertType}
          showToaster={() => {
            this.setState({ message: '', openToastr: false });
          }}
        />
        <Modal isOpen={modal}>
          <ModalHeader className="DarkHeader">
            {this.getMessageTranslation(messages, labelModal)}
          </ModalHeader>
          <ModalBody>
            {this.getMessageTranslation(messages, 'UIL0000000000036')}
          </ModalBody>
          <ModalFooter>
            <CustomButton
              isVisible
              label={this.getMessageTranslation(messages, 'UIL0000000000052')}
              color="success"
              className="roundedControl addControl"
              onClick={() => {
                goToRoute('/login');
              }}
            />
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  loginMessages: selectTemporalLoginMessages(),
});

const mapDispatchToProps = (dispatch) => ({
  goToRoute: (route) => dispatch(push(route)),
  actionGetTokenFromLogin: (data) =>
    dispatch(actions.actionGetTokenFromLogin(data)),
  actionGetRecoverPassword: (data) =>
    dispatch(actions.actionGetRecoverPassword(data)),
  setLocalMessages: (data) => dispatch(actions.setLocalMessages(data)),
  postGetPasswordCheck: (data) => dispatch(actions.postGetPasswordCheck(data)),
  putGetPasswordRecovered: (data, idEmail) =>
    dispatch(actions.putGetPasswordRecovered(data, idEmail)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPass);
