//================================= reselect =================================//
import { 
    createSelector 
                                } from 'reselect';
//================================= constants =================================================//                            
import { 
    HandlerStateSelected 
                                }  from '@pleedtech/pt-components';//from 'utils/functions/handlerStateSelected';
//================================= constants =================================================//                            
import { 
    COMPONENT_TAB_CONSTANTS
                                } from 'utils/constants/componentTabConstants'    

const selectBoardLeadsTab = () => createSelector (
    [(state) => {
        return state.getIn([
            COMPONENT_TAB_CONSTANTS.REDUCERS.componentTabSelected,
            COMPONENT_TAB_CONSTANTS.REDUCERS.boardLeadsTab
        ]);//getIn
    }],
    (data) => {  
        return new HandlerStateSelected().processStateSelected(data);
    }
); //selectBoardLeadsTab  

export {
    selectBoardLeadsTab,  
} //export                              