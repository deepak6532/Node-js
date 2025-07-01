import React, { useEffect, useState } from 'react';

import ClientPhoto from '../assets/client.jpg'

import { Link } from 'react-router-dom';



const All_Client = () => {
 const [clients, setClients] = useState([]);


  const token = localStorage.getItem('Token');

  useEffect(() => {
    const fetchClients = async () => {
      if (!token) {
        alert('User not authenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:8082/client/getclient', {
        //   method: 'GET',
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setClients(data);
      }
       catch (err) {
        console.error('Error fetching clients:', err);
        alert('Failed to fetch clients');
      }
    };

    fetchClients();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">All Clients </h1>

      {clients.length === 0 ? (
        <p className="text-center">No clients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-300 flex flex-col items-center"
            >
              <img
                src={ClientPhoto}
                alt={client.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h2 className="text-lg font-semibold">{client.name}</h2>
              <p className="text-gray-700">{client.email}</p>
              <p className="text-blue-500"><Link to={`/alluser/${client._id}`} >Show User</Link></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default All_Client