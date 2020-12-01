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
  const [submitId, setSubmitId] = useState('');//submitId用來避免使用者重複submit造成重複新增
  const editorRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();



  //每次換todo時
  useEffect(()=>{
    //如果從undefined變成string會出現警告
    const nt = todo.title? todo.title: '';
    const nc = todo.content? todo.content: '';
    setNewTitle(nt);
    setNewContent(nc);
    setSubmitId('submitId'+Date.now());
  },[todo]);




  //關閉editor的監聽器操作
  const [isMouseDownOutside, setIsmouseDownOutside] = useState(false);
  const handleMouseDownOutside = event => {
    //告訴component滑鼠是否在editor以外的地方按下了
    if(editorRef.current && editorRef.current.contains(event.target)) setIsmouseDownOutside(false);
    else setIsmouseDownOutside(true);
  }
  const handleMouseUpOutside = event => {
    //如果滑鼠從editor外面按下，並且在editor外面放開，關閉editor
    if(
      isMouseDownOutside
      && editorRef.current
      && !editorRef.current.contains(event.target)
    ) handleCancelClick();

    setIsmouseDownOutside(false);
  }
  const handleEscDown = event => {
    if(event.which!==27) return;
    handleCancelClick();
  }
  useEffect(()=>{
    if(!editorRef.current) return ;
    document.addEventListener('keydown',handleEscDown);
    document.addEventListener('mousedown',handleMouseDownOutside);
    document.addEventListener('mouseup',handleMouseUpOutside);
    return ()=>{
      document.removeEventListener('keydown',handleEscDown);
      document.removeEventListener('mousedown',handleMouseDownOutside);
      document.removeEventListener('mouseup',handleMouseUpOutside);
    }
  });


  

  //如果render成功，需要focus在title input上
  useEffect(()=>{
    if(!titleRef.current || !contentRef.current) return;
    if(!todo.title) titleRef.current.focus();
    else contentRef.current.focus();
  },[todo,isEditorDisplay])




  //關閉editor時重設state避免讀取到修改過的資料
  const resetState = () => {
    setNewTitle(todo.title);
    setNewContent(todo.content);
  }
  const handleCancelClick = () => {
    hideEditor();
    resetState();
  }




  //state changes
  const handleTitleChange = e => {
    setNewTitle(e.target.value);
  }
  const handleContentChange = e => {
    setNewContent(e.target.value);
  }
  const handleSubmit = (event) => {
    //如果沒有id就add,有id就update
    event.preventDefault();
    const data = {parent_id:todo.parent_id,title:newTitle,content:newContent};
    if(!todo._id) addTodo(submitId,data);
    else updateTodo(todo._id,data);
    hideEditor();
  }




  //render
  if(!isEditorDisplay) return <div></div>

  return (<div id={styles.container}>
    <form onSubmit={handleSubmit} ref={editorRef} id={styles.editor}>
      <input
        tabIndex={2}
        className={styles.titleInput}
        value={newTitle}
        placeholder='輸入事項的標題...'
        onChange={handleTitleChange}
        ref={titleRef}/>

      <textarea
        tabIndex={2}
        id={styles.contentInput}
        value={newContent}
        placeholder='輸入事項描述...'
        onChange={handleContentChange}
        ref={contentRef}
        resize='false'/>

      <div id={styles.footer}>
        <button tabIndex={2} id={styles.submitButton} className={styles.button}>送出</button>
        <div tabIndex={2} id={styles.cancelButton} onClick={handleCancelClick} className={styles.button}>取消</div>
      </div>
    </form>
  </div>)
}

export default connect(mapToState,mapToDispatch)(EditTodo);