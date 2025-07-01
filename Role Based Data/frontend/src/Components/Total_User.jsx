import React, { useEffect, useState } from 'react';
import axios from 'axios';
import All_Client_User from './All_Client_User';


const Total_User = () => {
  const [total, setTotal] = useState([]);

  const [showalluser, setShowallusers] = useState(false); 

  const token = localStorage.getItem("Token");

  useEffect(() => {
    const totalUser = async () => {
      if (!token) {
        alert("User not authorized");
        return;
      }

      try {
        const result = await axios.get("http://localhost:8082/employee/allemployee", {
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

    totalUser();
  }, [token]);

  
  const handleSubmit = () => {
    setShowallusers(true); // Toggle this state
  };


  return (
    <div className='bg-gray-200 w-full text-black text-center rounded-lg p-5 border-2 border-black'>
      <h1 className='text-2xl font-semibold'>
        Total Users: {total.length}
      </h1>

      <button onClick={handleSubmit} className='text-xl text-blue-600 mt-4 cursor-pointer '>
        Show All Users
      </button>

     
      {showalluser && (
        <div className="mt-6">
          <All_Client_User/>
        </div>
      )}
    </div>
  );
};

export default Total_User;
