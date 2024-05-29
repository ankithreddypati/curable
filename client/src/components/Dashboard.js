import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import artemis from './artemis.png';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [days, setDays] = useState([]);
    const [showMedicationDots, setShowMedicationDots] = useState(false);
    const [showAppointmentDots, setShowAppointmentDots] = useState(false);

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28;
    };

    useEffect(() => {
        generateCalendar(month, year);
    }, [month, year, showMedicationDots, showAppointmentDots]);

    const generateCalendar = (month, year) => {
        const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const firstDay = new Date(year, month, 1);
        const daysArray = Array(daysOfMonth[month] + firstDay.getDay()).fill(null).map((_, index) => {
            const day = index >= firstDay.getDay() ? index - firstDay.getDay() + 1 : null;
            const hasMedication = showMedicationDots && Math.random() > 0.8;
            const hasAppointment = showAppointmentDots && Math.random() > 0.8;
            return {
                day,
                hasMedication,
                hasAppointment,
                isCurrentDay: day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()
            };
        });
        setDays(daysArray);
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="display-container">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="left-content">
                <h1>Curable</h1>
                <div className="container">
                    <div className='picture-card'>
                        <img src={artemis} alt="Example Image" className='profimage'/>
                        <p>For Demo, Artemis is a user with chronic autoimmune disease, requiring constant
                       health monitoring and management. </p>
                    </div>
                    <div className="picture-card">
                        <div className="calendar-header">
                            <span className="month-picker" onClick={() => setMonth(month === 0 ? 11 : month - 1)}>&lt;</span>
                            <span>{monthNames[month]} {year}</span>
                            <span className="month-picker" onClick={() => setMonth(month === 11 ? 0 : month + 1)}>&gt;</span>
                        </div>
                        <div className="calendar-body">
                            {days.map((day, index) => (
                                <div key={index} className={`day ${day.isCurrentDay ? 'current-day' : ''}`}>
                                    {day.day}
                                    {day.hasMedication && <span className="event-dot medication-dot"></span>}
                                    {day.hasAppointment && <span className="event-dot appointment-dot"></span>}
                                </div>
                                
                            ))}
                            
                            <div className="functile" onClick={() => setShowMedicationDots(!showMedicationDots)}>Medication schedule</div>
                            <div className="functile" onClick={() => setShowAppointmentDots(!showAppointmentDots)}>Appointments schedule</div>
                            <div className="functile">Medical Reports</div>
                            <div className="functile">Symptoms</div>
                            <div className="functile">Meals and Nutrition</div>
                
                        </div>
                    </div>  

                    <div className='picture-card'>
                 <div className='rec'> Recommended Prompts:</div> 
                
                 <div className='promptile'>1. Main Agent</div> 
                    <p>Hello</p>
                    <p>What can you do for me ?</p>
                    
                   
                   <div className='promptile'>2. Report Analysis Agent</div> 
                        
                            <p>What is the summary of my latest test report ?</p>
                            <p>I want to know Platelet count in this report ?</p>
                            <p>What is the trend of inflammation markers in all my reports?</p>
                            <p>Thanks</p>
                       
                   
                     <div className='promptile'>3.Education and Info Agent</div> 
                        
                            <p>I want to know more about Rheumatoid Arthritis</p>
                            <p>what are some exercises to strengthen my hip joints</p>
                            <p>what foods decrease inflammation in body ?</p>
                            <p>Thanks</p>
                        

                     <div className='promptile'>4. Meal Logger Agent</div> 
                        
                            <p>I want to record a meal</p>
                            <p>meal name(oat meal)</p>
                            <p>meal quantity (200 grams)</p>
                            <p>how many calories did i consume today ?</p>
                            <p>Thanks</p>
                        
                   
                    <div className='promptile'>4. Symptom Logger Agent</div> 
                        
                            <p>I want to log a symptom</p>
                            <p>symptom description(sharp pain the in right hip joint)</p>
                            <p>severity (1-10 scale)</p>
                            <p>Thanks</p>
                        
                
                    <div className='promptile'>5. Medication Schedule Agent</div> 
                        
                            <p>what is my medication schedule for today ?</p>
                            <p>can record as completed with medicine name as input</p>
                            <p>Thanks</p>
                    
                </div>

                    
                </div>
                
            </div>
            <df-messenger
                 project-id={process.env.REACT_APP_DIALOGFLOW_PROJECT_ID}
                 agent-id={process.env.REACT_APP_DIALOGFLOW_AGENT_ID}
                 language-code={process.env.REACT_APP_DIALOGFLOW_LANGUAGE_CODE}
                 max-query-length="-1"
                 chat-title="Cura Assistant"
                 expanded="true">
            </df-messenger>

        </div>
    );
};

export default Dashboard;