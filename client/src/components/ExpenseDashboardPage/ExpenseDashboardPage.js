import React, {Component} from 'react';
import ExpensesSummary from './../ExpensesSummary/ExpensesSummary';
import ExpenseListFilters from './../../containers/ExpenseListFilters/ExpenseListFilters';
import ExpenseList from './../ExpenseList/ExpenseList';

import {startSetExpenses} from './../../store/actions/expenses';
import { connect } from 'react-redux';

class ExpenseDashboardPage extends Component {
  componentDidMount() {
    this.props.startSetExpenses();
  }
  render() {
    return (
      <div>
        <ExpensesSummary />
        <ExpenseListFilters />
        <ExpenseList />
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    startSetExpenses: () => dispatch(startSetExpenses())
  };
};

export default connect(null, mapDispatchToProps)(ExpenseDashboardPage);