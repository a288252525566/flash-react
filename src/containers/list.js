import React, { useRef } from 'react';
import { connect } from 'react-redux'
import * as actions from 'actions';
import ListBody from 'components/listBody';
import ListHead from 'components/listHead';
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
  addTodo,
  reOrderTodos
}) => {
  const textInput = useRef();
  const handleAddTodo = (event) => {
    event.preventDefault();
    addTodo(textInput.current.dataset.tempid,{title:textInput.current.value,parent_id:list.nodeid});
    textInput.current.value = '';
  }

  
  //新增todo的表單作為listBody的children傳下去
  const AddTodoForm = ({onSubmit})=>{
    const tempid = 'temptodoid'+Date.now();
    return (
      <form onSubmit={onSubmit}>
        <input ref={textInput} data-tempid={tempid}/><button>add</button>
      </form>
    )
  }
  const handleClean = () => {
    removeCompletedTodo(list.nodeid);
  }
  const handleDragEnd = result => {
    reOrderTodos(list.todos,result.source.index,result.destination.index);
  }
  return (
    <div>
      <ListHead onClean={handleClean} path={list.path}/>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ListBody todos={list.todos}>
          <AddTodoForm onSubmit={handleAddTodo}/>
        </ListBody>
      </DragDropContext>
    </div>
  );
}

export default connect(mapState,mapDispatch)(List);