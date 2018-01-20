import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import expensesReducer from './store/reducers/expenses';
import filtersReducer from './store/reducers/filters';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
