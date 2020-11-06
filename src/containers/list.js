import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import * as actions from 'actions';
import ListBody from 'components/listBody';
import ListHead from 'components/listHead';


const mapState = state=>({list:state.list});
const mapDispatch = {
  setNodeid: actions.setNodeid,
  removeCompltedTodo: actions.removeCompltedTodo,
  addTodo: actions.addTodo
}

const List = ({
  list,
  setNodeid,
  removeCompltedTodo,
  addTodo
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
  useEffect(()=>{
    console.log('Render');
  });
  const handleClean = () => {
    removeCompltedTodo(list.nodeid);
  }
  return (
    <div>
      <ListHead setNodeid={setNodeid} onClean={handleClean} path={list.path}/>
      <ListBody todos={list.todos}>
        <AddTodoForm onSubmit={handleAddTodo}/>
      </ListBody>
    </div>
  );
}

export default connect(mapState,mapDispatch)(List);