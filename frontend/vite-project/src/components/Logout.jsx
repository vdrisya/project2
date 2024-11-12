// Logout.jsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    // Perform logout actions:
    // Clear user data from localStorage (or sessionStorage/cookies)
    localStorage.removeItem('user');
    // Optionally clear cookies or sessionStorage if used

    // Redirect the user to the login page or home page after logout
    history.push('/login');
  }, [history]);

  return (
    <div>
      <h3>Logging you out...</h3>
    </div>
  );
};

export default Logout;
