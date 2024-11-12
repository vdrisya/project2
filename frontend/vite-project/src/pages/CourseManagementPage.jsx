// CourseManagementPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const CourseManagementPage = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    category: '',
    fee: '',
    description: '',
  });

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate adding course logic (e.g., save to database)
    console.log(courseData);
  };

  return (
    <Container>
      <h2>Manage Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCourseCategory">
          <Form.Label>Course Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course category"
            name="category"
            value={courseData.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCourseFee">
          <Form.Label>Course Fee</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter course fee"
            name="fee"
            value={courseData.fee}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCourseDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter course description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Course
        </Button>
      </Form>
    </Container>
  );
};

export default CourseManagementPage;
