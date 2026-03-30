import { NextFunction, Request, Response } from 'express';
import {
	addComment,
	createPost,
	deleteCommentFromDB,
	deletePostDB,
	editPostDB,
	getPostsFromDB,
	getUserIdByPost,
} from '../post/post.repository.js';
import {
	CommentChecker,
	CommentRequest,
	CreatePostRequest,
	EditPostData,
	GetPostsRequest,
	GetSuggestionssRequest,
	PostIdParams,
} from './feed.types.js';
import path from 'path';
import { getIO } from '../../socket.js';
import { ReactionData } from '../reactions/reaction.types.js';
import {
	addReaction,
	collectReactions,
	getPostReactionsDetailed,
} from '../reactions/reaction.repository.js';
import { createNotification } from '../notification/notification.repository.js';
import {
	getUsernameById,
	getProfilePictureUrlById,
	getRandomSuggestions,
} from '../user/user.repository.js';
import { log } from 'console';

export async function getPosts(req: GetPostsRequest, res: Response, next: NextFunction) {
	try {
		const posts = await getPostsFromDB(req.userId);
		return res.status(200).json(posts);
	} catch (error: any) {
		return next(error);
	}
}

export async function getSinglePost(req: Request<PostIdParams>, res: Response, next: NextFunction) {
	if (!req.params.postId) {
		return res.status(400).json({ message: 'postId parameter is required!' });
	}

	// Make sure req is cast as any or we extract userId properly since it's guarded by authGuard
	const userId = (req as any).userId as string | undefined;

	try {
		const post = await import('../post/post.repository.js').then((m) =>
			m.getPostById(req.params.postId as string, userId),
		);
		return res.status(200).json(post);
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
		getIO().emit('newPost', post);
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
		getIO().emit('postEdited', editedPost);
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
		getIO().emit('postDeleted', postId);
		return res.status(204).send();
	} catch (error: any) {
		return next(error);
	}
}

export async function handleReaction(
	req: Request<{}, {}, ReactionData>,
	res: Response,
	next: NextFunction,
) {
	const { postId, userId, reactionType } = req.body;

	if (!postId || !userId || !reactionType) {
		return res.status(400).json({ message: 'Not enough information to handle reaction!' });
	}

	try {
		const isAdded = await addReaction({ postId, userId, reactionType });
		const reactions = await collectReactions(postId);

		const postAuthorId = await getUserIdByPost(postId);

		if (postAuthorId.toString() === userId.toString()) {
			return;
		}

		const notification = await createNotification({
			recipient: postAuthorId,
			sender: userId,
			type: 'reaction',
			isRead: false,
			post: postId,
			reactionType: reactionType,
		});

		const returnObject = {
			postId,
			userId,
			reactions,
			userReaction: isAdded ? reactionType : null,
		};

		getIO().emit('reactionAdded', returnObject);

		if (isAdded) {
			getIO().to(postAuthorId.toString()).emit('reactionNotification', notification);
		}

		res.status(200).json(returnObject);
	} catch (error) {
		res.status(500).json({ message: 'Could not react to post!' });
	}
}

export async function addCommentToPost(req: CommentRequest, res: Response, next: NextFunction) {
	const userId = req.userId;
	const postId = req.body.postId;
	const text = req.body.text.trim();

	if (!userId) {
		return res.status(400).json({ message: 'Failed to identify user!' });
	}

	const username = await getUsernameById(userId);

	if (!username) {
		return res.status(400).json({ message: 'Failed to find username!' });
	}

	const profilePictureUrl = await getProfilePictureUrlById(userId);

	const comment = await addComment({ userId, postId, text, username, profilePictureUrl });

	const commentDoc = comment as any;
	const commentObject = commentDoc.toObject ? commentDoc.toObject() : commentDoc;
	const formattedComment = {
		...commentObject,
		_id: commentDoc._id,
		postId: postId,
	};

	getIO().emit('commentAdded', formattedComment);

	res.status(200).json(formattedComment);
}

export async function deleteComment(
	req: Request<{}, {}, CommentChecker>,
	res: Response,
	next: NextFunction,
) {
	const postId = req.body.postId;
	const commentId = req.body.commentId;

	const isDeleted = await deleteCommentFromDB(postId, commentId);

	if (isDeleted) {
		res.status(200).json({ postId, commentId });
	} else {
		res.status(400).json({ message: 'Failed to delete a comment' });
	}
}

export async function getSuggestions(
	req: GetSuggestionssRequest,
	res: Response,
	next: NextFunction,
) {
	const userId = req.userId;

	if (!userId) {
		return res.status(400).json({ message: 'Failed to identify user' });
	}

	const suggestions = await getRandomSuggestions(userId);

	res.status(200).json(suggestions);
}

export async function getPostReactionsList(
	req: Request<PostIdParams>,
	res: Response,
	next: NextFunction,
) {
	if (!req.params.postId) {
		return res.status(400).json({ message: 'postId parameter is required!' });
	}

	try {
		const reactions = await getPostReactionsDetailed(req.params.postId);
		return res.status(200).json(reactions);
	} catch (error: any) {
		return next(error);
	}
}
