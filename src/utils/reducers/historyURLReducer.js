//================================= immutable =================================================//
    import { 
        fromJS 
    } from 'immutable';
//================================= constants =================================================//                            
    import { 
        HISTORY_URL
    } from '../constants/historyURLConstants' 
//================================= constants =================================================//                            

const initialObject = fromJS({
    history: null,
}); //initialObject

const historyURLReducer = (state = initialObject, action) => { 
    switch(action.type){        
        case HISTORY_URL.ACTIONS.HURL_SET_HISTORY_URL:
            return state.set(
                HISTORY_URL.REDUCERS.history,
                action.history
            );
            //history
        case HISTORY_URL.ACTIONS.HURL_CLEAN:
            return state.set(
                HISTORY_URL.REDUCERS.history,
                null
            ); //state
        default:
            return state;
    };//switch  
    return state; 
} //historyURLReducer

export{
    historyURLReducer,
} //export
