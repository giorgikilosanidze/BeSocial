import { NextFunction, Response } from 'express';
import { UserIdRequest } from '../auth/auth.types.js';
import {
	getUserNotifications,
	getAllUserNotifications,
	markNotificationAsRead,
} from './notification.repository.js';

export async function markAsRead(req: UserIdRequest, res: Response, next: NextFunction) {
	const notificationId = req.params.notificationId;

	if (!notificationId) {
		return res.status(400).json({ message: 'notificationId is required!' });
	}

	try {
		const notification = await markNotificationAsRead(notificationId);
		return res.status(200).json(notification);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}

		return res.status(500).json({
			message: 'Failed to mark notification as read!',
		});
	}
}

export async function getNotifications(req: UserIdRequest, res: Response, next: NextFunction) {
	const userId = req.userId;

	if (!userId) {
		throw new Error('Failed to identify user!');
	}
	try {
		const notifications = await getUserNotifications(userId);
		return res.status(200).json(notifications);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}

		return res.status(500).json({
			message: 'Failed to get notifications!',
		});
	}
}

export async function getAllNotifications(req: UserIdRequest, res: Response, next: NextFunction) {
	const userId = req.userId;

	if (!userId) {
		throw new Error('Failed to identify user!');
	}
	try {
		const notifications = await getAllUserNotifications(userId);
		return res.status(200).json(notifications);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}

		return res.status(500).json({
			message: 'Failed to get all notifications!',
		});
	}
}
