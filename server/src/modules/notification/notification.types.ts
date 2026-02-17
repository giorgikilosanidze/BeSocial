export interface NotificationModel {
	recipient: string;
	sender: string;
	type: 'follow' | 'reaction';
	isRead: boolean;
	post?: string;
}
