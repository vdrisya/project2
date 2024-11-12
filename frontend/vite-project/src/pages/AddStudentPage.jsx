import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddStudentPage = ({ mentorId }) => {
  const [studentId, setStudentId] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentDOB, setStudentDOB] = useState('');
  const [studentName, setStudentName] = useState('');
  const [projectTopic, setProjectTopic] = useState('');
  const navigate= useNavigate();

  // Function to generate a password based on student email and DOB
  const generatePassword = (email, dob) => {
    const emailPrefix = email.slice(0, 3).toLowerCase();
    const dobPrefix = dob.replace(/[^0-9]/g, '').slice(0, 3); // Remove non-numeric characters from DOB and take the first 3 numbers
    return emailPrefix + dobPrefix;
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();

    const password = generatePassword(studentEmail, studentDOB);

    const newStudent = {
      studentId,
      studentEmail,
      studentDOB,
      studentName,
      projectTopic,
      mentorId,
      password // Use the generated password for the student
    };

    try {
      // Post data to backend API to add the student
      await axios.post('/api/students', newStudent);

      // Redirect to mentor dashboard after successfully adding the student
      navigate.push(`/mentor/dashboard/${mentorId}`);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <Container>
      <h2>Add New Student</h2>
      <Form onSubmit={handleStudentSubmit}>
        <Form.Group controlId="studentId">
          <Form.Label>Student ID</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Student ID" 
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="studentEmail">
          <Form.Label>Student Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter Student Email" 
            value={studentEmail} 
            onChange={(e) => setStudentEmail(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="studentDOB">
          <Form.Label>Student DOB</Form.Label>
          <Form.Control 
            type="date" 
            value={studentDOB} 
            onChange={(e) => setStudentDOB(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="studentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Student Name" 
            value={studentName} 
            onChange={(e) => setStudentName(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="projectTopic">
          <Form.Label>Project Topic</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Project Topic" 
            value={projectTopic} 
            onChange={(e) => setProjectTopic(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit">Add Student</Button>
      </Form>
    </Container>
  );
};

export default AddStudentPage;
