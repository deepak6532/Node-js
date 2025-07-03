import React from 'react';

const Sidebar = ({ onSectionChange }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Super Admin Panel</h2>
      <button onClick={() => onSectionChange('/clientsignup')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Add Client
      </button>
      <button onClick={() => onSectionChange('/allclient')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        All Clients
      </button>
      <button onClick={() => onSectionChange('/totalclient')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Total Clients
      </button>
      <button onClick={() => onSectionChange('/superalluser')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Total Users
      </button>
    </div>
  );
};

export default Sidebar;
