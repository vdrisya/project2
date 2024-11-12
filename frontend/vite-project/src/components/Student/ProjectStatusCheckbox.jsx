// Student/ProjectStatusCheckbox.jsx
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const ProjectStatusCheckbox = ({ projectStatus, handleStatusChange }) => {
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
                <Form.Check 
                  type="radio"
                  label="Not Started"
                  name={phaseKey}
                  value="Not Started"
                  checked={projectStatus[phaseKey] === 'Not Started'}
                  onChange={() => handleStatusChange(phaseKey, 'Not Started')}
                />
              </Col>
              <Col>
                <Form.Check 
                  type="radio"
                  label="Doing"
                  name={phaseKey}
                  value="Doing"
                  checked={projectStatus[phaseKey] === 'Doing'}
                  onChange={() => handleStatusChange(phaseKey, 'Doing')}
                />
              </Col>
              <Col>
                <Form.Check 
                  type="radio"
                  label="Done"
                  name={phaseKey}
                  value="Done"
                  checked={projectStatus[phaseKey] === 'Done'}
                  onChange={() => handleStatusChange(phaseKey, 'Done')}
                />
              </Col>
            </Row>
          </Form.Group>
        );
      })}
      <Button variant="primary" type="submit" onClick={(e) => e.preventDefault()}>
        Save Status
      </Button>
    </Form>
  );
};

export default ProjectStatusCheckbox;
