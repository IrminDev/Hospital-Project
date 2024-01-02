import { Router } from "express";
import { getConsultationsByUser, getConsultationById, createConsultation } from '../controllers/consultations.controller'

const router = Router();

router.get('/api/consultations/:idUser', (req, res) => getConsultationsByUser(req, res));
router.get('/api/consultation/:id', (req, res) => getConsultationById(req, res));
router.post('/api/consultation/', (req, res) => createConsultation(req, res));

export default router;