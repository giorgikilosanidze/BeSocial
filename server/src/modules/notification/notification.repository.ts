import Notification from './notification.model.js';
import { NotificationModel } from './notification.types.js';

export async function createNotification(data: NotificationModel) {
	const notification = await Notification.create(data);
	await notification.populate('sender', 'username profilePictureUrl');
	return notification;
}

export async function getUserNotifications(userId: string) {
	const notifications = await Notification.find({ recipient: userId })
		.sort({ createdAt: -1 })
		.limit(5)
		.populate('sender', 'username profilePictureUrl');

	return notifications;
}

export async function getAllUserNotifications(userId: string) {
	const notifications = await Notification.find({ recipient: userId })
		.sort({ createdAt: -1 })
		.populate('sender', 'username profilePictureUrl');

	return notifications;
}
export async function markNotificationAsRead(notificationId: string) {
	const notification = await Notification.findByIdAndUpdate(
		notificationId,
		{ isRead: true },
		{ new: true },
	);

	if (!notification) {
		throw new Error('Notification not found!');
	}

	await notification.populate('sender', 'username profilePictureUrl');

	return notification;
}
