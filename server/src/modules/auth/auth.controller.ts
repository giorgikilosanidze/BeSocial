import { NextFunction, Request, Response } from 'express';
import { PostSignUpBody } from './auth.types.js';
import { comparePasswords, createJWT, signUpUser } from './auth.service.js';
import { checkUserExistence } from '../user/user.repository.js';
import dotenv from 'dotenv';
import { UserSignUp } from '../user/user.types.js';
import { Document } from 'mongoose';

dotenv.config();

export async function postSignUp(
	req: Request<{}, {}, PostSignUpBody>,
	res: Response,
	next: NextFunction
) {
	const { username, email, password, confirmPassword } = req.body;

	let existedUser: UserSignUp | null;

	try {
		existedUser = await checkUserExistence(email);
	} catch (error: any) {
		return next(error);
	}

	if (existedUser) {
		return res.status(409).json({ message: 'User with this email already exists!' });
	}

	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords don't match" });
	}

	let user: UserSignUp;

	try {
		user = await signUpUser(username, email, password);
	} catch (error: any) {
		return next(error);
	}

	const token = createJWT(user._id.toString(), user.username);

	return res
		.cookie('access_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
			maxAge: 60 * 60 * 1000,
		})
		.status(201)
		.json({
			id: user._id.toString(),
			username: user.username,
			email: user.email,
		});
}

export async function postLogIn(
	req: Request<{}, {}, PostSignUpBody>,
	res: Response,
	next: NextFunction
) {
	const { email, password } = req.body;

	const existedUser = await checkUserExistence(email);

	if (!existedUser) {
		return res.status(400).json({ message: 'User with this email does not exist!' });
	}

	let isEqual: boolean;

	try {
		isEqual = await comparePasswords(password, existedUser.password);
	} catch (error: any) {
		return next(error);
	}

	if (isEqual) {
		const token = createJWT(existedUser._id.toString(), existedUser.username);
		return res
			.cookie('access_token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
				maxAge: 60 * 60 * 1000,
			})
			.status(201)
			.json({
				id: existedUser._id.toString(),
				username: existedUser.username,
				email: existedUser.email,
			});
	} else {
		return res.status(400).json({ message: 'User with this password does not exist!' });
	}
}
