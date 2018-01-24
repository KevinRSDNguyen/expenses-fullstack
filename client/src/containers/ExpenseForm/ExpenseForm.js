import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import './ExpenseForm.css';

class ExpenseForm extends Component {
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense ? (this.props.expense.amount).toString() : '',
    createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(), //returns current date
    calendarFocused: false,
    error: ''
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  }
  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ amount });
    }
  }
  onNoteChange = (e) => {
    this.setState({ note: e.target.value });
  }
  onFocusChange = ({ focused }) => {
    this.setState({ calendarFocused: focused });
  }
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState({ error: 'Please provide description and amount' });
    } else {
      this.setState({ error: '' });
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10),
        createdAt: this.state.createdAt.valueOf(), //moment method to get unix
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            placeholder="description"
            autoFocus
            className="text-input"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="amount"
            className="text-input"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}//represents where u want to start on calendar
            onDateChange={this.onDateChange} //fires after new day piked on calendar. setState
            focused={this.state.calendarFocused} //have to set up state value as bool
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            className="textarea"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <div>
            <button className="button">Save expense</button>
          </div>
        </form>
      </div>
    );
  }
};

export default ExpenseForm;