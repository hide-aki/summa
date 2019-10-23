import { fromJS } from 'immutable';

const initialStateSystemUserPreferences = fromJS({
    idLanguage:'',
});

const  systemUserPreferencesReducer = (state = initialStateSystemUserPreferences, action) => {
    switch (action.type) {
        case 'SET_ID_LANGUAGE_AT_SYSTEM_USER_PREFERENCE':
            return state.set('idLanguage', action.idLanguage);
        default:
            return state;
    }
}

export default systemUserPreferencesReducer ;
