import React from 'react';
import List from 'containers/list';
import NextTodo from'containers/nextTodo';
import BreadCrumb from 'components/breadCrumb';
import styles from './planBody.module.scss';

const PlanBody = ({path}) => {
  return (<div className={styles.planBody}>
    <div className={styles.item}>
      <BreadCrumb items={path} />
    </div>
    
    <div className={styles.item+' '+styles.noPadding}>
      <List/>
    </div>

    <div className={styles.item}>
      <NextTodo/>
    </div>
  </div>)
}
export default PlanBody;