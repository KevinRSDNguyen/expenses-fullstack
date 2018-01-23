import uuid from 'uuid';
import axios from 'axios';

export const addExpense = ({ description, note, amount, createdAt }) => {
  return {
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  };
};

export const editExpense = (id, updates) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates
  };
};

export const removeExpense = (id) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  };
};

export const setExpenses = (expenses) => {
  return {
    type: 'SET_EXPENSES',
    expenses
  };
};

export const startSetExpenses = () => {
  return dispatch => {
    axios.get('/api/expenses')
    .then(({data}) => {
      dispatch(setExpenses(data));
    })
    .catch((error) => {
      alert('could not fetch expenses');
    });
};
};