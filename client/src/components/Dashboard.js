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
                <div className="content-row">
                    <div className='tiles'>
                        <img src={artemis} alt="Example Image" className='profimage'/>
                        <p>For Demo, Artemis is a user with chronic autoimmune disease, requiring constant
                       health monitoring and management. </p>
                    </div>
                    <div className="calendar">
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
                        </div>
                    </div>
                    <div className="tiles-container">
                        <div className="tiles">Medical Reports</div>
                        <div className="tiles">Symptoms</div>
                        <div className="tiles">Meals and Nutrition</div>
                        <div className="tiles">Health Education</div>
                        <div className="tiles" onClick={() => setShowMedicationDots(!showMedicationDots)}>Medication schedule</div>
                        <div className="tiles" onClick={() => setShowAppointmentDots(!showAppointmentDots)}>Appointments schedule</div>
                    </div>
                </div>
                <div className='promptcontainer'>
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
                            <li>I want to know Platelet count in this report ?</li>
                            <li>What is the trend of inflammation markers in all my reports?</li>
                            <li>Thanks</li>
                        </ol>
                    </li>
                    <li>Education and Info Agent
                        <ol>
                            <li>I want to know more about Rheumatoid Arthritis</li>
                            <li>what are some exercises to strengthen my hip joints</li>
                            <li>what foods decrease inflammation in body ?</li>
                            <li>Thanks</li>
                        </ol>
                    </li>
                    <li>Meal Logger
                        <ol>
                            <li>I want to record a meal</li>
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
                </div>
            </div>
            <df-messenger
                project-id="deep-sphere-398320"
                agent-id="dc479d7f-3efd-43c2-b822-07cdb02a5f66"
                language-code="en"
                max-query-length="-1"
                chat-title="Cura Assistant"
                expanded="true">
            </df-messenger>
        </div>
    );
};

export default Dashboard;
