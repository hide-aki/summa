import { fromJS } from 'immutable';
import { RECRUITMENT_CONSTANTS } from 'utils/constants/recruitmentConstants';

const initialStateRoutesHistoryReducer = fromJS({
  routes: [],
});

const routesHistoryReducer = (
  state = initialStateRoutesHistoryReducer,
  action,
) => {
  switch (action.type) {
    case 'SET_ROUTES_HISTORY':
      return state.set('routes', action.routes);
    case 'CLEAR_ROUTES_HISTORY':
      return initialStateRoutesHistoryReducer;
    default:
      return state;
  }
};

export default routesHistoryReducer;
