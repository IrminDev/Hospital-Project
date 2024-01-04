import { Router } from "express";
import { getMedicines } from '../controllers/medicine.controller'

const router = Router();

router.get('/api/medicines', (req, res) => getMedicines(req, res));

export default router;