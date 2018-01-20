import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from './../../store/actions/expenses';
import ExpenseForm from './../ExpenseForm/ExpenseForm';

class EditExpensePage extends Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }
  onRemove = () => {
    this.props.removeExpense(this.props.expense.id);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>
          Remove
        </button>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (id) => dispatch(removeExpense(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);