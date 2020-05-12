import React from 'react';
import './assets/styles/app.scss';
import getUser from './services/getUser';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import loadable from '@loadable/component'
import Loading from './components/Loading/Loading';

const Entry = loadable(() => import('./pages/Entry/Entry'), {
  fallback: <Loading />
});

const MainFeed = loadable(() => import('./pages/MainFeed/MainFeed'), {
  fallback: <Loading />
});

const ManageAccount = loadable(() => import('./pages/ManageAccount/ManageAccount'), {
  fallback: <Loading />
});

const UserFeed = loadable(() => import('./pages/UserFeed/UserFeed'), {
  fallback: <Loading />
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'pending',
      error: null,
      user: null
    }
  }

  componentDidMount() {
    this.handleGetUser()
  }

  async handleGetUser() {
    try {
      const { user } = await getUser();
      this.setState({ status: 'success', error: null, user });

    } catch (error) {
      this.setState({ status: 'error', error: error.message, user: null });
    }
  }

  render() {
    const { status } = this.state;

    return (
      <Router>
        <div className="app-container">
          {status === 'success' && <Redirect to="/" />}
          {status === 'error' && <Redirect to='/entry' />}
          <Switch>
            <Route path="/user/:userId">
              <UserFeed />
            </Route>
            <Route path="/account">
              <ManageAccount />
            </Route>
            <Route path="/entry">
              <Entry />
            </Route>
            <Route path="/">
              <MainFeed />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
