const userTeam = (state = -1, action) => {
  switch (action.type) {
      case 'SET_USER_TEAM':
          return action.payload;
      default:
          return state;
  }
}

export default userTeam;