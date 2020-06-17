import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './redux/actions/user';
import { getUserState } from './redux/selectors';
import { statusIndicators } from './helpers/constants';
import { Loading } from './components';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import './assets/styles/app.scss';

const displayApp = status => {
  switch (status) {
    case statusIndicators.PENDING:
      return <Loading />;
    case statusIndicators.SUCCESS:
      return <AuthenticatedApp />;
    case statusIndicators.LOGOUT:
      return <UnauthenticatedApp />;
  }
};

const App = () => {
  const { status } = useSelector(state => getUserState(state));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Router>{displayApp(status)}</Router>;
};

export default App;
