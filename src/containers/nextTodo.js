import * as actions from 'actions';
import * as selector from 'selector';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FlashApi from 'api/FlashApi';



const mapState = state => {
  return {
    todos:state.list.todos
  }
}

const mapDispatch = {
  updateItem:(_id,data)=>{return actions.updateTodo(_id,data)},
  enter:actions.setNodeid
}


//considered names:todoBox, highlightTodo, taskNow
const NextTodo = ({
  updateItem,
  enter,
  todos = []
}) => {
  //nexttodo
  const [content,setContent] = useState('');
  const [todoChildren,setTodoChildren] = useState([]);
  
  const todo = selector.getNextTodo(todos);
  useEffect(()=>{
    //todo content
    if(!!!todo.content) setContent('');
    else setContent(todo.content);

    //todo children
    FlashApi.getTodoList(todo._id).then(promise=>{
      if(promise.result._id && promise.result._id!==todo._id) setTodoChildren(promise.result);
    });
  },[todo]);
  
  const handleContentChange = event => {
    setContent(event.target.value);
  }
  const handleUpdateContent = () => {
    updateItem(todo._id,{content});
  }
  const handleDoneClick = () => {
    updateItem(todo._id,{idDone:true});
  }
  const handleEnter = () => {
    enter(todo._id);
  }

  //progress
  const todosLength = todos.length;
  const completedTodosLength = todos.filter( item => {
    if(item.isDone) return true;
    else return false;
  }).length;

  

  //render
  if(!todo._id) {
    return <div>都完成了!</div>
  }
  

  console.log(todoChildren);
  const footer = todoChildren.length ?
  (<div><button onClick={handleEnter}>Enter</button><button onClick={handleDoneClick}>Done</button></div>):
  <button onClick={handleDoneClick}>Done</button>
  return (
    <div>
      <p>{todo.title}</p>
      <textarea value={content} onChange={handleContentChange} onBlur={handleUpdateContent}/>
      <br/>
      <button onClick={handleUpdateContent}>Submit</button>
      <br/>
      {footer}
      {completedTodosLength}/{todosLength}
    </div>
  )
}

export default connect(mapState,mapDispatch)(NextTodo);
