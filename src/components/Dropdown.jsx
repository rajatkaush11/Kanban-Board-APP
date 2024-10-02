import React, { useState } from 'react';

const Dropdown = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        Display <span className="arrow">▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label htmlFor="grouping">Grouping</label>
            <select id="grouping" value={groupBy} onChange={handleGroupChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label htmlFor="ordering">Ordering</label>
            <select id="ordering" value={sortBy} onChange={handleSortChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
      <style jsx>{`
        .dropdown-container {
          position: relative;
          display: inline-block;
        }
        .dropdown-button {
          background-color: #fff;
          border: 1px solid #ddd;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .arrow {
          margin-left: 8px;
        }
        .dropdown-menu {
          position: absolute;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        .dropdown-section {
          margin-bottom: 10px;
        }
        label {
          margin-right: 10px;
        }
        select {
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        select:focus {
          outline: none;
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
