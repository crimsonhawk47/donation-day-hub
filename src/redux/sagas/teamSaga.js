import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeam(action) {
    console.log('we in saga', action.payload);
    
    try {
        const response = yield axios.get(`/api/teamById/${action.payload}`)
        console.log(response);
        
        yield put({ type: `SET_TEAM_BY_ID`, payload: response.data })
    } catch (error) {
        console.log(error);
    }
}



function* teamSaga() {
    yield takeLatest('FETCH_TEAM', getTeam)
}

export default teamSaga;