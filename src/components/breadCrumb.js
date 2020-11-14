import React, { useEffect, useRef, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './breadCrumb.module.scss';
import { ReactComponent as SeparatorIcon } from 'images/chevron-right.svg';

const Breadcrumb = ({items})=>{
  const match = useRouteMatch();
  const Separator = <div className={styles.separator}><SeparatorIcon/></div>;
  const [displayItems, setDisplayItems] = useState([]);
  useEffect(()=>{
    setDisplayItems([...items].reverse());
  },[items]);



  return (
    <div className={styles.breadcrumb}>
      <div className={styles.container}>
        {displayItems.map((item, index)=> {
          const linkto = item._id==='root' ? match.path : match.path+'/'+item._id;
          const itemDom = <Link className={styles.item} key={item._id} data-_id={item._id} to={linkto}>{item.title}</Link>
          if(index+1<items.length) return [itemDom,Separator];
          else return itemDom;
        })}
      </div>
    </div>
  )
}

export default Breadcrumb;