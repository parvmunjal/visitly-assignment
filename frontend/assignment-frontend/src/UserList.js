import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './UserList.css'; // Import custom CSS for additional styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      const data = await response.json();
      setUsers(data);
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
    try {
      const response = await fetch(`http://localhost:8080/api/users/${selectedUserId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.userId !== selectedUserId));
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
      <Container className="mt-5 user-list-container">
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
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
