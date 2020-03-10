import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

function* teamSaga() {
    yield takeLatest('FETCH_SEARCH_TEAMS', fetchSearchTeams)
}

export default teamSaga