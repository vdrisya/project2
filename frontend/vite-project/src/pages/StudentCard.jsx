import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {  useNavigate  } from 'react-router-dom';

const StudentCard = ({ student, onEdit, onDelete }) => {
  const navigate = useNavigate ();

  // Navigate to the student's project status page
  const handleViewStatus = () => {
    navigate.push(`/students/${student.studentId}/status`);
  };

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{student.studentName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{student.studentEmail}</Card.Subtitle>
        <Card.Text>
          <strong>Project Topic:</strong> {student.projectTopic}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleViewStatus}>
            View Status
          </Button>
          <Button variant="success" onClick={() => onEdit(student.studentId)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(student.studentId)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
