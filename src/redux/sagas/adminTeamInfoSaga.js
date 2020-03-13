import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* adminTeamInfoSaga() {
  yield takeEvery('ADMIN_FETCH_TEAM_INFO', fetchTeamInfo)
}

function* fetchTeamInfo(action) {
  try {
    console.log(action.payload);

    let response = yield axios.get(`/api/team/team-info/${action.payload}`)
    console.log(response.data)
    yield put({ type: `SET_TEAM_INFO`, payload: response.data })


  } catch (error) {
    console.log('Error with Make Captain:', error);
  }
}

export default adminTeamInfoSaga