// src/LandingPage.js
import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Welcome to the User Management App</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to="/create-user">
            <Button variant="primary" size="lg">Create User</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/user-list">
            <Button variant="primary" size="lg">User List</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
