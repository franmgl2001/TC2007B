import "./loginP.css";
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useLogin, useRedirect } from "react-admin";



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



    // Make an API call to authenticate the user
    login(requestBody).then(() => {
      console.log("Login successful");
      // Handle successful login if needed
    })
      .catch(error => {
        // Handle authentication error and notify the user
        notify('Invalid username or password');
      });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(90deg, #007514, #ffffff, #970000)',
    }}>
      <div className="login-container">
        {/* Logo */}
        <div className="logo">
          <img src="./fund.png" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="login-box">
          <h2 style={{ textAlign: 'center' }}>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Username input */}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />
            </div>
            {/* Password input */}
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
