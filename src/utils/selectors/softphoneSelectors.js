import { createSelector } from 'reselect';

const selectIsOpenSoftphone = () => createSelector(
  (state) => state.getIn(['softphone', 'isOpen']),
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

const selectAllSoftphone = () => createSelector(
  (state) => state.getIn(['softphone']),
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
    selectAllSoftphone,
};