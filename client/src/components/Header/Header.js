import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {startSetExpenses} from './../../store/actions/expenses';
import { connect } from 'react-redux';

class Header extends Component {
  componentDidMount() {
    this.props.startSetExpenses();
  }
  render() {
    return (
      <header>
        <h1>Expensify</h1>
        <NavLink to="/dashboard" activeClassName="is-active" exact>
          Dashboard
        </NavLink>
        <NavLink to="/create" activeClassName="is-active" >
          Create expense
        </NavLink>
        <button>
          <a href="/api/logout">Logout</a>
        </button>
      </header>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    startSetExpenses: () => dispatch(startSetExpenses())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Header));