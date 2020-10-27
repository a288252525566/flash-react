import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import * as actions from 'actions';
import ListBody from 'components/listBody';
import ListHead from 'components/listHead';


const mapState = state=>({list:state.list});
const mapDispatch = {
  setNodeid: actions.setNodeid,
  removeCompltedCard: actions.removeCompltedCard,
  addCard: actions.addCard
}

const List = ({
  list,
  setNodeid,
  removeCompltedCard,
  addCard
}) => {
  const textInput = useRef();
  const handleAddCard = (event) => {
    event.preventDefault();
    addCard(textInput.current.dataset.tempid,{title:textInput.current.value,parent_id:list.nodeid});
    textInput.current.value = '';
  }

  
  //新增card的表單作為listBody的children傳下去
  const AddCardForm = ({onSubmit})=>{
    const tempid = 'tempcardid'+Date.now();
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
    removeCompltedCard(list.nodeid);
  }
  return (
    <div>
      <ListHead setNodeid={setNodeid} onClean={handleClean} path={list.path}/>
      <ListBody cards={list.cards}>
        <AddCardForm onSubmit={handleAddCard}/>
      </ListBody>
    </div>
  );
}

export default connect(mapState,mapDispatch)(List);