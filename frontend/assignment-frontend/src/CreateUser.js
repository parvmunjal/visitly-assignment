import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './CreateUser.css';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username || formData.username.length < 3 || formData.username.length > 20) {
      errors.username = 'Username must be between 3 and 20 characters';
    }
    if (!formData.firstName || formData.firstName.length < 1 || formData.firstName.length > 20) {
      errors.firstName = 'First name must be between 1 and 20 characters';
    }
    if (!formData.lastName || formData.lastName.length < 1 || formData.lastName.length > 20) {
      errors.lastName = 'Last name must be between 1 and 20 characters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }
    if (!formData.password || formData.password.length < 6 || formData.password.length > 25) {
      errors.password = 'Password must be between 6 and 25 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    if (!validate()) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLoading(false);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/user-list');
        }, 2200); 
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create user. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to create user. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h3 className="text-center mb-4">Create User</h3>
                {errorMessage && (
                  <Alert variant="danger" className="mb-4">
                    {errorMessage}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Enter username"
                          value={formData.username}
                          onChange={handleChange}
                          isInvalid={formErrors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.username}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={formErrors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formFirstName" className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={handleChange}
                          isInvalid={formErrors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formLastName" className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={handleChange}
                          isInvalid={formErrors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formGender" className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          as="select"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          isInvalid={formErrors.gender}
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {formErrors.gender}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                          isInvalid={formErrors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-3 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Create User'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showSuccessModal} centered>
        <Modal.Body className="text-center">
          <div className="checkmark-animation">
            <i className="fa fa-check-circle" style={{ fontSize: '3rem', color: 'green' }}></i>
            <p className="mt-3">User Created Successfully!</p>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default CreateUser;
