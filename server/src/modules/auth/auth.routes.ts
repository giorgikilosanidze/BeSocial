import { Router } from 'express';
import { postSignUp } from './auth.controller.js';

const router = Router();

router.post('/signup', postSignUp);

export default router;
