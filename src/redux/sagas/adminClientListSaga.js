import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* adminClientListSaga() {
  yield takeEvery('FETCH_CLIENT_LIST', getAdminClientList)
}

function* getAdminClientList(){
    try {
        const response = yield axios.get('/api/client');
        console.log(response.data)
        yield put({ type: 'SET_CLIENT_LIST', payload: response.data });
    
      } catch (error) {
        console.log('Error with GET client list:', error);
      }
}

export default adminClientListSaga