import { Router } from "express";
import { getPayments } from "../controllers/payments.controller";

const router = Router();

router.get('/api/payments', (req, res) => getPayments(req, res));

export default router;