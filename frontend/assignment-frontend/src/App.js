import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // Adjust the path if needed
import CreateUser from './CreateUser'; // Import CreateUser component
import UserList from './UserList'; // Import UserList component
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
