import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home';
import Register from './users/Register';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Dreams from './dreams/Index';
import NewDream from './dreams/New';
import EditDream from './dreams/Edit';

import ShowDream from './dreams/Show';

import { Fragment } from "react";

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/" render={
        renderProps => <Home
          {...renderProps}
          user={user}
        />
      }/>

     
      <Route exact path="/register" render={
        renderProps => <Register
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      
      {
        
      }
      <Route exact path="/dreams" render={
        props => user ? (
          <Dreams {...props} user={user} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
      <Route exact path="/dreams/new" render={
        props => user ? (
          <NewDream {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
      <Route exact path="/dreams/edit" render={
        props => user ? (
          <EditDream {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>

      <Route exact path="/dreams/show" render={
        props => user ? (
          <ShowDream {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
    </Switch>
  );
}

export default Routes;