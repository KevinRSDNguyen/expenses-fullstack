import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, startRemoveExpense } from './../../store/actions/expenses';
import ExpenseForm from './../ExpenseForm/ExpenseForm';

class EditExpensePage extends Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense._id, expense);
    this.props.history.push('/');
  }
  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense._id);
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
      return expense._id === props.match.params.id
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);