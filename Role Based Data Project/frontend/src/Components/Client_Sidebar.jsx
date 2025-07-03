import React from 'react';

const Client_Sidebar = ({ onSectionChange }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Client Panel</h2>
      <button onClick={() => onSectionChange('/usersignup')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Add User
      </button>
      <button onClick={() => onSectionChange('/allclientuser')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        All User
      </button>
      <button onClick={() => onSectionChange('/totaluser')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Total User
      </button>
      <button onClick={() => onSectionChange('/addcourse')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Add Course
      </button>
      <button onClick={() => onSectionChange('/allcourse')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        All Course
      </button>
      <button onClick={() => onSectionChange('/addbatch')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
        Add Batch
      </button>
      <button onClick={() => onSectionChange('/allbatch')} className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
         Batch All
      </button>
    </div>
  );
};

export default Client_Sidebar;
