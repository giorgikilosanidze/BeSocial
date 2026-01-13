import { Router } from 'express';
import { logOut, postLogIn, postSignUp } from './auth.controller.js';
import { logInValidation, signUpValidation } from './auth.validators.js';

const router = Router();

router.post('/signup', signUpValidation, postSignUp);

router.post('/login', logInValidation, postLogIn);

router.post('/logout', logOut);

export default router;
