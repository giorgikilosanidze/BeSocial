import { NextFunction, Request, Response } from 'express';
import { createPost } from '../post/post.repository.js';
import { Post } from '../post/post.types.js';

export function getFeed() {
	console.log(1);
}

export function postCreation(req: Request<{}, {}, Post>, res: Response, next: NextFunction) {
	console.log(req.body);
	const text = req.body.text;
	const post = createPost({ text });
	return res.status(200).json({ message: 'success', post });
}
