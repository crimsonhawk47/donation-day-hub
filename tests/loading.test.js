const loadingReducer = require('../src/redux/reducers/loadingReducer')

describe(`Loading Reducer Tests`, () => {
    test(`SET LOGIN MODE REDUCER should return "login"`, () => {
        const loginAction = {type: 'SET_TO_LOGIN_MODE'}
        expect(loadingReducer(loginAction)).toBe('login')
    })
})

    