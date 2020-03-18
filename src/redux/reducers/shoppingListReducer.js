const teamById = (state = [], action) => {

    switch (action.type) {
        case 'SET_CLIENT_SHOPPING_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default teamById;