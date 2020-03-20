import { combineReducers } from 'redux';

const selectedClientMedia = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_CLIENT_MEDIA':
      return action.payload
    default:
      return state;
  }
};

const comment = (state = '', action) => {
  switch (action.type) {
    case 'SET_COMMENT':
      return action.payload
    default:
      return state;
  }
};




export default combineReducers({
  comment,
  selectedClientMedia
});