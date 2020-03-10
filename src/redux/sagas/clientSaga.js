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

function* displayAllImages(){
  // alert(`COMPLETE DISPLAYALLIMAGES SAGA LATER`);
  let imageNames = yield axios.get('/api/aws/list-of-images')
  console.log(imageNames);
  

}

function* clientSaga() {
  yield takeLatest('UPLOAD_TO_AWS', uploadToAws);
  yield takeLatest('DISPLAY_ALL_IMAGES', displayAllImages);
}

export default clientSaga;
