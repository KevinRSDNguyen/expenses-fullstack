import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { startSetExpenses } from './../../store/actions/expenses';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    this.props.startSetExpenses();
  }
  render() {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/dashboard" >
              <h1>Expensify</h1>
            </Link>
            <button className="button button--link">
              <a href="/api/logout" className="nostyle">Log out</a>
            </button>
          </div>
        </div>
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