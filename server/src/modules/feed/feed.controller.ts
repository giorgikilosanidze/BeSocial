import { NextFunction, Request, Response } from 'express';
import { createPost } from '../post/post.repository.js';
import { PostType } from '../post/post.types.js';

export function getFeed() {
	console.log(1);
}

export async function postCreation(req: Request<{}, {}, PostType>, res: Response) {
	const text = req.body.text;
	const post = await createPost({ text });

	return res.status(200).json(post);
}
