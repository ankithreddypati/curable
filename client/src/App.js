import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider, ProtectedRoute } from './components/auth';


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                             <Dashboard />
                        </ProtectedRoute>
                           
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
