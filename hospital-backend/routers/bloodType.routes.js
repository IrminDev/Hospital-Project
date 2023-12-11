import { Router } from "express";
import { getBloodTypes } from '../controllers/bloodType.controller'

const router = Router();

router.get('/api/bloodType', (req, res) => getBloodTypes(req, res));


export default router;