//================================= immutable =================================================//
import { 
    fromJS 
} from 'immutable';
//================================= constants =================================================//                            
import { 
    WORKSTATION_CONSTANTS 
} from 'components/wrapperCustomWorkstation/constants';                            
//================================= initial-object ============================================//
const initialStateTimeZonesReducer = fromJS({
    zones:[],
});//initialStateTimeZonesReducer

const timeZonesReducer = (state = initialStateTimeZonesReducer, action) => {  
    switch (action.type) {           
        case WORKSTATION_CONSTANTS.EVENTS.SET_TIMEZONES_ARRAY: 
            return state.set('zones', action.zones);            
        default:
            return state;
    };//switch  
    return state; 
}//timeZonesReducer
export {
    timeZonesReducer,
}//export