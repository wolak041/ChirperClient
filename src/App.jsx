import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from "react-router-dom";
import loadable from '@loadable/component'
import { connect } from "react-redux";
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

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  displayApp() {
    switch (this.props.status) {
      case statusIndicators.PENDING:
        return <Loading />
      case statusIndicators.SUCCESS:
        return <AuthenticatedApp />
      case statusIndicators.ERROR:
        return <UnauthenticatedApp />
    }
  }

  render() {
    return (
      <Router>
        <div className="app-container">
          {this.displayApp()}
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func,
  status: PropTypes.string
}

const mapStateToProp = state => getUserState(state);

export default connect(mapStateToProp, { fetchUser })(App);
