import React, { useState } from 'react'

import axios from 'axios'

const User_Signup = () => {
    

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState('')

     const token = localStorage.getItem("Token");

    const handelSubmit = async(e) =>{
        e.preventDefault()
   

        

        try{
            if (!token) {
            alert("User not authenticated");
            return;
        }
            const result = await axios.post('http://localhost:8082/employee/employeesignup',
                {name,email,password,role},
                { 
                   headers: {
                   Authorization: `Bearer ${token}`, 
                  
                    },
                }
            )
             if (result.data.message) {
                alert("User add Successfully ")
                setName('')
                setEmail('')
                setPassword('')
                setRole('')
               
            }

        
        }
        catch(err) {
             alert("Error occured!")
             console.error('Error fetching users:', err)
        };

    
    }


  return (
   <>

   <div className='bg-white min-h-screen flex items-center justify-center p-4'>
    <div className='bg-gray-100 w-100 rounded-lg p-4 border border-black'>

        <h2 className='text-gray-900 text-2xl text-center font-bold'> User Signup</h2>

        <form onSubmit={handelSubmit} className='space-y-4 mt-6'>


            <input type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Enter Name'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <input type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter Email'
            className='p-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <input type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter Password'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <input type="text"
            name="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder='Enter Role'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <button  type="submit" 
            className='w-full rounded-lg text-xl text-white font-semibold bg-blue-600 p-2 hover:bg-blue-700 cursor-pointer '>
                Submit

            </button>

        </form>
    </div>
   </div>
   
   
   
   </>
  )
}

export default User_Signup