import type { ReactionTypes } from '../reactions/reaction.types.js';

export interface NotificationModel {
	recipient: string;
	sender: string;
	type: 'follow' | 'reaction';
	isRead: boolean;
	post?: string;
	reactionType?: ReactionTypes;
}
