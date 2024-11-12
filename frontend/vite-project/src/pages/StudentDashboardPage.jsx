// StudentDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';

const StudentDashboardPage = () => {
  const [projectStatus, setProjectStatus] = useState([]);

  // Simulate fetching project status
  useEffect(() => {
    const status = [
      { phase: 'Initialization', status: 'Not Started' },
      { phase: 'Design', status: 'Doing' },
      { phase: 'Backend Development', status: 'Not Started' },
    ];
    setProjectStatus(status);
  }, []);

  return (
    <Container>
      <h2>Student Dashboard</h2>
      <ListGroup>
        {projectStatus.map((phase, index) => (
          <ListGroup.Item key={index}>
            {phase.phase}: {phase.status}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary" className="mt-3">
        Update Project Status
      </Button>
    </Container>
  );
};

export default StudentDashboardPage;
