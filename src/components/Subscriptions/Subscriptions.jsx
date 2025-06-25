import { useState } from "react";
import { subscriptions as initialSubscriptions } from "../../data/data";
import { iconsImgs } from "../../utils/images";
import "./Subscriptions.css";

const Subscriptions = () => {
  const [subs, setSubs] = useState(initialSubscriptions);
  const [showForm, setShowForm] = useState(false);
  const [newSub, setNewSub] = useState({ title: "", due_date: "", amount: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingSub, setEditingSub] = useState({});

  const handleAddClick = () => {
    setShowForm(true);
    setNewSub({ title: "", due_date: "", amount: "" });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      ...newSub
    };
    setSubs([...subs, newEntry]);
    setShowForm(false);
  };

  const handleEditClick = (id) => {
    const toEdit = subs.find(sub => sub.id === id);
    setEditingId(id);
    setEditingSub(toEdit);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setSubs(subs.map(sub => (sub.id === editingId ? { ...sub, ...editingSub } : sub)));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this subscription?");
    if (confirmDelete) {
      setSubs(subs.filter(sub => sub.id !== id));
    }
  };

  return (
    <div className="subgrid-two-item grid-common grid-c5">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Subscriptions</h3>
        <button className="grid-c-title-icon" onClick={handleAddClick}>
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddSubmit} className="subscription-form">
          <input
            type="text"
            placeholder="Title"
            value={newSub.title}
            onChange={(e) => setNewSub({ ...newSub, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Due Date"
            value={newSub.due_date}
            onChange={(e) => setNewSub({ ...newSub, due_date: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newSub.amount}
            onChange={(e) => setNewSub({ ...newSub, amount: e.target.value })}
            required
          />
          <button type="submit">Add</button>
        </form>
      )}

      <div className="grid-c5-content">
        <div className="grid-items">
          {subs.map((sub) => (
            <div className="grid-item" key={sub.id}>
              {editingId === sub.id ? (
                <form onSubmit={handleEditSubmit} className="edit-form">
                  <input
                    type="text"
                    value={editingSub.title}
                    onChange={(e) => setEditingSub({ ...editingSub, title: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editingSub.due_date}
                    onChange={(e) => setEditingSub({ ...editingSub, due_date: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editingSub.amount}
                    onChange={(e) => setEditingSub({ ...editingSub, amount: e.target.value })}
                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <div className="grid-item-l">
                    <div className="icon">
                      <img src={iconsImgs.alert} alt="alert" />
                    </div>
                    <p className="text text-silver-v1">
                      {sub.title} <span>due {sub.due_date}</span>
                    </p>
                  </div>
                  <div className="grid-item-r">
                    <span className="text-silver-v1">$ {sub.amount}</span>
                    <button className="edit-btn" onClick={() => handleEditClick(sub.id)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(sub.id)}>🗑️</button>
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

export default Subscriptions;
