import React from 'react';
import BreadCrumb from 'components/breadCrumb';
import { ReactComponent as TrashIcon } from 'images/trash.svg';

const ListHead = ({path,onClean})=>{
  return <div>
    <BreadCrumb items={path} />
    <TrashIcon onClick={onClean}/>
  </div>
}

export default ListHead;