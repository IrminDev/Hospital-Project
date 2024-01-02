import { Router } from "express";
import { getAppointmentsByUser, getAppointmentById, getAppointmentTypes, getAppointmentsBySchedule, createAppointment } from '../controllers/appointments.controller'

const router = Router();

router.get('/api/appointments/:idUser', (req, res) => getAppointmentsByUser(req, res));
router.get('/api/appointment/:id', (req, res) => getAppointmentById(req, res));
router.post('/api/appointment/', (req, res) => createAppointment(req, res));
router.get('/api/appointments/', (req, res) => getAppointmentTypes(req, res));
router.post('/api/appointments/', (req, res) => getAppointmentTypes(req, res));
router.put('/api/appointments/:id', (req, res) => getAppointmentsByUser(req, res));
router.get('/api/appointments/:idPatient/:idDoctor/:day', (req, res) => getAppointmentsBySchedule(req, res));

export default router;