import { NextFunction, Request, Response } from 'express';
import { createPost, deletePostDB, editPostDB, getPostsFromDB } from '../post/post.repository.js';
import { CreatePostRequest, EditPostData, PostIdParams } from './feed.types.js';
import path from 'path';
import { removeImage } from '../../utils/removeImage.js';

export async function getPosts(req: Request, res: Response, next: NextFunction) {
	try {
		const posts = await getPostsFromDB();
		return res.status(200).json(posts);
	} catch (error: any) {
		return next(error);
	}
}

export async function postCreation(req: CreatePostRequest, res: Response, next: NextFunction) {
	if (!req.userId) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const text = req.body.text;
	const userId = req.userId;
	const imageFiles = req.files;

	const imageUrls: string[] = [];

	if (Array.isArray(imageFiles) && imageFiles?.length) {
		imageFiles.forEach((image) => {
			const normalizedPath = image.path.split(path.sep).join('/');
			imageUrls.push(normalizedPath);
		});
	}

	if (!text && imageUrls.length === 0) {
		return res.status(400).json({ message: 'Post must have at least text or image!' });
	}

	try {
		const post = await createPost({ text, userId, imageUrls });
		return res.status(201).json(post);
	} catch (error: any) {
		return next(error);
	}
}

export async function editPost(
	req: Request<PostIdParams, {}, EditPostData>,
	res: Response,
	next: NextFunction,
) {
	if (!req.params.postId) {
		return res.status(400).json({ message: 'postId parameter is required!' });
	}

	const postId = req.params.postId;
	const editedText = req.body.text;
	const editedImageUrls = req.body.imageUrls;

	if (!editedText && !editedImageUrls) {
		return res.status(400).json({ message: 'Not enough data to edit post!' });
	}

	try {
		const editedPost = await editPostDB({ postId, editedText, editedImageUrls });
		return res.status(200).json(editedPost);
	} catch (error: any) {
		return next(error);
	}
}

export async function deletePost(req: Request<PostIdParams>, res: Response, next: NextFunction) {
	if (!req.params.postId) {
		return res.status(400).json({ message: 'postId parameter is required!' });
	}

	const postId = req.params.postId;

	try {
		await deletePostDB(postId);
		return res.status(204).send();
	} catch (error: any) {
		return next(error);
	}
}
