import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshMainFeed } from './redux/actions/mainFeed';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainFeed, UserFeed, ManageAccount } from './views';
import { MainLayout } from './components';
import { clientUrls } from './helpers/constants';

const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshMainFeed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <Switch>
        <Route exact path={clientUrls.MAIN}>
          <MainFeed />
        </Route>
        <Route path={`${clientUrls.USER}/:userId`}>
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
    </MainLayout>
  );
};

export default hot(AuthenticatedApp);
