import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddCoursePage = () => {
  const [courseId, setCourseId] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const navigate = useNavigate();

  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      courseId,
      courseImage,
      courseName,
      courseCategory,
      courseFee,
      courseDescription
    };

    try {
      // Post data to backend API to add the course
      await axios.post('/api/courses', newCourse);

      // Redirect to the admin dashboard after successfully adding the course
      navigate.push('/admin/dashboard');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <Container>
      <h2>Add New Course</h2>
      <Form onSubmit={handleCourseSubmit}>
        <Form.Group controlId="courseId">
          <Form.Label>Course ID</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Course ID" 
            value={courseId} 
            onChange={(e) => setCourseId(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="courseImage">
          <Form.Label>Course Image URL</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Image URL" 
            value={courseImage} 
            onChange={(e) => setCourseImage(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="courseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Course Name" 
            value={courseName} 
            onChange={(e) => setCourseName(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="courseCategory">
          <Form.Label>Course Category</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Course Category" 
            value={courseCategory} 
            onChange={(e) => setCourseCategory(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="courseFee">
          <Form.Label>Course Fee</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter Course Fee" 
            value={courseFee} 
            onChange={(e) => setCourseFee(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="courseDescription">
          <Form.Label>Course Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Enter Course Description" 
            value={courseDescription} 
            onChange={(e) => setCourseDescription(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit">Add Course</Button>
      </Form>
    </Container>
  );
};

export default AddCoursePage;
