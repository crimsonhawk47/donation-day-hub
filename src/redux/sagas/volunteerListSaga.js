import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* volunteerListSaga() {
    yield takeEvery('FETCH_VOLUNTEER_LIST', getVolunteerList)
}

function* getVolunteerList() {
    try {
        const response = yield axios.get('/api/volunteer');
        console.log(response.data)
        yield put({ type: 'SET_VOLUNTEER_LIST', payload: response.data });

    } catch (error) {
        console.log('Error with Get volunteer list:', error);
    }
}



export default volunteerListSaga