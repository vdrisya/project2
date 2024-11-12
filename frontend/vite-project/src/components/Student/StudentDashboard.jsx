// Student/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Card, Container } from 'react-bootstrap';
import axios from 'axios';

const StudentDashboard = ({ studentId }) => {
  const [studentData, setStudentData] = useState(null);
  const [projectStatus, setProjectStatus] = useState({
    initialization: '',
    design: '',
    backend: '',
    frontend: '',
    integration: '',
    authentication: '',
    testing: '',
    deployment: '',
    documentation: '',
  });

  // Fetch student data and project status
  useEffect(() => {
    axios
      .get(`/api/student/${studentId}`)
      .then((response) => {
        setStudentData(response.data);
        setProjectStatus(response.data.projectFlow || {});
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [studentId]);

  // Handle the status change
  const handleStatusChange = (phase, status) => {
    setProjectStatus((prevStatus) => ({
      ...prevStatus,
      [phase]: status,
    }));
  };

  // Handle form submission to update project status
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/api/student/${studentId}/updateProjectFlow`, projectStatus)
      .then((response) => {
        console.log('Project status updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating project status:', error);
      });
  };

  return (
    <Container>
      <h3>{studentData ? `${studentData.studentName}'s Dashboard` : 'Loading...'}</h3>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={12} md={6}>
                <Form.Group controlId="formBasicText">
                  <Form.Label>Project Topic</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Project Topic"
                    value={studentData?.projectTopic || ''}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <h4>Project Status</h4>

            {Object.keys(projectStatus).map((phase) => (
              <Form.Group key={phase}>
                <Form.Label>{phase.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label>
                <Form.Control
                  as="select"
                  value={projectStatus[phase]}
                  onChange={(e) => handleStatusChange(phase, e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </Form.Control>
              </Form.Group>
            ))}

            <Button variant="primary" type="submit">
              Save Status
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentDashboard;
