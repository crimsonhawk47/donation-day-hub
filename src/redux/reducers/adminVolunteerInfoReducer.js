
const adminVolunteerInfoReducer = (state = 0, action) => {
    switch (action.type) {
      case 'SET_VOLUNTEER_INFO':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default adminVolunteerInfoReducer;