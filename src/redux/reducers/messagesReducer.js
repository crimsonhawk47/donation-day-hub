
const messages = (state = [], action) => {
  if (action.type === 'SET_MESSAGES') {
      return action.payload
  }
  return state
}

export default messages;