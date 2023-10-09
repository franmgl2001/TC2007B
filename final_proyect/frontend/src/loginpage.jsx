import "./loginP.css";
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useLogin } from "react-admin";

function LoginPage() {
  // State to store user inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useLogin()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request body
    const requestBody = {
      username: username,
      password: password,
    };

    try {
      // Make an API call to authenticate the user
      const response = await fetch("http://localhost:3011/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // User authentication successful
        // You can handle the successful login here (e.g., redirect to another page)
        // For now, we'll just reset the form fields
        setUsername('');
        setPassword('');
        setError('');
      } else {
        // User authentication failed
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* New button component from Material-UI */}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;