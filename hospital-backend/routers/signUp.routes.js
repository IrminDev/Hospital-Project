import { Router } from "express";
import { signUp } from "../controllers/signup.controller";

const router = Router();

router.post('/api/signUp', (req, res) => signUp(req, res));

export default router;