import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseChart from "./components/ExpenseChart";
import { getExpenses, addExpense, editExpense, deleteExpense } from "./api/api";
import "./styles.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      if (editingExpense) {
        await editExpense(editingExpense.id, expense);
        setEditingExpense(null); // Clear edit mode after update
      } else {
        await addExpense(expense);
      }
      fetchExpenses(); // Refresh list after update
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <ExpenseForm onAddExpense={handleAddExpense} editingExpense={editingExpense} />
        
        {/* Expense Breakdown Chart */}
        <ExpenseChart expenses={expenses} />

        <h2>All Expenses</h2>
        <ul className="expense-list">
          {expenses.map((exp) => (
            <li key={exp.id} className="expense-item">
              <span>{exp.category}: ₹{exp.amount} on {exp.date}</span>
              <div>
                <button className="edit-btn" onClick={() => handleEditClick(exp)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteExpense(exp.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
