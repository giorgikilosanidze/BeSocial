import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../user/user.repository.js';
import { getPostsByUserId, getPostsCountForUsers } from '../post/post.repository.js';

export async function getUserProfile(
	req: Request<{ userId?: string }>,
	res: Response,
	next: NextFunction,
) {
	const userId = req.params.userId;

	if (!userId) {
		return res.status(400).json({ message: 'Missing params' });
	}

	const user = await getUserById(userId);

	if (!user) {
		return res.status(400).json({ message: 'This user does not exist!' });
	}

	const postsCount = await getPostsCountForUsers(userId);

	const posts = await getPostsByUserId(userId);

	return res
		.status(200)
		.json({ id: user._id, username: user.username, email: user.email, postsCount, posts });
}
