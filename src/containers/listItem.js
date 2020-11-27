import React from 'react';
import { connect } from 'react-redux'
import * as todoActions from 'actions/todo';
import * as uiActions from 'actions/ui';
import styles from './listItem.module.scss';
import { ReactComponent as Enter } from 'images/enter.svg';
import { ReactComponent as TodoDragHandle } from 'images/todoDragHandle.svg';
import { ReactComponent as Trash } from 'images/trash.svg';
import { Link, useRouteMatch } from 'react-router-dom';
import {Draggable} from 'react-beautiful-dnd';

/**
 * 處理每個todoItem該有的操作
 * 點擊重設nodeid，編輯title、toggle(是否完成)、刪除
 */
const mapDispatch = (dispatch,ownProps) => {
  return {
    onUpdate:data=>{dispatch(todoActions.updateTodo(ownProps._id,data))},
    onRemove:()=>{ dispatch(todoActions.removeTodo(ownProps._id))},
    showEditor:()=>{uiActions.showEditor()(dispatch)},
    setEditorData:data=>{uiActions.setEditorData(data)(dispatch)}
  }
}
const ListItem = ({
  dragIndex,
  todo,
  onUpdate,
  onRemove,
  showEditor,
  setEditorData
}) => {
  //按下完成按鈕
  const handleToggle = () => {
    onUpdate({isDone:!todo.isDone});
  }

  const handleEditClick = () => {
    showEditor();
    setEditorData(todo)
  }
  const match = useRouteMatch();

  const getClassName = () => {
    let result = styles.todoItem;
    if(todo.isDone) result += ' '+styles.checked;
    return result;
  }

  return (
    <Draggable draggableId={todo._id} index={dragIndex}>
      { provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} >
          <div className={getClassName()} >
            <div className={styles.left}>
              <span className={styles.dragHandle} {...provided.dragHandleProps}><TodoDragHandle/></span>
              <input className={styles.checkBox} type="checkbox" onChange={handleToggle} checked={todo.isDone}/>
              <span className={styles.titleBar} onClick={handleEditClick}> {todo.title}</span>
            </div>
            <div className={styles.right}>
              <span className={styles.removeButton} onClick={onRemove}><Trash/></span>
              <Link className={styles.enterButton} to={match.path+'/'+todo._id} ><Enter/></Link>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}


export default connect(null,mapDispatch)(ListItem);