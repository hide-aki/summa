//================================= immutable =================================================//
import { 
    fromJS 
                                               } from 'immutable';
//================================= constants =================================================//                            
import { 
    API_CONSTANTS
                                               } from 'utils/constants/apiConstants'; 
import { 
    COMPONENT_TAB_CONSTANTS
                                               } from 'utils/constants/componentTabConstants';                                                    
                           
//================================= initial-object ============================================//
const initialObjectComponentTabConstants = fromJS({
});//initialObjectComponentTabConstants
const componentTabReducer = (state = initialObjectComponentTabConstants, action) => { 
    switch(action.type){
        //================================= screen ======================================//  
        case COMPONENT_TAB_CONSTANTS.ACTIONS.CT_CLEAN_COMPONENT_TAB_CONSTANTS: 
            return state.set(
                initialObjectComponentTabConstants
            );  
            // initialObjectLeadsStatus  
        case COMPONENT_TAB_CONSTANTS.ACTIONS.CT_SET_TAB_BOARD_LEAD: 
            return state.set(
                COMPONENT_TAB_CONSTANTS.REDUCERS.boardLeadsTab,
                action.boardLeadsTab
            ); 
            // boardLeadsTab  
        case COMPONENT_TAB_CONSTANTS.ACTIONS.CT_CLEAN_TAB_BOARD_LEAD: 
            return state.set(
                COMPONENT_TAB_CONSTANTS.REDUCERS.boardLeadsTab,
                null
            ); 
            // boardLeadsTab    
        default:
            return state;
    };//switch  
    return state; 
}//componentTabReducer
export{
    componentTabReducer,
}//export                                               