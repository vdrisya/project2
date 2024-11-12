import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddMentorPage = ({ courseId }) => {
  const [mentorId, setMentorId] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [mentorContact, setMentorContact] = useState('');
  const [mentorSpecialization, setMentorSpecialization] = useState('');
  const navigate = useNavigate();

  const handleMentorSubmit = async (e) => {
    e.preventDefault();

    const newMentor = {
      mentorId,
      mentorName,
      mentorContact,
      mentorSpecialization,
      courseId // Attach the course ID to associate this mentor with a course
    };

    try {
      // Post data to backend API to add the mentor
      await axios.post('/api/mentors', newMentor);

      // Redirect to course details page after successfully adding the mentor
      navigate.push(`/admin/dashboard/course/${courseId}`);
    } catch (error) {
      console.error('Error adding mentor:', error);
    }
  };

  return (
    <Container>
      <h2>Add New Mentor</h2>
      <Form onSubmit={handleMentorSubmit}>
        <Form.Group controlId="mentorId">
          <Form.Label>Mentor ID</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Mentor ID" 
            value={mentorId} 
            onChange={(e) => setMentorId(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="mentorName">
          <Form.Label>Mentor Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Mentor Name" 
            value={mentorName} 
            onChange={(e) => setMentorName(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="mentorContact">
          <Form.Label>Mentor Contact</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Mentor Contact" 
            value={mentorContact} 
            onChange={(e) => setMentorContact(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="mentorSpecialization">
          <Form.Label>Mentor Specialization</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Mentor Specialization" 
            value={mentorSpecialization} 
            onChange={(e) => setMentorSpecialization(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit">Add Mentor</Button>
      </Form>
    </Container>
  );
};

export default AddMentorPage;
