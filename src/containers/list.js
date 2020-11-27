import React from 'react';
import { connect } from 'react-redux'
import * as actions from 'actions/todo';
import ListBody from 'components/listBody';
import ListHead from 'components/listHead';
import AddTodo from 'containers/addTodo';
import * as styles from './list.module.scss';
import { DragDropContext } from 'react-beautiful-dnd';


const mapState = state=>({list:state.list});
const mapDispatch = {
  removeCompletedTodo: actions.removeCompletedTodo,
  addTodo: actions.addTodo,
  reOrderTodos:actions.reOrderTodos
}

const List = ({
  list,
  removeCompletedTodo,
  reOrderTodos
}) => {
  const handleClean = () => {
    removeCompletedTodo(list.nodeid);
  }
  const handleDragEnd = result => {
    reOrderTodos(list.todos,result.source.index,result.destination.index);
  }
  
  return (
    <div className={styles.list}>
      <div className={styles.section}>
        <ListHead title={list.path.length ? list.path[list.path.length-1].title:''} onClean={handleClean} path={list.path}/>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ListBody todos={list.todos}/>
      </DragDropContext>
      <div className={styles.section}>
        <AddTodo parent_id={list.nodeid}/>
      </div>
    </div>
  );
}

export default connect(mapState,mapDispatch)(List);