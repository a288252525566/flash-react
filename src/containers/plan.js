import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as actions from 'actions/todo';
import { connect } from 'react-redux';
import PlanBody from 'components/planBody';
import TodoEditor from 'containers/todoEditor'
import Header from 'components/header';

const mapDispatch = {
  setNodeid:actions.setNodeid
}

const mapState = (state) => {
  return {
    path:state.list.path
  }
}


const Plan =  ({path, setNodeid})=>{
  const match = useRouteMatch();
  const nodeid = useRouteMatch(match.path+'/:nodeid?').params.nodeid;
  useEffect(()=>{
    if(!!!nodeid) setNodeid('root');
    else setNodeid(nodeid);
  },[nodeid,setNodeid])
  return <div>
    <Header/>
    <PlanBody path={path}/>
    <TodoEditor/>
  </div>
}

export default connect(mapState,mapDispatch)(Plan);