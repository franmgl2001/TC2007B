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
  const DashboardButton = () => {
    const redirect = useRedirect();
    const handleClick = () => {
        redirect('/dashboard');
    }
    return <button onClick={handleClick}>Dashboard</button>;
};
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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(90deg, #007514, #ffffff, #970000)',
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '30px', 
        paddingTop: '156px',
        background: 'white',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '20px 0' }}>
            <label style={{ fontWeight: 'bold' }} htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderBottom: '2px solid #D1D1D4', 
                background: 'none', 
                paddingLeft: '24px', 
                fontWeight: '700', 
                transition: '.2s',
              }}
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <label style={{ fontWeight: 'bold' }} htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderBottom: '2px solid #D1D1D4', 
                background: 'none', 
                paddingLeft: '24px', 
                fontWeight: '700', 
                transition: '.2s',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              background: '#fff',
              fontSize: '14px',
              marginTop: '30px',
              padding: '16px 20px',
              borderRadius: '26px',
              border: '1px solid #D4D3E8',
              textTransform: 'uppercase',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              color: '#4C489D',
              boxShadow: '0px 2px 2px #5C5696',
              cursor: 'pointer',
              transition: '.2s',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
