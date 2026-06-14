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
	ReactionRequest,
} from './feed.types.js';
import { getIO } from '../../socket.js';
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
			imageUrls.push(image.path);
		});
	}

	if (!text && imageUrls.length === 0) {
		return res.status(400).json({ message: 'Post must have at least text or image!' });
	}

	try {
		const post = await createPost({ text, userId, imageUrls });
		// Intentionally NOT broadcast over sockets: like Instagram/Facebook, other
		// users only see a new post on their next feed load, not live. The author
		// gets it immediately from this response (handled in the feed/profile slice).
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
	const userId = (req as any).userId as string | undefined;

	if (!editedText && !editedImageUrls) {
		return res.status(400).json({ message: 'Not enough data to edit post!' });
	}

	try {
		const editedPost = await editPostDB({ postId, editedText, editedImageUrls }, userId);
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

export async function handleReaction(req: ReactionRequest, res: Response, next: NextFunction) {
	const { postId, reactionType } = req.body;
	// Trust the authenticated user from the token, never a userId from the body —
	// otherwise anyone could react (and send notifications) as another user.
	const userId = req.userId;

	if (!userId) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	if (!postId || !reactionType) {
		return res.status(400).json({ message: 'Not enough information to handle reaction!' });
	}

	try {
		const isAdded = await addReaction({ postId, userId, reactionType });
		const reactions = await collectReactions(postId);
		const postAuthorId = await getUserIdByPost(postId);

		const returnObject = {
			postId,
			userId,
			reactions,
			userReaction: isAdded ? reactionType : null,
		};

		getIO().emit('reactionAdded', returnObject);

		// Only notify the author when someone else adds a reaction. Reacting to
		// your own post still returns a normal response (it must not hang).
		if (isAdded && postAuthorId.toString() !== userId.toString()) {
			const notification = await createNotification({
				recipient: postAuthorId,
				sender: userId,
				type: 'reaction',
				isRead: false,
				post: postId,
				reactionType: reactionType,
			});

			getIO().to(postAuthorId.toString()).emit('reactionNotification', notification);
		}

		return res.status(200).json(returnObject);
	} catch (error) {
		return res.status(500).json({ message: 'Could not react to post!' });
	}
}

export async function addCommentToPost(req: CommentRequest, res: Response, next: NextFunction) {
	const userId = req.userId;
	const postId = req.body.postId;
	const text = typeof req.body.text === 'string' ? req.body.text.trim() : '';

	if (!userId) {
		return res.status(400).json({ message: 'Failed to identify user!' });
	}

	if (!postId) {
		return res.status(400).json({ message: 'postId is required!' });
	}

	if (!text) {
		return res.status(400).json({ message: 'Comment text is required!' });
	}

	if (text.length > 1000) {
		return res.status(400).json({ message: 'Comment is too long!' });
	}

	const username = await getUsernameById(userId);

	if (!username) {
		return res.status(400).json({ message: 'Failed to find username!' });
	}

	const profilePictureUrl = await getProfilePictureUrlById(userId);

	const comment = await addComment({ userId, postId, text, username, profilePictureUrl });
	const postAuthorId = await getUserIdByPost(postId);

	const commentDoc = comment as any;
	const commentObject = commentDoc.toObject ? commentDoc.toObject() : commentDoc;
	const formattedComment = {
		...commentObject,
		_id: commentDoc._id,
		postId: postId,
	};

	getIO().emit('commentAdded', formattedComment);

	if (postAuthorId.toString() !== userId.toString()) {
		const notification = await createNotification({
			recipient: postAuthorId,
			sender: userId,
			type: 'comment',
			isRead: false,
			post: postId,
		});

		getIO().to(postAuthorId.toString()).emit('commentNotification', notification);
	}

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
