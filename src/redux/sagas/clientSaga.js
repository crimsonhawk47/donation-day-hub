import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadToAws(action) {
  console.log(action.payload);

  try {
    let filename = action.payload.file.name
    console.log(filename);

    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        client_id: action.payload.client_id,
        Key: filename,
        ContentType: 'image/jpeg'
      },
      withCredentials: true,
    };

    let response = yield axios.get('/api/aws/generate-put-url', config)
    console.log(response);
    if (response.data.code) throw `Generate get url failed with code ${response.data.code}`
    let putUrl = response.data

    let putResponse = yield axios.put(putUrl, action.payload.file)
    if (putResponse.data.code) throw `Put image failed with code ${response.data.code}`
    yield axios.post('/api/client/add-image-name', action.payload, config)
  } catch (error) {
    console.log('UPLOAD_TO_AWS ERROR', error);
  }
}

function* getImageNames(action) {
  // alert(`COMPLETE DISPLAYALLIMAGES SAGA LATER`);

  const config = {
    headers: { 'Content-Type': 'application/json' },
    params: {
      client_id: action.payload
    },
    withCredentials: true,
  };
  let response = yield axios.get('/api/client/list-of-images', config)
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
    yield put({ type: 'SET_SELECTED_CLIENT_MEDIA', payload: selectedMedia })

  }
}

function* clientSaga() {
  yield takeLatest('UPLOAD_TO_AWS', uploadToAws);
  yield takeLatest('GET_IMAGE_NAMES', getImageNames);
  yield takeLatest('GET_MEDIA_FROM_NAMES', getMediaFromNames)
}

export default clientSaga;
