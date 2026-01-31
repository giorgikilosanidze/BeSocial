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
