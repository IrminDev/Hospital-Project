import { Router } from "express";
import { getPrescriptionById, createPrescription } from '../controllers/prescription.controller'

const router = Router();

router.get('/api/prescription/:id', (req, res) => getPrescriptionById(req, res));
router.post('/api/prescription/', (req, res) => createPrescription(req, res));

export default router;