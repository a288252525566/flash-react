import React,{ useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux'
import * as actions from 'actions/todo';
import styles from './listItem.module.scss';
import { ReactComponent as Enter } from 'images/enter.svg';
import { ReactComponent as TodoDragHandle } from 'images/todoDragHandle.svg';
import { ReactComponent as Trash } from 'images/trash.svg';
import { ReactComponent as SubmitBtn } from 'images/check-circle.svg';
import { ReactComponent as CancelBtn } from 'images/times-circle.svg';
import { Link, useRouteMatch } from 'react-router-dom';
import {Draggable} from 'react-beautiful-dnd';

/**
 * 處理每個todoItem該有的操作
 * 點擊重設nodeid，編輯title、toggle(是否完成)、刪除
 */
const mapDispatch = (dispatch,ownProps) => {
  return {
    onUpdate:(data)=>{dispatch(actions.updateTodo(ownProps._id,data))},
    onRemove:()=>{ dispatch(actions.removeTodo(ownProps._id))},
  }
}
const ListItem = ({
  dragIndex,
  _id,
  title,
  isDone,
  onUpdate,
  onRemove
}) => {

  //控制是否render input
  const [isEditing, setIsEditing] = useState(false);


  const handleToggle = () => {
    onUpdate({isDone:!isDone});
  }
  
  //for input
  const containDiv = useRef();
  const [inputText, setInputText] = useState(title);
  const handleInputChange = event => {
    setInputText(event.target.value);
  }

  const handleClickOutside = event => {
    if (containDiv.current && !containDiv.current.contains(event.target)) {
      setIsEditing(false);
    }
  }
  const handleUpdate = () => {
    onUpdate({title:inputText});
    setIsEditing(false);
  }
  useEffect(()=>{
    if(!isEditing) return;
    document.addEventListener("mousedown", handleClickOutside);
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside);
    }

  },[isEditing]);
  const match = useRouteMatch();

  const getClassName = () => {
    let result = styles.todoItem;
    if(isDone) result += ' '+styles.checked;
    if(isEditing) result += ' '+styles.edit;
    return result;
  }
  const TitleBar = () => {
    const textInput = useRef();
    useEffect(()=>{
      if(!isEditing) return;
      textInput.current.focus();
    },[isEditing]);
    if(isEditing) return (<form className={styles.titleBar} onSubmit={handleUpdate}>
      <input ref={textInput} value={inputText} onChange={handleInputChange}/>
    </form>)
    else return (<span className={styles.titleBar} onClick={()=>{setIsEditing(true)}}> {title}</span>);
  }
  const Buttons = () => {
    if(isEditing) return (<div>
        <span className={styles.svgButton} onClick={handleUpdate}><SubmitBtn/></span>
        <span className={styles.svgButton} onClick={()=>{setIsEditing(false)}}><CancelBtn/></span>
    </div>);
    else return (<div> 
        <span className={styles.removeButton} onClick={onRemove}><Trash/></span>
        <Link className={styles.enterButton} to={match.path+'/'+_id} ><Enter/></Link>
    </div>);
  }
  return (
    <Draggable draggableId={_id} index={dragIndex}>
      { provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} >
          <div ref={containDiv} className={getClassName()} >
            <div className={styles.left}>
              <span className={styles.dragHandle} {...provided.dragHandleProps}><TodoDragHandle/></span>
              <input className={styles.checkBox} type="checkbox" onChange={handleToggle} checked={isDone}/>
              <TitleBar/>
            </div>
            <div className={styles.right}>
              <Buttons/>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}


export default connect(null,mapDispatch)(ListItem);