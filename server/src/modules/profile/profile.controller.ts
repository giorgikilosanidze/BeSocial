import { NextFunction, Request, Response } from 'express';
import {
	checkFollow,
	getUserById,
	handleFollowOrUnfollow,
	saveCoverPhoto,
	saveProfilePicture,
} from '../user/user.repository.js';
import { getPostsByUserId, getPostsCountForUsers } from '../post/post.repository.js';
import path from 'path';
import { FollowRequest } from './profile.types.js';
import { getIO } from '../../socket.js';
import { createNotification } from '../notification/notification.repository.js';

export async function getUserProfile(
	req: Request<{ userId?: string }>,
	res: Response,
	next: NextFunction,
) {
	const userId = req.params.userId;
	const viewerId = (req as any).userId;

	if (!userId) {
		return res.status(400).json({ message: 'Missing params' });
	}

	const user = await getUserById(userId);

	if (!user) {
		return res.status(400).json({ message: 'This user does not exist!' });
	}

	const postsCount = await getPostsCountForUsers(userId);

	const posts = await getPostsByUserId(userId, viewerId);

	const isFollowed = await checkFollow(viewerId, userId);

	return res.status(200).json({
		id: user._id,
		username: user.username,
		email: user.email,
		postsCount,
		posts,
		profilePictureUrl: user.profilePictureUrl,
		coverPhotoUrl: user.coverPhotoUrl,
		followersCount: user.followers.length,
		followingCount: user.following.length,
		isFollowed,
	});
}

export async function uploadProfilePicture(
	req: Request<{ userId?: string }>,
	res: Response,
	next: NextFunction,
) {
	const userId = req.params.userId;
	const image = req.files as Express.Multer.File[];

	if (!userId || !image || image.length === 0) {
		return res.status(400).json({ message: 'Not enough data to upload profile picture!' });
	}

	const normalizedPath = image[0].path.split(path.sep).join('/');

	await saveProfilePicture(userId, normalizedPath);

	return res.status(200).json({ profilePictureUrl: normalizedPath });
}

export async function uploadCoverPhoto(
	req: Request<{ userId?: string }>,
	res: Response,
	next: NextFunction,
) {
	const userId = req.params.userId;
	const image = req.files as Express.Multer.File[];

	if (!userId || !image || image.length === 0) {
		return res.status(400).json({ message: 'Not enough data to upload cover photo!' });
	}

	const normalizedPath = image[0].path.split(path.sep).join('/');

	await saveCoverPhoto(userId, normalizedPath);

	return res.status(200).json({ coverPhotoUrl: normalizedPath });
}

export async function followOrUnfollow(req: FollowRequest, res: Response, next: NextFunction) {
	const userId = req.userId;
	const targetUserId = req.body.targetUser;
	const action = req.body.action;

	if (!userId) {
		return res.status(400).json({ message: 'Failed to identify user!' });
	}

	if (!targetUserId || !action) {
		return res.status(400).json({ message: 'Not enough data provided!' });
	}

	const isFollowing = await handleFollowOrUnfollow(userId, targetUserId, action);

	let notification;

	if (action === 1) {
		notification = await createNotification({
			recipient: targetUserId,
			sender: userId,
			type: 'follow',
			isRead: false,
		});
	}

	getIO().emit('followedOrUnfollowed', { isFollowing });

	if (notification) {
		getIO().to(targetUserId).emit('followNotification', notification);
	}

	res.status(200).json({ isFollowing });
}
