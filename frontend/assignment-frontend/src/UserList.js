import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchUsers(token);
    }
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch('https://visitly-e43b463b8f2b.herokuapp.com/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/login');
      } else {
        alert('Failed to fetch users. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdate = (userId) => {
    navigate(`/update-user/${userId}`);
  };

  const handleShowModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`https://visitly-e43b463b8f2b.herokuapp.com/api/users/${selectedUserId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.userId !== selectedUserId));
      } else if (response.status === 401) {
        alert('You are not authorized to delete this user. Please log in again.');
        localStorage.removeItem('authToken');
        navigate('/login');
      } else {
        alert('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Layout>
      <Container className="user-list-container">
        <h2 className="text-center mb-4 text-primary">User List</h2>
        <Row>
          {users.map(user => (
            <Col md={4} key={user.userId} className="mb-4">
              <Card className="user-card shadow-lg">
                <Card.Body>
                  <Card.Title className="text-primary">{user.firstName} {user.lastName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
                  <Card.Text>
                    <strong>Email:</strong> {user.email}
                    <br />
                    <strong>Gender:</strong> {user.gender}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleUpdate(user.userId)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleShowModal(user.userId)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className={theme === 'dark' ? 'text-white' : ''}>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body className={theme === 'dark' ? 'text-white' : ''}>
            Are you sure you want to delete this user?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
};

export default UserList;
