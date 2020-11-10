import React,{ useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux'
import * as actions from 'actions';
import styles from './listItem.module.scss';
import { ReactComponent as Enter } from 'images/enter.svg';
import { Link, useRouteMatch } from 'react-router-dom';
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
  _id,
  title,
  isDone,
  onUpdate,
  onRemove
}) => {
  const className = isDone? styles.checked:styles;
  //控制是否render input
  const [isEditing, setIsEditing] = useState(false);


  const handleToggle = () => {
    onUpdate({isDone:!isDone});
  }
  
  //for input
  const textInput = useRef();
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
    textInput.current.focus();
  },[isEditing]);
  useEffect(()=>{
    if(!isEditing) return;
    document.addEventListener("mousedown", handleClickOutside);
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside);
    }

  },[isEditing]);
  const match = useRouteMatch();

  if(!isEditing) {
    return (
      <div className={className} >
        <Link to={match.path+'/'+_id} ><Enter /></Link>
        <input type="checkbox" onChange={handleToggle} checked={isDone}/>
        <span onClick={()=>{setIsEditing(true)}}> {title}</span>
        <button className={styles.removeButton} onClick={onRemove}>Remove</button>
      </div>
    );
  }


  else {
    return (
      <form ref={containDiv} onSubmit={handleUpdate}>
        <input ref={textInput} value={inputText} onChange={handleInputChange}/>
        <button className={styles.removeButton} >Submit</button>
        <button className={styles.removeButton} onClick={()=>{setIsEditing(false)}}>Cancel</button>
      </form>
    );
  }
}

export default connect(null,mapDispatch)(ListItem);