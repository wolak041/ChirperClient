import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { useDispatch } from 'react-redux';
import { refreshMainFeed } from './redux/actions/mainFeed';
import { MainLayout, Loading } from './components';
import { clientUrls } from './helpers/constants';

const MainFeed = loadable(
  () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "main-feed"  */ './views/MainFeed/MainFeed'
    ),
  {
    fallback: <Loading />,
  },
);
const UserFeed = loadable(
  () =>
    import(
      /*  webpackPrefetch: true, webpackChunkName: "user-feed" */ './views/UserFeed/UserFeed'
    ),
  {
    fallback: <Loading />,
  },
);
const ManageAccount = loadable(
  () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "manage-account" */ './views/ManageAccount/ManageAccount'
    ),
  {
    fallback: <Loading />,
  },
);
const NotFound = loadable(
  () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "not-found" */ './views/NotFound/NotFound'
    ),
  {
    fallback: <Loading />,
  },
);

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
          <NotFound />
        </Route>
      </Switch>
    </MainLayout>
  );
};

export default AuthenticatedApp;
