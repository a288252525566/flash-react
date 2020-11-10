import React from 'react';
import BreadCrumb from 'components/breadCrumb';
import { ReactComponent as TrashIcon } from 'images/trash.svg';

export default ({path,onClean})=>{
  return <div>
    <BreadCrumb items={path} />
    <TrashIcon onClick={onClean}/>
  </div>
}