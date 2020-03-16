const teamById = (state = [], action) => {
    console.log(`we in shopping list reduct`, action.payload);

    switch (action.type) {
        case 'SET_CLIENT_SHOPPING_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default teamById;