import React from 'react';
import BreadCrumb from 'components/breadCrumb';
import { ReactComponent as TrashIcon } from 'images/trash.svg';

export default ({path,setNodeid,onClean})=>{
  return <div>
    <BreadCrumb items={path} onItemClick={setNodeid}/>
    <TrashIcon onClick={onClean}/>
  </div>
}