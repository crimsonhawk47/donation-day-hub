import loginMode from '../redux/reducers/loginModeReducer'

describe(`Loading Reducer Tests`, () => {
    test(`SET LOGIN MODE REDUCER should return "login"`, () => {
        const state = 'login'
        const loginAction = {type: 'SET_TO_LOGIN_MODE'}
        expect(loginMode(state, loginAction)).toBe('login')
    })

    test(`SET_TO_REGISTER_MODE should return 'register'`, () => {
        const state = 'login'
        const loginAction = {type: 'SET_TO_REGISTER_MODE'}
        expect(loginMode(state, loginAction)).toBe('register')
    })
    test(`Expect anything other than the strings above to reutrn initial state`, () => {
        const state = 'test'
        const loginAction = {type: 'SET_TO_FAKE_ACTION'}
        expect(loginMode(state, loginAction)).toBe(state)
    })
})

    