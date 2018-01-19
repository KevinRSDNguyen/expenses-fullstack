import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import ExpenseDashboardPage from './components/ExpenseDashboardPage/ExpenseDashboardPage';
import AddExpensePage from './containers/AddExpensePage/AddExpensePage';
import EditExpensePage from './containers/EditExpensePage/EditExpensePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={ExpenseDashboardPage} exact={true} />
          <Route path="/create" component={AddExpensePage} />
          <Route path="/edit/:id" component={EditExpensePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
