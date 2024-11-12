// Mentor/AddStudentModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddStudentModal = ({ onClose, onAddStudent, mentorId }) => {
  const [newStudent, setNewStudent] = useState({
    studentName: '',
    studentEmail: '',
    studentDOB: '',
    projectTopic: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  // Generate password based on email and DOB
  const generatePassword = (email, dob) => {
    const emailPart = email.substring(0, 3); // First 3 letters of email
    const dobPart = dob.replace(/[^0-9]/g, '').substring(0, 3); // First 3 digits of DOB
    return `${emailPart}${dobPart}`.toLowerCase();
  };

  // Handle form submission to add a student
  const handleSubmit = (e) => {
    e.preventDefault();

    const password = generatePassword(newStudent.studentEmail, newStudent.studentDOB);
    const studentData = {
      ...newStudent,
      password, // Add the generated password
      mentorId,
    };

    // Send the new student data to the backend
    axios
      .post(`/api/mentor/${mentorId}/students`, studentData)
      .then((response) => {
        onAddStudent(response.data); // Call the parent component's method to add student
        setNewStudent({ // Reset the form fields
          studentName: '',
          studentEmail: '',
          studentDOB: '',
          projectTopic: '',
        });
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="studentName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter student's name"
              name="studentName"
              value={newStudent.studentName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="studentEmail">
            <Form.Label>Student Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter student's email"
              name="studentEmail"
              value={newStudent.studentEmail}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="studentDOB">
            <Form.Label>Student Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="studentDOB"
              value={newStudent.studentDOB}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="projectTopic">
            <Form.Label>Project Topic</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project topic"
              name="projectTopic"
              value={newStudent.projectTopic}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Add Student
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudentModal;
