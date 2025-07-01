import React from 'react'
import { useState,Link } from 'react'
import axios from 'axios'

import{ useNavigate} from 'react-router-dom'

const Super_login = () => {


  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('')

  const navigate =  useNavigate();

  const handelSubmit = async(e) =>{
    e.preventDefault()

    try{
      

      
      const result = await axios.post("http://localhost:8082/employee/employeelogin",{email,password,role});

      console.log("result",result)

      if (result.data.token) {
      localStorage.setItem("Token", result.data.token);
    }

      if (result.data.message) {
        alert("Login successfully");
        
        console.log(result.data.user.role)

       

         if(result.data.user.role === "superadmin") {
              navigate('/superadmin')
        }
         else if(result.data.user.role === "client") {
             navigate('/client')
      }
      else if(result.data.user.role === "hr" || result.data.user.role === "trainer" || result.data.user.role === "admin")
      {
        navigate('/user')
      }
      
        setEmail('');
        setPassword('');
        setRole('');
       
    } 

    }
     catch (err) {
    alert("login failed");
  }

  }


  return (
    <>

   <div className='bg-gray-200 min-h-screen flex items-center justify-center p-4'>
    <div className='bg-gray-100 w-100 rounded-lg p-4 border border-black'>

        <h2 className='text-gray-900 text-2xl text-center font-bold'>Login</h2>

        <form onSubmit={handelSubmit} className='space-y-4 mt-6'>


            <input type="text"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter Email'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <input type="password"
            name="password"
            value={password}
            onChange={e=> setPassword(e.target.value)}
            placeholder='Enter Password'
            className='p-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <input type="text"
            name="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder='Enter role'
            className='px-4 py-2 border-2   border-black rounded-lg w-full outline-none'
            ></input>

            <button  type="submit" 
            className='w-full rounded-lg font-semibold text-white bg-blue-600 p-2 hover:bg-blue-700 cursor-pointer '>
                Submit

            </button>

        </form>
    </div>
   </div>
   
   
   
   </>
  )
}

export default Super_login