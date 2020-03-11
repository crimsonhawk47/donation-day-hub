const teamById = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLIENT_BY_TEAM':
            return action.payload;
        default:
            return state;
    }
}

export default teamById;