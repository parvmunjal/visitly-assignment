import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={theme}>
      <Navbar bg={theme === 'light' ? 'light' : 'dark'} expand="lg" className="sticky-top shadow-sm">
        <Container>
          <Navbar.Brand href="/" className={theme === 'light' ? 'text-primary' : 'text-white'}>
            <strong>User Management App</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/" className={theme === 'light' ? 'nav-link' : 'nav-link text-white'}>
                Home
              </Nav.Link>
              <Button onClick={toggleTheme} variant={theme === 'light' ? 'outline-dark' : 'outline-light'}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </Nav>
          </Navbar.Collapse>
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
