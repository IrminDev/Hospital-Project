import { Router } from "express";
import { getMedicalHistory } from "../controllers/medicalHistory.controller";

const router = Router()

router.get('/api/medicalHistory/:id', (req, res) => getMedicalHistory(req, res));

export default router;