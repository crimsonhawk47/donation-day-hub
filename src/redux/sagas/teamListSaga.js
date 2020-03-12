import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* teamListSaga() {
  yield takeEvery('FETCH_TEAM_LIST', getTeamList)
}

function* getTeamList(){
    try {
        const response = yield axios.get('/api/team');
        console.log(response.data)
        yield put({ type: 'SET_TEAM_LIST', payload: response.data });
    
      } catch (error) {
        console.log('Error with Get team list:', error);
      }
}



export default teamListSaga