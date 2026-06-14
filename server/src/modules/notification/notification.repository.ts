import Notification from './notification.model.js';
import { NotificationModel } from './notification.types.js';

export async function createNotification(data: NotificationModel) {
	const notification = await Notification.create(data);
	await notification.populate('sender', 'username profilePictureUrl');
	return notification;
}

export async function getUserNotifications(userId: string) {
	const [notifications, unreadCount] = await Promise.all([
		Notification.find({ recipient: userId })
			.sort({ createdAt: -1 })
			.limit(5)
			.populate('sender', 'username profilePictureUrl'),
		Notification.countDocuments({ recipient: userId, isRead: false }),
	]);

	return { notifications, unreadCount };
}

export async function getAllUserNotifications(userId: string) {
	const notifications = await Notification.find({ recipient: userId })
		.sort({ createdAt: -1 })
		.populate('sender', 'username profilePictureUrl');

	return notifications;
}
export async function markNotificationAsRead(notificationId: string, recipientId: string) {
	// Scope the update to the owner so a user can't mark someone else's
	// notification as read by guessing its id.
	const notification = await Notification.findOneAndUpdate(
		{ _id: notificationId, recipient: recipientId },
		{ isRead: true },
		{ new: true },
	);

	if (!notification) {
		throw new Error('Notification not found!');
	}

	await notification.populate('sender', 'username profilePictureUrl');

	return notification;
}
