import React from 'react';
import Plan from'containers/plan';
import { BrowserRouter , Redirect, Route } from 'react-router-dom';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Route path='/' exact={true}><Redirect to='/plan'/></Route>
        <Route path='/plan'><Plan/></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
