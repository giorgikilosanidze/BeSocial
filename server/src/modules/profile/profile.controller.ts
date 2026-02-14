import { NextFunction, Request, Response } from 'express';
import { getUserById, saveCoverPhoto, saveProfilePicture } from '../user/user.repository.js';
import { getPostsByUserId, getPostsCountForUsers } from '../post/post.repository.js';
import path from 'path';

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

	return res.status(200).json({
		id: user._id,
		username: user.username,
		email: user.email,
		postsCount,
		posts,
		profilePictureUrl: user.profilePictureUrl,
		coverPhotoUrl: user.coverPhotoUrl,
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
