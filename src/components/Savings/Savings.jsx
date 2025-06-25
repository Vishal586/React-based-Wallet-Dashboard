import { useState } from "react";
import { savings as initialSavings } from "../../data/data";
import { iconsImgs, personsImgs } from "../../utils/images";
import "./Savings.css";

const Savings = () => {
  const [savingsList, setSavingsList] = useState(initialSavings);
  const [showForm, setShowForm] = useState(false);
  const [newSaving, setNewSaving] = useState({
    title: "",
    saving_amount: "",
    date_taken: "",
    amount_left: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editingSaving, setEditingSaving] = useState({});

  const handleAddClick = () => {
    setShowForm(true);
    setNewSaving({ title: "", saving_amount: "", date_taken: "", amount_left: "" });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      ...newSaving
    };
    setSavingsList([...savingsList, newEntry]);
    setShowForm(false);
  };

  const handleEditClick = (id) => {
    const toEdit = savingsList.find((s) => s.id === id);
    setEditingId(id);
    setEditingSaving(toEdit);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setSavingsList(
      savingsList.map((s) =>
        s.id === editingId ? { ...s, ...editingSaving } : s
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmDel = window.confirm("Delete this saving record?");
    if (confirmDel) {
      setSavingsList(savingsList.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="subgrid-two-item grid-common grid-c6">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Savings</h3>
        <button className="grid-c-title-icon" onClick={handleAddClick}>
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddSubmit} className="savings-form">
          <input
            type="text"
            placeholder="Title"
            value={newSaving.title}
            onChange={(e) => setNewSaving({ ...newSaving, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount Taken"
            value={newSaving.saving_amount}
            onChange={(e) => setNewSaving({ ...newSaving, saving_amount: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Date Taken"
            value={newSaving.date_taken}
            onChange={(e) => setNewSaving({ ...newSaving, date_taken: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount Left"
            value={newSaving.amount_left}
            onChange={(e) => setNewSaving({ ...newSaving, amount_left: e.target.value })}
            required
          />
          <button type="submit">Add Saving</button>
        </form>
      )}

      <div className="grid-c6-content">
        <div className="grid-items">
          {savingsList.map((saving) => (
            <div className="grid-item" key={saving.id}>
              {editingId === saving.id ? (
                <form onSubmit={handleEditSubmit} className="edit-form">
                  <input
                    type="text"
                    value={editingSaving.title}
                    onChange={(e) => setEditingSaving({ ...editingSaving, title: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editingSaving.saving_amount}
                    onChange={(e) => setEditingSaving({ ...editingSaving, saving_amount: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editingSaving.date_taken}
                    onChange={(e) => setEditingSaving({ ...editingSaving, date_taken: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editingSaving.amount_left}
                    onChange={(e) => setEditingSaving({ ...editingSaving, amount_left: e.target.value })}
                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <div className="grid-item-top">
                    <div className="grid-item-top-l">
                      <div className="avatar img-fit-cover">
                        <img src={personsImgs.person_one} alt="avatar" />
                      </div>
                      <p className="text text-silver-v1">{saving.title}</p>
                    </div>
                    <div className="grid-item-top-r">
                      <span className="text-silver-v1">$ {saving.saving_amount}</span>
                    </div>
                  </div>
                  <div className="grid-item-bottom">
                    <div className="grid-item-badges">
                      <span className="grid-item-badge">Date taken {saving.date_taken}</span>
                      <span className="grid-item-badge">Amount left $ {saving.amount_left}</span>
                    </div>
                    <div className="grid-item-actions">
                      <button onClick={() => handleEditClick(saving.id)} className="edit-btn">✏️</button>
                      <button onClick={() => handleDelete(saving.id)} className="delete-btn">🗑️</button>
                    </div>
                    <div className="grid-item-progress">
                      <div className="grid-item-fill"></div>
                    </div>
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

export default Savings;
