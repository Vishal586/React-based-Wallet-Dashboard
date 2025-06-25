import { useState } from "react";
import { iconsImgs } from "../../utils/images";
import "./Report.css";
import { reportData as initialData } from "../../data/data";

const Report = () => {
  const [reportData, setReportData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ month: "", value1: "", value2: "" });
  const [editId, setEditId] = useState(null);
  const [editedEntry, setEditedEntry] = useState({});

  const getColor = (value) => {
    if (value >= 75) return "bg-green-500";
    if (value >= 25) return "bg-yellow-400";
    return "bg-red-500";
  };

  const handleAddNew = () => {
    const nextId = reportData.length ? Math.max(...reportData.map(r => r.id)) + 1 : 1;
    setReportData([
      ...reportData,
      {
        id: nextId,
        month: newEntry.month,
        value1: parseInt(newEntry.value1),
        value2: parseInt(newEntry.value2),
      },
    ]);
    setNewEntry({ month: "", value1: "", value2: "" });
    setShowAddForm(false);
  };

  const handleEdit = (report) => {
    setEditId(report.id);
    setEditedEntry({ ...report });
  };

  const handleSaveEdit = () => {
    setReportData(
      reportData.map((r) =>
        r.id === editId
          ? {
              ...editedEntry,
              value1: parseInt(editedEntry.value1),
              value2: parseInt(editedEntry.value2),
            }
          : r
      )
    );
    setEditId(null);
  };

  const handleDelete = (id) => {
    setReportData(reportData.filter((r) => r.id !== id));
  };

  return (
    <div className="grid-one-item grid-common grid-c3">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Performance Report</h3>
        <button
          className="grid-c-title-icon"
          aria-label="Add new data"
          onClick={() => setShowAddForm(true)}
        >
          <img src={iconsImgs.plus} />
        </button>
      </div>

      {showAddForm && (
        <div className="p-4 bg-gray-100 rounded-md mb-4 space-x-2">
          <input
            type="text"
            placeholder="Month"
            value={newEntry.month}
            onChange={(e) => setNewEntry({ ...newEntry, month: e.target.value })}
            className="border p-1 rounded text-sm"
          />
          <input
            type="number"
            placeholder="Value 1"
            value={newEntry.value1}
            onChange={(e) => setNewEntry({ ...newEntry, value1: e.target.value })}
            className="border p-1 rounded text-sm"
          />
          <input
            type="number"
            placeholder="Value 2"
            value={newEntry.value2}
            onChange={(e) => setNewEntry({ ...newEntry, value2: e.target.value })}
            className="border p-1 rounded text-sm"
          />
          <button
            onClick={handleAddNew}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
          >
            Add
          </button>
        </div>
      )}

      <div className="grid-c3-content">
        <div className="grid-chart">
          <div className="chart-vert-value">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
          {reportData.map((report) => (
            <div className="grid-chart-bar" key={report.id}>
              <div className="bar-wrapper relative">
                {editId === report.id ? (
                  <div className="absolute -top-14 left-0 bg-white border rounded p-2 shadow z-10 w-28">
                    <input
                      type="number"
                      value={editedEntry.value1}
                      onChange={(e) =>
                        setEditedEntry({ ...editedEntry, value1: e.target.value })
                      }
                      className="w-full text-xs border mb-1 p-1 rounded"
                    />
                    <input
                      type="number"
                      value={editedEntry.value2}
                      onChange={(e) =>
                        setEditedEntry({ ...editedEntry, value2: e.target.value })
                      }
                      className="w-full text-xs border mb-1 p-1 rounded"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="w-full bg-blue-500 text-white text-xs py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className={`bar-item1 ${getColor(report.value1)}`}
                      style={{ height: `${report.value1}%` }}
                    ></div>
                    <div
                      className={`bar-item2 ${getColor(report.value2)}`}
                      style={{ height: `${report.value2}%` }}
                    ></div>
                  </>
                )}
              </div>
              <span className="grid-hortz-value">{report.month}</span>
              <div className="flex justify-center space-x-1 mt-1 text-sm">
                <button
                  onClick={() => handleEdit(report)}
                  aria-label={`Edit ${report.month}`}
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(report.id)}
                  aria-label={`Delete ${report.month}`}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;