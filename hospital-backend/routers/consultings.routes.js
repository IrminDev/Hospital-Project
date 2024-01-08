import { Router } from "express";
import { getConsultings } from "../controllers/consultings.controller";

const router = Router();

router.get('/api/consultings', (req, res) => getConsultings(req, res));

export default router;