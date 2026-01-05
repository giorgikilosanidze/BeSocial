import { Request, Response } from 'express';
import { PostSignUpBody } from './auth.types.js';
import { comparePasswords, createJWT, signUpUser } from './auth.service.js';
import { checkUserExistence } from '../user/user.repository.js';

export async function postSignUp(req: Request<{}, {}, PostSignUpBody>, res: Response) {
	const { username, email, password, confirmPassword } = req.body;

	const existedUser = await checkUserExistence(email);

	if (existedUser) {
		return res.status(400).json({ message: 'User with this email already exists!' });
	}

	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords don't match" });
	}

	const user = await signUpUser(username, email, password);

	if (user) {
		const token = createJWT(user._id.toString(), user.username);
		return res.status(200).json({
			token,
			user: { id: user._id.toString(), username: user.username },
		});
	} else {
		return res.status(400).json({ message: 'Could not create user!' });
	}
}

export async function postLogIn(req: Request<{}, {}, PostSignUpBody>, res: Response) {
	const { email, password } = req.body;

	const existedUser = await checkUserExistence(email);

	if (!existedUser) {
		return res.status(400).json({ message: 'User with this email does not exist!' });
	}

	const isEqual = await comparePasswords(password, existedUser.password);

	if (isEqual) {
		const token = createJWT(existedUser._id.toString(), existedUser.username);
		return res.status(200).json({
			token,
			user: { id: existedUser._id.toString(), username: existedUser.username },
		});
	} else {
		return res.status(400).json({ message: 'User with this password does not exist!' });
	}
}
