import { Router } from 'express';
import { postSignUp } from './auth.controller.js';
import { userValidation } from '../../middlewares/validation.js';

const router = Router();

router.post('/signup', userValidation, postSignUp);

export default router;
