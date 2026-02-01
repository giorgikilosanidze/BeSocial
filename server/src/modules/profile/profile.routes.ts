import { Router } from 'express';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import { getUserProfile, uploadCoverPhoto, uploadProfilePicture } from './profile.controller.js';

const router = Router();

router.get('/user/:userId', authGuard, getUserProfile);

router.post('/profilePicture/:userId', authGuard, uploadProfilePicture);

router.post('/coverPhoto/:userId', authGuard, uploadCoverPhoto);

export default router;
