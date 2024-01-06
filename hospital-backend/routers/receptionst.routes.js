import { Router } from "express";
import { createReceptionist } from '../controllers/receptionist.controller'

const router = Router()

router.post('/api/receptionist/', (req, res) => createReceptionist(req, res));

export default router