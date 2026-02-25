import { NextFunction, Response } from 'express';
import { UserIdRequest } from '../auth/auth.types.js';
import { getUserNotifications } from './notification.repository.js';

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
