import React from 'react';

const User_Sidebar = ({ onSectionChange }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">User Panel</h2>
      <button onClick={() => onSectionChange('/classadd')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Add Class
      </button>
      <button onClick={() => onSectionChange('/classall')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        All Class
      </button>
      <button onClick={() => onSectionChange('/totaluser')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Total Class
      </button>
      {/* <button onClick={() => onSectionChange('totalUsers')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Total Users
      </button> */}
    </div>
  );
};

export default User_Sidebar;
