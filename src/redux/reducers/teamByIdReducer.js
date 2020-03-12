const teamById = (state = {}, action) => {
    console.log(`we in teambyId reduct`, action.payload);
    
    switch(action.type) {
        case 'SET_TEAM_BY_ID':
            return action.payload;
            default:
                return state;
    }
}

export default teamById;