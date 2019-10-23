//================================= immutable =================================================//
import { 
    fromJS 
} from 'immutable';
//================================= constants =================================================//                            
import { 
    SYSTEM_CONFIGURATIONS_CONSTANTS 
} from 'utils/constants/systemConfigurationsConstants';                            
//================================= initial-object ============================================//
const initialStateDateDataBase = fromJS({
    date:"",
});//initialStateDateDataBase

const dateDataBaseReducer = (state = initialStateDateDataBase, action) => {  
    switch (action.type) {           
        case SYSTEM_CONFIGURATIONS_CONSTANTS.ACTIONS.SET_DATE_DATABASE: 
            return state.set('date', action.date);            
        default:
            return state;
    };//switch  
    return state; 
}//dateDataBaseReducer
export {
    dateDataBaseReducer,
}//export