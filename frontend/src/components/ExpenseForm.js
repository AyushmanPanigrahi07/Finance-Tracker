import React, { useState, useEffect } from "react";
import { addExpense } from "../api/api";

const categories = ["Food", "Shopping", "Transport", "Bills", "Entertainment"];

function ExpenseForm({ onAddExpense, editingExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount.toString()); // Convert amount to string
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date) return;

    const newExpense = { amount, category, date };
    await onAddExpense(newExpense);

    setAmount("");
    setCategory(categories[0]);
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h3>{editingExpense ? "Edit Expense" : "Add Expense"}</h3>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">{editingExpense ? "Update Expense" : "Add Expense"}</button>
    </form>
  );
}

export default ExpenseForm;
