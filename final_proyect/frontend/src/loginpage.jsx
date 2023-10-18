import "./loginP.css";
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useLogin, useNotify } from "react-admin";

function LoginPage() {
  // State to store user inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin()
  const notify = useNotify()

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
      login(requestBody);
    } catch (error) {
      notify('Invalid username or password')
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: 'url("./whitePM.jpg")'
    }}>
      <div className="login-container">
        <div className="logo">
        </div>
        <div className="login-box">
          <h2 style={{ textAlign: 'center' }}>Login</h2>
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
                placeholder="Username"
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
                placeholder="Password"
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
