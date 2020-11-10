import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as actions from 'actions';
import List from 'containers/list';
import NextTodo from'containers/nextTodo';
import { connect } from 'react-redux';
import Header from 'components/header';

const mapDispatch = {
  setNodeid:actions.setNodeid
}



const Plan =  ({setNodeid})=>{
  const match = useRouteMatch();
  const nodeid = useRouteMatch(match.path+'/:nodeid?').params.nodeid;
  useEffect(()=>{
    if(!!!nodeid) setNodeid('root');
    else setNodeid(nodeid);
  },[nodeid,setNodeid])
  return <div>
    <Header/>
    <List/>
    <NextTodo/>
  </div>
}

export default connect(null,mapDispatch)(Plan);