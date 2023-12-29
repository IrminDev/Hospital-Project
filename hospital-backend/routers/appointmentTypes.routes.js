import { Router } from "express";
import { getAppointmentTypes } from '../controllers/appointments.controller'

const router = Router()

router.get('/api/appointmentTypes/', (req, res) => getAppointmentTypes(req, res))

export default router