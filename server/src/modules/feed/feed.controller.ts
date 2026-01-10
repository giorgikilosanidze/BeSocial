import { Request, Response } from 'express';
import { createPost, getPostsFromDB } from '../post/post.repository.js';
import { CreatePostRequest } from './feed.types.js';

export async function getPosts(req: Request, res: Response) {
	const posts = await getPostsFromDB();

	return res.status(200).json(posts);
}

export async function postCreation(req: CreatePostRequest, res: Response) {
	if (!req.userId) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const text = req.body.text;
	const userId = req.userId;

	const post = await createPost({ text, userId });

	return res.status(200).json(post);
}
