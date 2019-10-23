import React, { Component } from 'react';
import { connect } from 'react-redux';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import {
  CustomCardHeader,
  CustomCard,
  CustomRow,
  CustomCol,
  CustomCardBody,
  MessagesFunctions,
} from '@pleedtech/pt-components';
import { FormGroup, CardFooter } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { CustomAppSwitch } from './customAppSwitch';
import {
  selectMessages,
  selectIdLanguage,
} from '../../containers/languageProvider/selectors';

const defaultState = {
  checked: false,
  checkedConfirmation: false,
  checkedReject: false,
  initialTransactionEmpty: false,
};
class CustomCardConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.selectMessages =
      isNil(props.selectMessages) === false ? props.selectMessages : null;
    this.messagesFunctions = new MessagesFunctions(this.selectMessages);
  }

  shouldComponentUpdate(nextProps) {
    const { initialTransaction, idLanguage, selectMessages } = this.props;
    if (nextProps.initialTransaction !== initialTransaction) {
      if (
        isNil(nextProps.initialTransaction) === false &&
        isEmpty(nextProps.initialTransaction) === false &&
        isNil(nextProps.initialTransaction.isConfirmed) === false
      ) {
        if (nextProps.initialTransaction.isConfirmed === true) {
          this.handlerOnCheck(nextProps.initialTransaction.isConfirmed);
          this.setState({
            checkedConfirmation: nextProps.initialTransaction.isConfirmed,
            initialTransactionEmpty: true,
          });
        }
      }

      if (
        isNil(nextProps.initialTransaction) === false &&
        isEmpty(nextProps.initialTransaction) === false &&
        isNil(nextProps.initialTransaction.isDeclined) === false
      ) {
        if (nextProps.initialTransaction.isDeclined === true) {
          this.handlerOnCheckReject(nextProps.initialTransaction.isDeclined);
          this.setState({
            checkedReject: nextProps.initialTransaction.isDeclined,
            initialTransactionEmpty: true,
          });
        }
      }
    }
    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(selectMessages);
    }
    return true;
  }

  handlerOnCheck = async (checked) => {
    let isConfirmedDisabled;
    let isRejectDisable;
    let isConfirmed;
    let isRejected;
    if (checked === false) {
      isConfirmedDisabled = false;
      isConfirmed = false;
      isRejectDisable = false;
      isRejected = false;
    } else if (checked === true) {
      isConfirmedDisabled = false;
      isConfirmed = true;
      isRejectDisable = true;
      isRejected = false;
    }
    this.setState({
      isConfirmedDisabled,
      isConfirmed,
      isRejectDisable,
      isRejected,
    });
    this.props.handleConfirmedByP2GOUser(checked);
  };

  handlerOnCheckReject = async (checked) => {
    let isConfirmedDisabled;
    let isRejectDisable;
    let isConfirmed;
    let isRejected;
    if (checked === false) {
      isConfirmedDisabled = false;
      isConfirmed = false;
      isRejectDisable = false;
      isRejected = false;
    } else if (checked === true) {
      isConfirmedDisabled = true;
      isConfirmed = false;
      isRejectDisable = false;
      isRejected = true;
    }

    this.setState({
      isConfirmedDisabled,
      isConfirmed,
      isRejectDisable,
      isRejected,
    });
    this.props.handlerOnCheckReject(checked);
  };

  replacePropertyValue = (propertyValue) => {
    try {
      let result = propertyValue;
      if (isNil(propertyValue) === false) {
        result = propertyValue.match(/\[{(.*?)}\]/g).map((val) => {
          propertyValue = propertyValue.replace(
            val,
            this.handlerMessageCode(val.replace('[{', '').replace('}]', '')),
          );
        });
      }

      return propertyValue;
    } catch (e) {}
  };

  handlerMessageCode = (code) => {
    let value = '';
    if (code !== '') {
      value = this.messagesFunctions.getMessageFromListMessagesCode(code, code);
    }
    return value;
  };

  render() {
    let component = <div />;
    const {
      toBlockConfirmationToggle,
      isVisibleTitleSection,
      isVisibleQuestion,
      isVisibleConfirmedBy,
      isVisibleDate,
      isVisibleHour,
      isVisibleToggleCheck,
      isVisible,
      listComponentsHandler,
      constantConfirmation,
      componentsMapConfirmation,
      messagesFunctions,
      initialTransaction,
      title,
      subTitle,
      confirmedBy,
      labelDate,
      labelHour,
      isVisibleRejectTransaction,
      isVisibleToggleCheckReject,
      titleRejectTransaction,
      toBlockRejectToggle,
      labelRejectedBy,
    } = this.props;

    const {
      isConfirmed,
      isRejected,
      isConfirmedDisabled,
      isRejectDisable,
      checkedConfirmation,
      checkedReject,
      initialTransactionEmpty,
    } = this.state;

    if (isVisible === true) {
      component = (
        <CustomCard>
          <CustomCardHeader className="DarkHeader">
            <strong className="headerTittle">
              {' '}
              <i className="fa fa-eye headerIcon" />{' '}
              <span className="headerTittle">
                {isVisibleTitleSection ? title : ''}
              </span>{' '}
            </strong>
          </CustomCardHeader>
          <CustomCardBody className="CbodyControl">
            <CustomRow />

            <CustomRow>
              <CustomCol sm="6">
                <FormGroup>
                  <small className="subsectionName2">
                    {isVisibleQuestion ? subTitle : ''}
                  </small>
                </FormGroup>
              </CustomCol>
              <CustomCol sm="6">
                <FormGroup>
                  <div className="uploadControl">
                    <CustomAppSwitch
                      toBlock={
                        isNil(isConfirmedDisabled)
                          ? toBlockConfirmationToggle
                          : isConfirmedDisabled
                      }
                      checked={
                        isNil(isConfirmed)
                          ? isNil(initialTransaction.isConfirmed) === false &&
                            isBoolean(initialTransaction.isConfirmed)
                            ? initialTransaction.isConfirmed
                            : false
                          : isConfirmed
                      }
                      className="mx-1"
                      variant="3d"
                      color="success"
                      label
                      dataOn={'\u2713'}
                      dataOff={'\u2715'}
                      isVisible={isVisibleToggleCheck}
                      onChange={(event, checked) => {}}
                      onClick={(event, checked) => {
                        if (toBlockConfirmationToggle === false) {
                          this.handlerOnCheck(checked);
                        }
                      }}
                    />
                  </div>
                </FormGroup>
              </CustomCol>
            </CustomRow>
            {isConfirmed === true ? (
              <CustomRow>
                <CustomCol>
                  <h6 className="confirmationControl">
                    <span className="spanControl">
                      {isConfirmed ? confirmedBy : ''}
                    </span>
                    {isEmpty(initialTransaction) === false &&
                    isNil(initialTransaction.userName) === false &&
                    checkedReject === false &&
                    initialTransactionEmpty === true
                      ? initialTransaction.userName
                      : ' -'}
                  </h6>
                  <h6 className="confirmationControl">
                    <span className="spanControl">
                      {isVisibleDate ? labelDate : ''}
                    </span>{' '}
                    {isEmpty(initialTransaction) === false &&
                    isNil(initialTransaction.createdDate) === false &&
                    checkedReject === false &&
                    initialTransactionEmpty === true
                      ? this.replacePropertyValue(
                          initialTransaction.createdDate,
                        )
                      : ' -'}
                  </h6>
                  <h6 className="confirmationControl">
                    <span className="spanControl">
                      {isVisibleHour ? labelHour : ''}
                    </span>{' '}
                    {isEmpty(initialTransaction) === false &&
                    isNil(initialTransaction.createdTime) === false &&
                    checkedReject === false &&
                    initialTransactionEmpty === true
                      ? initialTransaction.createdTime
                      : ' -'}
                  </h6>
                </CustomCol>
              </CustomRow>
            ) : (
              ''
            )}
            {isRejected === true ? (
              <CustomRow>
                <CustomCol>
                  <h6 className="confirmationControl">
                    <span className="spanControlCancel">
                      {isRejected ? labelRejectedBy : ''}
                    </span>
                    {isEmpty(initialTransaction) === false &&
                    isNil(initialTransaction.userNameDeclined) === false &&
                    checkedConfirmation === false &&
                    initialTransactionEmpty === true
                      ? initialTransaction.userNameDeclined
                      : ' -'}
                  </h6>
                  <h6 className="confirmationControl">
                    <span className="spanControlCancel">
                      {isVisibleDate ? labelDate : ''}
                    </span>{' '}
                    {isEmpty(initialTransaction) === false &&
                    isNil(initialTransaction.declinedDate) === false &&
                    checkedConfirmation === false &&
                    initialTransactionEmpty === true
                      ? this.replacePropertyValue(
                          initialTransaction.declinedDate,
                        )
                      : ' -'}
                  </h6>
                  <h6 className="confirmationControl">
                    <span className="spanControlCancel">
                      {isVisibleHour ? labelHour : ''}
                    </span>{' '}
                    {isEmpty(initialTransaction) === false &&
                    isNil(initialTransaction.declinedTime) === false &&
                    checkedConfirmation === false &&
                    initialTransactionEmpty === true
                      ? initialTransaction.declinedTime
                      : ' -'}
                  </h6>
                </CustomCol>
              </CustomRow>
            ) : (
              ''
            )}
          </CustomCardBody>
          {isVisibleRejectTransaction && (
            <CardFooter>
              <CustomRow>
                <CustomCol sm="6">
                  <FormGroup>
                    <small className="subsectionName2">
                      {titleRejectTransaction}
                    </small>
                  </FormGroup>
                </CustomCol>
                <CustomCol sm="6">
                  <FormGroup>
                    <div className="uploadControl">
                      <CustomAppSwitch
                        toBlock={
                          isNil(isRejectDisable)
                            ? toBlockRejectToggle
                            : isRejectDisable
                        }
                        checked={
                          isNil(isRejected)
                            ? isNil(initialTransaction.isDeclined) === false &&
                              isBoolean(initialTransaction.isDeclined)
                              ? initialTransaction.isDeclined
                              : false
                            : isRejected
                        }
                        className="mx-1"
                        variant="3d"
                        classNameLabel="switch switch-pill switch-label switch-danger"
                        label
                        dataOn={'\u2713'}
                        dataOff={'\u2715'}
                        isVisible
                        onChange={(event, checked) => {}}
                        onClick={(event, checked) => {
                          if (toBlockRejectToggle === false) {
                            this.handlerOnCheckReject(checked);
                          }
                        }}
                      />
                    </div>
                  </FormGroup>
                </CustomCol>
              </CustomRow>
            </CardFooter>
          )}
        </CustomCard>
      );
    }

    return component;
  }
}

const mapStateToProps = createStructuredSelector({
  selectMessages: selectMessages(),
  idLanguage: selectIdLanguage(),
});

export default connect(mapStateToProps)(CustomCardConfirmation);
