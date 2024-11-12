import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const AddProjectStatusPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    projectTopic: '',
    projectPhases: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the student's project data
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setProjectData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [studentId]);

  const handlePhaseStatusChange = (index, value) => {
    const updatedPhases = [...projectData.projectPhases];
    updatedPhases[index].status = value;
    setProjectData({ ...projectData, projectPhases: updatedPhases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/students/${studentId}`, { projectPhases: projectData.projectPhases });
      alert('Project status updated successfully');
      navigate.push('/student/dashboard'); // Redirect to student dashboard after success
    } catch (error) {
      console.error('Error updating project status:', error);
      alert('Failed to update project status');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h2>Update Project Status</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formProjectTopic">
          <Form.Label column sm={2}>
            Project Topic
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Project Topic"
              value={projectData.projectTopic}
              readOnly
            />
          </Col>
        </Form.Group>

        {projectData.projectPhases.map((phase, index) => (
          <Form.Group as={Row} key={index}>
            <Form.Label column sm={2}>
              {phase.phaseName}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={phase.status}
                onChange={(e) => handlePhaseStatusChange(index, e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </Form.Control>
            </Col>
          </Form.Group>
        ))}

        <Button variant="primary" type="submit">
          Update Status
        </Button>
      </Form>
    </Container>
  );
};

export default AddProjectStatusPage;
