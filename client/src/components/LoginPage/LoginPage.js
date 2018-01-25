import React from 'react';
import './LoginPage.css';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expenses Full Stack App</h1>
      <p>It's time to get your expenses under control</p>
      <div className="button">
        <a href="/auth/google" className="nostyle">Login with Google</a>
      </div>
    </div>
  </div>
);

export default LoginPage;
