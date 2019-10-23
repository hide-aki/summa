import { Requester } from '@pleedtech/pt-components';
import { API_CONSTANTS } from '../../../utils/constants/apiConstants';

const requester = new Requester(API_CONSTANTS.DOMAIN, '');

const postGetPasswordCheck = (data = {}) => () => {
  return new Promise((resolve, reject) => {
    return requester
      .post(API_CONSTANTS.ALPHA.POST_CHECK_PASSWORD_RECOVERED_ALPHA, data)
      .then((response) => {
        return resolve(response);
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
        `${API_CONSTANTS.ALPHA.PUT_PASSWORD_RECOVERED_ALPHA}/${idEmail}`,
        data,
      )
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const postGetPasswordRequest = (data = {}) => () => {
  return new Promise((resolve, reject) => {
    return requester
      .post(API_CONSTANTS.ALPHA.POST_PASSWORD_RECOVERED_ALPHA, data)
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return reject(error);
        }
        return reject(error);
      });
  });
};

const actions = {
  postGetPasswordRequest,
  postGetPasswordCheck,
  putGetPasswordRecovered,
};

export default actions;
