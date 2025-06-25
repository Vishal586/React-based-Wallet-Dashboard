import { useState } from "react";
import { iconsImgs } from "../../utils/images";
import "./Loans.css";

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [formData, setFormData] = useState({ target: "", reached: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);

  const calculatePercentage = (reached, target) => {
    const r = parseFloat(reached);
    const t = parseFloat(target);
    if (!t || isNaN(r) || isNaN(t)) return 0;
    return Math.min(100, Math.round((r / t) * 100));
  };

  const getStatus = (percentage) => {
    if (percentage >= 75) return "On Track";
    if (percentage >= 50) return "Moderate";
    return "Below Target";
  };

  const handleAdd = () => {
    const newEntry = {
      id: Date.now(),
      target: parseFloat(formData.target),
      reached: parseFloat(formData.reached),
    };
    setLoans([...loans, newEntry]);
    setFormData({ target: "", reached: "" });
    setIsAdding(false);
  };

  const handleEdit = (loan) => {
    setEditId(loan.id);
    setFormData({ target: loan.target, reached: loan.reached });
  };

  const handleUpdate = () => {
    setLoans(
      loans.map((loan) =>
        loan.id === editId
          ? {
              ...loan,
              target: parseFloat(formData.target),
              reached: parseFloat(formData.reached),
            }
          : loan
      )
    );
    setEditId(null);
    setFormData({ target: "", reached: "" });
  };

  const handleDelete = (id) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  return (
    <div className="subgrid-two-item grid-common grid-c7">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Loans</h3>
        <button className="grid-c-title-icon" onClick={() => setIsAdding(!isAdding)}>
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>

      {(isAdding || editId !== null) && (
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <input
            type="number"
            className="border p-1 mr-2"
            placeholder="Savings Target"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
          />
          <input
            type="number"
            className="border p-1 mr-2"
            placeholder="Target Reached"
            value={formData.reached}
            onChange={(e) => setFormData({ ...formData, reached: e.target.value })}
          />
          {editId ? (
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleUpdate}>
              Update
            </button>
          ) : (
            <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleAdd}>
              Add
            </button>
          )}
        </div>
      )}

      {loans.map((loan) => {
        const percentage = calculatePercentage(loan.reached, loan.target);
        const status = getStatus(percentage);
        const progressColor =
          percentage >= 75 ? "bg-green-500" : percentage >= 50 ? "bg-yellow-400" : "bg-red-500";

        return (
          <div key={loan.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold">Loan Entry</h4>
              <div className="space-x-2">
                <button onClick={() => handleEdit(loan)}>✏️</button>
                <button onClick={() => handleDelete(loan.id)}>🗑️</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-silver-v1">Savings Target</p>
                <p className="font-medium">${loan.target.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-silver-v1">Target Reached</p>
                <p className="font-medium">${loan.reached.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-blue-700">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${progressColor} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-xs mt-2 italic text-gray-500">Status: {status}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Loans;
