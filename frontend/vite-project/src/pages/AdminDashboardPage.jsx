// AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CourseCard from '../components/Admin/CourseCard';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [courses, setCourses] = useState([]);

  // Simulate fetching courses from the backend
  useEffect(() => {
    const fetchedCourses = [
      { id: 1, name: 'FSD', category: 'Full Stack Development' },
      { id: 2, name: 'DSA', category: 'Data Structures and Algorithms' },
      { id: 3, name: 'CSA', category: 'Computer Science Fundamentals' },
    ];
    setCourses(fetchedCourses);
  }, []);

  return (
    <Container>
      <h2>Admin Dashboard</h2>
      <Row>
        {courses.map((course) => (
          <Col key={course.id} sm={4} className="mb-3">
            <CourseCard course={course} />
            <Link to={`/admin/courses/${course.id}`}>
              <Button variant="primary" className="mt-2">
                View Course Details
              </Button>
            </Link>
          </Col>
        ))}
      </Row>
      <Link to="/admin/courses/add">
        <Button variant="success" className="mt-3">
          Add New Course
        </Button>
      </Link>
    </Container>
  );
};

export default AdminDashboardPage;
