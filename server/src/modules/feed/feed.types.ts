import { Request } from 'express';

export interface CreatePostRequest extends Request {
	userId?: string;
	body: { text: string; imageUrls?: string[] };
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
