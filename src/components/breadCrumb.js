import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Breadcrumb = ({items})=>{
  const match = useRouteMatch();
  return (
    <div>
      {items.map(item=> {

        const linkto = item._id==='root' ? match.path : match.path+'/'+item._id;
        return <Link key={item._id}  to={linkto}><button >{item.title}</button></Link>
      })}
    </div>
  )
}

export default Breadcrumb;