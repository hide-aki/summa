import { fromJS } from 'immutable';

const initialStatetoastr = fromJS({
  isOpen: false,
  message: '',
  messageType: '',
});

const toastrReducer = (state = initialStatetoastr, action) => {
  switch (action.type) {
    case 'TOGGLE_TOASTR':
      return state
        .set('message', action.message)
        .set('isOpen', action.isOpen)
        .set('messageType', action.messageType);
    default:
      return state;
  }
};

export default toastrReducer;
