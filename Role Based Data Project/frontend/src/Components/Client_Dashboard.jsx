import React, { useState } from 'react';
import Client_Sidebar from './Client_sidebar';
// import Client_Signup from './Client_Signup';
// import All_Client from './All_Client';
// import Total_Client from './Total_Client';
import User_Signup from './User_Signup';
// import All_User from './All_User';
import All_Client_User from './All_Client_User';
import Total_User from './Total_User';
import Course_Add from './Course/Course_Add';
import Course_All from './Course/Course_All';
import Batch_Add from './Batch/Batch_Add';
import Batch_All from './Batch/Batch_All';


const Client_Dashboard = () => {
  const [section, setSection] = useState('addClient');

  const renderSection = () => {
    if (section === '/usersignup') {
      return <User_Signup/>;
    } else if (section === '/allclientuser') {
      return <All_Client_User/>
    }
    //  else if (section === '/totalclient') {
    //   return <Total_Client/>
    // }
     else if (section === '/totaluser') {
      return <Total_User/>
    }
     else if (section === '/addcourse') {
      return <Course_Add/>
    }
     else if (section === '/allcourse') {
      return <Course_All/>
    }
     else if (section === '/addbatch') {
      return <Batch_Add/>
    }
     else if (section === '/allbatch') {
      return <Batch_All/>
    }
    
    else {
      return <h1 className="text-2xl font-bold">Welcome</h1>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Client_Sidebar onSectionChange={setSection} />
      <main className="flex-1 p-8 bg-gray-100">
        {renderSection()}
      </main>
    </div>
  );
};

export default Client_Dashboard;
