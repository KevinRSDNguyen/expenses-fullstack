import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './store/actions/auth';
import Aux from './hoc/Auxx/Auxx';
import Header from './components/Header/Header';
import ExpenseDashboardPage from './components/ExpenseDashboardPage/ExpenseDashboardPage';
import AddExpensePage from './containers/AddExpensePage/AddExpensePage';
import EditExpensePage from './containers/EditExpensePage/EditExpensePage';
import LoginPage from './components/LoginPage/LoginPage';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Redirect to='/' />
      </Switch>
    );
    // if (this.props.isAuthenticated) {
      routes = (
        <Aux>
          <Header />
          <Switch>
          <Route path='/' exact component={LoginPage} />
        {/* <Redirect to='/' /> */}
            <Route path="/dashboard" component={ExpenseDashboardPage} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit/:id" component={EditExpensePage} />
            {/* <Redirect to='/dashboard' /> */}
          </Switch>
        </Aux>
      );
    // }
    return (
      <div>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
