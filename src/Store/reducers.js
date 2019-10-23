import { combineReducers } from 'redux';
import { purgeStoredState } from 'redux-persist';
import languageProviderReducer from '../containers/languageProvider/reducer';
import dataProfileReducer from '../utils/reducers/userProfileReducer';
import toastrReducer from '../utils/reducers/toastrReducer';
import sidebarMenuReducer from '../utils/reducers/sidebarMenuReducer';
import routesHistoryReducer from '../utils/reducers/routesHistoryReducer';
import frontParametersReducer from '../utils/reducers/frontParametersReducer';
import catalogsReducer from '../utils/reducers/catalogsReducer';

const appReducers = combineReducers({
  language: languageProviderReducer,
  dataProfile: dataProfileReducer,
  toastr: toastrReducer,
  sidebarMenu: sidebarMenuReducer,
  routesHistory: routesHistoryReducer,
  frontParameters: frontParametersReducer,
  catalogs: catalogsReducer,
});

export default (state, action, persistConfig) => {
  // Reset to initialState
  if (action.type === 'PURGE') {
    purgeStoredState(persistConfig);
    // Default or Current State
    return appReducers({}, action);
  }

  return appReducers(state, action);
};
