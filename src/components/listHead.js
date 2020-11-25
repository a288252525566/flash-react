import React from 'react';
import { ReactComponent as BroomIcon } from 'images/broom.svg';
import * as styles from './listHead.module.scss';

const ListHead = ({title, onClean})=>{
  return <div className={styles.listHead}>
    <h2 className={styles.title}>{title}</h2>
    <div calssName={styles.buttons}>
      <BroomIcon className={styles.button} title={'清除已完成項目'} onClick={onClean}/>
    </div>
  </div>
}

export default ListHead;