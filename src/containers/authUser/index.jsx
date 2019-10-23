/*  eslint consistent-return: 0 */
/*  eslint import/first: 0 */

import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import PropTypes from 'prop-types';
import { PURGE } from 'redux-persist';
import { createStructuredSelector } from 'reselect';
import { MessagesFunctions, DateFunctions } from '@pleedtech/pt-components';

// Actions
import {
  setProfileData,
  getUserDataProfile,
} from '../../utils/actions/userProfileActions';
import languageActions from '../languageProvider/actions';
import {
  getFrontParameters,
  actionSetFrontParameters,
  actionSetDateDataBase,
  actionGetDateDataBase,
  startSession,
  getMenuTemplate,
  getProfileBySystemUser,
  getLanguageMessages,
} from '../../utils/actions/systemConfigurationsActions';
import {
  actionGetTimeZones,
  actionSetTimeZones,
} from '../../components/wrapperCustomWorkstation/actions';
import loaderActions from '../../utils/actions/loaderActions';
import {
  setDefaultUrlToState,
  setSidebarMenuToState,
  actionGetMenuByIdUser,
} from '../../utils/actions/sidebarMenuActions';
import { showToastrMessage } from '../../utils/actions/toastrActions';
import catalogsAction from '../../utils/actions/catalogsAction';

// Constants
import GLOBAL_CONSTANTS from '../../utils/constants/globalConstants';
import { API_CONSTANTS, HEADER } from '../../utils/constants/apiConstants';
import {
  ID_TIME_ZONE,
  LOGIN_URL,
  BOARD_LEADS_URL,
  ID_SCREEN_CODE,
} from './constants';

// Selectors
import {
  selectMessages,
  selectIdLanguage,
} from '../languageProvider/selectors';
import {
  makeSelectDataProfile,
  selectIdCompany,
  selectIdEmployee,
  selectIdSystemUser,
} from '../../utils/selectors/dataUserProfileSelectors';
import { selectTypeParam } from '../../utils/selectors/frontParametersSelectors';

// Utils
import { isActiveSession } from '../../utils/functions/authPassportValidator';
import { transformApiParameters } from '../../utils/apiTransformers/transformApiParameters';

class AuthUser extends React.Component {
  constructor(props) {
    super(props);

    const { messages } = props;

    this.messagesFunctions = new MessagesFunctions(messages);
    this.dateFunctions = new DateFunctions();
  }

  componentWillMount = async () => {
    const { history, openLoaderAction, purgeStore } = this.props;
    if (window.location.href.indexOf('logout') > -1) {
      await purgeStore();
      await sessionStorage.clear();
      await localStorage.clear();
      return (window.location.href = '/login');
    }
    // Show loader component
    try {
      await openLoaderAction();
      sessionStorage.setItem('globalOffset', '-05:00');
      this.alfaAuthUser();
    } catch (error) {
      await purgeStore();
      sessionStorage.clear();
      localStorage.clear();

      return history.push(API_CONSTANTS.LOGIN_USER.LOGOUT);
    }
  };

  /**
   * Set the timeZones and dateDataBase in the store
   *  @param {string} token - Bearer token
   *  @param {string} token - idCompany of user
   */
  setWorkStationTimeZone = async (token, idCompany, dateDB) => {
    const { getTimeZones, setTimeZones, setDateDataBase } = this.props;
    try {
      const timeZones = await getTimeZones(token, idCompany);
      if (
        Array.isArray(timeZones.result) &&
        isEmpty(timeZones.result) === false
      ) {
        const timeZonesResult = timeZones.result;

        setTimeZones(timeZonesResult);
      }

      if (
        isObject(dateDB.data) &&
        isEmpty(dateDB.data) === false &&
        isObject(dateDB.result) &&
        isEmpty(dateDB.result) === false &&
        isString(dateDB.result.dBdate) &&
        isEmpty(dateDB.result.dBdate) === false
      ) {
        const dateDBResult = dateDB.result.dBdate;

        setDateDataBase(dateDBResult);
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * Set the messages in the Store with respect to the idLanguage
   *  @param {object} decryptedData - Data from dataProfile
   */
  getMessages = async (decryptedData) => {
    const { getMessages } = this.props;

    let idLanguageSession =
      isNil(window.localStorage.idLanguageSession) === false &&
      isEmpty(window.localStorage.idLanguageSession) === false
        ? window.localStorage.idLanguageSession
        : null;

    if (isNil(idLanguageSession) || isEmpty(idLanguageSession)) {
      idLanguageSession = decryptedData.idSelectedLanguage;
    }

    try {
      await getMessages({
        idCompany: decryptedData.idCompany,
        idLanguage: idLanguageSession,
        token: decryptedData.token,
      });
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get profile data and set profileData in store
   *  @param {object} decryptedData - Object session
   */
  getPofileData = async (dataProfile) => {
    try {
      const profileData = {
        ...dataProfile,
      };
      await this.setProfileData(profileData);
      await this.startSession(profileData.idSystemUser, profileData.idCompany);
      return;
    } catch (error) {
      throw error;
    }
  };

  /**
   *  Set menu data in store
   *  @param {object} dataMenuObject - data from data profile
   */
  setActionGetMenuByIdUser = async (dataMenuObject) => {
    const { getMenuByIdUser, dataSetSidebarMenuToState } = this.props;

    try {
      const response = await getMenuByIdUser(dataMenuObject);

      if (
        isObject(response) &&
        isEmpty(response) === false &&
        Array.isArray(response.result) &&
        isEmpty(response.result) === false &&
        isObject(response.result[0]) &&
        isEmpty(response.result[0]) === false
      ) {
        const menuData = response.result;

        dataSetSidebarMenuToState(menuData);
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   *  Set menu template data in store
   *  @param {object} dataMenuObject - data
   */
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
      throw error;
    }
  };

  /**
   * Set fronParameters in store
   *  @param {string} idCompany - From dataProfile
   */
  setFrontParameters = async (idCompany) => {
    const { getFrontParametersData, setFrontParameters } = this.props;

    try {
      const response = await getFrontParametersData(idCompany);
      if (
        isObject(response) &&
        isEmpty(response) === false &&
        Array.isArray(response.result) &&
        isEmpty(response.result) === false
      ) {
        const parameters = response.result;
        const parametersWithoutLocalOffset = parameters.filter(
          (parameter) => parameter.paramName !== 'local_offset',
        );
        const localOffsetParameter = parameters.find(
          (parameter) => parameter.paramName === 'local_offset',
        );
        const resultLocalOffsetParameter = {
          ...localOffsetParameter,
          paramValue: sessionStorage.getItem('globalOffset'),
        };
        const resultParameters = [
          ...parametersWithoutLocalOffset,
          resultLocalOffsetParameter,
        ];

        await setFrontParameters(transformApiParameters(resultParameters));
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   *  Set data profile in the store
   *  @param {object} dataProfile
   */
  setProfileData = async (dataProfile) => {
    const {
      dataSetDefaultUrlToState,
      setUserProfileData,
      history,
    } = this.props;

    const dataMenuObject = {
      type: 2,
      idModule: GLOBAL_CONSTANTS.MENU.ID_MODULE,
      idSystemUser: dataProfile.idSystemUser,
      idCompany: dataProfile.idCompany,
      idDepartment: null,
      idJobPosition: null,
    };

    try {
      await setUserProfileData(dataProfile);
      let idDefaultMenu = 67;
      if (
        isNil(dataProfile.idDefaultMenu) === false &&
        dataProfile.idDefaultMenu !== ''
      ) {
        idDefaultMenu = parseInt(dataProfile.idDefaultMenu, 10);
      }
      const urlHome = dataProfile.urlHome || BOARD_LEADS_URL;
      await dataSetDefaultUrlToState({
        url: urlHome,
        idElement: idDefaultMenu,
      });
      await this.setFrontParameters(dataProfile.idCompany);
      await this.getMessages(dataProfile);
      this.setMenu(dataMenuObject);
      await this.apiGetMiddleware(dataProfile);
      sessionStorage.setItem('isSetProfile', true);
      // TO DO: history.push(dataProfile.urlHome.trim());
      history.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  /**
   * Set offset in sessionStorage
   */
  getOffsetFromTimeZone = async (dateDateBase) => {
    try {
      const offset = await this.dateFunctions.getOffsetFromTimeZone(
        dateDateBase.result.dBdate,
        ID_TIME_ZONE,
      );
      await sessionStorage.setItem('globalOffset', offset);
      await sessionStorage.setItem('idTimeZone', ID_TIME_ZONE);
    } catch (error) {
      throw error;
    }
  };

  startSession = async (idSystemUser = '', idCompany = '') => {
    const { startSessionData } = this.props;

    try {
      await startSessionData({
        idSystemUser,
        idCompany,
        idScreenCode: ID_SCREEN_CODE,
        idSection: null,
      });
    } catch (error) {
      throw error;
    }
  };

  /**
   * Send profile data and object session to other apis
   */
  authUser = async () => {
    const idSystemUserSessionKey = sessionStorage.getItem('idSystemUser');
    const tokenSessionKey = sessionStorage.getItem('token');

    const { getDateDataBase, getUserProfileData, params, history } = this.props;
    let decryptedString;
    let decryptedData;

    if (
      isNil(params) === false &&
      isEmpty(params.id) === false &&
      isNil(params.id) === false
    ) {
      decryptedString = atob(params.id);
      decryptedData = JSON.parse(decryptedString);
      try {
        const dataProfile = await getUserProfileData(
          idSystemUserSessionKey,
          tokenSessionKey,
          1,
        );
        sessionStorage.setItem('data', dataProfile);
        dataProfile.token = decryptedData.token;
        if (isActiveSession(dataProfile) === true) {
          HEADER.Authorization = `Bearer ${dataProfile.token}`;
          const dateDB = await getDateDataBase(dataProfile.token);
          try {
            await Promise.all([
              this.setWorkStationTimeZone(
                dataProfile.token,
                dataProfile.idCompany,
                dateDB,
              ),
              this.getOffsetFromTimeZone(dateDB),
              this.getPofileData(dataProfile),
            ]);
          } catch (error) {
            throw error;
          }
        } else {
          sessionStorage.clear();
          return history.push(LOGIN_URL);
        }
      } catch (error) {
        throw error;
      }
    } else {
      let dataProfile = await getUserProfileData(
        idSystemUserSessionKey,
        tokenSessionKey,
        1,
      );
      dataProfile = { ...dataProfile.result, token: tokenSessionKey };

      if (isEmpty(tokenSessionKey) === false) {
        HEADER.Authorization = `Bearer ${tokenSessionKey}`;
        const dateDB = await getDateDataBase(tokenSessionKey);
        try {
          await Promise.all([
            this.setWorkStationTimeZone(
              tokenSessionKey,
              dataProfile.idCompany,
              dateDB,
            ),
            this.getOffsetFromTimeZone(dateDB),
            this.getPofileData(dataProfile),
          ]);
        } catch (error) {
          throw error;
        }
      } else {
        sessionStorage.clear();
        return history.push(LOGIN_URL);
      }
    }
  };

  /**
   *  Get languages catalog and set into redux store
   *  @param {object} data
   *  @param {string} token
   */
  postGetAllLanguages = async (data, token) => {
    const { postGetAllLanguages, setLanguagesCatalog } = this.props;
    try {
      const response = await postGetAllLanguages(data, token);

      const catalog =
        Array.isArray(response.result) && isEmpty(response.result) === false
          ? response.result
          : [];
      setLanguagesCatalog(catalog);
    } catch (error) {
      throw error;
    }
  };

  /**
   *  api middleware
   *  @param {object} dataProfile
   */
  apiGetMiddleware = async (dataProfile) => {
    try {
      if (isNil(dataProfile) === false) {
        const { idCompany, idSystemUser, token } = dataProfile;
        const { typeParam } = this.props;
        await this.postGetAllLanguages(
          {
            idCompany,
            idSystemUser,
            typeParam,
            type: null,
          },
          token,
        );
      }
    } catch (error) {
      throw error;
    }
  };

  // alfaAuthUser = async () => {
  //   const {
  //     getProfileBySystemUserData,
  //     setUserProfileData,
  //     history,
  //     purgeStore,
  //   } = this.props;
  //   const data = {
  //     idSystemUser: sessionStorage.getItem('idSystemUser'),
  //     idModule: GLOBAL_CONSTANTS.MENU.ID_MODULE,
  //   };
  //   try {
  //     sessionStorage.setItem('globalOffset', '-06:00');
  //     const response = await getProfileBySystemUserData(
  //       data,
  //       sessionStorage.getItem('token'),
  //     );
  //     await setUserProfileData({
  //       ...response.result,
  //       token: sessionStorage.getItem('token'),
  //     });
  //     sessionStorage.setItem('isSetProfile', true);
  //     history.push('/dashboard');
  //   } catch (error) {
  //     await purgeStore();
  //     sessionStorage.clear();
  //     localStorage.clear();
  //     return history.push(API_CONSTANTS.LOGIN_USER.LOGOUT);
  //   }
  // };

  getLanguageMessages = async (data) => {
    const { getLanguageMessages } = this.props;
    try {
      const response = await getLanguageMessages(data);
      if (isNil(response.result) === false) {
        const languageMessagesResponse = response.result;
      }
    } catch (error) {
      throw error;
    }
  };

  alfaAuthUser = async () => {
    const {
      getProfileBySystemUserData,
      setUserProfileData,
      history,
      openLoaderAction,
      purgeStore,
    } = this.props;
    const data = {
      idSystemUser: sessionStorage.getItem('idSystemUser'),
      idModule: GLOBAL_CONSTANTS.MENU.ID_MODULE,
    };
    try {
      const response = await getProfileBySystemUserData(
        data,
        sessionStorage.getItem('token'),
      );
      await setUserProfileData({
        ...response.result,
        token: sessionStorage.getItem('token'),
      });

      const dataMenuObject = {
        type: 2,
        idModule: GLOBAL_CONSTANTS.MENU.ID_MODULE,
        idSystemUser: response.result.idSystemUser,
        idCompany: response.result.idCompany,
        idUserSecurityKey: response.result.idUserSecurityKey,
      };
      this.setMenu(dataMenuObject);
      const landingPage =
        isNil(response.result.acceptedTerms) ||
        response.result.acceptedTerms === false
          ? '/condiciones'
          : '/cuenta';

      const dataS = { idLanguage: '2', typeParam: '' };
      await this.getLanguageMessages(dataS);
      sessionStorage.setItem('isSetProfile', true);
      history.push(landingPage);
    } catch (error) {
      await purgeStore();
      sessionStorage.clear();
      localStorage.clear();
      return history.push(API_CONSTANTS.LOGIN_USER.LOGOUT);
    }
  };

  render() {
    return (
      <div className="loader">
        <div className="sk-cube-grid gridLoader">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectDataProfile(),
  idLanguage: selectIdLanguage(),
  idCompany: selectIdCompany(),
  idSystemUser: selectIdSystemUser(),
  idEmployee: selectIdEmployee(),
  messages: selectMessages(),
  typeParam: selectTypeParam(),
});

const mapDispatchToProps = (dispatch) => ({
  getProfileBySystemUserData: (data, tokenArg) =>
    dispatch(getProfileBySystemUser(data, tokenArg)),
  setUserProfileData: (dataProfile) => dispatch(setProfileData(dataProfile)),
  getUserProfileData: (idSystemUser, token, idModule) =>
    dispatch(getUserDataProfile(idSystemUser, token, idModule)),
  getFrontParametersData: (idCompany) =>
    dispatch(getFrontParameters(idCompany)),
  setFrontParameters: (parameters) =>
    dispatch(actionSetFrontParameters(parameters)),
  setDateDataBase: (date) => dispatch(actionSetDateDataBase(date)),
  getDateDataBase: (token) => dispatch(actionGetDateDataBase(token)),
  startSessionData: (data) => dispatch(startSession(data)),
  getTimeZones: (token, idCompany) =>
    dispatch(actionGetTimeZones(token, idCompany)),
  setTimeZones: (timeZones) => dispatch(actionSetTimeZones(timeZones)),
  getMessages: (idLanguage) =>
    dispatch(languageActions.getMessages(idLanguage)),
  changeLocale: (idLanguage) =>
    dispatch(languageActions.changeLocale(idLanguage)),
  setLanguagesCatalog: (catalog) =>
    dispatch(languageActions.setLanguagesCatalog(catalog)),
  openLoaderAction: () => dispatch(loaderActions.openLoaderAction()),
  dataSetDefaultUrlToState: (data) => dispatch(setDefaultUrlToState(data)),
  dataSetSidebarMenuToState: (sidebarMenu) =>
    dispatch(setSidebarMenuToState(sidebarMenu)),
  getMenuByIdUser: (data) => dispatch(actionGetMenuByIdUser(data)),
  redirectTo: (route) => dispatch(push(route)),
  showToastrMessage: (message, alertType) =>
    dispatch(showToastrMessage(message, alertType)),
  postGetAllLanguages: (data, token) =>
    dispatch(catalogsAction.postGetAllLanguages(data, token)),
  getMenuTemplateData: (data) => dispatch(getMenuTemplate(data)),
  purgeStore: () => dispatch({ type: 'PURGE' }),
  getLanguageMessages: (data) => dispatch(getLanguageMessages(data)),
});

AuthUser.defaultProps = {
  typeParam: null,
  messages: {},
  params: {},
  history: {},
};
AuthUser.propTypes = {
  messages: PropTypes.oneOfType([PropTypes.object]),
  params: PropTypes.oneOfType([PropTypes.object]),
  history: PropTypes.oneOfType([PropTypes.object]),
  typeParam: PropTypes.string,
  setUserProfileData: PropTypes.func.isRequired,
  getUserProfileData: PropTypes.func.isRequired,
  getFrontParametersData: PropTypes.func.isRequired,
  setFrontParameters: PropTypes.func.isRequired,
  setDateDataBase: PropTypes.func.isRequired,
  getDateDataBase: PropTypes.func.isRequired,
  getTimeZones: PropTypes.func.isRequired,
  setTimeZones: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  openLoaderAction: PropTypes.func.isRequired,
  dataSetDefaultUrlToState: PropTypes.func.isRequired,
  dataSetSidebarMenuToState: PropTypes.func.isRequired,
  getMenuByIdUser: PropTypes.func.isRequired,
  startSessionData: PropTypes.func.isRequired,
  postGetAllLanguages: PropTypes.func.isRequired,
  setLanguagesCatalog: PropTypes.func.isRequired,
  getMenuTemplateData: PropTypes.func.isRequired,
  purgeStore: PropTypes.func.isRequired,
  getProfileBySystemUserData: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthUser);
