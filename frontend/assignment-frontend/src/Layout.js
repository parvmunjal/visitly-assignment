import React, { useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme; // Set the body class based on the theme
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');  
    navigate('/login');  
  };

  const isAuthenticated = localStorage.getItem('authToken') !== null;

  return (
    <div className={theme}>
      <Navbar bg={theme === 'light' ? 'light' : 'dark'} expand="lg" className="sticky-top shadow-sm">
        <Container>
          <Navbar.Brand href="/" className={theme === 'light' ? 'text-primary' : 'text-white'}>
            <strong>User Management App</strong>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Button 
              onClick={toggleTheme} 
              variant={theme === 'light' ? 'outline-dark' : 'outline-light'} 
              className="ml-auto">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>

            {!isAuthenticated ? (
              <Link to="/login">
                <Button variant="outline-primary" className="ml-3" >
                  Login
                </Button>
              </Link>
            ) : (
              <Button variant="outline-danger" className="ml-3" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <div className="content">{children}</div>

      <footer className="mt-5">
        <Container className="text-center">
          <p className={theme === 'light' ? 'text-muted' : 'text-white'}>
            &copy; 2025 User Management App. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
