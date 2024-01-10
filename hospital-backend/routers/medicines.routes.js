import { Router } from "express";
import { getMedicineById, getMedicines, updateMedicine } from '../controllers/medicine.controller'

const router = Router();

router.get('/api/medicines', (req, res) => getMedicines(req, res));
router.get('/api/medicines/:id', (req, res) => getMedicineById(req, res));
router.put('/api/medicines', (req, res) => updateMedicine(req, res));

export default router;