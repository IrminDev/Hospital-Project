import { Router } from "express";
import { getSpecialities } from '../controllers/specialities.controller'

const router = Router();

router.get('/api/specialities', (req, res) => getSpecialities(req, res));

export default router;