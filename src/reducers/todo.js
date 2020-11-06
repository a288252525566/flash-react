import * as actionTypes from 'actions/types';

const todo  = (state,action) => {
  switch(action.type) {
    case actionTypes.ADD_TODO_SUCCESS:
      return {isDone:action.data.isDone,parent_id:action.data.parent_id,_id:action.data._id,title:action.data.title};
    case actionTypes.UPDATE_TODO:
      return {...state,...action.data};
    default:
      return state;
  }
}


const todos = (state = [], action) => {
  switch(action.type) {

    //pass to todo cases
    case actionTypes.ADD_TODO_SUCCESS:
      return [...state,todo(null,action)];

    case actionTypes.UPDATE_TODO:
      return state.map(item=>{
        if(item._id===action._id) return todo(item,action);
        return item;
      })


    //own cases
    case actionTypes.REMOVE_TODO:
      return state.filter(item=>{
        if(item._id===action._id) return false;
        return true;
      });

    case actionTypes.REMOVE_COMPLITED_TODOS:
      return state.filter(item=>{
        if(item.isDone===true) return false;
        return true;
      });

    case actionTypes.FETCH_TODOLIST_SUCCESS:
      return action.todos;

    default:
      return state;
  }
}

export default todos;