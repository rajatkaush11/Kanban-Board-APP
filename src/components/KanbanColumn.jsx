import React from 'react';
import TicketCard from './TicketCard';

const priorityDetails = {
  0: { label: 'No priority', icon: '/icons/no-priority.svg' },
  1: { label: 'Low', icon: '/icons/low.svg' },
  2: { label: 'Medium', icon: '/icons/medium.svg' },
  3: { label: 'High', icon: '/icons/high.svg' },
  4: { label: 'Urgent', icon: '/icons/urgent.svg' },
};

const statusDetails = {
  todo: { label: 'To-do', icon: '/icons/To-do.svg' },
  inProgress: { label: 'In Progress', icon: '/icons/IN.svg' },
  done: { label: 'Done', icon: '/icons/Done.svg' },
  backlog: { label: 'Backlog', icon: '/icons/Backlog.svg' },
  cancelled: { label: 'Cancelled', icon: '/icons/Cancelled.svg' },
};

const KanbanColumn = ({ title, tickets, sortBy, users, onAddClick, onMoreOptionsClick }) => {
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === 'priority') {
      return b.priority - a.priority; 
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title); 
    }
    return 0; 
  });

  const displayDetails = priorityDetails[title] || statusDetails[title.toLowerCase()] || { label: title, icon: '' };
  
  const { label: displayTitle, icon: displayIcon } = displayDetails;

  const ticketCount = sortedTickets.length;

  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className="status-header">
          {displayIcon && <img src={displayIcon} alt={displayTitle} className="status-icon" />}
          <h2>{displayTitle} <span className="ticket-count">({ticketCount})</span></h2>
        </div>
        <div className="header-buttons">
          <button className="add-btn" onClick={onAddClick}>+</button>
          <button className="more-options-btn" onClick={onMoreOptionsClick}>...</button>
        </div>
      </div>

      <div className="ticket-cards">
        {sortedTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} users={users} />
        ))}
      </div>

      <style jsx>{`
        .kanban-column {
          width: 30%; /* Adjust width as necessary */
          background-color: transparent; /* Transparent background */
        }
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .status-header {
          display: flex;
          align-items: center;
          gap: 5px; /* Space between icon and text */
        }
        h2 {
          font-size: 18px;
          margin: 0;
        }
        .status-icon {
          width: 20px;
          height: 20px;
        }
        .ticket-count {
          font-size: 14px;
          color: gray;
        }
        .header-buttons {
          display: flex;
          gap: 10px;
        }
        .add-btn, .more-options-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }
        .ticket-cards {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};

export default KanbanColumn;
