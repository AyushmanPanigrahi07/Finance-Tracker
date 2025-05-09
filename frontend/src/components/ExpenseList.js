import React from "react";

function ExpenseList({ expenses, onEditExpense, onDeleteExpense }) {
  if (!expenses || expenses.length === 0) {
    return <p className="no-expenses">No expenses added yet.</p>;
  }

  return (
    <div className="expense-list-container">
      <h2>All Expenses</h2>
      <ul className="expense-list">
        {expenses.map((exp) => (
          <li key={exp.id} className="expense-item">
            <span>{exp.category}: ₹{exp.amount.toFixed(2)} on {exp.date}</span>
            <div>
              <button className="edit-btn" onClick={() => onEditExpense(exp)}>Edit</button>
              <button className="delete-btn" onClick={() => onDeleteExpense(exp.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
