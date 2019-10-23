import isNil from 'lodash/isNil';

const isActiveSession = (decryptedData) => {
  let isSessionActive = false;
  if (isNil(decryptedData) === false) {
    const { isLogged } = decryptedData;
    if (isLogged === true) {
      isSessionActive = true;
    }
  }
  return isSessionActive;
};

export { isActiveSession };
