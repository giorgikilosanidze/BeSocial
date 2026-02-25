import { Router } from 'express';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import { getNotifications } from './notification.controller.js';

const router = Router();

router.get('/notifications', authGuard, getNotifications);

export default router;
