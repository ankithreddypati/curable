import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import artemis from './images/artemis.png';
import design from './images/design.png';
import gcp from './images/gcpsystem.png'



import { getAuth, signOut } from 'firebase/auth';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Dashboard = () => {
    const navigate = useNavigate();
    const auth = getAuth();
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
        const daysInMonth = daysOfMonth[month];
        const firstDayIndex = firstDay.getDay();
    
        const daysArray = Array(daysInMonth + firstDayIndex).fill(null).map((_, index) => {
            const day = index >= firstDayIndex ? index - firstDayIndex + 1 : null;
            const isCurrentMonthDay = index >= firstDayIndex && index < firstDayIndex + daysInMonth;
    
            const hasMedication = isCurrentMonthDay && showMedicationDots && Math.random() > 0.8;
            const hasAppointment = isCurrentMonthDay && showAppointmentDots && Math.random() > 0.8;
    
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
        signOut(auth).then(() => {
            navigate('/');  
        }).catch((error) => {
            console.error('Logout Error:', error);
        });
    };

    return (
        <div className="container1">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="left-content">
                <h1>Curable</h1>
                <div className="container1">
                    <div className='card2'>
                        <img src={artemis} alt="Example Image" className='profimage'/>
                        <p> Artemis is a user with chronic autoimmune disease, requiring constant
                       health monitoring and management. She juggles her daily life with Medical reports, prescriptions, health metrics, Medication sche </p>
                    </div>
                    <div className="card3">
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
                            
                
                        </div>
                    </div>  

                <div className='card2'>
                    <div className="functile">Health Metrics</div>

                    {/* <img src={chart0} alt="Example Image" className='chart0'/>
                    <img src={chart3} alt="Example Image" className='chart0'/>
                    <img src={chart1} alt="Example Image" className='chart0'/> */}
                    <div className="functile">Medical Reports </div>
                    {/* <div className='reporttile'>13-May-2024</div>
                    <div className='reporttile'>03-May-2024</div>    */}
                  
                    <div className="functile">Meals and Nutrition </div>
                    <div className="functile">Manage Symptoms </div>

                    </div>

                    <div className='card6'>
                    <df-messenger
                                project-id={process.env.REACT_APP_DIALOGFLOW_PROJECT_ID}
                                agent-id={process.env.REACT_APP_DIALOGFLOW_AGENT_ID}
                                language-code={process.env.REACT_APP_DIALOGFLOW_LANGUAGE_CODE}
                                max-query-length="-1"
                                chat-title="Cura Assistant"
                                expanded="true">
                             </df-messenger> 
                            
                    </div>

                                
                    
                </div>
                

        <div className='container2'>
            <div className='card3'>
                 <div className='rec'> Recommended Prompts:</div> 
                
                 <div className='promptile'>1. Main Agent</div> 
                    <p>Hello</p>

                    
                   
                   <div className='promptile'>2. Report Analysis Agent</div> 
                        
                            <p>What is the summary of my latest medical report?"  </p>
                            <p>What does inflammation mean here?</p>
                            <p>what is the trend of my inflammation markers from all reports?</p>
                            <p>thanks</p>
                       
                   
                     <div className='promptile'>3.Education and Info Agent</div> 
                        
                            <p>How can I reduce inflammation in my body?</p>
                            <p>What are the top five anti-inflammatory foods I can include in my breakfast?</p>
                            <p>what are some exercises to strengthen my hip joints</p>
                            <p>Thanks</p>
                        

                     <div className='promptile'>4. Meal & Nutrition Agent</div> 
                        
                            <p>I want to record a meal</p>
                            <p>meal name(oat meal)</p>
                            <p>meal quantity (200 grams)</p>
                            <p>how many calories did i consume today ?</p>
                            <p>Thanks</p>

                            <div className='promptile'>5. Health Metrics Agent</div> 
                        
                        <p>How much sleep did I get for last week ?</p>
                        <p>what is my average step count last week?</p>
                        <p>What is my average heart rate?</p>
                        <p>Thanks</p>      
                        
                   
                    <div className='promptile'>6. Symptom  Agent</div> 
                        
                            <p>I want to log a symptom</p>
                            <p>symptom description(sharp pain the in right hip joint)</p>
                            <p>severity (1-10 scale)</p>
                            <p>Thanks</p>
                        
                
                    <div className='promptile'>7. Medication Agent</div> 
                        
                            <p>what is my medication schedule for today ?</p>
                            <p>can record as completed with medicine name as input</p>
                            <p>Thanks</p>
                    
                </div>
                 
        
                <div className='card4'>
                <img src={design} alt="Example Image" className='drawio'/>

                </div>

                

                </div>
            <div className='container2'>
            <div className='card4'>
                <img src={gcp} alt="Example Image" className='drawio'/>

                </div>
            </div>
                
            </div>
            

        </div>
    );
};

export default Dashboard;