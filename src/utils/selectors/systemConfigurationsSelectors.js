//================================= reselect =================================//
import { 
    createSelector 
                                } from 'reselect';
//================================= constants =================================================//                            
import { 
    SYSTEM_CONFIGURATIONS_CONSTANTS 
                                } from 'utils/constants/systemConfigurationsConstants';
import { 
    HandlerStateSelected 
                                }  from '@pleedtech/pt-components';//from 'utils/functions/handlerStateSelected';

const selectConfigurationScreen = () => createSelector (
    [( state) => {
        return state.getIn(['configurationsScreen','screen']);
    }],
    (screen) => {      
        return new HandlerStateSelected().processStateSelected(screen);
    }
);//selectConfigurationScreen

/**************************************************
 * selectDateDataBase
 **************************************************/ 
const selectDateDataBase = () => createSelector (
  [(state) => state.getIn(['dateDataBase','date'])
  ],(date) => date);//selectDateDataBase


export {
    selectConfigurationScreen,
    selectDateDataBase,
}