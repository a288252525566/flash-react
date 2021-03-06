import * as actionTypes from 'actionTypes/todo';

const todo  = (state,action) => {
  switch(action.type) {
    case actionTypes.ADD_TODO_SUCCESS:
      return {
        isDone:action.data.isDone,
        parent_id:action.data.parent_id,
        _id:action.data._id,
        title:action.data.title,
        content:action.data.content
      };
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
    
    case actionTypes.REORDER_TODOS:
      const result = [...action.todos];
      const [theItem] = result.splice(action.from,1);
      result.splice(action.to,0,theItem);
      return result;

    default:
      return state;
  }
}

export default todos;