//================================= reselect =================================//
import { 
    createSelector 
} from 'reselect';
//================================= constants =================================================//                            
import { 
    HandlerStateSelected 
}  from '@pleedtech/pt-components';//from 'utils/functions/handlerStateSelected';
import { 
    HISTORY_URL
} from '../constants/historyURLConstants'
       
const selectHistoryURL = () => createSelector (
    [(state) => {
        
        return state.getIn([
            HISTORY_URL.REDUCERS.historyURL,
            HISTORY_URL.REDUCERS.history
        ]);
    }],
    (data) => {    
        return new HandlerStateSelected().processStateSelected(data);
    }
); //selectHistoryURL

export {
    selectHistoryURL,       
} //export
