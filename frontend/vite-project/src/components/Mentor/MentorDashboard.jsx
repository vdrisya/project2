// MentorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import AddStudentModal from './AddStudentModal'; // Modal to add students

const MentorDashboard = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mentorId, setMentorId] = useState(''); // Assume mentorId is stored in a global state or derived from auth context
  
  // Fetch students assigned to this mentor
  useEffect(() => {
    // Assuming mentor ID is available through authentication context or props
    const mentorIdFromAuth = 'mentor123'; // Replace this with the actual mentor ID from context or auth
    setMentorId(mentorIdFromAuth);
    
    // Fetch students assigned to this mentor from the backend
    axios.get(`/api/mentor/${mentorIdFromAuth}/students`)
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students: ", error));
  }, [mentorId]);

  // Handle student addition modal toggle
  const handleAddStudent = () => {
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle the addition of a student
  const addStudentHandler = (newStudent) => {
    // Send the new student data to the backend
    axios.post(`/api/mentor/${mentorId}/students`, newStudent)
      .then(response => {
        setStudents([...students, response.data]); // Add new student to the list
        setShowModal(false); // Close the modal
      })
      .catch(error => console.error("Error adding student: ", error));
  };

  return (
    <Container>
      <h2>Welcome, Mentor</h2>

      {/* Button to open the "Add Student" modal */}
      <Button variant="primary" onClick={handleAddStudent}>
        Add Student
      </Button>

      {/* Table of students assigned to the mentor */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Project Topic</th>
            <th>Project Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.studentId}>
              <td>{student.studentName}</td>
              <td>{student.studentEmail}</td>
              <td>{student.projectTopic}</td>
              <td>{student.projectStatus}</td>
              <td>
                {/* Action buttons like view project flow or evaluation status */}
                <Button variant="info" className="me-2">Project Flow</Button>
                <Button variant="secondary">Evaluation Status</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Student Modal */}
      {showModal && <AddStudentModal onClose={handleCloseModal} onAddStudent={addStudentHandler} mentorId={mentorId} />}
    </Container>
  );
};

export default MentorDashboard;
