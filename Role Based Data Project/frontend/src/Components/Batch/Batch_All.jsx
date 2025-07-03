import React, { useEffect, useState } from 'react';
// import courseimage from '../assets/courseimage.jpg'; // Uncomment if you have an image file
import { useParams } from 'react-router-dom';

// import batchimage from "../../assets/batchimage.png";
import batchimage from "../../assets/batchimage.png";




// const image =  "https://img.freepik.com/free-vector/online-courses-elearning-vector-background-online-courses-text-white-desk-with-laptop-computer_572288-1763.jpg?w=2000"


const Batch_All = () => {

  const [batch, setBatch] = useState([]);

  const token = localStorage.getItem('Token');

  const { id } = useParams();

  useEffect(() => {
    const fetchBatch = async () => {
      if (!token) {
        alert('User not authenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:8082/batch/getbatch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await response.json();
        
        console.log(">>>>data", data.data);

        setBatch(data.data);

      }
       catch (err) {
        console.error('Error fetching batch:', err);
        alert('Failed to fetch batch');
      }
    };

    fetchBatch();
  }, [token, id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">All Batches</h1>

      {batch.length === 0 ? (
        <p className="text-center">No Batch found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {batch.map((bch, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-300 flex flex-col items-center"
            >
              <img
                src={batchimage} 
                alt={bch.name}
                className="w-32 h-32 object-fit rounded-full mb-4"
              />
              <h2 className="text-lg font-bold">Name: {bch.name}</h2>
              <h2 className="text-lg font-semibold">Trainer: {bch.trainer}</h2>
              
              <p className="text-red-800 font-semibold">Added by: {bch.emp_id.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Batch_All;
