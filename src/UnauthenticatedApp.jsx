import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Entry from './views/Entry/Entry';
import { clientUrls } from './helpers/constants';

const UnauthenticatedApp = () => {
  return (
    <>
      <Switch>
        <Route path={clientUrls.ENTRY}>
          <Entry />
        </Route>
        <Redirect to={clientUrls.ENTRY} />
      </Switch>
    </>
  )
}

export default hot(UnauthenticatedApp);
