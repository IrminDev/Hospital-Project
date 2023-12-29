import { Router } from "express";
import { getAppointmentsByUser, getAppointmentById, getAppointmentTypes } from '../controllers/appointments.controller'

const router = Router();

router.get('/api/appointments/:idUser', (req, res) => getAppointmentsByUser(req, res));
router.get('/api/appointment/:id', (req, res) => getAppointmentById(req, res));
router.get('/api/appointments/', (req, res) => getAppointmentTypes(req, res));
router.put('/api/appointments/:id', (req, res) => getAppointmentsByUser(req, res));
router.put('/api/appointments/:idDoctor/:day', (req, res) => getAppointmentsByUser(req, res));

export default router;