const volunteerListReducer = (state = [], action) => {
    if (action.type === 'SET_VOLUNTEER_LIST') {
        return action.payload
    }
    return state
}

export default volunteerListReducer;