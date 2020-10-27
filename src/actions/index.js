import FlashApi from 'api/FlashApi';
import * as actionTypes from 'actions/types';





//樂觀處理的action有： updateCard,removeCard,removeCompltedCard


export const addCard = (tempid, data) => (dispatch,getState) => {
  //已經有送過請求就不要再送了
  if(getState().list.tempCards[tempid]!==undefined) return;


  dispatch({type:actionTypes.ADD_CARD_REQUEST,tempid,data});
  FlashApi.addCard(data)
  .then(response => {
    if(response.error) {
      dispatch({type:actionTypes.ADD_CARD_FAILURE});
      dispatch({type:actionTypes.FETCH_FAILURE,errMessage:response.error.message});
      return;
    }
    dispatch({type:actionTypes.ADD_CARD_SUCCESS,tempid,data:response.result});
  });
}

export const removeCard = (_id) => (dispatch) => {
  dispatch({type:actionTypes.REMOVE_CARD,_id});
  FlashApi.removeCard(_id);
}

export const removeCompltedCard = (nodeid) => (dispatch) => {
  dispatch({type:actionTypes.REMOVE_COMPLITED_CARDS,nodeid});
  FlashApi.removeCompletedCard(nodeid);
}

export const updateCard = (_id,data) => (dispatch) => {
  dispatch({type:actionTypes.UPDATE_CARD,_id,data});
  FlashApi.updateCard(_id,data);
}

export const setNodeid = (nodeid) => (dispatch,getState) => {
  //如果有require過抓過就不幹嘛了
  const stateBeforeFetch = getState();
  if(stateBeforeFetch.list.nodeid===nodeid) return;

  //setRequest
  dispatch({type:actionTypes.SET_NODEID,nodeid:nodeid});
  dispatch({type:actionTypes.FETCH_CARDLIST_REQUEST});
  dispatch({type:actionTypes.FETCH_PATH_REQUEST});

  
  FlashApi.getCardList(nodeid)
  .then(response => {
    //如果已經request別的id，就不幹嘛了了
    if(getState().list.nodeid!==nodeid) return;
    if(response.error) {
      dispatch({type:actionTypes.FETCH_CARDLIST_FAILURE});
      dispatch({type:actionTypes.FETCH_FAILURE,errMessage:response.error.message});
      return;
    }
    dispatch({type:actionTypes.FETCH_CARDLIST_SUCCESS,cards:response.result});
  });
  

  //如果是root的話
  const rootPath = {_id:'root',title:'root'};
  if(nodeid==='root') {
    dispatch({type:actionTypes.FETCH_PATH_SUCCESS,cards:[rootPath]});
  }
  else {
    FlashApi.getPath(nodeid)
    .then(response => {
      //如果已經request別的id，就不幹嘛了
      if(getState().list.nodeid!==nodeid) return;
      if(response.error) {
        dispatch({type:actionTypes.FETCH_PATH_FAILURE});
        dispatch({type:actionTypes.FETCH_FAILURE,errMessage:response.error.message});
        return;
      }
      dispatch({type:actionTypes.FETCH_PATH_SUCCESS,cards:[rootPath,...response.result]});
    });
  }
}
