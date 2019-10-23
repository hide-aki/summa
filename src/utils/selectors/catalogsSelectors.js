import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

const selectCatalogs = () =>
  createSelector(
    [
      (state) => {
        return state.catalogs;
      },
    ],
    (data) => {
      const catalogs =
        isEmpty(data) === false && isNil(data) === false ? data.toJS() : {};

      return isEmpty(catalogs) === false ? catalogs.catalogs : {};
    },
  );

export default selectCatalogs;
