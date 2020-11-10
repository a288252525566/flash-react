import * as actions from 'actions';
import * as selector from 'selector';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import FlashApi from 'api/FlashApi';



const mapState = state => {
  return {
    todos:state.list.todos
  }
}

const mapDispatch = {
  updateItem:(_id,data)=>{return actions.updateTodo(_id,data)}
}


//considered names:todoBox, highlightTodo, taskNow
const NextTodo = ({
  updateItem,
  todos = []
}) => {
  const match = useRouteMatch();
  //nexttodo
  const [content,setContent] = useState('');
  const [todoChildren,setTodoChildren] = useState([]);
  
  const todo = selector.getNextTodo(todos);

  //更新了todos
  useEffect(()=>{
    if(!!!todo._id) return;
    //更新todo content
    if(!!!todo.content) setContent('');
    else setContent(todo.content);

    //重新fetcht odoChildren
    FlashApi.getTodoList(todo._id).then(promise=>{
      if(!!!promise.result.length || promise.result[0].parent_id===todo._id) {
        setTodoChildren(promise.result);
      }
    });
  },[todo._id]);
  
  const handleContentChange = event => {
    setContent(event.target.value);
  }
  const handleUpdateContent = () => {
    updateItem(todo._id,{content});
  }
  const handleDoneClick = () => {
    updateItem(todo._id,{idDone:true});
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
  

  const footer = todoChildren.length ?
  (<div><Link to={match.path+'/'+todo._id} ><button >Enter</button></Link><button onClick={handleDoneClick}>Done</button></div>):
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
