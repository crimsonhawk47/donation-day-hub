
const adminTeamInfoReducer = (state = [], action) => {
  if (action.type === 'SET_TEAM_INFO') {
      return action.payload
  }
  return state
}

export default adminTeamInfoReducer;