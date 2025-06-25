import { useState } from "react";
import { iconsImgs } from "../../utils/images";
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ name: "", date: "", amount: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!newTransaction.name || !newTransaction.date || !newTransaction.amount) return;
    const newEntry = {
      ...newTransaction,
      id: Date.now(),
    };
    setTransactions([...transactions, newEntry]);
    setNewTransaction({ name: "", date: "", amount: "" });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setEditId(id);
    setNewTransaction({ name: transaction.name, date: transaction.date, amount: transaction.amount });
  };

  const handleUpdate = () => {
    setTransactions(transactions.map(t => t.id === editId ? { ...t, ...newTransaction } : t));
    setEditId(null);
    setNewTransaction({ name: "", date: "", amount: "" });
  };

  return (
    <div className="grid-one-item grid-common grid-c2">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">All Transactions</h3>
        <button className="grid-c-title-icon" onClick={() => setIsAdding(!isAdding)}>
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg">
          <input
            className="border p-1 mr-2"
            type="text"
            placeholder="Name"
            value={newTransaction.name}
            onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
          />
          <input
            className="border p-1 mr-2"
            type="text"
            placeholder="Date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <input
            className="border p-1 mr-2"
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}

      {editId && (
        <div className="mb-4 p-3 bg-yellow-100 rounded-lg">
          <input
            className="border p-1 mr-2"
            type="text"
            placeholder="Name"
            value={newTransaction.name}
            onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
          />
          <input
            className="border p-1 mr-2"
            type="text"
            placeholder="Date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <input
            className="border p-1 mr-2"
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Update
          </button>
        </div>
      )}

      <div className="grid-content">
        <div className="grid-items">
          {transactions.map((transaction) => (
            <div className="grid-item flex justify-between items-center" key={transaction.id}>
              <div className="grid-item-l">
                <div className="avatar bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white">
                  {transaction.name[0]}
                </div>
                <p className="ml-3 text-sm font-medium">
                  {transaction.name} <span className="block text-xs text-gray-400">{transaction.date}</span>
                </p>
              </div>
              <div className="grid-item-r flex items-center space-x-3">
                <span className="text-scarlet font-semibold">$ {transaction.amount}</span>
                <button onClick={() => handleEdit(transaction.id)}>✏️</button>
                <button onClick={() => handleDelete(transaction.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;