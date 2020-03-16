const teamById = (state = {}, action) => {
    switch(action.type) {
        case 'SET_TEAM_BY_ID':
            return action.payload;
            default:
                return state;
    }
}

export default teamById;