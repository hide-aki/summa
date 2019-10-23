import { fromJS } from 'immutable';

const initialStateProfileData = fromJS({
  dataProfile: {},
  emailsAddresses: [],
});

const dataProfileReducer = (state = initialStateProfileData, action) => {
  switch (action.type) {
    case 'SET_PROFILE_DATA_TO_STATE':
      return state.set('dataProfile', action.dataProfile);
    case 'SET_PROFILE_EMAILS_ADDRESSES_TO_STATE':
      return state.set('emailsAddresses', action.emailsAddresses);
    case 'CLEAR_PROFILE_DATA':
      return initialStateProfileData;
    default:
      return state;
  }
};

export default dataProfileReducer;
