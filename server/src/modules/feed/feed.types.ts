import { Request } from 'express';

export interface CreatePostRequest extends Request {
	userId?: string;
	body: { text: string; imageUrl?: string };
}

export interface EditPostParams {
	postId?: string;
}

export interface EditPostData {
	text?: string;
	imageUrl?: string;
}
