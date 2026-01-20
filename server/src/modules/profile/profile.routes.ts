import { Router } from 'express';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import { getUserProfile } from './profile.controller.js';

const router = Router();

router.get('/user/:userId', authGuard, getUserProfile);

export default router;
