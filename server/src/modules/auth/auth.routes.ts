import { Router } from 'express';
import { postLogIn, postSignUp } from './auth.controller.js';
import { logInValidation, signUpValidation } from '../../middlewares/validation.js';

const router = Router();

router.post('/signup', signUpValidation, postSignUp);

router.post('/login', logInValidation, postLogIn);

export default router;
