import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './../ExpenseListItem/ExpenseListItem';
import selectExpenses from './../../selectors/expenses';

const ExpenseList = ({ expenses }) => {
  const output = expenses.length === 0 ?
    <p>No expenses</p> :
    expenses.map(expense => {
      return <ExpenseListItem key={expense._id} {...expense} />
    });
  return (
    <div>
      {output}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);