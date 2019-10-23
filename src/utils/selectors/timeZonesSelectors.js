//================================= reselect =================================//
import { 
    createSelector 
} from 'reselect';
/**************************************************
 * selectTimeZones
 **************************************************/                                                             
const selectTimeZones = () => createSelector (
    [(state) => {
        return state.getIn(['timeZones', 'zones']);
    }],(zones) => zones); //selectTimeZones
export {
    selectTimeZones    
} //export