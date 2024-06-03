import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import git from './images/github.png';
import link from './images/linkedin.png';
import capsule from './images/capsulepill.png';
import hand from './images/armxray1.png';
import oats from './images/oatmeal.png';
import rasp from './images/raspberry.png';
import blue from './images/blueberry.png';

import test from './images/bloodtesttube.png';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            console.log('Logged in user:', userCredential.user);
            console.log('Navigating to dashboard...');
            navigate('/dashboard');
            console.log('Navigation call made');
        } catch (error) {
            alert('Login failed! ' + error.message);
            console.error('Login error:', error);
        }
    };
   

    return (
        
        <div className='container'>
        <div className='icon'>Curable</div>
        <a href="https://github.com/ankithreddypati/curable" target="_blank" rel="noopener noreferrer">
             <img src={git} alt="GitHub Icon" className='giticon'/>
            </a>
        <a href="https://www.linkedin.com/in/ankithreddypati" target="_blank" rel="noopener noreferrer">
            <img src={link} alt="LinkedIn Icon" className='socialicons'/>
        </a>



            {/* <div className='intro'>
                
                
                <div className='intdiv3'> Our AI Agent and Simplify Your Healthcare Routine.</div>
            </div> */}
            <div className='picture-card'>
            <img src={capsule} alt="hand xray" className='capsulepill1'/> 
            <img src={hand} alt="capsule pill" className='handxray'/> 
            {/* <button className='medicationbutton' type="submit" id="login-button">Manage Medication</button> */}
            <div className='medicationinfo'> Manage Medication schedule</div>
            <div className='medicationinfo'> Analyse Health Metrics</div>

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
            <div className='mealinfo'> Symptom Logging </div>
            <div className='mealinfo'> With our AI Agent</div>
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
            <div className='intdiv1'>Built for Google Cloud Vertex Agent Builder Hackathon</div>
        </div>
    );
};

export default Login;
