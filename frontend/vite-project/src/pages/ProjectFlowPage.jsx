import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectFlowPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mentorId } = useParams();
  const navigate = useNavigate();

  // Fetch project flow data for the mentor
  useEffect(() => {
    const fetchProjectFlow = async () => {
      try {
        const response = await axios.get(`/api/mentors/${mentorId}/students`);
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project flow data:', error);
        setLoading(false);
      }
    };

    fetchProjectFlow();
  }, [mentorId]);

  const handleViewStudentDetails = (studentId) => {
    // Redirect to a detailed student page (or show more details in a modal)
    navigate.push(`/mentor/project-flow/${studentId}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h2>Project Flow</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Project Topic</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentName}</td>
                <td>{student.projectTopic}</td>
                <td>
                  {/* You can display progress status here */}
                  <ul>
                    {student.projectPhases.map((phase, index) => (
                      <li key={index}>
                        <strong>{phase.phaseName}:</strong> {phase.status}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <Button 
                    variant="info" 
                    onClick={() => handleViewStudentDetails(student._id)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students found for this mentor.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProjectFlowPage;
