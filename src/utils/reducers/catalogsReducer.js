import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import CATALOGS_CONSTANTS from '../constants/catalogsConstants';

const initObject = { catalogs: {} };
const initialObjectCatalogs = fromJS(initObject);
const catalogsReducer = (state = initialObjectCatalogs, action) => {
  let catalogsObj = {};
  switch (action.type) {
    case CATALOGS_CONSTANTS.ACTIONS.SET_CATALOG:
      if (isEmpty(action.catalogs)) {
        catalogsObj = state.set(CATALOGS_CONSTANTS.REDUCERS.catalogs, {
          ...action.catalog,
        });
      } else {
        catalogsObj = state.set(CATALOGS_CONSTANTS.REDUCERS.catalogs, {
          ...action.catalogs,
          ...action.catalog,
        });
      }

      return catalogsObj;
    case CATALOGS_CONSTANTS.ACTIONS.CLEAN_CATALOGS:
      return state.set(CATALOGS_CONSTANTS.REDUCERS.catalogs, {});
    default:
      return state;
  }
};
export default catalogsReducer;
