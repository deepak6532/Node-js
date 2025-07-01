import React, { useEffect, useState } from 'react';

import classimage from '../assets/classimage.jpg'
import { useParams } from 'react-router-dom';

const Class_All = () => {

  const [classes, setClasses]  = useState([]);


  const token = localStorage.getItem('Token');

  const {id} =  useParams()

  console.log(`id>>>>>>>>`,id)


  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        alert('User not authenticated');
      }

      try {
        const response = await fetch(`http://localhost:8082/product/getproduct`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log(">>>>data",data)

        setClasses(data);
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

      {classes.length === 0 ? (
        <p className="text-center">No Classes  found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-300 flex flex-col items-center"
            >
              <img
                src={classimage}
                alt={cls.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h2 className="text-lg font-bold">Name: {cls.name}</h2>
              <p className="text-gray-700">Category: {cls.category}</p>
              <p className="text-gray-800 font-semibold">Price: {cls.price}</p>
              <p className="text-red-800 font-semibold">Add this: {cls.emp_id.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Class_All