import * as actionTypes from 'actions/types';

const tempTodos = (state = {}, action) => {
  switch(action.type) {

    //pass to todo cases
    case actionTypes.ADD_TODO_REQUEST:
      return {...state.tempTodos,[action.tempid]:action.data};

    case actionTypes.ADD_TODO_SUCCESS:
    case actionTypes.ADD_TODO_FAILURE:
      const newState = {...state};
      delete newState[action.tempid];
      return newState;
      

    default:
      return state;
  }
}

export default tempTodos;