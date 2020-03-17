import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import client from './clientReducer';
import teamById from './teamByIdReducer';
import clientsByTeamId from './clientByTeamIdReducer'
import teamReducer from './teamReducer';
import adminTeamList from './adminTeamListReducer';
import adminClientList from './adminClientListReducer'
import adminVolunteerList from './adminVolunteerListReducer'
import adminVolunteerInfo from './adminVolunteerInfoReducer'
import shoppingListReducer from './shoppingListReducer'
import adminTeamInfo from './adminTeamInfoReducer'
import dialogReducer from './dialogReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  client,
  teamById,
  clientsByTeamId,
  teamReducer,
  adminTeamList,
  adminClientList,
  adminVolunteerList,
  adminVolunteerInfo,
  adminTeamInfo,
  shoppingListReducer,
  dialogReducer,
});

export default rootReducer;
