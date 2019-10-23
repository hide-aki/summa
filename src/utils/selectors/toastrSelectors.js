import { createSelector } from 'reselect';
import isNil from 'lodash/isNil';
const makeSelectToastr = () =>
  createSelector(
    (state) => {
      return state.toastr;
    },
    (data) => {
      let toastrObject = {};
      if (isNil(data) === false) {
        if (typeof data.toJS === 'function') {
          toastrObject = data.toJS();
        }
      }
      return toastrObject;
    },
  );
export { makeSelectToastr };
