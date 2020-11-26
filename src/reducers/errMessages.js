import * as actionTypes from 'actionTypes/todo';

const errMessages = (state = [], action) => {
  switch(action.type) {
    case actionTypes.FETCH_FAILURE:
      console.log('err action',action);
      return [...state,action.errMessages];
    default:
      return state;
  }
}

export default errMessages;