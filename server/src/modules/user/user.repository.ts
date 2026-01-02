import User from '../user/user.model.js';
import { UserSignUp } from './user.types.js';

export async function createUser(
	username: string,
	email: string,
	hashedPassword: string
): Promise<UserSignUp> {
	const user = new User({
		username: username.trim(),
		email: email.trim(),
		password: hashedPassword,
	});

	try {
		const createdUser = await user.save();
		return createdUser;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			throw new Error(error.message);
		}

		throw new Error('Failed to create user!');
	}
}

export async function checkUserExistence(email: string): Promise<UserSignUp | null> {
	try {
		const existedUser = await User.findOne({ email });
		return existedUser;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			throw new Error(error.message);
		}

		throw new Error('User with this email already exists!');
	}
}
