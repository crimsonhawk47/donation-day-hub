import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeam(action) {
  console.log('we in saga', action.payload);

  try {
    const response = yield axios.get(`/api/teamById/`)
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
    yield put({ type: `SET_CLIENT_BY_TEAM`, payload: response.data })

  } catch (error) {
    console.log('Error with Get teams search:', error);
  }
}

function* teamSaga() {
  yield takeLatest('FETCH_TEAM', getTeam)
  yield takeLatest('FETCH_SEARCH_TEAMS', fetchSearchTeams)
}

export default teamSaga
