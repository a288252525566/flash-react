import React,{ useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux'
import * as actions from 'actions';
import styles from 'components/listItem.module.scss';
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
  const [isEditing, setIsEditing] = useState(false);
  const textInput = useRef();

  useEffect(()=>{
    if(isEditing) {
      textInput.current.focus();
      return textInput.current.addEventlistener(()=>{
        setIsEditing(false);
      });
    }
  },[isEditing]);
  const handleToggle = () => {
    onUpdate({isDone:!isDone});
  }
  const handleUpdate = () => {
    onUpdate({title:textInput.value});
  }

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
      <div >
        <input ref={textInput} value={title}/>
        <button className={styles.removeButton} onClick={handleUpdate}>Submit</button>
        <button className={styles.removeButton} onClick={()=>{setIsEditing(false)}}>Cancel</button>
      </div>
    );
  }
}

export default connect(null,mapDispatch)(ListItem);