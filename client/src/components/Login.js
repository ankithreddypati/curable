import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from context

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:6969/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                login(data); // Set user in context
                navigate('/dashboard');
            } else {
                alert('Login failed!');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="background-image">
            <div className="login-card">
                <h1>Curable</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" id="username" placeholder="Username" required
                           value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" id="password" placeholder="Password" required
                           value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" id="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
