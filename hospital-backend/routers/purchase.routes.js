import { Router } from "express";
import { getPurchaseById, getPurchases, createPurchase } from '../controllers/purchase.controller'

const router = Router();

router.get('/api/purchase/:id', (req, res) => getPurchaseById(req, res));
router.get('/api/purchases/', (req, res) => getPurchases(req, res));
router.post('/api/purchase/', (req, res) => createPurchase(req, res));

export default router;