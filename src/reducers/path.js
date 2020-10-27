import * as actionTypes from 'actions/types';

const path = (state = [], action) => {
  switch(action.type) {
    case actionTypes.FETCH_PATH_SUCCESS:
      return action.cards;
      
    default:
      return state;
  }
}
export default path;