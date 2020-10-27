import * as actionTypes from 'actions/types';

const tempCards = (state = {}, action) => {
  switch(action.type) {

    //pass to card cases
    case actionTypes.ADD_CARD_REQUEST:
      return {...state.tempCards,[action.tempid]:action.data};

    case actionTypes.ADD_CARD_SUCCESS:
    case actionTypes.ADD_CARD_FAILURE:
      const newState = {...state};
      delete newState[action.tempid];
      return newState;
      

    default:
      return state;
  }
}

export default tempCards;