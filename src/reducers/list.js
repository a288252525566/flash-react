import * as actionTypes from 'actions/types';
import todos from 'reducers/todo';
import tempTodos from 'reducers/tempTodos';
import path from 'reducers/path';

const list = (
  state = {
    todos:[],
    tempTodos:{},
    path:[],
    isFetchingTodos:false,
    isFetchingPath:false,
    nodeid:null
  },
  action) => {
  switch(action.type) {
    case actionTypes.SET_NODEID:
      return {...state,nodeid:action.nodeid};

    //todos
    case actionTypes.UPDATE_TODO:
      return {...state,todos:todos(state.todos,action)};
      
    case actionTypes.REMOVE_TODO:
      return {...state,todos:todos(state.todos,action)};
      
    case actionTypes.REMOVE_COMPLITED_TODOS:
      return {...state,todos:todos(state.todos,action)};

    case actionTypes.FETCH_TODOLIST_REQUEST:
      return {...state,isFetchingTodos:true};

    case actionTypes.FETCH_TODOLIST_SUCCESS:
      return {...state,todos:todos(state.todos,action),isFetchingTodos:false};

    case actionTypes.FETCH_TODOLIST_FAILURE:
      return {...state,isFetchingTodos:false};

    case actionTypes.ADD_TODO_FAILURE:
    case actionTypes.ADD_TODO_REQUEST:
      //將tempid作為key傳給新的tempTodos
      return {...state,tempTodos:tempTodos(state.tempTodos,action)};
      
    case actionTypes.ADD_TODO_SUCCESS:
      //從tempTodos移除指定id、新增至todos
      return {
        ...state,
        tempTodos:tempTodos(state.tempTodos,action),
        todos:todos(state.todos,action)
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