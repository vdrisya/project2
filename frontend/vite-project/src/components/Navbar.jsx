// Navbar.jsx
import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = ({ user, handleLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Project Mentoring Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                {user.role === 'admin' && (
                  <NavDropdown title="Admin Dashboard" id="admin-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/courses">Manage Courses</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/mentors">Manage Mentors</NavDropdown.Item>
                  </NavDropdown>
                )}
                {user.role === 'mentor' && (
                  <NavDropdown title="Mentor Dashboard" id="mentor-dropdown">
                    <NavDropdown.Item as={Link} to="/mentor/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/mentor/students">Manage Students</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/mentor/project-flow">Project Flow</NavDropdown.Item>
                  </NavDropdown>
                )}
                {user.role === 'student' && (
                  <NavDropdown title="Student Dashboard" id="student-dropdown">
                    <NavDropdown.Item as={Link} to="/student/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/student/project-status">Project Status</NavDropdown.Item>
                  </NavDropdown>
                )}
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
