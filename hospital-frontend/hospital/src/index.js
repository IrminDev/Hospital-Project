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
import ConsultationTicket from './patient/ConsultationTicket';
import ProfilePatient from './patient/Profile';
import ProfileReceptionist from './receptionist/Profile';
import EditAppointmentForm from './receptionist/EditAppointmentForm';
import ProfileDoctor from './doctor/Profile';
import PrescriptionForm from './doctor/PrescriptionForm';
import Prescription from './doctor/Prescription';
import Patients from './receptionist/Patients';
import AppointmentInfo from './patient/AppointmentInfo';
import Doctors from './receptionist/Doctors';
import Purchases from './receptionist/Purchases';
import PurchasesPatient from './patient/Purchases';
import DoctorForm from './receptionist/DoctorForm';
import PatientForm from './receptionist/PatientForm';
import PurchaseForm from './receptionist/PurchaseForm';

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
        <Route path="/patient/consultation/:id" element={<ConsultationTicket />} />
        <Route path="/patient/appointment/:id" element={<AppointmentInfo />} />
        <Route path="/patient/profile" element={<ProfilePatient />} />
        <Route path="/patient/purchases" element={<PurchasesPatient />} />
        <Route path="/doctor/consultations" element={<ConsultationsDoctor />} />
        <Route path="/doctor/profile" element={<ProfileDoctor />} />
        <Route path="/doctor/consultation-form" element={<ConsultationForm />} />
        <Route path="/doctor/prescription-form/:id" element={<PrescriptionForm />} />
        <Route path="/doctor/prescription/:id" element={<Prescription />} />
        <Route path="/receptionist/patients/" element={<Patients />} />
        <Route path="/receptionist/doctors/" element={<Doctors />} />
        <Route path="/receptionist/profile/" element={<ProfileReceptionist />} />
        <Route path="/receptionist/edit-appointment/:id" element={<EditAppointmentForm />} />
        <Route path="/receptionist/purchases/" element={<Purchases />} />
        <Route path="/receptionist/register-purchase/" element={<PurchaseForm />} />
        <Route path="/receptionist/register-doctor/" element={<DoctorForm />} />
        <Route path="/receptionist/register-patient/" element={<PatientForm />} />
      </Routes>
    </Router>
);