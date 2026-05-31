import { Router } from 'express';
import {
	resendAccessToken,
	logOut,
	postLogIn,
	postSignUp,
	sendLoggedInUser,
	getSocketToken,
} from './auth.controller.js';
import { logInValidation, signUpValidation } from './auth.validators.js';
import authGuard from '../../middlewares/authGuard/authGuard.js';

const router = Router();

router.get('/me', authGuard, sendLoggedInUser);

router.get('/socket-token', authGuard, getSocketToken);

router.post('/refreshToken', resendAccessToken);

router.post('/signup', signUpValidation, postSignUp);

router.post('/login', logInValidation, postLogIn);

router.post('/logout', logOut);

export default router;
