import { Request } from 'express';

export interface CreatePostRequest extends Request {
	userId?: string;
	body: { text: string; imageUrl?: string };
}
