import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeam(action) {
  try {
    const response = yield axios.get(`/api/teamById/`)

    yield put({ type: `SET_TEAM_BY_ID`, payload: response.data })
    const teamId = response.data.team_id
    // if (response.data){
      yield put({type: 'FETCH_CLIENTS_BY_TEAM', payload: teamId})
    // }
  } catch (error) {
    console.log('Get Team Failed: ', error);
  }
}

function* fetchSearchTeams() {
  try {

    const response = yield axios.get('/api/team/search');
    yield put({ type: 'SET_TEAMS', payload: response.data });
    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield put({ type: `SET_CLIENT_BY_TEAM`, payload: response.data })

  } catch (error) {
    console.log('Error with Get teams search:', error);
  }
}

function* joinTeam(action) {
  try {
    let teamId = action.payload.id
    let history = action.payload.history
    yield axios.post(`/api/team/join-team`, { data: teamId })
    yield put({type: 'FETCH_USER'})
    history.push('/team-page')
  }catch(err){
    console.log('Join Team Failed: ', err);
    
  }
}

function* closeTeam(action){
  yield axios.put(`/api/team/close-team/${action.payload}`)
  yield put({type: 'FETCH_TEAM_LIST'})
}

function* teamSaga() {
  yield takeLatest('FETCH_TEAM', getTeam)
  yield takeLatest('FETCH_SEARCH_TEAMS', fetchSearchTeams)
  yield takeLatest('JOIN_TEAM', joinTeam)
  yield takeLatest('CLOSE_TEAM', closeTeam)
}

export default teamSaga
