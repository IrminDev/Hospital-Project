import { Router } from "express";
import { postLogin } from "../controllers/login.controller";

const router = Router();

router.post('/api/login', (req, res) => postLogin(req, res));

export default router;