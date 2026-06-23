import express from 'express';
import { checkPasswort, verifyTokenStatus } from '../controllers/Passwort/passwortcontroller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', checkPasswort);
router.get('/verify', verifyToken, verifyTokenStatus);

export default router;