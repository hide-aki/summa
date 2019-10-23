import { Requester } from '@pleedtech/pt-components';
import { API_CONSTANTS } from '../../../utils/constants/apiConstants';
import GLOBAL_CONSTANTS  from '../../../utils/constants/globalConstants';

const requester = new Requester(API_CONSTANTS.DOMAIN, '');
const requesterWithLoader = new Requester(
  API_CONSTANTS.DOMAIN,
  'central-loader',
);

const setLocalMessagesToState = (temporalLoginMessages) => ({
  type: 'SET_TEMPORAL_LOGIN_MESSAGES',
  temporalLoginMessages,
});

// paso 1 obtengo el token
const actionGetTokenFromLogin = (data = {}) => () => {
  return new Promise((resolve, reject) => {
    const dataApi = {
      user: data.username,
      password: data.password,
      idClientApp: GLOBAL_CONSTANTS.idClientApp,
      mobileIdNumber: GLOBAL_CONSTANTS.idClientApp,
    };
    return requester
      .post(API_CONSTANTS.SYSTEM_CONFIGURATION.LOGIN, dataApi, {})
      .then((response) => {
        return resolve(response.data.result.accessToken);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return reject(error);
        }
        return reject(error);
      });
  });
};

// paso 3 obtengo la data del profile
const getUserDataProfile = (idUser, token) => () => {
  const endpoint = API_CONSTANTS.HUMAN_RESOURCES.USER_PROFILE + idUser;
  return new Promise((resolve, reject) => {
    return requester
      .get(endpoint, {
        Authorization: `Bearer ${token}`,
      })
      .then((response) => {
        return resolve(response.data.result);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 404) {
          return reject(error.response.status);
        }
        return reject(error.response.status);
      });
  });
};

// paso 1.1 obtengo la data del profile
const actionGetRecoverPassword = (email = {}) => () => {
  const endpoint =
    API_CONSTANTS.LOGIN_USER.PASSWORD_REMINDER + email.recoverUsername;
  return new Promise((resolve, reject) => {
    return requesterWithLoader
      .get(endpoint, {})
      .then((response = {}) => {
        return resolve(response.data.result);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 404) {
          return reject(error.response);
        }
        return reject(error.response.status);
      });
  });
};

const postGetPasswordRequest = (data = {}) => () => {
  return new Promise((resolve, reject) => {
    return requester
      .post(API_CONSTANTS.SYSTEM_CONFIGURATION.POST_PASSWORD_REQUEST, data)
      .then((response) => {
        return resolve(response.data.result.accessToken);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return reject(error);
        }
        return reject(error);
      });
  });
};

const postGetPasswordCheck = (data = {}) => () => {
  return new Promise((resolve, reject) => {
    return requester
      .post(API_CONSTANTS.SYSTEM_CONFIGURATION.POST_PASSWORD_CHECK, data)
      .then((response) => {
        return resolve(response.data.result.accessToken);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return reject(error);
        }
        return reject(error);
      });
  });
};

const putGetPasswordRecovered = (data = {}, idEmail) => () => {
  return new Promise((resolve, reject) => {
    return requester
      .put(
        `${
          API_CONSTANTS.SYSTEM_CONFIGURATION.POST_PASSWORD_RECOVERED
        }${idEmail}`,
        data,
      )
      .then((response) => {
        return resolve(response.data.result.accessToken);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return reject(error);
        }
        return reject(error);
      });
  });
};

const setLocalMessages = (data) => (dispatch) => {
  dispatch(setLocalMessagesToState(data));
};

const actions = {
  actionGetTokenFromLogin,
  actionGetRecoverPassword,
  setLocalMessages,
  postGetPasswordRequest,
  postGetPasswordCheck,
  putGetPasswordRecovered,
};

export default actions;
