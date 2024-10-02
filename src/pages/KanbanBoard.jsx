import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanColumn from '../components/KanbanColumn';
import Navbar from '../components/NavBar';
import TicketCard from '../components/TicketCard';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        console.log('API Response:', response.data);

        if (Array.isArray(response.data.tickets)) {
          setTickets(response.data.tickets);
        } else {
          console.error('Expected an array of tickets, but got:', response.data.tickets);
        }

        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error('Expected an array of users, but got:', response.data.users);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Group tickets based on selected criteria (groupBy status or user)
  const groupedTickets = (tickets || []).reduce((groups, ticket) => {
    const groupKey = groupBy === 'user' ? ticket.userId : ticket[groupBy];
    
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    
    groups[groupKey].push(ticket);
    
    return groups;
  }, {});

  // Get user name by userId (used for user grouping)
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="kanban-container">
      <Navbar 
        groupBy={groupBy} 
        setGroupBy={setGroupBy} 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        users={users} // Pass users to the Navbar
        onUserSelect={handleUserSelect} // Pass user select handler
      />
      
      <div className="kanban-board">
        {/* Render Kanban columns for each group (status or user) */}
        {Object.keys(groupedTickets).map((groupKey) => (
          <KanbanColumn
            key={groupKey}
            title={groupBy === 'user' ? getUserName(groupKey) : groupKey} // Display user name or status
            tickets={groupedTickets[groupKey]}
            sortBy={sortBy}
            users={users}
          />
        ))}
      </div>

      {/* Display the selected user's tickets below the Kanban board */}
      {selectedUser && (
        <div className="user-tickets">
          <h3>Tickets for {selectedUser.name}</h3>
          {tickets
            .filter((ticket) => ticket.userId === selectedUser.id)
            .map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} />
            ))}
        </div>
      )}

      <style jsx>{`
        .kanban-container {
          padding: 80px 20px 20px;
          background-color: transparent;
        }
        .kanban-board {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }
        .user-tickets {
          margin-top: 40px;
        }
        .user-tickets h3 {
          font-size: 20px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default KanbanBoard;
