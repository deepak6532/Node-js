import React  from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Signup from './Components/Signup';

import Login from './Components/Login';
import Addproduct from './Components/Addproduct';
import GetProduct from './Components/Getproduct';
// import Reset from './Components/Reset';
// import Forgot  from './Components/Forgot';
// import AllUser from './Components/AllUser';




const App = () => {
  return (
    <Router>
     
       <nav className="bg-gray-800 p-4 text-white flex justify-end space-x-6">
        <Link to="/signup" className="hover:text-blue-400 font-bold">Signup</Link>
        <Link to="/login" className="hover:text-blue-400 font-bold">Login</Link>
        <Link to="/addproduct" className="hover:text-blue-400 font-bold">Addproduct</Link>
        <Link to="/getproduct" className="hover:text-blue-400 font-bold">Getproduct</Link>

      </nav>

    
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/getproduct" element={<GetProduct />} />
        
      </Routes>
    </Router>
  );
};

export default App;












