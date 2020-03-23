import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* adminMakeAdminSaga() {
  yield takeEvery('ADMIN_MAKE_ADMIN', makeAdmin)
}

function* makeAdmin(action) {
  try {
    yield axios.put(`/api/volunteer/make-admin/${action.payload}`)
    yield put({type: 'FETCH_VOLUNTEER_LIST'})
    action.history.push('/home')

    

  } catch (error) {
    console.log('Error with Make Captain:', error);
  }
}

export default adminMakeAdminSaga