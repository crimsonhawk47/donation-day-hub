import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* adminVolunteerInfoSaga() {
    yield takeEvery('FETCH_VOLUNTEER_INFO', fetchAdminVolunteerInfo)
}

function* fetchAdminVolunteerInfo(action) {
    try {
        let response = yield axios.get(`/api/volunteer/${action.payload}`);
        yield put({ type: 'SET_VOLUNTEER_INFO', payload: response.data[0] });
    }
    catch (error) {
        console.log('Error getting volunteer info', error)
    }
}

export default adminVolunteerInfoSaga;
