import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeam(action) {
  console.log('we in saga', action.payload);

  try {
    const response = yield axios.get(`/api/teamById/${action.payload}`)
    console.log(response);

    yield put({ type: `SET_TEAM_BY_ID`, payload: response.data })
  } catch (error) {
    console.log(error);
  }
}

function* fetchSearchTeams() {
  try {

    const response = yield axios.get('/api/team/search');
    console.log(response.data)
    yield put({ type: 'SET_TEAMS', payload: response.data });
    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session

  } catch (error) {
    console.log('Error with Get teams search:', error);
  }
}

function* joinTeam(action) {
  try {
    let teamId = action.payload.id
    let history = action.payload.history
    yield axios.post(`/api/team/join-team`, { data: teamId })
    yield put({type: 'SET_USER_TEAM', payload: teamId})
    history.push('/team-page')
  }catch(err){
    console.log(err);
    
  }
  
}

function* teamSaga() {
  yield takeLatest('FETCH_TEAM', getTeam)
  yield takeLatest('FETCH_SEARCH_TEAMS', fetchSearchTeams)
  yield takeLatest('JOIN_TEAM', joinTeam)
}

export default teamSaga
