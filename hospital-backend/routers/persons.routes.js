import { Router } from "express";
import { getPersons, deletePersons, changeName, getPerson } from '../controllers/persons.controller'

const router = Router();

router.get('/api/persons', (req, res) => getPersons(req, res));
router.delete('/api/persons/:id', (req, res) => deletePersons(req, res));
router.put('/api/persons/:id', (req, res) => changeName(req, res));
router.get('/api/persons/:id', (req, res) => getPerson(req, res));


export default router;