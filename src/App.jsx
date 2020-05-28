import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import loadable from '@loadable/component'
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from './redux/actions/user';
import { getUserState } from './redux/selectors';
import { statusIndicators } from './helpers/constants';
import { Loading } from './components';
import './assets/styles/app.scss';

const AuthenticatedApp = loadable(() => import(/* webpackChunkName: "auth-app" */ './AuthenticatedApp'), {
  fallback: <Loading />
});

const UnauthenticatedApp = loadable(() => import(/* webpackChunkName: "unauth-app" */ './UnauthenticatedApp'), {
  fallback: <Loading />
});

const displayApp = (status) => {
  switch (status) {
    case statusIndicators.PENDING:
      return <Loading />
    case statusIndicators.SUCCESS:
      return <AuthenticatedApp />
    case statusIndicators.ERROR:
      return <UnauthenticatedApp />
  }
};

const App = () => {
  const { status } = useSelector(state => getUserState(state));

  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(fetchUser()) }, []);

  return (
    <Router>
      <div className="app-container">
        {displayApp(status)}
      </div>
    </Router>
  );

}

export default App;
