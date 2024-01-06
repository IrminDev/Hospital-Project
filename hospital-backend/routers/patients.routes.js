import { Router } from "express";
import { getPatientById, getPatients, deletePatient } from '../controllers/patients.controller'

const router = Router()

router.get('/api/patients', (req, res) => getPatients(req, res));
router.get('/api/patient/:id', (req, res) => getPatientById(req, res));
router.delete('/api/patient/:id', (req, res) => deletePatient(req, res));

export default router