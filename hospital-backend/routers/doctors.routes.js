import { Router } from "express";
import { getDoctorsByAppointmentType, getDoctor } from '../controllers/doctors.controller'

const router = Router();

router.get('/api/doctors/appointmentTypes/:id', (req, res) => getDoctorsByAppointmentType(req, res));
router.get('/api/doctors/:id', (req, res) => getDoctor(req, res));

export default router;