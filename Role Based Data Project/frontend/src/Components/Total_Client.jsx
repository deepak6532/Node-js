import React, { useEffect, useState } from 'react';
import axios from 'axios';
import All_Client from './All_Client';

const Total_Client = () => {
  const [total, setTotal] = useState([]);

  const [showAllClients, setShowAllClients] = useState(false); 

  const token = localStorage.getItem("Token");

  useEffect(() => {
    const totalClient = async () => {
      if (!token) {
        alert("User not authorized");
        return;
      }

      try {
        const result = await axios.get("http://localhost:8082/client/getclient", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotal(result.data);
      } catch (err) {
        alert("Failed to fetch client");
        console.error("Failed to fetch clients:", err);
      }
    };

    totalClient();
  }, [token]);

  
  const handleSubmit = () => {
    setShowAllClients(true); // Toggle this state
  };


  return (
    <div className='bg-gray-200 w-full text-black text-center rounded-lg p-5 border-2 border-black'>
      <h1 className='text-2xl font-semibold'>
        Total Clients: {total.length}
      </h1>

      <button onClick={handleSubmit} className='text-xl text-blue-600 mt-4 cursor-pointer '>
        Show All Clients
      </button>

     
      {showAllClients && (
        <div className="mt-6">
          <All_Client />
        </div>
      )}
    </div>
  );
};

export default Total_Client;
