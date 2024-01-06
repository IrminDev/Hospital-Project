import { Router } from "express";
import { getDoctorsByAppointmentType, getDoctor, createDoctor, getDoctors, deleteDoctor } from '../controllers/doctors.controller'

const router = Router();

router.get('/api/doctor/appointmentTypes/:id', (req, res) => getDoctorsByAppointmentType(req, res));
router.get('/api/doctor/:id', (req, res) => getDoctor(req, res));
router.delete('/api/doctor/:id', (req, res) => deleteDoctor(req, res));
router.get('/api/doctors/', (req, res) => getDoctors(req, res));
router.post('/api/doctor/', (req, res) => createDoctor(req, res));

export default router