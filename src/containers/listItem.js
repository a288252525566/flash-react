import React,{ useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux'
import * as actions from 'actions';
import styles from './listItem.module.scss';
import { ReactComponent as Enter } from 'images/enter.svg';
/**
 * 處理每個cardItem該有的操作
 * 點擊重設nodeid，編輯title、toggle(是否完成)、刪除
 */
const mapDispatch = (dispatch,ownProps) => {
  return {
    onEnter:()=>{ dispatch(actions.setNodeid(ownProps._id))},
    onUpdate:(data)=>{dispatch(actions.updateCard(ownProps._id,data))},
    onRemove:()=>{ dispatch(actions.removeCard(ownProps._id))},
  }
}
const ListItem = ({
  _id,
  title,
  isDone,
  onEnter,
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

  if(!isEditing) {
    return (
      <div className={className} >
        <Enter onClick={()=>{onEnter(_id);}}/>
        <input type="checkbox" onChange={handleToggle} checked={isDone}/>
        <span onClick={()=>{setIsEditing(true)}}> {title}</span>
        <button className={styles.removeButton} onClick={onRemove}>Remove</button>
      </div>
    );
  }


  else {
    return (
      <div ref={containDiv}>
        <input ref={textInput} value={inputText} onChange={handleInputChange}/>
        <button className={styles.removeButton} onClick={handleUpdate}>Submit</button>
        <button className={styles.removeButton} onClick={()=>{setIsEditing(false)}}>Cancel</button>
      </div>
    );
  }
}

export default connect(null,mapDispatch)(ListItem);