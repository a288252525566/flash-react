import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import * as styles from './todoEditor.module.scss';
import * as uiActions from 'actions/ui';
import * as todoActions from 'actions/todo';

const mapToState = state => {
  return {
    isEditorDisplay:state.ui.isEditorDisplay,
    todo:state.ui.editorData
  }
}
const mapToDispatch = {
  hideEditor:uiActions.hideEditor,
  updateTodo:todoActions.updateTodo,
  addTodo:todoActions.addTodo
}

const EditTodo = ({isEditorDisplay, hideEditor, todo = {}, updateTodo, addTodo}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [submitId, setSubmitId] = useState('');
  const editorRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  //每次更新todo時
  useEffect(()=>{
    //如果從undefined變成string會出現警告
    const nt = todo.title? todo.title: '';
    const nc = todo.content? todo.content: '';
    setNewTitle(nt);
    setNewContent(nc);
    setSubmitId('submitId'+Date.now());
  },[todo._id])

  //每次render都要加上監聽器handleClickOutside
  useEffect(()=>{
    if(!editorRef.current) return ;
    document.addEventListener('click',handleClickOutside);
    return ()=>{
      document.removeEventListener('click',handleClickOutside);
    }
  });

  //如果render成功，需要focus在title input上
  useEffect(()=>{
    if(!titleRef.current || !contentRef.current) return;
    if(!todo.title) titleRef.current.focus();
    else contentRef.current.focus();
  },[todo])

  const handleClickOutside = event => {
    //關閉editor
    if(editorRef.current && editorRef.current.contains(event.target)) return;
    hideEditor();
  }
  const handleTitleChange = e => {
    setNewTitle(e.target.value);
  }
  const handleContentChange = e => {
    setNewContent(e.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {parent_id:todo.parent_id,title:newTitle,content:newContent};
    if(!todo._id) addTodo(submitId,data);
    else updateTodo(todo._id,data);
    hideEditor();
  }

  if(!isEditorDisplay) return <div></div>

  return (<div id={styles.container}>
    <form onSubmit={handleSubmit} ref={editorRef} id={styles.editor}>
      <input
        className={styles.titleInput}
        value={newTitle}
        placeholder='輸入事項的標題...'
        onChange={handleTitleChange}
        ref={titleRef}/>

      <textarea
        className={styles.contentInput}
        value={newContent}
        placeholder='輸入事項描述...'
        onChange={handleContentChange}
        ref={contentRef}
        resize='false'/>

      <button>submit</button>
      <div onClick={hideEditor}>close</div>
    </form>
  </div>)
}

export default connect(mapToState,mapToDispatch)(EditTodo);