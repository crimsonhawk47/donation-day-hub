import { combineReducers } from 'redux';

const closeTeamDialog = (state = false, action) => {
  switch (action.type) {
    case 'SET_CLOSE_TEAM_DIALOG':
      return action.payload
    default:
      return state;
  }
};




export default combineReducers({
  closeTeamDialog
});