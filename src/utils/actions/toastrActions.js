const setProfileDataToState = (message, isOpen, messageType) => ({
  type: 'TOGGLE_TOASTR',
  message,
  isOpen,
  messageType,
});

/**
 * showToastrMessage
 * @param {string} message
 * @param {string} messageType
 @return {function} setProfileDataToState()
 */
export const showToastrMessage = (message = '', messageType = '') => (
  dispatch,
  getState,
) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    dispatch(
      setProfileDataToState(
        message,
        !state.toastr.getIn(['isOpen']),
        messageType,
      ),
    );
    return resolve();
  }); // promise
};

export const cleanToastrMessage = () => (dispatch) => {
  return dispatch(setProfileDataToState(null, false, null));
};
