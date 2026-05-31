import { Request } from 'express';
import { ReactionTypes } from '../reactions/reaction.types.js';

export interface CreatePostRequest extends Request {
	userId?: string;
	body: { text: string; imageUrls?: string[] };
}

export interface ReactionRequest extends Request {
	userId?: string;
	body: {
		postId: string;
		reactionType: ReactionTypes;
	};
}

export interface PostIdParams {
	postId?: string;
}

export interface EditPostData {
	text?: string;
	imageUrls?: string[];
}

export interface GetPostsRequest extends Request {
	userId?: string;
}

export interface CommentRequest {
	userId?: string;
	body: {
		postId: string;
		text: string;
	};
}

export interface CommentChecker {
	postId: string;
	commentId: string;
}

export interface GetSuggestionssRequest extends Request {
	userId?: string;
}
