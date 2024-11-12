// Admin/AddMentorModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddMentorModal = ({ onClose, onAddMentor }) => {
  const [newMentor, setNewMentor] = useState({
    mentorName: '',
    contact: '',
    specialization: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMentor({
      ...newMentor,
      [name]: value,
    });
  };

  // Handle form submission to add mentor
  const handleSubmit = (e) => {
    e.preventDefault();
    const mentorId = generateMentorId(newMentor.mentorName, newMentor.contact);
    const mentorData = { ...newMentor, mentorId };
    onAddMentor(mentorData); // Pass the new mentor data to the parent component
    setNewMentor({ // Reset the form after submission
      mentorName: '',
      contact: '',
      specialization: '',
    });
  };

  // Function to generate mentor ID based on mentor name and contact (as an example)
  const generateMentorId = (name, contact) => {
    const namePart = name.split(' ').join('').substring(0, 3); // First 3 letters of mentor name
    const contactPart = contact.substring(0, 3); // First 3 digits of contact
    return `${namePart}${contactPart}`.toUpperCase();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Mentor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="mentorName">
            <Form.Label>Mentor Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mentor's name"
              name="mentorName"
              value={newMentor.mentorName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact number"
              name="contact"
              value={newMentor.contact}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="specialization">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter specialization"
              name="specialization"
              value={newMentor.specialization}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Add Mentor
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

export default AddMentorModal;
