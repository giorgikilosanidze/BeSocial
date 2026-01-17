import { Router } from 'express';
import {
	createRefreshToken,
	logOut,
	postLogIn,
	postSignUp,
	sendLoggedInUser,
} from './auth.controller.js';
import { logInValidation, signUpValidation } from './auth.validators.js';
import authGuard from '../../middlewares/authGuard/authGuard.js';

const router = Router();

router.get('/me', authGuard, sendLoggedInUser);

router.post('/refreshToken', createRefreshToken);

router.post('/signup', signUpValidation, postSignUp);

router.post('/login', logInValidation, postLogIn);

router.post('/logout', logOut);

export default router;
