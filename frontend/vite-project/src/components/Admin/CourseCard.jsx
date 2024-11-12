// Admin/CourseCard.jsx
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CourseCard = ({ course, onEdit, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState(course);

  // Handle editing the course
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse({
      ...updatedCourse,
      [name]: value,
    });
  };

  const handleSaveEdit = () => {
    onEdit(course._id, updatedCourse);
    setShowEditModal(false);
  };

  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3>{course.courseName}</h3>
        <p>{course.courseCategory}</p>
        <p>{course.courseFee}</p>
        <p>{course.courseDescription}</p>
      </div>
      <div className="course-card-actions">
        <button onClick={() => setShowEditModal(true)}>Edit</button>
        <button onClick={() => onDelete(course._id)}>Delete</button>
      </div>

      {/* Edit Course Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="courseName">Course Name:</label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={updatedCourse.courseName}
                onChange={handleEditChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseCategory">Course Category:</label>
              <input
                type="text"
                id="courseCategory"
                name="courseCategory"
                value={updatedCourse.courseCategory}
                onChange={handleEditChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseFee">Course Fee:</label>
              <input
                type="text"
                id="courseFee"
                name="courseFee"
                value={updatedCourse.courseFee}
                onChange={handleEditChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseDescription">Course Description:</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={updatedCourse.courseDescription}
                onChange={handleEditChange}
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseCard;
