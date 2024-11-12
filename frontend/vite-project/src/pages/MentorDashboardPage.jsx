// MentorDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import StudentCard from '../pages/StudentCard';
import { Link } from 'react-router-dom';

const MentorDashboardPage = () => {
  const [students, setStudents] = useState([]);

  // Simulate fetching mentor's students
  useEffect(() => {
    const fetchedStudents = [
      { id: 1, name: 'Student A', email: 'studentA@example.com' },
      { id: 2, name: 'Student B', email: 'studentB@example.com' },
    ];
    setStudents(fetchedStudents);
  }, []);

  return (
    <Container>
      <h2>Mentor Dashboard</h2>
      <Row>
        {students.map((student) => (
          <Col key={student.id} sm={4} className="mb-3">
            <StudentCard student={student} />
            <Link to={`/mentor/students/${student.id}`}>
              <Button variant="primary" className="mt-2">
                View Student Details
              </Button>
            </Link>
          </Col>
        ))}
      </Row>
      <Link to="/mentor/students/add">
        <Button variant="success" className="mt-3">
          Add New Student
        </Button>
      </Link>
    </Container>
  );
};

export default MentorDashboardPage;
