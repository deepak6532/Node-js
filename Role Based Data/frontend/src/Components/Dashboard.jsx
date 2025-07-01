import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Client_Signup from './Client_Signup';
import All_Client from './All_Client';
import Total_Client from './Total_Client';

const Dashboard = () => {
  const [section, setSection] = useState('addClient');

  const renderSection = () => {
    if (section === '/clientsignup') {
      return <Client_Signup/>;
    } else if (section === '/allclient') {
      return <All_Client/>
    } else if (section === '/totalclient') {
      return <Total_Client/>
    } else if (section === 'totalUsers') {
      return <h1 className="text-2xl font-bold">Total Users: 8</h1>;
    } else {
      return <h1 className="text-2xl font-bold">Welcome</h1>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onSectionChange={setSection} />
      <main className="flex-1 p-8 bg-gray-100">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
