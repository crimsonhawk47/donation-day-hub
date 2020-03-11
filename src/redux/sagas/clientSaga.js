import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getImageNames(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        client_id: action.payload,
        ContentType: 'image/jpeg'
      },
      withCredentials: true,
    };
    const response = yield axios.get('/api/client/list-of-images', config)
    yield put({ type: 'GET_MEDIA_FROM_NAMES', payload: response.data })
  }
  catch (error) {
    console.log(error);
  }
}

function* getClientsById(action) {
  console.log(`we in client's by id saga`, action.payload);
  try {
    const response = yield axios.get(`/api/client/${action.payload}`)
    yield put({ type: `SET_CLIENT_BY_TEAM`, payload: response.data })
  } catch (error) {
    console.log(error);
  }
}

function* clientSaga() {
  yield takeLatest('GET_IMAGE_NAMES', getImageNames);
  yield takeLatest('FETCH_CLIENTS_BY_TEAM', getClientsById)
}

export default clientSaga;
