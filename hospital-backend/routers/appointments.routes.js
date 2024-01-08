import { Router } from "express";
import { getAppointmentsByUser, getAppointmentById, getAppointmentTypes,
    getAppointmentsBySchedule, createAppointment, getCompletedAppointments,
    cancelAppointment, updateAppointment } from '../controllers/appointments.controller'

const router = Router()

router.get('/api/appointments/:idUser', (req, res) => getAppointmentsByUser(req, res));
router.get('/api/appointments/completed/:id', (req, res) => getCompletedAppointments(req, res));
router.get('/api/appointment/:id', (req, res) => getAppointmentById(req, res));
router.post('/api/appointment/', (req, res) => createAppointment(req, res));
router.get('/api/appointments/', (req, res) => getAppointmentTypes(req, res));
router.post('/api/appointments/', (req, res) => getAppointmentTypes(req, res));
router.put('/api/appointment/:id', (req, res) => updateAppointment(req, res));
router.delete('/api/appointment/:id', (req, res) => cancelAppointment(req, res));
router.get('/api/appointments/:idPatient/:idDoctor/:day', (req, res) => getAppointmentsBySchedule(req, res));

export default router;