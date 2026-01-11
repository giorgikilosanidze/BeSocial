import { Request, Response } from 'express';
import { createPost, deletePostDB, editPostDB, getPostsFromDB } from '../post/post.repository.js';
import { CreatePostRequest, EditPostData, PostIdParams } from './feed.types.js';

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

export async function editPost(req: Request<PostIdParams, {}, EditPostData>, res: Response) {
	if (!req.params.postId) {
		return res.status(400).json({ message: 'Not enough data to edit post!' });
	}

	const postId = req.params.postId;
	const editedText = req.body.text;
	const editedImageUrl = req.body.imageUrl;

	if (!editedText && !editedImageUrl) {
		return res.status(400).json({ message: 'Not enough data to edit post!' });
	}

	const editedPost = await editPostDB({ postId, editedText, editedImageUrl });

	return res.status(200).json(editedPost);
}

export async function deletePost(req: Request<PostIdParams>, res: Response) {
	if (!req.params.postId) {
		return res.status(400).json({ message: 'Not enough data to delete post!' });
	}

	const postId = req.params.postId;

	await deletePostDB(postId);

	return res.status(200).json({ postId });
}
