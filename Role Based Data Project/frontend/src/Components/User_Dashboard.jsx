import React, { useState } from 'react';
import User_Sidebar from './User_Sidebar';

// import User_Signup from './User_Signup';
// import All_User from './All_User';
// import All_Client_User from './All_Client_User';
import Total_User from './Total_User';
import Class_Add from './Class_Add';
import Class_All from './Class_All';
import Total_Class from './Total_Class';
import Course_Add from './Course/Course_Add';
import Course_All from './Course/Course_All';
import Batch_Add from './Batch/Batch_Add';
import Batch_All from './Batch/Batch_All';


const User_Dashboard= () => {
  const [section, setSection] = useState('addClient');

  const renderSection = () => {
    if (section === '/classadd') {
      return <Class_Add/>
    } else if (section === '/classall') {
      return <Class_All/>
    }
    //  else if (section === '/totalclient') {
    //   return <Total_Client/>
    // }
     else if (section === '/totalclass') {
      return <Total_Class/>
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
      <User_Sidebar onSectionChange={setSection} />
      <main className="flex-1 p-8 bg-gray-100">
        {renderSection()}
      </main>
    </div>
  );
};

export default User_Dashboard;
