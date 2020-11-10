import React from 'react';
import Plan from'containers/plan';
import { BrowserRouter , Redirect, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter className="App">
      <Route path='/' exact={true}><Redirect to='/plan'/></Route>
      <Route path='/plan'><Plan/></Route>
    </BrowserRouter>
  );
}

export default App;
