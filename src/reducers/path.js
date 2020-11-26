import * as actionTypes from 'actionTypes/todo';

const path = (state = [], action) => {
  switch(action.type) {
    case actionTypes.FETCH_PATH_SUCCESS:
      return action.todos;
      
    default:
      return state;
  }
}
export default path;