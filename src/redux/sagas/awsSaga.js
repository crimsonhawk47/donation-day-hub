import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadToAws(action) {
  try {
    let file = action.payload.file
    const client_id = action.payload.client_id
    const config = {
      headers: { 'Content-Type': 'application/json' },
      params: {
        client_id: client_id,
        Key: file.name,
        ContentType: file.type
      },
      withCredentials: true,
    };

    let response = yield axios.get('/api/aws/generate-put-url', config)
    if (response.data.code) throw `Generate get url failed with code ${response.data.code}`
    let putUrl = response.data

    let putResponse = yield axios.put(putUrl, action.payload.file)
    if (putResponse.data.code) throw `Put image failed with code ${response.data.code}`
    yield axios.post('/api/client/add-image-name', action.payload, config)
    yield put({ type: 'GET_IMAGE_NAMES', payload: client_id })
    yield put({type: 'SET_LOADING_FALSE'})
  } catch (error) {
    yield put({type: 'SET_LOADING_FALSE'})
    alert('Error Uploading Image')
    console.log('UPLOAD_TO_AWS ERROR', error);
  }
}

function* getMediaFromNames(action) {
  try {
    let selectedMedia = []
    for (let file of action.payload) {

      const config = {
        headers: { 'Content-Type': 'application/json' },
        params: {
          Key: file.link,
          ContentType: 'image/jpeg'
        },
        withCredentials: true,
      };

      const res = yield axios.get('/api/aws/generate-get-url', config)
      let fileDetails = {...file, link: res.data}
      selectedMedia = [...selectedMedia, fileDetails]
    }

    yield put({ type: 'SET_SELECTED_CLIENT_MEDIA', payload: selectedMedia })

  } catch (error) {
    console.log('Get Media From Names error: ', error);
  }

}

function* awsSaga() {
  yield takeLatest('UPLOAD_TO_AWS', uploadToAws);
  yield takeLatest('GET_MEDIA_FROM_NAMES', getMediaFromNames)
}

export default awsSaga;