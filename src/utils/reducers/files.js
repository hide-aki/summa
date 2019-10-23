import { fromJS } from 'immutable';

const InitialStateFiles = fromJS({
  files: {},
});

const filesReducer = (state = InitialStateFiles, action) => {
  switch (action.type) {
    case 'SET_FILES_DATA':
      return state.set('files', action.file);
    case 'CLEAR_FILES_DATA':
      return InitialStateFiles;
    default:
      return state;
  }
};
export default filesReducer;
