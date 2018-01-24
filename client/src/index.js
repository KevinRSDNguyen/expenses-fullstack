import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import expensesReducer from './store/reducers/expenses';
import filtersReducer from './store/reducers/filters';
import authReducer from './store/reducers/auth';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
