const adminTeamListReducer = (state = [], action) => {
    if (action.type === 'SET_TEAM_LIST') {
        return action.payload
    }
    return state
}

export default adminTeamListReducer;