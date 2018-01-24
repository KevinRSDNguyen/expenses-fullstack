import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './../ExpenseForm/ExpenseForm';
import { startAddExpense } from './../../store/actions/expenses';

class AddExpensePage extends Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
  };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);