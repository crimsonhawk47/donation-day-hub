
const loading = (state = false, action) => {
    if (action.type === 'SET_LOADING_TRUE') {
        return true
    }
    else if(action.type === 'SET_LOADING_FALSE'){
        return false
    }
    return state
  }
  
  export default loading;