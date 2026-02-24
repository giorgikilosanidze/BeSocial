export interface NotificationType {
	recipient: string;
	sender: {
		username: string;
		profilePictureUrl?: string;
		_id: string;
	};
	type: 'follow' | 'reaction';
	isRead: boolean;
	post?: string;
	updatedAt: string;
	createdAt: string;
	id: string;
}
