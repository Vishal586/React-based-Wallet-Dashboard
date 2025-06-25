import { useState } from "react";
import { iconsImgs } from "../../utils/images";

const Financial = () => {
  const [advices, setAdvices] = useState([]);
  const [newAdvice, setNewAdvice] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (!newAdvice.trim()) return;
    setAdvices([...advices, { id: Date.now(), text: newAdvice.trim() }]);
    setNewAdvice("");
    setIsAdding(false);
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdate = () => {
    setAdvices(
      advices.map((item) =>
        item.id === editId ? { ...item, text: editText.trim() } : item
      )
    );
    setEditId(null);
    setEditText("");
  };

  const handleDelete = (id) => {
    setAdvices(advices.filter((item) => item.id !== id));
  };

  return (
    <div className="subgrid-two-item grid-common grid-c8">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Financial Advice</h3>
        <button
          className="grid-c-title-icon"
          onClick={() => setIsAdding(!isAdding)}
        >
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 bg-gray-100 p-3 rounded-lg">
          <textarea
            rows="3"
            className="w-full border rounded p-2 text-sm"
            placeholder="Write financial advice..."
            value={newAdvice}
            onChange={(e) => setNewAdvice(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      )}

      <div className="grid-c8-content space-y-4">
        {advices.length === 0 && (
          <p className="text text-silver-v1 italic">
            No advice entries yet. Click the + icon to add one.
          </p>
        )}

        {advices.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-lg shadow hover:shadow-md transition duration-300 relative group"
          >
            {editId === item.id ? (
              <>
                <textarea
                  rows="3"
                  className="w-full border rounded p-2 text-sm"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={handleUpdate}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text text-gray-700">{item.text}</p>
                <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => handleEdit(item.id, item.text)}>
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(item.id)}>🗑️</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Financial;