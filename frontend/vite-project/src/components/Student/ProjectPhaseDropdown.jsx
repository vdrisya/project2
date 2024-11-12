// Student/ProjectPhaseDropdown.jsx
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ProjectPhaseDropdown = ({ projectStatus, handleStatusChange }) => {
  const phases = [
    'Initialization and Planning',
    'Design Phase',
    'Backend Development',
    'Frontend Development',
    'Frontend and Backend Integration',
    'Authentication and Authorization',
    'Testing and Validation',
    'Deployment and Hosting',
    'Project Documentation'
  ];

  return (
    <Form>
      <h4>Project Phases</h4>
      {phases.map((phase, index) => {
        const phaseKey = phase.toLowerCase().replace(/\s+/g, ''); // Convert phase to a key (e.g., "Initialization and Planning" to "initializationandplanning")
        
        return (
          <Form.Group key={index}>
            <Form.Label>{phase}</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  as="select"
                  value={projectStatus[phaseKey] || 'Not Started'}
                  onChange={(e) => handleStatusChange(phaseKey, e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        );
      })}
    </Form>
  );
};

export default ProjectPhaseDropdown;
