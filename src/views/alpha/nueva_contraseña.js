import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';
import { notification } from 'antd';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import {
  CustomCardBody,
  CustomCard,
  CustomCol,
  CustomContainer,
  CustomForm,
  CustomInput,
  CustomRow,
  ALERT_TYPE,
} from '@pleedtech/pt-components';
import actions from './actions/actionsPassRecvery';
import ALERT_TYPE_STYLES from './actions/constantStyle';
import img1 from '../../assets/img/logo.png';
import { CustomSelectLanguage } from '../../components/customSelect';
// Constants
import { LANGUAGE_CATALOG } from '../../components/customSelectLanguage/constants';
// Selectors
import { translationMessages } from '../../i18n';

const languagesCatalog = LANGUAGE_CATALOG;

class Nueva_contraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPass: '',
      confirmPass: '',
      isDisabledNewPass: false,
      isDisabledConfirmPass: false,
      defaultValue: 'MX',
      messages: [],
      data: [
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
      ],
    };
  }

  componentWillMount = () => {
    this.checkLifeToken();
    this.setState({
      defaultValue: this.getDefaultCountryByIdLanguage(),
    });
    this.selectLanguageJson(this.getDefaultCountryByIdLanguage());
  };

  getDefaultCountryByIdLanguage = (defaultCountry) => {
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

  selectLanguageJson = async (idCountry = '') => {
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
    this.setState({ messages: translationMessagesObject });
    return true;
  };

  checkLifeToken = async () => {
    const { postGetPasswordCheck, match } = this.props;
    const data = {
      passwordRequest: isNil(match.params.idEmail) ? '' : match.params.idEmail,
    };
    try {
      const responseCheck = await postGetPasswordCheck(data);
      const { idPasswordRequest } = responseCheck.data.result;
      const responseIdPass = isNil(idPasswordRequest) ? '' : idPasswordRequest;
      this.setState({ idPasswordRequest: responseIdPass });
    } catch (error) {
      this.setState({ isDisabledNewPass: true, isDisabledConfirmPass: true });
      this.openNotification(
        'El ID ha caducado o no es válido',
        ALERT_TYPE_STYLES.ERROR,
        true,
        '/Login',
      );
    }
  };

  passwordPutRequest = async (passData) => {
    const { putGetPasswordRecovered } = this.props;
    const { idPasswordRequest } = this.state;
    const data = {
      password: passData,
    };

    try {
      await putGetPasswordRecovered(data, idPasswordRequest);
      this.openNotification(
        'Se cambió satisfactoriamente la contraseña',
        ALERT_TYPE_STYLES.SUCCESS,
        true,
        '/Login',
      );
    } catch (error) {
      this.openNotification(
        'error de servidor',
        ALERT_TYPE_STYLES.INFO,
        true,
        '/Login',
      );
    }
  };

  openNotification = (
    description,
    messageType,
    redirect = false,
    path = '',
  ) => {
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
      onClose: (e) => {
        const { goToRoute } = this.props;
        if (redirect) {
          goToRoute(path);
        }
      },
      message: '',
      description,
      style: {},
      className,
    });
  };

  checkPasswordRegExp = (str) => {
    const re = /^((?=.*[a-z])|(?=.*[0-9]))((?=.*[A-Z])|(?=.*[a-z])|(?=.*[0-9])).{8,}$/;
    return re.test(str);
  };

  actionChangePass = (password = '', secondPassword = '') => {
    if (isEmpty(password) || isEmpty(secondPassword)) {
      this.openNotification(
        'Ingresa las contraseñas',
        ALERT_TYPE_STYLES.WARNING,
      );
    } else if (
      password !== secondPassword &&
      (isEmpty(password) && isEmpty(secondPassword)) === false
    ) {
      this.openNotification(
        'Las contraseñas no son iguales',
        ALERT_TYPE_STYLES.WARNING,
      );
    } else if (
      password === secondPassword &&
      (isEmpty(password) && isEmpty(secondPassword)) === false
    ) {
      if (this.checkPasswordRegExp(secondPassword)) {
        this.passwordPutRequest(secondPassword);
      } else if (this.checkPasswordRegExp(secondPassword) === false) {
        this.openNotification(
          'La contraseña debe tener mínimo 8 caracteres',
          ALERT_TYPE_STYLES.INFO,
        );
      }
    }
  };

  loading = () => (
    <div className="sk-cube-grid gridLoader">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
    </div>
  );

  handleOnChangeLanguage = (event, index, value) => {
    this.selectLanguageJson(value, translationMessages);
  };

  getMessageTranslation = (messagesObject = {}, messageCode = '') => {
    return messagesObject[messageCode] ? messagesObject[messageCode] : '';
  };

  render() {
    const {
      newPass,
      confirmPass,
      isDisabledNewPass,
      isDisabledConfirmPass,
      defaultValue,
      data,
      messages,
    } = this.state;
    return (
      <div className="app login">
        <Fragment>
          <CustomRow>
            <div
              className="custom-select-right"
              style={{
                paddingTop: '20px',
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
                onChange={this.handleOnChangeLanguage}
              />
            </div>
          </CustomRow>
          <CustomRow className="size-logo">
            <div>
              <img src={img1} alt="logo" />
            </div>
          </CustomRow>

          <CustomRow className="">
            <CustomCol xl="4" lg="4" md="4" />
            <CustomCol xl="4" lg="4" md="4" sm="12" xs="12">
              <CustomCard className="card_login">
                <CustomCardBody>
                  <h1 className="change-pass-title">
                    {this.getMessageTranslation(messages, 'UIL0000000000041')}
                  </h1>
                  <p className="text-muted">
                    {this.getMessageTranslation(messages, 'UIL0000000000059')}.
                  </p>
                  <div class="mb-3">
                    <Label htmlFor="nf-email">
                      {this.getMessageTranslation(messages, 'UIL0000000000060')}
                      *
                    </Label>
                    <CustomInput
                      isVisible
                      disabled={isDisabledNewPass}
                      type="password"
                      id="nf-password1"
                      name="nf-password1"
                      value={newPass}
                      placeholder=""
                      autoComplete="password"
                      onChange={(event, value) => {
                        this.setState({ newPass: value });
                      }}
                    />
                  </div>
                  <div class="mb-3">
                    <Label htmlFor="nf-email">
                      {this.getMessageTranslation(messages, 'UIL0000000000061')}
                      *
                    </Label>
                    <CustomInput
                      isVisible
                      disabled={isDisabledConfirmPass}
                      type="password"
                      id="nf-password"
                      name="nf-password"
                      value={confirmPass}
                      placeholder=""
                      autoComplete="password"
                      onChange={(event, value) => {
                        this.setState({ confirmPass: value });
                      }}
                    />
                  </div>
                  <CustomRow>
                    <CustomCol xs="6">
                      <Link
                        className="btn btn-warning mt-2 btn-oneline"
                        to="#"
                        onClick={() => {
                          if (
                            isDisabledNewPass === false ||
                            isDisabledConfirmPass === false
                          ) {
                            this.actionChangePass(newPass, confirmPass);
                          }
                        }}
                      >
                        {' '}
                        {this.getMessageTranslation(
                          messages,
                          'UIL0000000000041',
                        )}
                      </Link>
                    </CustomCol>
                  </CustomRow>
                </CustomCardBody>
              </CustomCard>
            </CustomCol>
            <CustomCol xl="4" lg="4" md="4" />
          </CustomRow>
          <CustomRow className="ftrCtrl_al">
            <CustomCol xl="12" lg="12">
              <p className="legal">
                {' '}
                En términos del artículo octavo transitorio de la ley para
                regular las instituciones de tecnología financiera ...{' '}
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
  }
}

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch) => ({
  goToRoute: (route) => dispatch(push(route)),
  putGetPasswordRecovered: (data, id) =>
    dispatch(actions.putGetPasswordRecovered(data, id)),
  postGetPasswordCheck: (data) => dispatch(actions.postGetPasswordCheck(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nueva_contraseña);
