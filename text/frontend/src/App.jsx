import React  from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Signup from './Components/Signup';
import Login from './Components/Login';
import Reset from './Components/Reset';
import Forgot  from './Components/Forgot';
import AllUser from './Components/AllUser';




const App = () => {
  return (
    <Router>
     
       <nav className="bg-gray-800 p-4 text-white flex justify-end space-x-6">
        <Link to="/signup" className="hover:text-blue-400 font-bold">Signup</Link>
        <Link to="/login" className="hover:text-blue-400 font-bold">Login</Link>
        <Link to="/reset" className="hover:text-blue-400 font-bold">Reset</Link>
        <Link to="forgot" className='hover:text-blue-400 font-bold'>Forgot</Link>
        <Link to="/alluser" className="hover:text-blue-400 font-bold">AllUser</Link>
      </nav>

    
      <Routes>
        <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
         <Route path="/reset" element={<Reset />} />
         <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/alluser" element={<AllUser/>}/>
      </Routes>
    </Router>
  );
};

export default App;












