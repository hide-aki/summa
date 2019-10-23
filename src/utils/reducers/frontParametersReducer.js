import { fromJS } from 'immutable';
import SYSTEM_CONFIGURATIONS_CONSTANTS from '../constants/systemConfigurationsConstants';

const initialStateFrontParameters = fromJS({
  parameters: {},
});

const frontParametersReducer = (
  state = initialStateFrontParameters,
  action,
) => {
  switch (action.type) {
    case SYSTEM_CONFIGURATIONS_CONSTANTS.ACTIONS.SET_FRONT_PARAMETERS:
      return state.set('parameters', action.parameters);
    default:
      return state;
  }
};
export default frontParametersReducer;
