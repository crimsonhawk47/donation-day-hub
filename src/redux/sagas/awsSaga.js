import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadToAws(action) {
  try {
    let filename = action.payload.file.name
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
    if (response.data.code) throw `Generate get url failed with code ${response.data.code}`
    let putUrl = response.data

    let putResponse = yield axios.put(putUrl, action.payload.file)
    if (putResponse.data.code) throw `Put image failed with code ${response.data.code}`
    yield axios.post('/api/client/add-image-name', action.payload, config)
  } catch (error) {
    console.log('UPLOAD_TO_AWS ERROR', error);
  }
}

function* getMediaFromNames(action) {
  try {
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
        selectedMedia = [...selectedMedia, res.data]
      });
    }
    yield put({ type: 'SET_SELECTED_CLIENT_MEDIA', payload: selectedMedia })

  } catch (error) {
    console.log(error);
  }

}

function* awsSaga() {
  yield takeLatest('UPLOAD_TO_AWS', uploadToAws);
  yield takeLatest('GET_MEDIA_FROM_NAMES', getMediaFromNames)
}

export default awsSaga;