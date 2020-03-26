import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getItemsById(action) {
    try{
        const response = yield axios.get(`/api/client/list/${action.payload}`)
        yield put ({ type: `SET_CLIENT_SHOPPING_LIST`, payload: response.data })
    }
    catch (error) {
        console.log(error);
    }
}

function* addItem(action) {
    try{
        yield axios.post(`api/client/item/add`, action.payload);
        yield put({ type: `FETCH_ITEM_LIST`,  payload: action.payload.client_id})
    }
    catch (error) {
        console.log(`error in post item`, error);
        
    }
}

function* deleteItem(action) {

    try {
        yield axios.delete(`api/client/item/delete/${action.payload.item}`);
        yield put({ type: `FETCH_ITEM_LIST`, payload: action.payload.client_id })
    }
    catch (error) {
        console.log(`error in item delete saga`, error);
        
    }
}

function* toggleCheck(action) {
    try {
        yield axios.put(`api/client/item/purchased/${action.payload.id}`)
        
        yield put({ type: `FETCH_ITEM_LIST`, payload: action.payload.client_id })

    }
    catch(error) {
        console.log(`error in toggle check saga`, error);
        
    }
}

function* editItem (action) {
    try {
        yield axios.put(`api/client/item/edit`, action.payload);
        yield put ({ type: `FETCH_ITEM_LIST`, payload: action.payload.client_id})
    }
    catch(error) {
        console.log(`error in edit put`, error);
        
    }
}



function* itemSaga() {
    yield takeLatest(`FETCH_ITEM_LIST`, getItemsById)
    yield takeLatest(`ADD_ITEM`, addItem)
    yield takeLatest('DELETE_ITEM', deleteItem)
    yield takeLatest(`TOGGLE_CHECK`, toggleCheck)
    yield takeLatest(`EDIT_ITEM`, editItem)
}

export default itemSaga;