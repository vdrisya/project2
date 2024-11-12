// Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import AddCourseModal from './AddCourseModal';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/admin/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Add a new course
  const handleAddCourse = async (courseData) => {
    try {
      const response = await axios.post('/api/admin/courses', courseData);
      setCourses([...courses, response.data]);
      setShowAddCourseModal(false);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Edit an existing course
  const handleEditCourse = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/admin/courses/${id}`, updatedData);
      setCourses(courses.map((course) => (course._id === id ? response.data : course)));
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  // Delete a course
  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`/api/admin/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={() => setShowAddCourseModal(true)}>Add Course</button>
      
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
          />
        ))}
      </div>

      {/* Modal for adding a new course */}
      {showAddCourseModal && (
        <AddCourseModal
          onClose={() => setShowAddCourseModal(false)}
          onAddCourse={handleAddCourse}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
