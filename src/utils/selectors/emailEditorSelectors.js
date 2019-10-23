import { createSelector } from 'reselect';

const selectEmailEditorData = () => createSelector(
  (state) => state.getIn(['emailEditor']),
  (data) => {
    if (data) {
      if (typeof data.toJS === 'function') {
        return data.toJS();
      } else {
        return data;
      }
    }
  }
)


export {
    selectEmailEditorData,
};