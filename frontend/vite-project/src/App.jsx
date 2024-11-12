// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MentorDashboardPage from './pages/MentorDashboardPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import CourseManagementPage from './pages/CourseManagementPage';
import AddCoursePage from './pages/AddCoursePage'; // Admin adds a course
import AddMentorPage from './pages/AddMentorPage'; // Admin adds a mentor
import AddStudentPage from './pages/AddStudentPage'; // Mentor adds a student
import ProjectFlowPage from './pages/ProjectFlowPage'; // Admin/mentor view project flow
import AddProjectStatusPage from './pages/AddProjectStatusPage'; // Mentor view project status page
import './App.css';

const App = () => {
  // Get the role of the current user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />

          {/* Admin Routes */}
          {user?.role === 'admin' && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/courses/add" element={<AddCoursePage />} />
              <Route path="/admin/courses/:courseId" element={<CourseManagementPage />} />
              <Route path="/admin/mentors/add" element={<AddMentorPage />} />
              <Route path="/admin/projectflow" element={<ProjectFlowPage />} />
            </>
          )}

          {/* Mentor Routes */}
          {user?.role === 'mentor' && (
            <>
              <Route path="/mentor/dashboard" element={<MentorDashboardPage />} />
              <Route path="/mentor/students/add" element={<AddStudentPage />} />
              <Route path="/mentor/students/:studentId" element={<AddProjectStatusPage />} />
              <Route path="/mentor/projectflow" element={<ProjectFlowPage />} />
            </>
          )}

          {/* Student Routes */}
          {user?.role === 'student' && (
            <>
              <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            </>
          )}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
