const BASE_URL = "https://finance-tracker-9c8w.onrender.com";

// Fetch expenses
export async function getExpenses() {
    const response = await fetch(`${BASE_URL}/expenses`);
    return response.json();
}

// Add an expense
export async function addExpense(expense) {
    const response = await fetch(`${BASE_URL}/add_expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
    });
    return response.json();
}

// Edit an expense
export async function editExpense(id, updatedExpense) {
    const response = await fetch(`${BASE_URL}/edit_expense/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExpense),
    });
    return response.json();
}

// Delete an expense
export async function deleteExpense(id) {
    const response = await fetch(`${BASE_URL}/delete_expense/${id}`, {
        method: "DELETE",
    });
    return response.json();
}
