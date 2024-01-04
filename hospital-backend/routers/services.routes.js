import { Router } from "express";
import { getServices } from '../controllers/services.controller'

const router = Router();

router.get('/api/services', (req, res) => getServices(req, res));

export default router;