export const setPathtoState = (path) => ({
  type: 'SET_PATH',
  path,
});

/**
   * showToastrMessage
   * @param {string} message
   * @param {string} messageType
   @return {function} setProfileDataToState()
   */
export const setPathRedirecTo = (path = '') => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(setPathtoState(path));
    return resolve();
  });
};
