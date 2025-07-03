import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Class_All from './Class_All';

const Total_Class = () => {
  const [total, setTotal] = useState([]);

  const [showAllClass, setShowAllClass] = useState(false); 

  const token = localStorage.getItem("Token");

  useEffect(() => {
    const totalClass = async () => {
      if (!token) {
        alert("User not authorized");
        return;
      }

      try {
        const result = await axios.get("http://localhost:8082/product/getproduct", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotal(result.data);
      } catch (err) {
        alert("Failed to fetch class");
        console.error("Failed to fetch class:", err);
      }
    };

    totalClass();
  }, [token]);

  
  const handleSubmit = () => {
    setShowAllClass(true); // Toggle this state
  };


  return (
    <div className='bg-gray-200 w-full text-black text-center rounded-lg p-5 border-2 border-black'>
      <h1 className='text-2xl font-semibold'>
        Total Class: {total.length}
      </h1>

      <button onClick={handleSubmit} className='text-xl text-blue-600 mt-4 cursor-pointer '>
        Show All Class
      </button>

     
      {showAllClass && (
        <div className="mt-6">
          <Class_All/>
        </div>
      )}
    </div>
  );
};

export default Total_Class;
