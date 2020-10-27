import React from 'react';

const Breadcrumb = ({items, onItemClick})=>{
  return (
    <div>
      {items.map(item=>(
        <button onClick={()=>{onItemClick(item._id)}} key={item._id} >{item.title}</button>
      ))}
    </div>
  )
}

export default Breadcrumb;