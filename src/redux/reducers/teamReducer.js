const teamReducer = (state = [], action ) => {
    if ( action.type === 'SET_TEAMS') {
        return action.payload
    }
    return state
}
  
  // user will be on the redux state at:
  // state.user
export default teamReducer;