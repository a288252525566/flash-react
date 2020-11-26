import FlashApi from 'api/FlashApi';
import * as actionTypes from 'actionTypes/todo';





//樂觀處理的action有： updateTodo,removeTodo,removeCompletedTodo


export const addTodo = (tempid, data) => (dispatch,getState) => {
  //已經有送過請求就不要再送了
  if(getState().list.tempTodos[tempid]!==undefined) return;


  dispatch({type:actionTypes.ADD_TODO_REQUEST,tempid,data});
  FlashApi.addTodo(data)
  .then(response => {
    if(response.error) {
      dispatch({type:actionTypes.ADD_TODO_FAILURE});
      dispatch({type:actionTypes.FETCH_FAILURE,errMessage:response.error.message});
      return;
    }
    dispatch({type:actionTypes.ADD_TODO_SUCCESS,tempid,data:response.result});
  });
}

export const removeTodo = (_id) => (dispatch) => {
  dispatch({type:actionTypes.REMOVE_TODO,_id});
  FlashApi.removeTodo(_id);
}

export const removeCompletedTodo = (nodeid) => (dispatch) => {
  dispatch({type:actionTypes.REMOVE_COMPLITED_TODOS,nodeid});
  FlashApi.removeCompletedTodo(nodeid);
}

export const updateTodo = (_id,data) => (dispatch) => {
  dispatch({type:actionTypes.UPDATE_TODO,_id,data});
  FlashApi.updateTodo(_id,data);
}

export const setNodeid = (nodeid) => (dispatch,getState) => {
  //如果有require過抓過就不幹嘛了
  const stateBeforeFetch = getState();
  if(stateBeforeFetch.list.nodeid===nodeid) return;

  //setRequest
  dispatch({type:actionTypes.SET_NODEID,nodeid:nodeid});
  dispatch({type:actionTypes.FETCH_TODOLIST_REQUEST});
  dispatch({type:actionTypes.FETCH_PATH_REQUEST});

  
  FlashApi.getTodoList(nodeid)
  .then(response => {
    //如果已經request別的id，就不幹嘛了了
    if(getState().list.nodeid!==nodeid) return;
    if(response.error) {
      dispatch({type:actionTypes.FETCH_TODOLIST_FAILURE});
      dispatch({type:actionTypes.FETCH_FAILURE,errMessage:response.error.message});
      return;
    }
    dispatch({type:actionTypes.FETCH_TODOLIST_SUCCESS,todos:response.result});
  });
  

  //如果是root的話
  const rootPath = {_id:'root',title:'root'};
  if(nodeid==='root') {
    dispatch({type:actionTypes.FETCH_PATH_SUCCESS,todos:[rootPath]});
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
      dispatch({type:actionTypes.FETCH_PATH_SUCCESS,todos:[rootPath,...response.result]});
    });
  }
}

export const reOrderTodos = (todos,from,to) => dispatch =>{
  dispatch({type:actionTypes.REORDER_TODOS,todos,from,to});
  FlashApi.updateTodo(todos[from]._id,{order:(to+1)});
}