// Navbar.jsx
import React, { useState } from 'react';

const Navbar = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <nav className="navbar">
      <h1>Kanban Board</h1>
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
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 15px 30px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          z-index: 1000; /* Ensures the navbar is above other content */
          font-family: 'Arial', sans-serif;
        }
        h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
          color: #333;
        }
        .dropdown-container {
          position: relative;
        }
        .dropdown-button {
          background-color: #fff;
          border: 1px solid #ddd;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #333;
        }
        .arrow {
          margin-left: 8px;
          font-size: 12px;
        }
        .dropdown-menu {
          position: absolute;
          top: 40px;
          right: 0;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          z-index: 1;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          width: 200px;
        }
        .dropdown-section {
          margin-bottom: 10px;
        }
        label {
          margin-right: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        select {
          padding: 5px; /* Added padding for better appearance */
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          color: #333;
          width: 100%;
        }
        select:focus {
          outline: none;
          border-color: #007bff;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
