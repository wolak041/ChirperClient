import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { MainFeed, UserFeed, ManageAccount } from './views';
import { clientUrls } from './helpers/constants';

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path={clientUrls.MAIN}>
        <MainFeed />
      </Route>
      <Route path={clientUrls.USER}>
        <UserFeed />
      </Route>
      <Route path={clientUrls.ACCOUNT}>
        <ManageAccount />
      </Route>
      <Redirect from={clientUrls.ENTRY} to={clientUrls.MAIN} />
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  )
}

export default hot(AuthenticatedApp);
