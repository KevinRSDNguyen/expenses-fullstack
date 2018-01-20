const expensesTotal = (expenses) => {
  return expenses.map(expense => {
    return expense.amount;
  })
  .reduce((acc, next) => {
    return acc + next;
  }, 0);
};

export default expensesTotal;