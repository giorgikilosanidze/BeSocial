import { NextFunction, Request, Response } from 'express';
import { createPost } from '../post/post.repository.js';
import { CreatePostRequest } from './feed.types.js';

export function getFeed() {
	console.log(1);
}

export async function postCreation(req: CreatePostRequest, res: Response) {
	const text = req.body.text;
	const userId = req.userId;

	const post = await createPost({ text, userId });

	return res.status(200).json(post);
}
