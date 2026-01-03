import { Request, Response } from 'express';
import { PostSignUpBody } from './auth.types.js';
import { signUpUser } from './auth.service.js';
import { checkUserExistence } from '../user/user.repository.js';

export async function postSignUp(req: Request<{}, {}, PostSignUpBody>, res: Response) {
	const { username, email, password, confirmPassword } = req.body;

	const existedUser = await checkUserExistence(email);

	if (existedUser) {
		return res.status(400).json({ message: 'User with this email already exists!' });
	}

	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords don't match!" });
	}

	const user = await signUpUser(username, email, password);

	if (user) {
		return res.status(200).json({ username: user.username, email: user.email });
	} else {
		console.error('Failed to create user!');
		throw new Error('Failed to create user!');
	}
}

export async function postLogIn(req: Request<{}, {}, PostSignUpBody>, res: Response) {
	const { email, password } = req.body;

	const existedUser = await checkUserExistence(email);

	if (!existedUser) {
		return res.status(400).json({ message: 'User with this email does not exist!' });
	}

	// const user = await signUpUser(username, email, password);

	// if (user) {
	// 	return res.status(200).json({ username: user.username, email: user.email });
	// } else {
	// 	console.error('Failed to create user!');
	// 	throw new Error('Failed to create user!');
	// }
}
