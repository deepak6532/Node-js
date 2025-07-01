import React from 'react'

import {BrowserRouter as Router ,Routes,Route, Link}   from 'react-router-dom'

import Signup from './Components/Client_Signup'
import Super_login from './Components/super_login'

import All_User from './Components/All_User'

import Superadmin from './Pages/Superadmin'

import Client from './Pages/Client'
import User_Signup from './Components/User_Signup'
import All_Client_User from './Components/All_Client_User'
import Total_User from './Components/Total_User'
import User from './Pages/User'
import Class_Add from './Components/Class_Add'
import Class_All from './Components/Class_All'

const App = () => {
  return (
    <>
      <Router>

        <nav className="min-screen bg-gray-700 p-4 flex items-center justify-around">
          <div className='flex items-center '>
            <p className="tex-center text-white text-2xl font-bold">Role Based Data</p>
          </div>

          <div className='flex items-center justify-between text-white'>

            <p className='text-xl text-white font-semibold' ><Link to="/">Login</Link></p>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Super_login/>}/>
          <Route path="/superadmin" element={<Superadmin/>}/>
          <Route path="/clientsignup" element={<Signup/>}/>

          <Route path="/alluser/:id" element={<All_User/>}/>
          
          <Route path="/client" element={<Client/>}/>

          <Route path="/usersignup" element={<User_Signup/>}/>

          <Route path="/allclientuser" element={<All_Client_User/>}/>

          <Route path="/totaluser" element={<Total_User/>}/>


    {/* user -product */}
        <Route path="/user" element={<User/>}/>
        <Route path="/classadd" element={<Class_Add/>}/>
        <Route path="/classall" element={<Class_All/>}/>


        </Routes>
      </Router>
    </>
  )
}

export default App