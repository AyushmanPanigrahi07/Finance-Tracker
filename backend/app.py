import webbrowser
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Mysql2004@localhost/finance_tracker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Expense Model
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=False)

# Create tables (Ensures the table is created if missing)
with app.app_context():
    db.create_all()

# Add Expense API
@app.route('/add_expense', methods=['POST'])
def add_expense():
    data = request.json
    new_expense = Expense(amount=data['amount'], category=data['category'], date=data['date'])
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({"message": "Expense added successfully!"})

# Get Expenses API
@app.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([{"id": exp.id, "amount": exp.amount, "category": exp.category, "date": exp.date} for exp in expenses])

# Edit Expense API
@app.route('/edit_expense/<int:id>', methods=['PUT'])
def edit_expense(id):
    data = request.json
    expense = Expense.query.get(id)

    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    # Ensure the values are updated correctly
    expense.amount = float(data.get('amount', expense.amount))
    expense.category = data.get('category', expense.category)
    expense.date = data.get('date', expense.date)

    db.session.commit()
    return jsonify({"message": "Expense updated successfully!", "updated_expense": {
        "id": expense.id,
        "amount": expense.amount,
        "category": expense.category,
        "date": expense.date
    }})


# Delete Expense API
@app.route('/delete_expense/<int:id>', methods=['DELETE'])
def delete_expense(id):
    expense = Expense.query.get(id)
    if expense:
        db.session.delete(expense)
        db.session.commit()
        return jsonify({"message": "Expense deleted successfully!"})
    return jsonify({"error": "Expense not found"}), 404

if __name__ == '__main__':
    webbrowser.open("http://127.0.0.1:5000/expenses")  
    app.run(debug=True)
