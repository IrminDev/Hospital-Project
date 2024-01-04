import { Router } from "express";
import { getDoctorsByAppointmentType, getDoctor, createDoctor } from '../controllers/doctors.controller'

const router = Router();

router.get('/api/doctors/appointmentTypes/:id', (req, res) => getDoctorsByAppointmentType(req, res));
router.get('/api/doctors/:id', (req, res) => getDoctor(req, res));
router.post('/api/doctors/', (req, res) => createDoctor(req, res));

export default router