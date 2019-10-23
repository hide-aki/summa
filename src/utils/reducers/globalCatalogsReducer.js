import { fromJS } from 'immutable';

const initialStateGlobalCatalogs = fromJS({
    conditionalCatalog: [
        {
            id:'Y',
            text:'UIHRBL0000000010'
        },
        {
            id:'N',
            text:'UIHRBL0000000011'
        }
    ],
    emailTemplatesCatalog:[],
});

const  globalcatalogsReducer = (state = initialStateGlobalCatalogs, action) => {
    switch (action.type) {
        case 'CLEAR_GLOBAL_CATALOGS_MENU':
            return initialStateGlobalCatalogs;
            case 'SET_EMAIL_TEMPLATES_CATALOG':
            return state.set('emailTemplatesCatalog', action.emailTemplatesCatalog);
        default:
            return state;
    }
}

export default globalcatalogsReducer ;
