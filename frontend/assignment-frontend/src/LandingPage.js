import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './Layout'; // Importing Layout component
import './LandingPage.css';

const LandingPage = () => {
  return (
    <Layout>
      <Container className="text-center mt-5">
        <Row className="mb-5">
          <Col>
            <h1 className="display-3 text-primary mb-4">Welcome to the User Management App</h1>
            <p className="lead text-muted">Manage your users efficiently with easy-to-use features. Create, update, and view users seamlessly.</p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <h4 className="card-title">Create User</h4>
                <p className="card-text">Easily create new users by filling in their details.</p>
                <Link to="/create-user">
                  <Button variant="primary" size="lg">Create User</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <h4 className="card-title">User List</h4>
                <p className="card-text">View, update, or delete existing users in the system.</p>
                <Link to="/user-list">
                  <Button variant="primary" size="lg">View Users</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer will be included via Layout component */}
      </Container>
    </Layout>
  );
}

export default LandingPage;
