import React, { useEffect, useState } from 'react';

import UserPhoto from '../assets/user.jpg'
import { useParams } from 'react-router-dom';

const All_Client_User = () => {
 const [users, setUsers] = useState([]);


  const token = localStorage.getItem('Token');

  const {id} =  useParams()

  console.log(`id>>>>>>>>`,id)


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        alert('User not authenticated');
      }

      try {
        const response = await fetch(`http://localhost:8082/employee/allemployee`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log(">>>>data",data)

        setUsers(data);
      }
       catch (err) {
        console.error('Error fetching users:', err);
        alert('Failed to fetch users');
      }
    };

    fetchUser();
    
  }, [token,id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">All Users </h1>

      {users.length === 0 ? (
        <p className="text-center">No user found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-300 flex flex-col items-center"
            >
              <img
                src={UserPhoto}
                alt={user.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h2 className="text-lg font-bold">Name: {user.name}</h2>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-800 font-semibold">Role: {user.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default All_Client_User