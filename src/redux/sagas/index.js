import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import clientSaga from './clientSaga';
import teamSaga from './teamSaga';
import awsSaga from './awsSaga'
import adminTeamListSaga from './adminTeamListSaga';
import adminClientListSaga from './adminClientListSaga';
import adminVolunteerListSaga from './adminVolunteerListSaga'
import adminVolunteerInfoSaga from './adminVolunteerInfoSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    clientSaga(),
    teamSaga(),
    awsSaga(),
    adminTeamListSaga(),
    adminClientListSaga(),
    adminVolunteerListSaga(),
    adminVolunteerInfoSaga(),
  ]);
}
