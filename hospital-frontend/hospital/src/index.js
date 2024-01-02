import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import SignUp from './views/Signup';
import Home from './views/Home';
import AppointmentForm from './patient/AppointmentForm'
import Consultations from './patient/Consultations';
import ProfilePatient from './patient/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/patient/create-appointment" element={<AppointmentForm />} />
        <Route path="/patient/consultations" element={<Consultations />} />
        <Route path="/patient/profile" element={<ProfilePatient />} />
      </Routes>
    </Router>
);