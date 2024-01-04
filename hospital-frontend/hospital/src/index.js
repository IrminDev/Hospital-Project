import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import SignUp from './views/Signup';
import Home from './views/Home';
import AppointmentForm from './patient/AppointmentForm'
import ConsultationsPatient from './patient/Consultations';
import ConsultationsDoctor from './doctor/Consultations';
import ConsultationForm from './doctor/ConsultationForm';
import ProfilePatient from './patient/Profile';
import ProfileDoctor from './doctor/Profile';
import PrescriptionForm from './doctor/PrescriptionForm';
import Prescription from './doctor/Prescription';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/patient/create-appointment" element={<AppointmentForm />} />
        <Route path="/patient/consultations" element={<ConsultationsPatient />} />
        <Route path="/patient/profile" element={<ProfilePatient />} />
        <Route path="/doctor/consultations" element={<ConsultationsDoctor />} />
        <Route path="/doctor/profile" element={<ProfileDoctor />} />
        <Route path="/doctor/consultation-form" element={<ConsultationForm />} />
        <Route path="/doctor/prescription-form/:id" element={<PrescriptionForm />} />
        <Route path="/doctor/prescription/:id" element={<Prescription />} />
      </Routes>
    </Router>
);