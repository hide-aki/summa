import { HISTORY_URL } from '../constants/historyURLConstants';

export const actionSetURL = (history) => ({
  type: HISTORY_URL.ACTIONS.HURL_SET_HISTORY_URL,
  history,
});
export const actionClean = () => ({ type: HISTORY_URL.ACTIONS.HURL_CLEAN });

export const setHistoryURL = (history) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(actionSetURL(history));
    return resolve(history);
  });
};

export const cleanHistory = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(actionClean());
    return resolve(true);
  });
};
