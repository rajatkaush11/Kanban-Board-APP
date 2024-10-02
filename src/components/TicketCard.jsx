import React, { useState, useEffect } from 'react';

const TicketCard = ({ ticket, users, onUserClick }) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const storedDoneState = localStorage.getItem(`ticket-${ticket.id}`);
    if (storedDoneState !== null) {
      setIsDone(JSON.parse(storedDoneState));
    }
  }, [ticket.id]);

  const user = users.find((user) => user.id === ticket.userId);

  const priorityMap = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };

  const toggleDone = () => {
    setIsDone((prev) => {
      const newDoneState = !prev;
      localStorage.setItem(`ticket-${ticket.id}`, JSON.stringify(newDoneState));
      return newDoneState;
    });
  };

  return (
    <div className={`ticket-card ${isDone ? 'done' : ''}`}>
      <div className="ticket-header">
        <div className={`status-circle ${isDone ? 'done' : ''}`} onClick={toggleDone}>
          {isDone && <span className="tick">✔</span>}
        </div>
        <h3>{ticket.title}</h3>
      </div>
      <div className="ticket-content">
        <p>{ticket.description}</p>
        {user && (
          <p
            className="user"
            onClick={() => onUserClick(user)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Assigned to: {user.name}
          </p>
        )}
        <p className="priority">Priority: {priorityMap[ticket.priority] || 'Unknown'}</p>
      </div>

      <style jsx>{`
        .ticket-card {
          background-color: white;
          border: 1px solid black;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
        }
        .ticket-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .status-circle {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid black;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;
          position: relative;
        }
        .status-circle.done {
          background-color: green;
        }
        .tick {
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        h3 {
          margin: 0;
          font-size: 14px;
        }
        .ticket-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        .user {
          font-weight: bold;
        }
        .priority {
          color: #333;
        }
        .done {
          background-color: #e0ffe0;
        }
      `}</style>
    </div>
  );
};

export default TicketCard;
