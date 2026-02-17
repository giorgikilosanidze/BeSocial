import Notification from './notification.model.js';
import { NotificationModel } from './notification.types.js';

export async function createNotification(data: NotificationModel) {
	const notification = await Notification.create(data);
	return notification;
}
