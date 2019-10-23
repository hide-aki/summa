import { fromJS } from 'immutable';

const initialStateLoader = fromJS({
    isOpen:false,
});

const  loaderReducer = (state = initialStateLoader, action) => {
    switch (action.type) {
        case 'OPEN_LOADER':
            return state.set('isOpen', true);
        case 'CLOSE_LOADER':
            return state.set('isOpen', false);
        default:
            return state;
    }
}

export default loaderReducer ;
