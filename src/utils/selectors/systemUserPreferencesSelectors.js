import { createSelector } from 'reselect';

const makeSelectLoader = () => createSelector(
  (state) => state.getIn(['loader']),
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
    makeSelectLoader,
};