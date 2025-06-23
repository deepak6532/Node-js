import React, { useState } from 'react'
import { Link } from 'react-router-dom'


import axios from 'axios'


const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')


  const handelSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await axios.post("http://localhost:8082/user2/login", { email, password, otp });

    if (result.data.token) {
      localStorage.setItem("Token", result.data.token);
    }

    if (result.data.message) {
      alert("Login successfully");
      setEmail('');
      setPassword('');
      setOtp('');
    } 

  } catch (err) {
    alert("login failed");
  }
}

    return (
        <div className="bg-blue-400 min-h-screen flex items-center justify-center  ">
            <div className="bg-white rounded-lg border p-8 w-90 ">
                <h2 className="text-center text-2xl text-gray-800 font-bold mb-10">Login</h2>

                <form onSubmit={handelSubmit} className='space-y-4'>


                    <input type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className=' w-full border-2 border-black px-6 py-2 rounded-lg'

                    ></input>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className=' w-full border-2 border-black px-6 py-2 rounded-lg'
                    />

                    <input type="text"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter otp"
                        className=' w-full border-2 border-black px-6  py-2 rounded-lg'

                    ></input>

                    <button type="Submit"
                        className="w-full bg-blue-600 px-5 py-2 rounded-lg text-white font-bold "
                    >Submit</button>


                </form>

                {/* <p className='text-gray-600 text-center mt-2 mb-1 '>Already have an account?
                    <a href='/login' className='text-blue-500  hover:text-blue-700'>Login here</a>
                </p> */}

            </div>
        </div>
    )
}

export default Login










