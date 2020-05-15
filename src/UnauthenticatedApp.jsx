import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Entry from './views/Entry/Entry';

const UnauthenticatedApp = () => {
  return (
    <>
      <Switch>
        <Route path="/entry">
          <Entry />
        </Route>
        <Redirect to="/entry" />
      </Switch>
    </>
  )
}

export default UnauthenticatedApp;
