
//================================= immutable =================================================//
import { 
    fromJS 
                            }                         from 'immutable';
//================================= constants =================================================//                            
import { 
    SYSTEM_CONFIGURATIONS_CONSTANTS 
                            }                         from 'utils/constants/systemConfigurationsConstants';                            
//================================= initial-object ============================================//
const initialSystemConfigurations = fromJS({
    screen:[],
});//initialSystemConfigurations
const systemConfigurationsReducer = (state = initialSystemConfigurations, action) => {  
    switch(action.type){
    };  
    return state; 
}//systemConfigurationsReducer
const configurationsScreenReducer = (state = initialSystemConfigurations, action) => {  
    switch(action.type){
        case SYSTEM_CONFIGURATIONS_CONSTANTS.ACTIONS.SET_COMPONENTS_TO_SCREEN: 
            return state.set('screen', action.screen);
        case SYSTEM_CONFIGURATIONS_CONSTANTS.ACTIONS.CLEAN_COMPONENTS_TO_SCREEN: 
            return state.set('screen', initialSystemConfigurations.screen);                      
        default:
            return state;
    };//switch  
    return state; 
}//configuartionsScreenReducer
export{
    systemConfigurationsReducer,
    configurationsScreenReducer
}//export