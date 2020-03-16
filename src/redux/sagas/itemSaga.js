import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getItemsById(action) {
    console.log(`we in itemSaga`, action.payload);
    try{
        const response = yield axios.get(`/api/client/list`, action.payload)
    }
    catch (error) {
        console.log(error);
    }
}




function* iteamSaga() {
    yield takeLatest(`FETCH_ITEM_LIST`, getItemsById)
}

export default iteamSaga;