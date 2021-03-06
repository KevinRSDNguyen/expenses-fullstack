import React from 'react';
import ExpensesSummary from './../ExpensesSummary/ExpensesSummary';
import ExpenseListFilters from './../../containers/ExpenseListFilters/ExpenseListFilters';
import ExpenseList from './../ExpenseList/ExpenseList';

const ExpenseDashboardPage = () => {
  return (
    <div>
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  );
};

export default ExpenseDashboardPage;