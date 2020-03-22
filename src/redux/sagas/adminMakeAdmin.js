import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* adminMakeAdminSaga() {
  yield takeEvery('ADMIN_MAKE_ADMIN', makeCaptain)
}

function* makeCaptain(action) {
  try {
    console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    
    console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    

  } catch (error) {
    console.log('Error with Make Captain:', error);
  }
}

export default adminMakeAdminSaga