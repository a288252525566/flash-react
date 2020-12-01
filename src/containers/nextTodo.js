import * as actions from 'actions/todo';
import * as selector from 'selector';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import FlashApi from 'api/FlashApi';
import * as styles from './nextTodo.module.scss';



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
  },[todo]);
  
  const handleContentChange = event => {
    setContent(event.target.value);
  }
  const handleUpdateContent = () => {
    updateItem(todo._id,{content});
  }
  const handleDoneClick = () => {
    updateItem(todo._id,{isDone:true});
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
  

  return (
    <div id={styles.nextTodo}>
      <div id={styles.display}>
        <p id={styles.title}>{todo.title}</p>
        <textarea id={styles.content} value={content} onChange={handleContentChange} onBlur={handleUpdateContent}/>
      </div>

      <div id={styles.footer}>
        {todoChildren.length? <Link to={match.path+'/'+todo._id} ><span id={styles.enterButton} className={styles.button}>Enter</span></Link>:null}
        <span id={styles.doneButton} className={styles.button} onClick={handleDoneClick}>Done</span>
        {completedTodosLength}/{todosLength}
      </div>
    </div>
  )
}

export default connect(mapState,mapDispatch)(NextTodo);
