import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { DatePicker, notification } from 'antd';
import _default from 'antd/lib/locale-provider/es_ES';
import moment from 'moment';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import ReactMati from 'react-mati';
import {
  selectMessages,
  selectIdLanguage,
} from '../../../../containers/languageProvider/selectors';
import { MessagesFunctions } from '@pleedtech/pt-components/dist';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CustomButton,
  CustomCol,
  CustomForm,
  CustomInput,
  CustomRow,
  CustomSelectOption,
  ALERT_TYPE,
} from '@pleedtech/pt-components';
import classnames from 'classnames';
import { createStructuredSelector, createSelector } from 'reselect';
import { connect } from 'react-redux';
import actionsAlpha from '../actions';
import {
  makeSelectDataProfile,
  selectIdEmployee,
  selectIdSystemUser,
  selectIdCompany,
} from 'utils/selectors/dataUserProfileSelectors';

import { setProfileData } from '../../../../utils/actions/userProfileActions';
const genderCatalog = [
  {
    id: 'H',
    text: 'FRL0000000000129',
    value: { id: 'H', text: 'FRL0000000000129' },
  },
  {
    id: 'M',
    text: 'FRL0000000000130',
    value: { id: 'M', text: 'FRL0000000000130' },
  },
];
class TabAccountData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '2',
      username: null,
      idAccountType: null,
      accountType: null,
      idLeverage: null,
      leverage: null,
      createdAt: null,
      givenName: null,
      middleName: null,
      lastName: null,
      mothersMaidenName: null,
      alias: null,
      idEmailAddress: null,
      emailAddress: null,
      birthdate: null,
      idPhoneNumber: null,
      phoneNumber: null,
      idCountry: null,
      country: null,
      idAddress: null,
      fullAddress: null,
      url: null,
      isOpenChangePass: false,
      inputPass: null,
      inputPassNew: null,
      inputPassConfirm: null,
      errorConfirmPass: null,
      countryCatalog: [],
      isGetData: false,
      fullName: '',
      gender: null,
      digitalIdentity: null,
    };
    this.messagesFunctions = new MessagesFunctions(props.messages);
  }

  componentWillMount() {
    this.postGetAllCountriesCatalog();
    this.getDataAccountCustomer();
    this.getUrl();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { idLanguage } = this.props;
    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(nextProps.messages);
    }
    return true;
  }

  getDataAccountCustomer = async () => {
    const { dataProfile, postGetAccountCustomer } = this.props;
    const { idCompany, idCustomer } = dataProfile;
    const DATA = {
      idCompany,
      updatedByUser: dataProfile.idSystemUser,
      idCustomer,
    };
    try {
      const response = await postGetAccountCustomer(DATA);
      if (isEmpty(response.result) === false) {
        const {
          username,
          idAccountType,
          accountType,
          idLeverage,
          leverage,
          createdAt,
          givenName,
          middleName,
          lastName,
          mothersMaidenName,
          idEmailAddress,
          emailAddress,
          birthdate,
          idPhoneNumber,
          phoneNumber,
          idCountry,
          country,
          gender,
          idAddress,
          fullAddress,
          digitalIdentity,
        } = response.result;
        this.setState({
          username,
          idAccountType,
          accountType,
          idLeverage,
          leverage,
          createdAt: isNil(createdAt)
            ? null
            : moment(createdAt).format('DD/MM/YYYY'),
          givenName,
          middleName,
          lastName,
          mothersMaidenName,
          idEmailAddress,
          emailAddress,
          birthdate: isNil(birthdate) ? null : moment(birthdate),
          idPhoneNumber,
          phoneNumber,
          idCountry,
          country,
          idAddress,
          fullAddress,
          isGetData: true,
          gender,
          digitalIdentity,
        });
        this.getFullName(givenName, lastName);
      }
    } catch (error) {
      this.openNotification(error.message, ALERT_TYPE.ERROR);
    }
  };

  getFullName(givenName, lastName) {
    const firstName = isEmpty(givenName) && isNil(givenName) ? '' : givenName;
    const lastNameParam = isEmpty(lastName) && isNil(lastName) ? '' : lastName;
    this.setState({
      fullName: `${firstName} ${lastNameParam}`,
    });
  }

  getUrl = () => {
    this.setState({
      url:
        'https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader5.com&amp;utm_campaign=download',
    });
  };

  handleMiddleName = (value) => {
    this.setState({
      middleName: value,
    });
  };

  handleLastName = (value) => {
    this.setState({
      lastName: value,
    });
  };

  handleMothersMaidenName = (value) => {
    this.setState({
      mothersMaidenName: value,
    });
  };

  handleAlias = (value) => {
    this.setState({
      alias: value,
    });
  };

  handleGender = (value) => {
    this.setState({ gender: value });
  };

  handleEmailAddress = (value) => {
    this.setState({
      emailAddress: value.target.value,
    });
  };

  handleBirthdate = (value) => {
    this.setState({
      birthdate: value,
    });
  };

  handlePhoneNumber = (value) => {
    this.setState({
      phoneNumber: value,
    });
  };

  handleCountry = (value) => {
    this.setState({
      //country: value,
      idCountry: value,
    });
  };

  handleFullAddress = (value) => {
    this.setState({ fullAddress: value });
  };

  handleInputPass = (value) => {
    this.setState({ inputPass: value });
  };

  handleInputPassNew = (value) => {
    this.setState({ inputPassNew: value });
  };

  handleInputPassConfirm = (value) => {
    this.setState({ inputPassConfirm: value });
  };

  updateDataProfile = async () => {
    const {
      username,
      idAccountType,
      accountType,
      idLeverage,
      leverage,
      createdAt,
      givenName,
      middleName,
      lastName,
      mothersMaidenName,
      idEmailAddress,
      emailAddress,
      birthdate,
      idPhoneNumber,
      phoneNumber,
      idCountry,
      country,
      idAddress,
      gender,
      fullAddress,
      digitalIdentity,
    } = this.state;
    const {
      dataProfile,
      updateAccountCustomer,
      setUserProfileData,
    } = this.props;
    const { idCompany, idCustomer } = dataProfile;
    const data = {
      idCompany,
      updatedByUser: dataProfile.idSystemUser,
      givenName: isEmpty(givenName) ? null : givenName,
      middleName: isEmpty(middleName) ? null : middleName,
      lastName: isEmpty(lastName) ? null : lastName,
      mothersMaidenName: isEmpty(mothersMaidenName) ? null : mothersMaidenName,
      idAccountType: isEmpty(idAccountType) ? null : idAccountType,
      idLeverage: isEmpty(idLeverage) ? null : idLeverage,
      birthdate:
        isEmpty(birthdate) || isNil(birthdate)
          ? null
          : moment(birthdate).format('YYYY-MM-DD'),
      idEmailAddress: isEmpty(idEmailAddress) ? null : idEmailAddress,
      emailAddress: isEmpty(emailAddress) ? null : emailAddress,
      idPhoneNumber: isEmpty(idPhoneNumber) ? null : idPhoneNumber,
      phoneNumber: isEmpty(phoneNumber) ? null : phoneNumber,
      idAddress: isEmpty(idAddress) ? null : idAddress,
      idCountry: isEmpty(idCountry) ? null : idCountry,
      country: isEmpty(country) ? null : country,
      fullAddress: isEmpty(fullAddress) ? null : fullAddress,
      /* alias: isEmpty(alias) ? null : alias, */
      gender: isEmpty(gender) ? null : gender,
      idScreenCode: null,
      idSection: null,
    };
    const firstName =
      isEmpty(data.givenName) && isNil(data.givenName) ? '' : data.givenName;
    const lastNameParam =
      isEmpty(data.lastName) && isNil(data.lastName) ? '' : data.lastName;
    const mothersMaidenNameParam =
      isEmpty(data.mothersMaidenName) && isNil(data.mothersMaidenName)
        ? ''
        : data.mothersMaidenName;
    const newDataProfile = {
      ...dataProfile,
      profileName: `${firstName} ${lastNameParam} ${mothersMaidenNameParam}`,
    };

    try {
      const response = await updateAccountCustomer(data, idCustomer);
      setUserProfileData(newDataProfile);
      this.getFullName(givenName, lastName);
      if (response.error === false) {
        this.openNotification('Datos actualizados', ALERT_TYPE.SUCCESS);
      }
    } catch (error) {
      this.openNotification(error.message, ALERT_TYPE.ERROR);
    }
  };

  cancelUpdatePassword = () => {
    this.setState({
      inputPass: '',
      inputPassNew: '',
      inputPassConfirm: '',
    });
  };

  updatePassword = () => {
    if (this.state.inputPassNew != this.state.inputPassConfirm) {
      this.setState({ errorConfirmPass: 'Las contraseñas no coinciden' });
    } else {
      this.setState({ errorConfirmPass: '' });
    }
  };

  downloadLink = () => {
    window.open(this.state.url);
  };

  toggleFormPassword = () => {
    this.setState({
      isOpenChangePass: !this.state.isOpenChangePass,
      inputPass: '',
      inputPassNew: '',
      inputPassConfirm: '',
    });
  };

  openNotification = (description, messageType) => {
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

  handleGivenName = (value) => {
    this.setState({
      givenName: value,
    });
  };

  async postGetAllCountriesCatalog() {
    const { postGetAllCountriesCatalog, dataProfile } = this.props;
    const { idCompany, idSystemUser } = dataProfile;
    const data = {
      idCompany,
      idSystemUser,
      type: '1',
    };
    const response = await postGetAllCountriesCatalog(data);
    this.setState({
      countryCatalog: response.result,
    });
  }

  togglelist(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const dateFormat = 'DD/MM/YYYY';
    const {
      username,
      accountType,
      leverage,
      createdAt,
      activeTab,
      givenName,
      middleName,
      lastName,
      mothersMaidenName,
      emailAddress,
      birthdate,
      phoneNumber,
      fullAddress,
      countryCatalog,
      idCountry,
      isGetData,
      fullName,
      gender,
      digitalIdentity,
    } = this.state;
    const { dataProfile, messages } = this.props;
    return (
      <CustomRow>
        <CustomCol xs="12">
          {/* Datos de la cuenta */}
          <h1>
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000004',
              '',
            )}
          </h1>
          <p>
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000006',
              '',
            )}{' '}
            <strong>{fullName}</strong>,{' '}
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000008',
              '',
            )}
            .
          </p>

          {/* Navs */}
          <Nav tabs>
            {/* <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  this.togglelist('1');
                }}
              >
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  'FRL0000000000009',
                  '',
                )}
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  this.togglelist('2');
                }}
              >
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  'FRL0000000000085',
                  '',
                )}
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  this.togglelist('3');
                }}
              >
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  'FRL0000000000027',
                  '',
                )}
              </NavLink>
            </NavItem> */}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="email-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000010',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="6">
                    <p className="form-control-static">
                      {isNil(username) ? '' : username}
                    </p>
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label>
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000012',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="6">
                    <p className="form-control-static">
                      {isNil(leverage)
                        ? ''
                        : this.messagesFunctions.getMessageFromListMessagesCode(
                            leverage,
                            '',
                          )}
                    </p>
                  </CustomCol>
                </FormGroup>

                <FormGroup row>
                  <CustomCol md="3">
                    <Label>
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000013',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="6">
                    <p className="form-control-static">
                      {isNil(createdAt) ? '' : createdAt}
                    </p>
                  </CustomCol>
                </FormGroup>
              </Form>
            </TabPane>

            <TabPane tabId="2">
              <CustomForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="text-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000014',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <CustomInput
                      isVisible
                      type="text"
                      id="name-input"
                      name="name-input"
                      className="inputBordered"
                      value={givenName}
                      toBlock={false}
                      disabled={false}
                      onChange={(event, value) => {
                        this.handleGivenName(value);
                      }}
                    />
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="text-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000015',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <CustomInput
                      isVisible
                      type="text"
                      id="name-input"
                      name="name-input"
                      className="inputBordered"
                      value={middleName}
                      toBlock={false}
                      disabled={false}
                      onChange={(event, value) => {
                        this.handleMiddleName(value);
                      }}
                    />
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="text-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000016',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <CustomInput
                      isVisible
                      type="text"
                      id="surname-input"
                      name="surname-input"
                      placeholder="Soria"
                      className="inputBordered"
                      value={lastName}
                      toBlock={false}
                      disabled={false}
                      onChange={(event, value) => {
                        this.handleLastName(value);
                      }}
                    />
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="text-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000017',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <CustomInput
                      isVisible
                      type="text"
                      id="surname-input"
                      name="surname-input"
                      placeholder="Soria"
                      className="inputBordered"
                      value={mothersMaidenName}
                      toBlock={false}
                      disabled={false}
                      onChange={(event, value) => {
                        this.handleMothersMaidenName(value);
                      }}
                    />
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="country-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000131',
                        'FRL0000000000131',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <CustomSelectOption
                      selected={''}
                      defaultValue={''}
                      value={isNil(gender) ? '' : gender}
                      classButtonDropDown=""
                      classDropdownToggle="btn-warning"
                      classIconDropdownToggle=" fa fa-check"
                      classDropdownItem="coinControl"
                      classInput="input_upload"
                      disabled={false}
                      data={genderCatalog}
                      onChange={(event, index, value, data) => {
                        this.setState({
                          gender: value,
                        });
                      }}
                      selectMessages={messages}
                    />
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="email-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000020',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <CustomInput
                      isVisible
                      type="email"
                      id="email-input"
                      name="email-input"
                      className="inputBordered"
                      value={emailAddress}
                      toBlock
                      disabled
                      onChange={(value) => {
                        this.handleEmailAddress(value);
                      }}
                    />
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="date-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000021',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <DatePicker
                      format={dateFormat}
                      locale={'esES'}
                      placeholder="dd/mm/aaaa"
                      datePickerClassName="input_date inputBordered"
                      className="input-align inputBordered"
                      value={birthdate}
                      onChange={(value) => {
                        this.handleBirthdate(value);
                      }}
                    />
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3" className="rsponsvCtrl_al">
                    <Label htmlFor="email-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000022',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <CustomInput
                      isVisible
                      type="phone"
                      id="phone-input"
                      name="phone-input"
                      placeholder="55 2330 3928"
                      className="inputBordered"
                      value={phoneNumber}
                      toBlock={false}
                      disabled={false}
                      onChange={(event, value) => {
                        this.handlePhoneNumber(value);
                      }}
                    />
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="country-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000023',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    {countryCatalog.length > 0 && isGetData === true && (
                      <CustomSelectOption
                        selected={idCountry}
                        defaultValue={idCountry}
                        value={idCountry}
                        classButtonDropDown=""
                        classDropdownToggle="btn-warning"
                        classIconDropdownToggle=" fa fa-check"
                        classDropdownItem="coinControl"
                        classInput="input_upload"
                        disabled={false}
                        data={countryCatalog} //data
                        onChange={(event, index, value, data) => {
                          this.handleCountry(value);
                        }}
                        selectMessages={messages}
                      />
                    )}
                  </CustomCol>
                </FormGroup>
                <FormGroup row>
                  <CustomCol md="3">
                    <Label htmlFor="email-input">
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000024',
                        '',
                      )}
                    </Label>
                  </CustomCol>
                  <CustomCol xs="12" md="4">
                    <CustomInput
                      isVisible
                      type="address"
                      id="address-input"
                      name="email-input"
                      placeholder=""
                      autoComplete="email"
                      className="inputBordered"
                      value={fullAddress}
                      toBlock={false}
                      disabled={false}
                      onChange={(event, value) => {
                        this.handleFullAddress(value);
                      }}
                    />
                  </CustomCol>
                </FormGroup>

                {/* Call to action siguiente */}
                <CustomRow>
                  <CustomCol md="3">
                    <CustomButton
                      label={this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000025',
                        '',
                      )}
                      //classIcon="fa fa-lock mr-1"
                      isVisible
                      type="submit"
                      size="md"
                      color="warning"
                      className="btn buttonControlCheck"
                      onClick={() => {
                        this.updateDataProfile();
                      }}
                    />
                  </CustomCol>
                  {isNil(digitalIdentity) === false &&
                  digitalIdentity === false ? (
                    <CustomCol xs="12" md="4">
                      <div className="mati-container">
                        <ReactMati
                          clientId="5d8ce4ea494013001b3fa84a"
                          country="mx"
                          product="kyc"
                          style="blue"
                        />
                      </div>
                    </CustomCol>
                  ) : null}
                </CustomRow>
              </CustomForm>
            </TabPane>

            <TabPane tabId="3">
              <h1>
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  'FRL0000000000028',
                  '',
                )}
              </h1>
              <p>
                {this.messagesFunctions.getMessageFromListMessagesCode(
                  'FRL0000000000029',
                  '',
                )}
              </p>
              <CustomButton
                label={this.messagesFunctions.getMessageFromListMessagesCode(
                  'FRL0000000000030',
                  '',
                )}
                classIcon="fa fa-download mr-1"
                isVisible
                type="submit"
                size="md"
                color="warning"
                className="mb-3 mb-sm-0"
                onClick={() => {
                  this.downloadLink();
                }}
              />
              <br></br>
            </TabPane>
          </TabContent>
        </CustomCol>
      </CustomRow>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectDataProfile(),
  messages: selectMessages(),
  idLanguage: selectIdLanguage(),
});
const mapDispatchToProps = (dispatch) => ({
  postGetAccountCustomer: (data) =>
    dispatch(actionsAlpha.postGetAccountCustomer(data)),
  updateAccountCustomer: (data, idCustomer) =>
    dispatch(actionsAlpha.updateAccountCustomer(data, idCustomer)),
  postGetAllCountriesCatalog: (data) =>
    dispatch(actionsAlpha.postGetAllCountriesCatalog(data)),
  setUserProfileData: (dataProfile) => dispatch(setProfileData(dataProfile)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabAccountData);
