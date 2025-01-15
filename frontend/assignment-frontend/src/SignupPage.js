import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './SignupPage.css';  
import Layout from './Layout';

function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false); 
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
        setSuccessMessage('');
        if (!validate()) {
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch('https://visitly-e43b463b8f2b.herokuapp.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setSuccessMessage('Registration successful!');
                setLoading(false);
                setShowModal(true); 
    
                setTimeout(() => {
                    navigate('/login');
                }, 2000); 
            } else {
                const errorData = await response.json();
    
                if (errorData.message && errorData.message.includes('Username already taken')) {
                    setErrorMessage('Username is already taken. Please choose another one.');
                } else {
                    setErrorMessage(errorData.message || 'Something went wrong. Please try again.');
                }
    
                setLoading(false);
            }
        } catch (error) {
            setErrorMessage('Failed to submit. Please try again.');
            setLoading(false);
        }
    };
    

    return (
        <Layout>
            <Container className="signup-container">
                <Row className="justify-content-center align-items-center vh-100">
                    <Col md={6}>
                        <Card className="signup-card">
                            <Card.Body>
                                {errorMessage && (
                                    <Alert variant="danger" className="mb-3">
                                        {errorMessage}
                                    </Alert>
                                )}
                                {successMessage && (
                                    <Alert variant="success" className="mb-3">
                                        {successMessage}
                                    </Alert>
                                )}
                                <h2 className="text-center">Sign Up</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsername">
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

                                    <Form.Group controlId="formFirstName">
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

                                    <Form.Group controlId="formLastName">
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

                                    <Form.Group controlId="formEmail">
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

                                    <Form.Group controlId="formGender">
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

                                    <Form.Group controlId="formPassword">
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

                                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                                        {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                                    </Button>
                                </Form>
                                <div className="text-center mt-2">
                                    <Button variant="link" href="/login">
                                        Already have an account? Login
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body className="text-center">
                    <div className="checkmark-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52">
                            <circle className="checkmark-circle-path" cx="26" cy="26" r="25" fill="none" stroke="#4CAF50" strokeWidth="2" />
                            <path className="checkmark" fill="none" stroke="#4CAF50" strokeWidth="2" d="M14 26l7 7 15-15" />
                        </svg>
                    </div>
                    <h4>Registration Successful!</h4>
                    <p>Redirecting to Login Page</p>
                </Modal.Body>
            </Modal>
        </Layout>
    );
}

export default SignupPage;
