// Admin/AddCourseModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCourseModal = ({ onClose, onAddCourse }) => {
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    courseCategory: '',
    courseFee: '',
    courseDescription: '',
    courseImage: '', // Optionally, for a course image URL
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value,
    });
  };

  // Handle form submission to add a course
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCourse(newCourse); // Pass the new course data to the parent component
    setNewCourse({ // Reset the form after submission
      courseName: '',
      courseCategory: '',
      courseFee: '',
      courseDescription: '',
      courseImage: '',
    });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="courseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              name="courseName"
              value={newCourse.courseName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="courseCategory">
            <Form.Label>Course Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course category"
              name="courseCategory"
              value={newCourse.courseCategory}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="courseFee">
            <Form.Label>Course Fee</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter course fee"
              name="courseFee"
              value={newCourse.courseFee}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="courseDescription">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter course description"
              name="courseDescription"
              value={newCourse.courseDescription}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="courseImage">
            <Form.Label>Course Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course image URL (optional)"
              name="courseImage"
              value={newCourse.courseImage}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Add Course
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

export default AddCourseModal;
