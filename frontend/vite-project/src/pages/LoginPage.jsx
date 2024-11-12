// LoginPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate  = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with your authentication logic
    if (email === 'admin@example.com' && password === 'admin123') {
      // Store user information in localStorage
      localStorage.setItem('user', JSON.stringify({ role: 'admin', email }));
      navigate .push('/admin/dashboard');
    } else if (email === 'mentor@example.com' && password === 'mentor123') {
      localStorage.setItem('user', JSON.stringify({ role: 'mentor', email }));
      navigate .push('/mentor/dashboard');
    } else if (email === 'student@example.com' && password === 'student123') {
      localStorage.setItem('user', JSON.stringify({ role: 'student', email }));
      navigate .push('/student/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container className="mt-5">
      {/* <h2>Login</h2> */}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
