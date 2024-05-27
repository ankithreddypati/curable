import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css';


const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/'); 
    };

    return (
        <div className="display-container">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="left-content">
                <h1>Curable</h1>
                <p>For Demo, Artemis is a patient chronic anti immuno disease. He has an app to take care of his Needs</p>


                <p>+ Upload Test Reports</p>
                <p>Calender</p>
                <p>Symptoms </p>
                <p>Meals And Nutrition</p>
                <p>Medication</p>

                <p>Recommended Prompts:</p>
                <ol>
                    <li>Main Agent
                        <ol>
                            <li>Hello</li>
                            <li>What can you do for me ?</li>
                        </ol>
                    </li>
                    <li>Report Analysis Agent
                        <ol>
                            <li>What is the summary of my latest test report ?</li>
                            <li>I want to know Platelet count in latest report</li>
                            <li>What is the trend of inflammation markers in my reports?</li>
                            <li>Thanks</li>
                        </ol>
                    </li>
                    <li>Education and Info Agent
                        <ol>
                            <li>what are labrum tears?</li>
                            <li>I want to know more about Rheumatoid Arthritis</li>
                            <li>what foods decrease inflammation in body ?</li>
                            <li>Thanks</li>
                        </ol>
                    </li>
                    <li>Meal Logger
                        <ol>
                            <li>I want to log a meal</li>
                            <li>meal name(oat meal)</li>
                            <li>meal quantity (200 grams)</li>
                            <li>how many calories did i consume today ?</li>
                            <li>Thanks</li>
                        </ol>
                    </li>
                    <li>Symptom Logger
                        <ol>
                            <li>I want to log a symptom</li>
                            <li>symptom description(sharp pain the in right hip joint)</li>
                            <li>severity (1-10 scale)</li>
                            <li>Thanks</li>
                        </ol>
                    </li>
                    <li>Medication Agent
                        <ol>
                            <li>what is my medication schedule for today ?</li>
                            <li>can record as completed with medicine name as input</li>
                            <li>Thanks</li>
                        </ol>
                    </li>
                </ol>
                <img src="design.drawio.png" alt="" />
            </div>
            <df-messenger
                project-id="deep-sphere-398320"
                agent-id="dc479d7f-3efd-43c2-b822-07cdb02a5f66"
                language-code="en"
                max-query-length="-1"
                chat-title="Assistant"
                expanded="true">
            </df-messenger>
        </div>
    );
};

export default Dashboard;
