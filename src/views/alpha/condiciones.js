import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { notification } from 'antd';
import {
  CustomButton,
  CustomCol,
  CustomRow,
  MessagesFunctions,
  ALERT_TYPE,
} from '@pleedtech/pt-components';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import {
  postAcceptTerms,
  getProfileBySystemUser,
  getAcceptTermsAndConditions,
} from 'utils/actions/systemConfigurationsActions';
import { showToastrMessage } from 'utils/actions/toastrActions';

import { makeSelectDataProfile } from 'utils/selectors/dataUserProfileSelectors';
import GLOBAL_CONSTANTS from 'utils/constants/globalConstants';
import {
  selectMessages,
  selectIdLanguage,
} from 'containers/languageProvider/selectors';
import { setProfileData } from 'utils/actions/userProfileActions';

class Condiciones extends Component {
  constructor(props) {
    super(props);
    this.messagesFunctions = new MessagesFunctions(props.messages);
    this.state = { idTermsConditions: '', termsConditions: '' };
  }

  componentDidMount = () => {
    this.handlerGetTermsAndConditions();
  };

  shouldComponentUpdate(nextProps) {
    const { idLanguage } = this.props;
    if (idLanguage !== nextProps.idLanguage) {
      this.idLanguage = nextProps.idLanguage;
      this.messagesFunctions = new MessagesFunctions(nextProps.messages);
    }
    return true;
  }

  onClickAcceptTerms = async (id) => {
    const { history, postAcceptTerms } = this.props;
    try {
      const response = await postAcceptTerms({
        type: 1,
        idTermsConditions: id,
      });
      this.alfaAuthUser();
    } catch (error) {
      this.showToastrMessage(error);
    }
  };

  handlerGetTermsAndConditions = async () => {
    const { getAcceptTermsAndConditions } = this.props;
    try {
      const response = await getAcceptTermsAndConditions({ type: 1 });
      console.log('response', response);
      const responseResult =
        isEmpty(response.result) === false &&
        isNil(response.result[0]) === false
          ? response.result[0]
          : [];
      if (isEmpty(responseResult) === false) {
        this.setState({
          idTermsConditions:
            isNil(responseResult.idTermsConditions) === false
              ? responseResult.idTermsConditions
              : '',
          termsConditions:
            isNil(responseResult.termsConditions) === false
              ? responseResult.termsConditions
              : '',
        });
      }
      console.log('responseResult', responseResult);
    } catch (error) {
      console.log('error', error);
      //this.showToastrMessage(error);
    }
  };

  alfaAuthUser = async () => {
    const {
      getProfileBySystemUserData,
      setUserProfileData,
      history,
      dataProfile,
    } = this.props;
    const data = {
      idSystemUser: dataProfile.idSystemUser,
      idModule: GLOBAL_CONSTANTS.MENU.ID_MODULE,
    };
    try {
      const response = await getProfileBySystemUserData(
        data,
        dataProfile.token,
      );
      await setUserProfileData({
        ...response.result,
        token: dataProfile.token,
      });

      history.push('/cuenta');
    } catch (error) {
      this.showToastrMessage(error);
    }
  };

  setMenu = async (dataMenuObject) => {
    const { getMenuTemplateData, dataSetSidebarMenuToState } = this.props;
    try {
      const response = await getMenuTemplateData(dataMenuObject);
      if (
        Array.isArray(response.result) &&
        isEmpty(response.result) === false
      ) {
        const menuData = response.result;
        dataSetSidebarMenuToState(menuData);
      }
    } catch (error) {
      this.showToastrMessage(error);
    }
  };

  showToastrMessage = (error, alertType = ALERT_TYPE.ERROR) => {
    const { showToasterMessage } = this.props;
    const messageCode = this.handlerErrorResponse.getMessageErrorResponse(
      error,
    );

    if (isEmpty(messageCode) === false) {
      showToasterMessage(
        this.messagesFunctions.getMessageFromListMessagesCode(
          messageCode,
          messageCode,
        ),
        alertType,
      );
    }
  };

  render() {
    const { history, dataProfile } = this.props;
    const { idTermsConditions, termsConditions } = this.state;
    return (
      <div className="animated fadeIn">
        <CustomRow>
          <CustomCol xs="12">
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: termsConditions,
              }}
            />
          </CustomCol>
        </CustomRow>
        {dataProfile.acceptedTerms === false ? (
          <CustomRow>
            <CustomCol className="center" xs="12">
              <CustomButton
                label={this.messagesFunctions.getMessageFromListMessagesCode(
                  'FRL0000000000132',
                  'FRL0000000000132',
                )}
                isVisible
                type="submit"
                size="md"
                color="warning"
                className="btn buttonControlCheck"
                onClick={() => {
                  this.onClickAcceptTerms(idTermsConditions);
                }}
              />{' '}
              <CustomButton
                label={this.messagesFunctions.getMessageFromListMessagesCode(
                  'UISGEN0000000003',
                  'UISGEN0000000003',
                )}
                isVisible
                type="submit"
                size="md"
                color="danger"
                className="btn btn-danger"
                onClick={() => {
                  history.push('/logout');
                }}
              />
            </CustomCol>
          </CustomRow>
        ) : null}
        <br />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  messages: selectMessages(),
  idLanguage: selectIdLanguage(),
  dataProfile: makeSelectDataProfile(),
});
const mapDispatchToProps = (dispatch) => ({
  getProfileBySystemUserData: (data, tokenArg) =>
    dispatch(getProfileBySystemUser(data, tokenArg)),
  postAcceptTerms: (data) => dispatch(postAcceptTerms(data)),
  setUserProfileData: (dataProfile) => dispatch(setProfileData(dataProfile)),
  showToasterMessage: (data) => dispatch(showToastrMessage(data)),
  getAcceptTermsAndConditions: (data) =>
    dispatch(getAcceptTermsAndConditions(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Condiciones);
