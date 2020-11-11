import React from 'react';
import { ReactComponent as TrashIcon } from 'images/trash.svg';

const ListHead = ({onClean})=>{
  return <div>
    <TrashIcon onClick={onClean}/>
  </div>
}

export default ListHead;