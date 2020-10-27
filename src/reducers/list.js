import * as actionTypes from 'actions/types';
import cards from 'reducers/card';
import tempCards from 'reducers/tempCards';
import path from 'reducers/path';

const list = (
  state = {
    cards:[],
    tempCards:{},
    path:[],
    isFetchingCards:false,
    isFetchingPath:false,
    nodeid:null
  },
  action) => {
  switch(action.type) {
    case actionTypes.SET_NODEID:
      return {...state,nodeid:action.nodeid};

    //cards
    case actionTypes.UPDATE_CARD:
      return {...state,cards:cards(state.cards,action)};
      
    case actionTypes.REMOVE_CARD:
      return {...state,cards:cards(state.cards,action)};
      
    case actionTypes.REMOVE_COMPLITED_CARDS:
      return {...state,cards:cards(state.cards,action)};

    case actionTypes.FETCH_CARDLIST_REQUEST:
      return {...state,isFetchingCards:true};

    case actionTypes.FETCH_CARDLIST_SUCCESS:
      return {...state,cards:cards(state.cards,action),isFetchingCards:false};

    case actionTypes.FETCH_CARDLIST_FAILURE:
      return {...state,isFetchingCards:false};

    case actionTypes.ADD_CARD_FAILURE:
    case actionTypes.ADD_CARD_REQUEST:
      //將tempid作為key傳給新的tempCards
      return {...state,tempCards:tempCards(state.tempCards,action)};
      
    case actionTypes.ADD_CARD_SUCCESS:
      //從tempCards移除指定id、新增至cards
      return {
        ...state,
        tempCards:tempCards(state.tempCards,action),
        cards:cards(state.cards,action)
      };
      

    //path
    case actionTypes.FETCH_PATH_REQUEST:
      return {...state,isFetchingPath:true};

    case actionTypes.FETCH_PATH_SUCCESS:
      return {...state,path:path(state.path,action),isFetchingPath:false,};

    case actionTypes.FETCH_PATH_FAILURE:
      return {...state,isFetchingPath:false};

    default:
      return state;
  }
}

export default list;