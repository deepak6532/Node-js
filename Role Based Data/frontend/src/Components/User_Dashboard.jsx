import React, { useState } from 'react';
import User_Sidebar from './User_Sidebar';

// import User_Signup from './User_Signup';
// import All_User from './All_User';
// import All_Client_User from './All_Client_User';
import Total_User from './Total_User';
import Class_Add from './Class_Add';
import Class_All from './Class_All';


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
     else if (section === '/totaluser') {
      return <Total_User/>
    } else {
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
