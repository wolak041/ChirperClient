import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { MainFeed, UserFeed, ManageAccount } from './views';

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path="/">
        <MainFeed />
      </Route>
      <Route path="/user/:userId">
        <UserFeed />
      </Route>
      <Route path="/account">
        <ManageAccount />
      </Route>
      <Redirect from="/entry" to="/" />
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  )
}

export default AuthenticatedApp;
