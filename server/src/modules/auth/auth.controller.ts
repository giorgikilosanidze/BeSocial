import { NextFunction, Request, Response } from 'express';
import {
	DecodedRefreshToken,
	LogOutRequest,
	PostSignUpBody,
	RefreshTokenRequest,
	UserIdRequest,
} from './auth.types.js';
import { comparePasswords, createJWT, createRefreshJWT, signUpUser } from './auth.service.js';
import {
	checkUserExistence,
	deleteRefreshToken,
	deleteRefreshTokenByToken,
	getUserById,
	storeRefreshToken,
} from '../user/user.repository.js';
import dotenv from 'dotenv';
import { UserSignUp } from '../user/user.types.js';
import jwt from 'jsonwebtoken';
import { getPostsCountForUsers } from '../post/post.repository.js';

dotenv.config();

export async function postSignUp(
	req: Request<{}, {}, PostSignUpBody>,
	res: Response,
	next: NextFunction,
) {
	const { username, email, password, confirmPassword } = req.body;

	let existedUser: UserSignUp | null;

	try {
		existedUser = await checkUserExistence(email);
	} catch (error: any) {
		return next(error);
	}

	if (existedUser) {
		return res.status(409).json({
			message: 'Registration failed!',
			otherErrors: { email: 'User with this email already exists!' },
		});
	}

	if (password !== confirmPassword) {
		return res.status(400).json({
			message: 'Registration failed!',
			otherErrors: { confirmPassword: "Passwords don't match" },
		});
	}

	let user: UserSignUp;

	try {
		user = await signUpUser(username, email, password);
	} catch (error: any) {
		return next(error);
	}

	const token = createJWT(user._id.toString(), user.username);
	const refreshToken = createRefreshJWT(user._id.toString());

	storeRefreshToken(user._id.toString(), refreshToken);

	return res
		.cookie('access_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			maxAge: 60 * 60 * 1000,
		})
		.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
		.status(201)
		.json({
			id: user._id.toString(),
			username: user.username,
			email: user.email,
			postsCount: 0,
			profilePictureUrl: user.profilePictureUrl,
			coverPhotoUrl: user.coverPhotoUrl,
			followersCount: 0,
			followingCount: 0,
		});
}

export async function postLogIn(
	req: Request<{}, {}, PostSignUpBody>,
	res: Response,
	next: NextFunction,
) {
	const { email, password } = req.body;

	const existedUser = await checkUserExistence(email);

	if (!existedUser) {
		return res.status(400).json({
			message: 'Log in failed!',
			otherErrors: { email: 'User with this email does not exist!' },
		});
	}

	let isEqual: boolean;

	try {
		isEqual = await comparePasswords(password, existedUser.password);
	} catch (error: any) {
		return next(error);
	}

	if (isEqual) {
		const userIdToString = existedUser._id.toString();
		const token = createJWT(userIdToString, existedUser.username);
		const refreshToken = createRefreshJWT(userIdToString);

		storeRefreshToken(userIdToString, refreshToken);

		const postsCount = await getPostsCountForUsers(userIdToString);

		return res
			.cookie('access_token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
				maxAge: 60 * 60 * 1000,
			})
			.cookie('refresh_token', refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})
			.status(201)
			.json({
				id: existedUser._id.toString(),
				username: existedUser.username,
				email: existedUser.email,
				postsCount,
				profilePictureUrl: existedUser.profilePictureUrl,
				coverPhotoUrl: existedUser.coverPhotoUrl,
				followersCount: existedUser.followers.length,
				followingCount: existedUser.following.length,
			});
	} else {
		return res.status(400).json({
			message: 'Log in failed!',
			otherErrors: { password: 'User with this password does not exist!' },
		});
	}
}

export async function logOut(req: LogOutRequest, res: Response, next: NextFunction) {
	const refreshToken = req.cookies.refresh_token;

	if (refreshToken) {
		const decodedToken = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET_KEY!,
		) as DecodedRefreshToken;

		await deleteRefreshToken(decodedToken.id);
	}

	res.clearCookie('access_token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
	});

	res.clearCookie('refresh_token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
	});

	return res.sendStatus(200);
}

export async function sendLoggedInUser(req: UserIdRequest, res: Response, next: NextFunction) {
	if (!req.userId) {
		throw new Error('Not authenticated');
	}
	try {
		const user = await getUserById(req.userId);

		if (!user) {
			return res.status(401).json('Not authenticated');
		}

		const postsCount = await getPostsCountForUsers(req.userId);

		return res.status(200).json({
			id: user._id,
			username: user.username,
			email: user.email,
			postsCount,
			profilePictureUrl: user.profilePictureUrl,
			coverPhotoUrl: user.coverPhotoUrl,
			followersCount: user.followers.length,
			followingCount: user.following.length,
		});
	} catch (error: any) {
		next(error);
	}
}

export async function resendAccessToken(
	req: RefreshTokenRequest,
	res: Response,
	next: NextFunction,
) {
	const refreshToken = req.cookies.refresh_token;

	if (!refreshToken) {
		res.clearCookie('access_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		});

		res.clearCookie('refresh_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		});
		return res.status(401).json({ message: 'No authorization' });
	}

	let decodedToken: DecodedRefreshToken;

	try {
		decodedToken = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET_KEY!,
		) as DecodedRefreshToken;
	} catch {
		await deleteRefreshTokenByToken(refreshToken);
		res.clearCookie('access_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		});

		res.clearCookie('refresh_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		});
		return res.status(401).json({ message: 'Invalid refresh token' });
	}

	const user = await getUserById(decodedToken.id);

	if (!user || user.refreshToken !== refreshToken) {
		await deleteRefreshTokenByToken(refreshToken);
		res.clearCookie('access_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		});

		res.clearCookie('refresh_token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		});
		return res.status(401).json({ message: 'Refresh token revoked' });
	}

	const token = createJWT(user._id.toString(), user.username);
	const newRefreshToken = createRefreshJWT(user._id.toString());

	user.refreshToken = newRefreshToken;
	await user.save();

	return res
		.cookie('access_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			maxAge: 60 * 60 * 1000,
		})
		.cookie('refresh_token', newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
		.sendStatus(204);
}
