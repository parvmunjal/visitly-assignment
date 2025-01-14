import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; 
import CreateUser from './CreateUser'; 
import UserList from './UserList'; 
import UpdateUser from './UpdateUser';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/update-user/:userId" element={<UpdateUser />} />

      </Routes>
    </Router>
  );
}

export default App;
