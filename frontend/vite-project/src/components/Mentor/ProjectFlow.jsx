// Mentor/ProjectFlow.jsx
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const ProjectFlow = ({ mentorId }) => {
  const [students, setStudents] = useState([]);

  // Fetch students assigned to the mentor
  useEffect(() => {
    axios
      .get(`/api/mentor/${mentorId}/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [mentorId]);

  // Handle status update of project phase
  const handleStatusUpdate = (studentId, phase, status) => {
    const updatedStudent = {
      studentId,
      phase,
      status,
    };

    axios
      .put(`/api/mentor/${mentorId}/students/${studentId}/projectflow`, updatedStudent)
      .then((response) => {
        // Update the local state after a successful update
        const updatedStudents = students.map((student) =>
          student._id === studentId ? response.data : student
        );
        setStudents(updatedStudents);
      })
      .catch((error) => {
        console.error('Error updating project status:', error);
      });
  };

  return (
    <div>
      <h3>Project Flow</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Project Topic</th>
            <th>Initialization & Planning</th>
            <th>Design Phase</th>
            <th>Backend Development</th>
            <th>Frontend Development</th>
            <th>Frontend & Backend Integration</th>
            <th>Authentication & Authorization</th>
            <th>Testing & Validation</th>
            <th>Deployment & Hosting</th>
            <th>Documentation</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentName}</td>
              <td>{student.projectTopic}</td>
              <td>
                <Button
                  variant={student.projectFlow?.initialization === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'initialization', student.projectFlow?.initialization === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.initialization || 'Not Started'}
                </Button>
              </td>
              <td>
                <Button
                  variant={student.projectFlow?.design === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'design', student.projectFlow?.design === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.design || 'Not Started'}
                </Button>
              </td>
              <td>
                <Button
                  variant={student.projectFlow?.backend === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'backend', student.projectFlow?.backend === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.backend || 'Not Started'}
                </Button>
              </td>
              <td>
                <Button
                  variant={student.projectFlow?.frontend === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'frontend', student.projectFlow?.frontend === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.frontend || 'Not Started'}
                </Button>
              </td>
              <td>
                <Button
                  variant={student.projectFlow?.integration === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'integration', student.projectFlow?.integration === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.integration || 'Not Started'}
                </Button>
              </td>
              <td>
                <Button
                  variant={student.projectFlow?.authentication === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'authentication', student.projectFlow?.authentication === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.authentication || 'Not Started'}
                </Button>
              </td>
              <td>
                <Button
                  variant={student.projectFlow?.testing === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'testing', student.projectFlow?.testing === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.testing || 'Not Started'}
                </Button>
              </td>
              <td>
                <Button
                  variant={student.projectFlow?.deployment === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'deployment', student.projectFlow?.deployment === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.deployment || 'Not Started'}
                </Button>
              </td>
              <td>
                <Button
                  variant={student.projectFlow?.documentation === 'Done' ? 'success' : 'warning'}
                  onClick={() =>
                    handleStatusUpdate(student._id, 'documentation', student.projectFlow?.documentation === 'Done' ? 'Not Started' : 'Done')
                  }
                >
                  {student.projectFlow?.documentation || 'Not Started'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectFlow;
