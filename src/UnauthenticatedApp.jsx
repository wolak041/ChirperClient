import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { Loading } from './components';
import { clientUrls } from './constants';

const Entry = loadable(
  () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "entry" */ './views/Entry/Entry'
    ),
  {
    fallback: <Loading />,
  },
);

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route path={clientUrls.ENTRY}>
        <Entry />
      </Route>
      <Redirect to={clientUrls.ENTRY} />
    </Switch>
  );
};

export default UnauthenticatedApp;
