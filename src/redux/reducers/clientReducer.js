import { combineReducers } from 'redux';

const selectedClientMedia = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_CLIENT_MEDIA':
      return action.payload
    default:
      return state;
  }
};

const clientInfo = (state = '', action) => {
  switch (action.type) {
    case 'SET_CLIENT':
      return action.payload
    default:
      return state;
  }
};




export default combineReducers({
  comment,
  selectedClientMedia
});