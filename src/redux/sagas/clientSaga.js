import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getImageNames(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        client_id: action.payload,
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
    const response = yield axios.get(`/api/client/team/${action.payload}`)
    yield put({ type: `SET_CLIENT_BY_TEAM`, payload: response.data })
  } catch (error) {
    console.log(error);
  }
}

function* postClient(action) {
  console.log(`we in post client saga`, action.payload);
  try {
    yield axios.post(`/api/client/add`, action.payload)
    yield put({ type: `FETCH_CLIENTS_BY_TEAM`, payload: action.payload.team_id })
  }
  catch (error) {
    console.log(`error in postClient`, error);

  }
}

function* getSingleClient(action) {
  console.log(`we in get single client saga`, action.payload);
  try {
    const response = yield axios.get(`/api/client/${action.payload}`);
    yield put({ type: `SET_SINGLE_CLIENT`, payload: response.data })
  }
  catch (error) {
    console.log(`error in get single client`, error);
    
  }
}

function* updateClient(action) {
  console.log(`we in update client saga`, action.payload.client_id);
  const response = yield axios.put(`/api/client/update/${action.payload.client_id}`, action.payload)
  yield put({ type: `FETCH_SINGLE_CLIENT`, payload: action.payload.client_id})
}

function* getComment(action){
  try{ 
    const result = yield axios.get(`/api/client/comment/${action.payload}`)
    yield put({type: 'SET_COMMENT', payload: result.data.comment})
  }catch(err){
    console.log(err)
  }
}

function* updateComment(action){
  try {
    console.log(action.payload);
    
    yield axios.put(`/api/client/comment/${action.payload.id}`, {comment: action.payload.comment})
    yield put({type: 'GET_COMMENT', payload: action.payload.id})
  } catch (err) {
    console.log(err)
  }
}

function* clientSaga() {
  yield takeLatest('GET_IMAGE_NAMES', getImageNames);
  yield takeLatest('FETCH_CLIENTS_BY_TEAM', getClientsById)
  yield takeLatest(`ADD_CLIENT`, postClient)
  yield takeLatest(`FETCH_SINGLE_CLIENT`, getSingleClient)
  yield takeLatest('UPDATE_CLIENT', updateClient)
  yield takeLatest('GET_COMMENT', getComment)
  yield takeLatest('UPDATE_COMMENT', updateComment)
  // yield takeLatest('POST_CLIENT', postClient)
}

export default clientSaga;
