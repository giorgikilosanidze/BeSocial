import { Router } from 'express';
import authGuard from '../../middlewares/authGuard/authGuard.js';
import {
	getNotifications,
	getAllNotifications,
	markAsRead,
} from './notification.controller.js';

const router = Router();

router.get('/notifications', authGuard, getNotifications);
router.get('/notifications/all', authGuard, getAllNotifications);
router.patch('/notifications/:notificationId/read', authGuard, markAsRead);

export default router;
