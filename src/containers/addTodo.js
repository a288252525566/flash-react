import React from 'react';
import * as styles from './addTodo.module.scss';
import * as actions from 'actions/ui';
import { connect } from 'react-redux';

const mapToDispatch = {
  showEditor:actions.showEditor,
  setEditorData:actions.setEditorData
}


const AddTodo = ({parent_id, showEditor, setEditorData}) => {
  const handleOnclick = () => {
    setEditorData({parent_id, title:'', content:''});//新todo的基本資料
    showEditor();
  }
  return (<div className={styles.addTodo}>
    <div onClick={handleOnclick} className={styles.addButton}>

    </div>
  </div>)
}

export default connect(null,mapToDispatch)(AddTodo);