import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';
import { notification } from 'antd';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
  Row,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

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
import ALERT_TYPE_STYLES from './actions/constantStyle';
import actions from './actions/actionsPassRecvery';
import { CustomSelectLanguage } from '../../components/customSelect';
// Constants
import { LANGUAGE_CATALOG } from '../../components/customSelectLanguage/constants';
// Selectors
import { translationMessages } from '../../i18n';

import img1 from '../../assets/img/logo.png';

const languagesCatalog = LANGUAGE_CATALOG;

class Recuperar_contraseña extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      emailInput: '',
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

  componentWillMount() {
    this.setState({
      defaultValue: this.getDefaultCountryByIdLanguage(),
    });
    this.selectLanguageJson(this.getDefaultCountryByIdLanguage());
  }

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

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

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

  getMessageTranslation = (messagesObject = {}, messageCode = '') => {
    return messagesObject[messageCode] ? messagesObject[messageCode] : '';
  };

  validateEmail = async (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  handleSendRecoverPassword = async (email) => {
    const { postGetPasswordRequest } = this.props;

    if (await this.validateEmail(email)) {
      try {
        await postGetPasswordRequest({
          emailaddress: email,
          idLanguage: 2,
        });
        await this.openNotification(
          'Se ha enviado un correo para la recuperación de contraseña',
          ALERT_TYPE_STYLES.SUCCESS,
          true,
          '/login',
        );
      } catch (error) {
        await this.openNotification(
          'El correo electrónico no existe',
          ALERT_TYPE_STYLES.ERROR,
        );
      }
    } else {
      await this.openNotification(
        'Formato de correo electrónico inválido',
        ALERT_TYPE_STYLES.INFO,
      );
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

  render() {
    const { emailInput, defaultValue, data, messages } = this.state;
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
            <CustomCol xl="4" lg="4" md="3" />
            <CustomCol xl="4" lg="4" md="6" sm="12" xs="12">
              <CustomCard className="card_login">
                <CustomCardBody>
                  {/* <CustomForm> */}
                  <h1>
                    {this.getMessageTranslation(messages, 'UIL0000000000045')}
                  </h1>
                  <p className="text-muted">
                    {this.getMessageTranslation(messages, 'UIL0000000000058')}
                  </p>
                  <Label htmlFor="nf-email">
                    {this.getMessageTranslation(messages, 'UIL0000000000053')}
                  </Label>
                  <CustomInput
                    isVisible
                    disabled={false}
                    type="email"
                    id="nf-email"
                    name="nf-email"
                    placeholder=""
                    autoComplete="email"
                    value={emailInput}
                    onChange={(event, value) => {
                      this.setState({ emailInput: value, errorEmail: '' });
                    }}
                  />
                  <CustomRow>
                    <CustomCol xs="6">
                      <div className="text-left" style={{ marginTop: 10 }}>
                        <Link color="link" to="/login">
                          {' '}
                          {this.getMessageTranslation(
                            messages,
                            'UIL0000000000030',
                          )}
                        </Link>
                      </div>
                    </CustomCol>
                    <CustomCol xs="6" className="text-right">
                      <Link
                        className="btn btn-warning mt-2"
                        to="#"
                        onClick={() => {
                          this.handleSendRecoverPassword(emailInput);
                        }}
                      >
                        {' '}
                        {this.getMessageTranslation(
                          messages,
                          'UIL0000000000009',
                        )}
                      </Link>
                    </CustomCol>
                  </CustomRow>
                  {/* </CustomForm> */}
                </CustomCardBody>
              </CustomCard>
            </CustomCol>
            <CustomCol xl="4" lg="4" md="3" />
          </CustomRow>

          <CustomRow className="ftrCtrl_al">
            <CustomCol md="12">
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
  postGetPasswordRequest: (data) =>
    dispatch(actions.postGetPasswordRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recuperar_contraseña);
