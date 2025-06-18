import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'




const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    



   const handelSubmit = async (e) => {
    e.preventDefault(); 

    try {
        const ans = await axios.post("http://localhost:8082/user/login", {email,password,otp});

        if (ans.data.token) {
            localStorage.setItem("Token", ans.data.token);
           
        }
        // console.log( localStorage.getItem("Token") ? localStorage.getItem("Token") :data)

        if (ans.data.message) {
            alert(ans.data.message);
            setEmail('');
            setPassword('');
            setOtp('');
        }

    } catch (error) {
        alert("Login failed, try again!");
    }
};

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

                    <input type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className='w-full border-2 border-black px-6  py-2 rounded-lg'

                    ></input>

                    <input type="text"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        
                        placeholder="Enter Otp"
                        className='w-full border-2 border-black px-6  py-2 rounded-lg'

                    ></input>

                    <button type="submit"
                            
                        className="w-full bg-blue-600 px-5 py-2 rounded-lg text-white font-bold "
                    >Submit</button>


                </form>

                <p className='text-gray-600 text-center mb-1 '>Don't have an account? 
            <a href='/signup' className='text-blue-500 hover:text-blue-700'> SignUp</a>
            </p>
            <p className='text-blue-600 text-center mt-2'>
                <a href='/forgot' className='text-blue-500 hover:text-blue-700'>Forgot password</a>

            </p>
            </div>
        </div>
    )
}

export default Login