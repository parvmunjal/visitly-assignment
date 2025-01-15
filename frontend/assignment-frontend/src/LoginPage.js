import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'; 
import Layout from './Layout';


function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});
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
            const response = await fetch('https://visitly-e43b463b8f2b.herokuapp.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem('authToken', responseData.token);
                setLoading(false);
                
                navigate('/'); 
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Something went wrong. Please try again.');
                setLoading(false);
            }
        } catch (error) {
            setErrorMessage('Failed to submit. Please try again.');
            setLoading(false);
        }
    };

    return (
        <Layout>
                <Container className="login-container">
            <Row className="justify-content-center align-items-center vh-100">
                <Col md={6}>
                    <Card className="login-card">
                        <Card.Body>
                            {errorMessage && (
                                <Alert variant="danger" className="mb-3">
                                    {errorMessage}
                                </Alert>
                            )}
                            <h2 className="text-center">Login</h2>
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
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                                </Button>
                            </Form>
                            <div className="text-center mt-2">
                                <Button variant="link" href="/signup">
                                    Don't have an account? Sign Up
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Layout>
    );
}

export default LoginPage;
