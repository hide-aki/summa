import React, { Component, Fragment } from 'react';
import { notification } from 'antd';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';
import {
  Collapse,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  CardTitle,
  CardText,
} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { postEncryptTransaction } from 'utils/actions/reportsActions';
import {
  CustomButton,
  CustomCardBody,
  CustomCard,
  CustomCol,
  CustomInput,
  CustomRow,
  CustomCardHeader,
  ALERT_TYPE,
  HandlerErrorResponse,
} from '@pleedtech/pt-components';
import { API_CONSTANTS, PSP_DOMAIN, PORT } from 'utils/constants/apiConstants';

import { MessagesFunctions } from '@pleedtech/pt-components/dist';

import InputCurrency from './inputCurrency';

import {
  selectMessages,
  selectIdLanguage,
} from 'containers/languageProvider/selectors';

import alphaDepositActions from 'utils/actions/alphaDepositActions';
import { CustomSelectOption } from './customSelectOption';
import { showToastrMessage } from '../../../../utils/actions/toastrActions';
import { makeSelectDataProfile } from '../../../../utils/selectors/dataUserProfileSelectors';

import img2 from '../../../../assets/img/banks/paytogo.png';
import img3 from '../../../../assets/img/banks/ypc-2.png';

class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [true, false, false],
      amount: '',
      amountFormat: '',
      allAccount: [],
      idAccountSelected: '',
      isDisabled: false,
      referencePSP: '',
      amountPSP: '',
      amountPSPFormat: '',
      paymentMethod: [],
      accountInfo: {},
      showLoader: false,
      blockButton: false,
      showPaymentForm: true,
      iframeHeight: '0px',
      iframeSrc: '',
    };
    this.messagesFunctions = new MessagesFunctions(props.messages);
    this.handlerErrorResponse = new HandlerErrorResponse();
    this.pspApiKey = '7304B8E9-B882-4575-BEE4-36199B24E9FB';
  }

  async componentWillMount() {
    await this.postPaymentType();
    this.bindEvent(window, 'message', (e) => {
      this.responsePSP(e);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { idLanguage } = this.props;
    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(nextProps.messages);
    }
    return true;
  }

  showToastrMessage = (error, alertType = ALERT_TYPE.ERROR) => {
    const { showToastrMessage } = this.props;
    const messageCode = this.handlerErrorResponse.getMessageErrorResponse(
      error,
    );

    if (isEmpty(messageCode) === false) {
      showToastrMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        alertType,
      );
    } else if (isString(error) && isEmpty(error) === false) {
      showToastrMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(error, error),
        alertType,
      );
    }
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

  getAllAccounts = async (idPaymentType) => {
    const { dataProfile, postGetAllAccount } = this.props;
    const { idCompany } = dataProfile;
    const data = {
      idCompany,
      idSystemUser: dataProfile.idSystemUser,
      idLanguage: dataProfile.idSelectedLanguage,
      type: 3,
      idPaymentType,
    };
    try {
      const response = await postGetAllAccount(data);
      let allAccount = [];
      if (
        isEmpty(response.result) === false &&
        isNil(response.result) === false
      ) {
        allAccount = response.result;
      }

      this.setState({ allAccount, accountInfo: {} });
    } catch (error) {
      this.showToastrMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          error.messageCode,
          '',
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  toggleAccordion = (tab) => {
    const { accordion } = this.state;
    const prevState = accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
    this.scrollAnchors();
  };

  handleAmount = (value) => {
    const val = value.value.replace(/,/g, '');
    this.setState({ amount: val, amountFormat: value.value });
  };

  handleAmountPSP = (value) => {
    const val = value.value.replace(/,/g, '');
    this.setState({ amountPSP: val, amountPSPFormat: value.value });
  };

  handleReferencePSP = (value) => {
    this.setState({ referencePSP: value });
  };

  responsePSP = async (e) => {
    const { amountPSP } = this.state;
    const { onSearch } = this.props;
    const response = e.data;
    if (isString(response)) {
      try {
        let isStringObject = false;
        for (let index = 0; index < response.length; index += 1) {
          const element = response[0];

          if (element == '{') {
            isStringObject = true;
            break;
          }
        }
        if (isStringObject === true) {
          const parsedResponse = JSON.parse(response);

          if (
            parsedResponse.display_message !== 'CANCEL' &&
            isNil(parsedResponse.successful) === false &&
            parsedResponse.successful !== 'false' &&
            parsedResponse.successful !== 'undefined' &&
            isEmpty(amountPSP) === false
          ) {
            await this.setState({
              accountSelected: null,
              paymentMethodSelected: 3,
            });
            await this.createTransaction(amountPSP);
            this.setState({
              iframeHeight: '0px',
              iframeSrc: '',
              showPaymentForm: true,
            });
            onSearch();
          }

          if (parsedResponse.display_message == 'CANCEL') {
            this.setState({
              iframeHeight: '0px',
              iframeSrc: '',
              showPaymentForm: true,
            });
          }
        }
      } catch (error) {
        throw error;
      }
    }
  };

  addTransaction = async () => {
    const { amount } = this.state;
    await this.setState({ isDisabled: true });
    const idTransaction = await this.createTransaction(amount);

    return idTransaction;
  };

  createTransaction = async (amount) => {
    const { dataProfile, postTransaction } = this.props;
    const { accountSelected, paymentMethodSelected } = this.state;
    const { idCustomer, idCompany } = dataProfile;
    const data = {
      idCustomer,
      idTransactionCategory: 1,
      idTransactionType: 1,
      idPaymentType: paymentMethodSelected,
      amount,
      idCurrency: null,
      idAccount: accountSelected,
      updatedByUser: dataProfile.idSystemUser,
      idCompany,
      idScreenCode: null,
      idSection: null,
    };
    try {
      let generatedTransaction = '';

      const response = await postTransaction(data);
      this.setState({
        isDisabled: false,
        amount: '',
        amountFormat: '',
        amountPSP: '',
        amountPSPFormat: '',
        referencePSP: '',
      });

      if (
        isNil(response.result) === false &&
        isEmpty(response.result) === false
      ) {
        generatedTransaction = response.result.idTransaction;
      }

      return generatedTransaction;
    } catch (error) {
      this.setState({ isDisabled: false });
      this.showToastrMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          error.messageCode,
          '',
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  pspPay = async () => {
    const { referencePSP, amountPSP } = this.state;
    if (isEmpty(referencePSP) === false && isEmpty(amountPSP) === false) {
      const pspData = {
        IdLoingKey: this.pspApiKey,
        Amount: amountPSP,
        Reference: referencePSP,
      };
      const pspStringData = JSON.stringify(pspData);
      const pspEncodedData = window.btoa(pspStringData);
      const pspURL = `${API_CONSTANTS.PSP.PSPFRAME}${pspEncodedData}`;
      await this.setState({
        iframeSrc: pspURL,
        iframeHeight: '800px',
        showPaymentForm: false,
      });
    } else {
      this.showToastrMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000123',
          '',
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  bindEvent = (element, eventName, eventHandler) => {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent(`on${eventName}`, eventHandler);
    }
  };

  scrollAnchors = () => {
    window.scrollBy({ top: -500, left: 0, behavior: 'smooth' });
  };

  postPaymentType = async () => {
    try {
      const { postPaymentType } = this.props;
      const data = {
        type: 3,
        idTransactionCategory: null,
        idTransactionType: null,
      };
      let paymentMethod = {};
      const response = await postPaymentType(data);
      if (
        isNil(response.result) === false &&
        isEmpty(response.result) === false
      ) {
        paymentMethod = response.result;
      }

      this.setState({
        paymentMethod,
      });
    } catch (error) {
      this.showToastrMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          error.messageCode,
          '',
        ),
        ALERT_TYPE.ERROR,
      );
    }
  };

  postEncryptTransaction = async (data) => {
    try {
      const { postEncryptTransaction } = this.props;
      const response = await postEncryptTransaction(data);
      if (
        isNil(response.result) === false &&
        isEmpty(response.result) === false
      ) {
        const { apiTransactionInfo } = response.result;
        this.downloadPdf(`${PSP_DOMAIN}${PORT.YPC}/${apiTransactionInfo}`);
      }
    } catch (error) {
      this.showToastrMessage(error, ALERT_TYPE.ERROR);
      this.setState({
        blockButton: false,
        showLoader: false,
      });
    }
  };

  downloadPdf = async (downloadUrl) => {
    const label = this.messagesFunctions.getMessageFromListMessagesCode(
      'FRL0000000000141',
      'FRL0000000000141',
    );
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.className = 'download';
      link.download = `${label}.${'pdf'}`;
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
      this.setState({
        blockButton: false,
        showLoader: false,
      });
    } catch (error) {
      this.showToastrMessage(error, ALERT_TYPE.ERROR);
      this.setState({
        blockButton: false,
        showLoader: false,
      });
    }
  };

  onClickGenerateTicket = async () => {
    try {
      const { accountSelected } = this.state;
      const { idLanguage, onSearch } = this.props;

      const idTransactionCL = await this.addTransaction();

      await this.postEncryptTransaction({
        idAccount: accountSelected,
        idLanguage,
        idTransactionCL,
      });
      onSearch();
    } catch (error) {
      this.setState({
        blockButton: false,
        showLoader: false,
      });
      this.showToastrMessage(error, ALERT_TYPE.ERROR);
    }
  };

  validateRequiredFields = () => {
    const { accountSelected, amount, paymentMethodSelected } = this.state;
    const { showToastrMessage } = this.props;
    let isOkToAdd = true;
    let amountNumber;
    const maxAmount = 999999999999999;

    if (isEmpty(amount) === false) {
      amountNumber = Number(amount);
    } else {
      amountNumber = amount;
    }
    if (isNumber(amountNumber) && amountNumber <= 0) {
      this.openNotification(
        this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000063',
          '',
        ),
        ALERT_TYPE.INFO,
      );
      isOkToAdd = false;
    }
    if (isNumber(amountNumber) && amountNumber >= maxAmount) {
      this.openNotification(
        this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000064',
          '',
        ),
        ALERT_TYPE.INFO,
      );
      isOkToAdd = false;
    }
    if (
      isNumber(amountNumber) &&
      amountNumber < maxAmount &&
      amountNumber > 0
    ) {
      const arrayDigits = amountNumber.toString().split('.');
      if (arrayDigits.length > 1 && arrayDigits[1].length > 2) {
        this.openNotification(
          this.messagesFunctions.getMessageFromListMessagesCode(
            'FRL0000000000065',
            '',
          ),
          ALERT_TYPE.INFO,
        );
        isOkToAdd = false;
      }
    }
    if (isEmpty(amount)) {
      this.openNotification(
        this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000066',
          '',
        ),
        ALERT_TYPE.INFO,
      );
      isOkToAdd = false;
    }
    if (isNil(accountSelected) || isEmpty(accountSelected)) {
      this.openNotification(
        this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000067',
          'FRL0000000000067',
        ),
        ALERT_TYPE.INFO,
      );
      isOkToAdd = false;
    }
    if (isNil(paymentMethodSelected) || isEmpty(paymentMethodSelected)) {
      this.showToastrMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          'FRL0000000000140',
          'FRL0000000000140',
        ),
        ALERT_TYPE.INFO,
      );
      isOkToAdd = false;
    }

    return isOkToAdd;
  };

  render() {
    const {
      amountFormat,
      allAccount,
      isDisabled,
      accordion,
      amountPSPFormat,
      referencePSP,
      paymentMethod,
      accountInfo,
      paymentMethodSelected,
      accountSelected,
      showLoader,
      blockButton,
      showPaymentForm,
      iframeHeight,
      iframeSrc,
    } = this.state;

    return (
      <CustomRow>
        <CustomCol xs="12">
          <h1>
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000055',
              '',
            )}
          </h1>
        </CustomCol>
        <CustomCol xs="12" md="9">
          <p>
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000056',
              '',
            )}{' '}
            <strong>
              {this.messagesFunctions.getMessageFromListMessagesCode(
                'FRL0000000000057',
                '',
              )}
            </strong>{' '}
            {this.messagesFunctions.getMessageFromListMessagesCode(
              'FRL0000000000058',
              '',
            )}
          </p>
        </CustomCol>

        <CustomCol xs="12">
          <div id="accordion" className="mb-5">
            <CustomCard>
              <CustomCardHeader id="headingTwo">
                <CustomButton
                  label={this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000059',
                    '',
                  )}
                  classIcon="fa fa-bank btn-md mt-0 mr-1 yellow"
                  color="link"
                  isVisible
                  block
                  className="text-left m-0 p-0"
                  onClick={() => this.toggleAccordion(0)}
                  aria-expanded={accordion[0]}
                  aria-controls="collapseTwo"
                />
              </CustomCardHeader>
              <Collapse
                isOpen={accordion[0]}
                data-parent="#accordion"
                id="collapseTwo"
              >
                <CustomCardBody>
                  <CustomCol xs="12" md="11">
                    <p>
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000060',
                        '',
                      )}
                    </p>
                  </CustomCol>
                  <CustomCard className="card-ficha-pago">
                    <Container fluid>
                      <CustomRow>
                        <div className="col-md-5">
                          <div className="seerg">
                            <CardTitle>
                              {this.messagesFunctions.getMessageFromListMessagesCode(
                                'FRL0000000000061',
                                '',
                              )}
                            </CardTitle>
                            <InputGroup>
                              <InputCurrency
                                value={amountFormat}
                                onChange={(value) => this.handleAmount(value)}
                                className="text-right form-control"
                                prefix=""
                                placeholder="0.00"
                                maxlength="16"
                              />
                              <InputGroupAddon addonType="append">
                                <InputGroupText>MXN</InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </div>
                        </div>
                      </CustomRow>
                      <CustomRow>
                        <CustomCol md="4" className="CustomCol-card">
                          <CardTitle>
                            {this.messagesFunctions.getMessageFromListMessagesCode(
                              'FRL0000000000142',
                              'FRL0000000000142',
                            )}
                          </CardTitle>
                          <CustomSelectOption
                            selected=""
                            defaultValue=""
                            value={
                              isNil(paymentMethodSelected)
                                ? isNil(paymentMethod[0]) === false
                                  ? paymentMethod[0].id
                                  : ''
                                : paymentMethodSelected
                            }
                            classButtonDropDown=""
                            classDropdownToggle="btn-warning"
                            classIconDropdownToggle=" fa fa-check"
                            classDropdownItem="coinControl"
                            classInput="input_upload"
                            disabled={false}
                            data={paymentMethod}
                            onChange={(event, index, value, data) => {
                              if (value !== '0' && isNil(value) === false) {
                                this.getAllAccounts(value);
                                this.setState({
                                  paymentMethodSelected: value,
                                  accountSelected: null,
                                  accountInfo: {},
                                });
                              }
                            }}
                            selectMessages={this.props.messages}
                          />
                        </CustomCol>

                        <CustomCol md="4" className="CustomCol-card">
                          <CardTitle>
                            {this.messagesFunctions.getMessageFromListMessagesCode(
                              'FRL0000000000143',
                              'FRL0000000000143',
                            )}
                          </CardTitle>
                          <CustomSelectOption
                            selected=""
                            defaultValue=""
                            value={
                              isNil(accountSelected)
                                ? isNil(allAccount[0]) === false
                                  ? allAccount[0].id
                                  : ''
                                : accountSelected
                            }
                            classButtonDropDown=""
                            classDropdownToggle="btn-warning"
                            classIconDropdownToggle=" fa fa-check"
                            classDropdownItem="coinControl"
                            classInput="input_upload"
                            disabled={false}
                            data={allAccount}
                            onChange={(event, index, value, data) => {
                              let accountSelected = null;
                              let accountInfo = {};

                              if (
                                value !==
                                  '11111111-1111-1111-1111-111111111111' &&
                                isNil(value) === false
                              ) {
                                accountSelected = value;
                                accountInfo = data.value;
                              }
                              this.setState({
                                accountSelected,
                                accountInfo,
                              });
                            }}
                            selectMessages={this.props.messages}
                          />
                        </CustomCol>
                      </CustomRow>
                      <CustomRow>
                        <CustomCol md="4" className="CustomCol-card">
                          <Fragment>
                            <CardTitle>
                              {''}
                              {this.messagesFunctions.getMessageFromListMessagesCode(
                                'FRL0000000000087',
                                'FRL0000000000087',
                              )}
                            </CardTitle>
                            <CardText>
                              {isEmpty(accountInfo) ? '-' : accountInfo.account}
                              {isEmpty(accountInfo)
                                ? '-'
                                : accountInfo.beneficiary}
                            </CardText>
                          </Fragment>
                        </CustomCol>
                        <CustomCol md="4" className="CustomCol-card">
                          <Fragment>
                            <CardTitle>
                              {''}
                              {this.messagesFunctions.getMessageFromListMessagesCode(
                                'FRL0000000000088',
                                'FRL0000000000088',
                              )}
                            </CardTitle>
                            <CardText>
                              {isEmpty(accountInfo) ? '-' : accountInfo.account}
                            </CardText>
                          </Fragment>
                        </CustomCol>
                      </CustomRow>
                      <CustomRow>
                        <CustomCol md="4" className="CustomCol-card">
                          <Fragment>
                            <CardTitle>
                              {''}
                              {this.messagesFunctions.getMessageFromListMessagesCode(
                                'FRL0000000000089',
                                'FRL0000000000089',
                              )}
                            </CardTitle>
                            <CardText>
                              {isEmpty(accountInfo) ? '-' : accountInfo.address}
                            </CardText>
                          </Fragment>
                        </CustomCol>
                        {isNil(paymentMethodSelected) === false &&
                        paymentMethodSelected === '5' ? (
                          <CustomCol md="4" className="CustomCol-card">
                            <Fragment>
                              <CardTitle>
                                {''}
                                {this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000146',
                                  'FRL0000000000146',
                                )}
                              </CardTitle>
                              <CardText>
                                {isEmpty(accountInfo)
                                  ? '-'
                                  : accountInfo.accountNumber}
                              </CardText>
                            </Fragment>
                          </CustomCol>
                        ) : null}
                      </CustomRow>
                      <CustomRow>
                        {isNil(paymentMethodSelected) === false &&
                        paymentMethodSelected === '6' &&
                        isEmpty(accountInfo) === false &&
                        isEmpty(accountInfo.swift) === false ? (
                          <CustomCol md="4" className="CustomCol-card">
                            <Fragment>
                              <CardTitle>
                                {''}
                                {this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000090',
                                  'FRL0000000000090',
                                )}
                              </CardTitle>
                              <CardText>
                                {isEmpty(accountInfo) ? '-' : accountInfo.swift}
                              </CardText>
                            </Fragment>
                          </CustomCol>
                        ) : null}
                        {isNil(paymentMethodSelected) === false &&
                        paymentMethodSelected === '5' &&
                        isEmpty(accountInfo) === false &&
                        isEmpty(accountInfo.clabe) === false ? (
                          <CustomCol md="4" className="CustomCol-card">
                            <Fragment>
                              <CardTitle>
                                {''}
                                {this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000145',
                                  'FRL0000000000145',
                                )}
                              </CardTitle>
                              <CardText>
                                {isEmpty(accountInfo) ? '-' : accountInfo.clabe}
                              </CardText>
                            </Fragment>
                          </CustomCol>
                        ) : null}
                        {isNil(paymentMethodSelected) === false &&
                        paymentMethodSelected === '6' &&
                        isEmpty(accountInfo) === false &&
                        isEmpty(accountInfo.iban) === false ? (
                          <CustomCol md="4" className="CustomCol-card">
                            <Fragment>
                              <CardTitle>
                                {''}
                                {this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000091',
                                  'FRL0000000000091',
                                )}
                              </CardTitle>
                              <CardText>
                                {isEmpty(accountInfo) ? '-' : accountInfo.iban}
                              </CardText>
                            </Fragment>
                          </CustomCol>
                        ) : null}
                      </CustomRow>
                    </Container>
                  </CustomCard>
                  <div className="row">
                    <div className="col-md-12 text-right">
                      <div>
                        {showLoader === true ? (
                          <div className="sk-fading-circle">
                            <div className="sk-circle1 sk-circle" />
                            <div className="sk-circle2 sk-circle" />
                            <div className="sk-circle3 sk-circle" />
                            <div className="sk-circle4 sk-circle" />
                            <div className="sk-circle5 sk-circle" />
                            <div className="sk-circle6 sk-circle" />
                            <div className="sk-circle7 sk-circle" />
                            <div className="sk-circle8 sk-circle" />
                            <div className="sk-circle9 sk-circle" />
                            <div className="sk-circle10 sk-circle" />
                            <div className="sk-circle11 sk-circle" />
                            <div className="sk-circle12 sk-circle" />
                          </div>
                        ) : null}

                        <CustomButton
                          label={this.messagesFunctions.getMessageFromListMessagesCode(
                            'FRL0000000000062',
                            '',
                          )}
                          classIcon=""
                          isVisible
                          type="submit"
                          size="md"
                          color="warning"
                          className="btn buttonControlCheck"
                          toBlock={blockButton}
                          disabled={blockButton}
                          onClick={async () => {
                            if (this.validateRequiredFields() === true) {
                              this.setState({
                                blockButton: true,
                                showLoader: true,
                              });
                              await this.onClickGenerateTicket();
                              this.setState({
                                paymentMethodSelected,
                                accountSelected: null,
                                accountInfo: {},
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CustomCardBody>
              </Collapse>
            </CustomCard>
            <CustomCard>
              <CustomCardHeader id="headingThree">
                <CustomButton
                  label={this.messagesFunctions.getMessageFromListMessagesCode(
                    'FRL0000000000114',
                    '',
                  )}
                  classIcon="fa fa-credit-card btn-md mt-0 mr-1 yellow"
                  color="link"
                  isVisible
                  block
                  className="text-left m-0 p-0"
                  onClick={() => this.toggleAccordion(2)}
                  aria-expanded={accordion[2]}
                  aria-controls="collapseThree"
                />
              </CustomCardHeader>
              <Collapse
                isOpen={accordion[2]}
                data-parent="#accordion"
                id="collapseThree"
              >
                <CustomCardBody>
                  <CustomCol xs="12" md="11">
                    <p>
                      {this.messagesFunctions.getMessageFromListMessagesCode(
                        'FRL0000000000144',
                        'FRL0000000000144',
                      )}
                    </p>
                  </CustomCol>
                  <div className="row">
                    {showPaymentForm === true ? (
                      <div className="col-md-4">
                        <div className="row" style={{ marginBottom: '15px' }}>
                          <div
                            className="col-md-12"
                            style={{ marginBottom: '15px' }}
                          >
                            <div className="seerg">
                              <CardTitle>
                                {this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000061',
                                  '',
                                )}
                              </CardTitle>
                              <InputGroup>
                                <InputCurrency
                                  value={amountPSPFormat}
                                  onChange={(value) =>
                                    this.handleAmountPSP(value)
                                  }
                                  className="text-right form-control"
                                  prefix=""
                                  placeholder="0.00"
                                  maxlength="16"
                                />
                                <InputGroupAddon addonType="append">
                                  <InputGroupText>MXN</InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="seerg">
                              <CardTitle>
                                {this.messagesFunctions.getMessageFromListMessagesCode(
                                  'FRL0000000000115',
                                  '',
                                )}
                              </CardTitle>
                              <InputGroup>
                                <CustomInput
                                  isVisible
                                  type="text"
                                  id="input3-group1"
                                  name="input3-group1"
                                  placeholder=""
                                  value={referencePSP}
                                  toBlock={false}
                                  disabled={false}
                                  onChange={(event, value) => {
                                    this.handleReferencePSP(value);
                                  }}
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                        <div className="btn-pago">
                          <CustomButton
                            label="Siguiente"
                            classIcon=""
                            isVisible
                            type="submit"
                            size="md"
                            color="warning"
                            className="btn buttonControlCheck"
                            toBlock={blockButton}
                            disabled={blockButton}
                            onClick={async () => {
                              this.pspPay();
                            }}
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="col-md-6">
                      <iframe
                        id="pspFrame"
                        src={iframeSrc}
                        title="myiFrame"
                        scrolling="no"
                        frameBorder="0"
                        marginHeight="0px"
                        marginWidth="0px"
                        height={iframeHeight}
                        width="480px"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </CustomCardBody>
              </Collapse>
            </CustomCard>
          </div>
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
  postGetAllAccount: (data) =>
    dispatch(alphaDepositActions.postGetAllAccount(data)),
  postTransaction: (data) =>
    dispatch(alphaDepositActions.postTransaction(data)),
  postPaymentType: (data) =>
    dispatch(alphaDepositActions.postPaymentType(data)),
  showToastrMessage: (message, messageType) =>
    dispatch(showToastrMessage(message, messageType)),
  postEncryptTransaction: (data) => dispatch(postEncryptTransaction(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentMethods);
