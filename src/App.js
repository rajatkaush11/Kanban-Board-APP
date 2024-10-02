import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KanbanBoard from './pages/KanbanBoard';
import SettingsPage from './pages/SettingPage';
import './App.css';  // Global CSS for the whole app

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
