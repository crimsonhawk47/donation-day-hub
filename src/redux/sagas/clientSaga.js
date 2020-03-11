import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions


function* getImageNames() {
  let response = yield axios.get('/api/aws/list-of-images')
  console.log(response);
  yield put({ type: 'GET_MEDIA_FROM_NAMES', payload: response.data })
  yield put({ type: 'SET_SELECTED_CLIENT_MEDIA', payload: response.data})
}

function* getClientsById(action) {
  console.log(`we in client's by id saga`, action.payload);
  try {
    const response = yield axios.get(`/api/client/${action.payload}`)
    yield put({ type: `SET_CLIENT_BY_TEAM`, payload: response.data})
  } catch (error) {
    console.log(error);
  }
}

function* clientSaga() {
  yield takeLatest('GET_IMAGE_NAMES', getImageNames);
  yield takeLatest('FETCH_CLIENTS_BY_TEAM', getClientsById)
}

export default clientSaga;
