import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta de login (no necesita autenticación previa)
router.post('/login', login); // POST /auth/login

export default router;