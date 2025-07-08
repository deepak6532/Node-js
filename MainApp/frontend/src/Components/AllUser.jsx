import React, { useEffect, useState } from 'react'
import axios from 'axios'


const AllUser = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8082/user/getuserdata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Fetching error", err);
      }
    };

    fetchUsers(); // Call the async function
  }, []);
  return (

    <div className="bg-gray-100 min-h-screen p-10">
        <h1 className="text-gray-800 font-bold text-3xl text-center m-10 ">All Users</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 '>
            {
                users.map((user,index) => (
                    <div 
                    key = {index}

                    className="bg-white border-2 border-black rounded-lg tansition  p-2 duration-300"
                    >

                        <p className="text-black"><span className='text-2xl font-semibold font-mono text-gray-800'>Name: </span>{user.name} </p>
                        <p className="text-black"><span className='text-2xl font-semibold font-mono text-gray-800'>Phone: </span>{user.phone} </p>
                        <p className="text-black"><span className='text-2xl font-semibold font-mono text-gray-800'>Email: </span>{user.email} </p>
                        <p className="text-black"><span className='text-2xl font-semibold font-mono text-gray-800 text-pretty'>Password: </span>{user.password.slice(0,20)}..... </p>
                    </div>
                ))
            }
        </div>



    </div>
  )
}

export default AllUser