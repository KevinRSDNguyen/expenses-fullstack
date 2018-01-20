import uuid from 'uuid';

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