import React, { useEffect, useRef, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './breadCrumb.module.scss';
import { ReactComponent as SeparatorIcon } from 'images/chevron-right.svg';
import { ReactComponent as MoreIcon } from 'images/angle-double-left.svg';

const Breadcrumb = ({items})=>{
  const match = useRouteMatch();
  const [displayItems, setDisplayItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [showHidden,setShowHidden] = useState(false);
  const breadcrumbRef = useRef();

  //render後將位置不在第一行的item放進hiddenItems array中
  const splitItems = () => {
    const nodeList = breadcrumbRef.current.querySelectorAll('.'+styles.item);
    if(nodeList.length===0) return;
    const allItem = [...items].reverse();
    const newHiddenItems = [];
    const newDisplayItems = []; 
    nodeList.forEach((dom)=>{
      const theItem = allItem.find(item=>(item._id===dom.dataset._id));
      if(dom.offsetTop!==0) newHiddenItems.push(theItem);
      else newDisplayItems.push(theItem);
    });
    if(displayItems.length!==newDisplayItems.length && hiddenItems.length!==newHiddenItems.length){
      setDisplayItems(newDisplayItems);
      setHiddenItems(newHiddenItems);
    }
  }
  //第一次設置items才會進行render
  useEffect(()=>{
    setDisplayItems([...items].reverse());
    setHiddenItems([]);
  },[items]);

  //re-render之後觸發這個effect然後執行分類
  useEffect(splitItems,[displayItems.length,hiddenItems.length,items]);
  

  //展開折疊的連結
  const handleUnfold = () => {
   setShowHidden(true); 
  }
  const handleFold = () => {
    setShowHidden(false);
  }

  

  //for render
  const Separator = ()=>(<div className={styles.separator}><SeparatorIcon/></div>);
  const getItemDom = (item) => (
    <Link 
      onClick={handleFold}
      to={item._id==='root' ? match.path : match.path+'/'+item._id}
      className={styles.item} key={item._id} data-_id={item._id}>
        {item.title}
    </Link>
  )

  const render = () => {
    const isSomeHidding = hiddenItems.length? true:false;
    const hiddenMenu = (<div className={styles.hiddenMenu}>
      {hiddenItems.map(item=>{
        return getItemDom(item);
      })}
    </div>)
    return (
      <div ref={breadcrumbRef} onMouseLeave={handleFold} className={styles.breadcrumb}>
        <div className={styles.container}>
          {isSomeHidding? null : <div className={styles.moreIcon_formeasuring} ><MoreIcon/></div> }
          {displayItems.map((item, index)=> {
            const itemDom = getItemDom(item);
            if(index+1<displayItems.length) return [itemDom,<Separator key={item._id+'sep'}/>];
            else return itemDom;
          })}
          {isSomeHidding? <div onClick={handleUnfold} className={styles.moreIcon} ><MoreIcon/></div> : null}
        </div>
        {showHidden? hiddenMenu : null}
      </div>
    )
  }
  return render();
}

export default Breadcrumb;