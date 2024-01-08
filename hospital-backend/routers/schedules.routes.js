import { Router } from "express";
import { getSchedules } from "../controllers/schedules.controller";

const router = Router();

router.get('/api/schedules', (req, res) => getSchedules(req, res));

export default router;