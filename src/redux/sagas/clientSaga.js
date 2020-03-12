import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* uploadToAws(action) {
  try {
    let filename = action.payload.name
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        Key: filename,
        ContentType: 'image/jpeg'
      },
      withCredentials: true,
    };

    let response = yield axios.get('/api/aws/generate-put-url', config)
    let putUrl = response.data
    console.log(putUrl);
    let putResponse = yield axios.put(putUrl, action.payload)
    console.log(putResponse);
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* getImageNames() {
  // alert(`COMPLETE DISPLAYALLIMAGES SAGA LATER`);
  let response = yield axios.get('/api/aws/list-of-images')
  console.log(response);
  yield put({ type: 'GET_MEDIA_FROM_NAMES', payload: response.data })
  // yield put({type: 'SET_SELECTED_CLIENT_MEDIA', payload: response.data})
}

function* getMediaFromNames(action) {
  let selectedMedia = []
  for (let imageName of action.payload) {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        Key: imageName,
        ContentType: 'image/jpeg'
      },
      withCredentials: true,
    };

    yield axios.get('/api/aws/generate-get-url', config).then(res => {
      console.log(res);
      selectedMedia = [...selectedMedia, res.data]
    });
      yield put({type: 'SET_SELECTED_CLIENT_MEDIA', payload: selectedMedia})

  }
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

// function* postClient(action) {
//   console.log(`we in post client saga`, action.payload);
//   try {
//     yield axios.post(`/api/client/add`, action.payload)
//     yield put({
//       type: 'SET_CLIENT_BY_TEAM'
//     })
//   }
// }

function* clientSaga() {
  yield takeLatest('UPLOAD_TO_AWS', uploadToAws);
  yield takeLatest('GET_IMAGE_NAMES', getImageNames);
  yield takeLatest('GET_MEDIA_FROM_NAMES', getMediaFromNames)
  yield takeLatest('FETCH_CLIENTS_BY_TEAM', getClientsById)
  // yield takeLatest('POST_CLIENT', postClient)
}

export default clientSaga;
