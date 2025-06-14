import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'



const Forgot = () => {

    const [email, setEmail] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [otp, setOtp] = useState('')


    const handelSubmit = (e) => {
        e.preventDefault()

        const ans = axios.put("http://localhost:8082/user/forgot", { email, newPassword ,otp})
            .then(ans => {

                if (ans.data.message) {
                    // alert("login success d")
                    alert(ans.data.message)
                    setEmail('');
                    setnewPassword('');
                     setOtp('');
                    
                }

            })
            .catch(error => {
                if(error.response && error.response.data.message)
                {
                    alert(error.response.data.message)
                }
            })

    }

    return (
        <div className="bg-blue-400 min-h-screen flex items-center justify-center  ">
            <div className="bg-white rounded-lg border p-8 w-90 ">
                <h2 className="text-center text-2xl text-gray-800 font-bold mb-10">Forgot Password</h2>

                <form onSubmit={handelSubmit} className='space-y-4'>
                   

                    <input type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email"
                        className='w-full border-2 border-black px-6  py-2 rounded-lg'

                    ></input>

                     <input type="text"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter otp"
                        className='w-full border-2 border-black px-6  py-2 rounded-lg'

                    ></input>

                    <input type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className='w-full border-2 border-black px-6  py-2 rounded-lg'

                    ></input>


                    <button type="submit"
                        className="w-full bg-blue-600 px-5 py-2 rounded-lg text-white font-bold "
                    >Submit</button>


                </form>
                <p className='text-gray-600 text-center mt-2 mb-1 '>Login account?
            <a href='/login' className='text-blue-500 hover:text-blue-700'>Login here</a>
            </p>

            </div>
        </div>
    )
}

export default Forgot