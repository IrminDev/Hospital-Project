import { Router } from "express";
import { getPatient, getPatients } from '../controllers/patients.controller'

const router = Router();

router.get('/api/patients', (req, res) => getPatients(req, res));
router.get('/api/patients/:id', (req, res) => getPatient(req, res));

export default router;