const adminClientListReducer = (state = [], action) => {
    if (action.type === 'SET_CLIENT_LIST') {
        return action.payload
    }
    return state
}

export default adminClientListReducer;