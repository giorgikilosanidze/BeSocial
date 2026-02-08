export type ReactionTypes = 'like' | 'love' | 'angry';

export interface ReactionModel {
	postId: string;
	userId: string;
	type: ReactionTypes;
}

export interface ReactionData {
	postId: string;
	userId: string;
	reactionType: ReactionTypes;
}
