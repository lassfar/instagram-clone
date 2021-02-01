import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* Posts */}
    </div>
  );
}

export default App;
