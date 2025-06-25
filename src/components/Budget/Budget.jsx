import "./Budget.css";
import { iconsImgs } from "../../utils/images";
import { budget as initialBudgetData } from "../../data/data";
import { useState } from "react";

const Budget = () => {
  const [budgets, setBudgets] = useState(initialBudgetData);
  const [showForm, setShowForm] = useState(false);
  const [newBudget, setNewBudget] = useState({ title: "", type: "", amount: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingBudget, setEditingBudget] = useState({});

  const handleAddClick = () => {
    setShowForm(true);
    setNewBudget({ title: "", type: "", amount: "" });
  };

  const handleAddBudget = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      ...newBudget
    };
    setBudgets([...budgets, newEntry]);
    setShowForm(false);
  };

  const handleEditClick = (id) => {
    const toEdit = budgets.find(b => b.id === id);
    setEditingId(id);
    setEditingBudget(toEdit);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setBudgets(
      budgets.map(b =>
        b.id === editingId ? { ...b, ...editingBudget } : b
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this budget item?");
    if (confirmDelete) {
      setBudgets(budgets.filter(b => b.id !== id));
    }
  };

  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Budget</h3>
        <button className="grid-c-title-icon" onClick={handleAddClick}>
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>

      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Cash</h2>
        <span className="lg-value">$ 100,000</span>
      </div>

      {showForm && (
        <form onSubmit={handleAddBudget} className="budget-form">
          <input
            type="text"
            placeholder="Title"
            value={newBudget.title}
            onChange={(e) => setNewBudget({ ...newBudget, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Type"
            value={newBudget.type}
            onChange={(e) => setNewBudget({ ...newBudget, type: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
            required
          />
          <button type="submit">Add Budget</button>
        </form>
      )}

      <div className="grid-c4-content bg-jet">
        <div className="grid-items">
          {budgets.map((b) => (
            <div className="grid-item" key={b.id}>
              {editingId === b.id ? (
                <form onSubmit={handleSaveEdit} className="edit-form">
                  <input
                    type="text"
                    value={editingBudget.title}
                    onChange={(e) => setEditingBudget({ ...editingBudget, title: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editingBudget.type}
                    onChange={(e) => setEditingBudget({ ...editingBudget, type: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editingBudget.amount}
                    onChange={(e) => setEditingBudget({ ...editingBudget, amount: e.target.value })}
                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <div className="grid-item-l">
                    <div className="icon">
                      <img src={iconsImgs.check} alt="icon" />
                    </div>
                    <p className="text text-silver-v1">
                      {b.title} <span>{b.type}</span>
                    </p>
                  </div>
                  <div className="grid-item-r">
                    <span className="text-silver-v1">$ {b.amount}</span>
                    <button onClick={() => handleEditClick(b.id)} className="edit-btn">✏️</button>
                    <button onClick={() => handleDelete(b.id)} className="delete-btn">🗑️</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;