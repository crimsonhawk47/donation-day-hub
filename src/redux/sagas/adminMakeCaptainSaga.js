import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* adminMakeCaptainSaga() {
  yield takeEvery('ADMIN_MAKE_CAPTAIN', makeCaptain)
}

function* makeCaptain(action) {
  try {
    yield axios.post('/api/volunteer/make-captain', action.payload)
    yield put({type: 'FETCH_VOLUNTEER_INFO', payload: action.payload.id})

  } catch (error) {
    console.log('Error with Make Captain:', error);
  }
}

export default adminMakeCaptainSaga