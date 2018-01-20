import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './../ExpenseForm/ExpenseForm';
import { addExpense } from './../../store/actions/expenses';

class AddExpensePage extends Component {
  onSubmit = (expense) => {
    this.props.addExpense(expense);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <h1>Add expense</h1>
        <ExpenseForm 
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addExpense: (expense) => dispatch(addExpense(expense))
  };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);