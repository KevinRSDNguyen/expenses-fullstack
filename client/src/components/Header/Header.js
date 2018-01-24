import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Expensify</h1>
      <NavLink to="/dashboard" activeClassName="is-active" exact={true}>Dashboard</NavLink>
      <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
      <button>
        <a href="/api/logout">Logout</a>
      </button>
    </header>
  );
};

export default Header;