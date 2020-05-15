import React from 'react';
import PropTypes from 'prop-types';
import './assets/styles/app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect
} from "react-router-dom";
import loadable from '@loadable/component'
import { connect } from "react-redux";
import { fetchUser } from './redux/actions/user';
import { getUserState } from './redux/selectors';
import Loading from './components/Loading/Loading';

const Entry = loadable(() => import('./views/Entry/Entry'), {
  fallback: <Loading />
});

const MainFeed = loadable(() => import('./views/MainFeed/MainFeed'), {
  fallback: <Loading />
});

const ManageAccount = loadable(() => import('./views/ManageAccount/ManageAccount'), {
  fallback: <Loading />
});

const UserFeed = loadable(() => import('./views/UserFeed/UserFeed'), {
  fallback: <Loading />
});

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    // const { status } = this.state;
    //TODO: fix protected paths use react context or Redux store
    return (
      <Router>
        <div className="app-container">
          {/* {status === 'success' && <Redirect to="/" />}
          {status === 'error' && <Redirect to='/entry' />} */}
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

App.propTypes = {
  fetchUser: PropTypes.func,
  store: PropTypes.any
}

const mapStateToProp = state => getUserState(state);

export default connect(mapStateToProp, { fetchUser })(App);
