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