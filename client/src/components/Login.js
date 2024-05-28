import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './Login.css';
import git from './github.png'
import link from './linkedin.png'
import capsule from './capsulepill.png'
import hand from './armxray1.png'
import oats from './oatmeal.png'
import rasp from './raspberry.png'
import blue from './blueberry.png'
import test from './bloodtesttube.png'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 

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
                login(data); 
                navigate('/dashboard');
            } else {
                alert('Login failed!');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        
        <div className='container'>
        <div className='icon'>Curable</div>
        <img src={git} alt="Example Image" className='giticon'/>
        <img src={link} alt="Example Image" className='socialicons'/>



            {/* <div className='intro'>
                <div className='intdiv1'>Built for Google Cloud Vertex Agent Builder Hackathon</div>
                
                <div className='intdiv3'> Our AI Agent and Simplify Your Healthcare Routine.</div>
            </div> */}
            <div className='picture-card'>
            <img src={capsule} alt="hand xray" className='capsulepill1'/> 
            <img src={hand} alt="capsule pill" className='handxray'/> 
            {/* <button className='medicationbutton' type="submit" id="login-button">Manage Medication</button> */}
            <div className='medicationinfo'> Manage Medication schedule</div>
            <div className='medicationinfo'> Get Health Education</div>

            </div>
            <div className='picture-card'>
            <img src={hand} alt="hand xray" className='handxray1'/>
            <img src={rasp} alt="raspberry" className='rasp3'/> 
            <img src={test} alt="testtube" className='testtube'/> 
            <div className='reportinfo'> Analyse Medical Reports</div>
            <div className='reportinfo'> Track Meals And Nutrition</div>

            </div>
            <div className='picture-card'>
            <img src={oats} alt="oat meal" className='oats1'/> 
            <img src={rasp} alt="oat meal" className='rasp1'/> 
            <img src={rasp} alt="oat meal" className='rasp2'/>
            <img src={blue} alt="blue berry" className='blue1'/>
            <img src={blue} alt="blue berry" className='blue3'/>
            <div className='mealinfo'> Symptom Logging & Many more</div>
            <div className='mealinfo'> With the help of our AI Agents</div>
            </div>
            <div className="login-card">
            <img src={oats} alt="oat meal" className='oats2'/> 
            <img src={blue} alt="blue berry" className='blue2'/>
              <div className='intdiv2'> Simplify Your Healthcare Routine </div>
                <form onSubmit={handleLogin} className='form'>
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
