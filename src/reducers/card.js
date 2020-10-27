import * as actionTypes from 'actions/types';

const card  = (state,action) => {
  switch(action.type) {
    case actionTypes.ADD_CARD_SUCCESS:
      return {isDone:action.data.isDone,parent_id:action.data.parent_id,_id:action.data._id,title:action.data.title};
    case actionTypes.UPDATE_CARD:
      return {...state,...action.data};
    default:
      return state;
  }
}


const cards = (state = [], action) => {
  switch(action.type) {

    //pass to card cases
    case actionTypes.ADD_CARD_SUCCESS:
      return [...state,card(null,action)];

    case actionTypes.UPDATE_CARD:
      return state.map(item=>{
        if(item._id===action._id) return card(item,action);
        return item;
      })


    //own cases
    case actionTypes.REMOVE_CARD:
      return state.filter(item=>{
        if(item._id===action._id) return false;
        return true;
      });

    case actionTypes.REMOVE_COMPLITED_CARDS:
      return state.filter(item=>{
        if(item.isDone===true) return false;
        return true;
      });

    case actionTypes.FETCH_CARDLIST_SUCCESS:
      return action.cards;

    default:
      return state;
  }
}

export default cards;