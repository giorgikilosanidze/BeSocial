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

	const createdUser = await user.save();
	return createdUser;
}

export async function checkUserExistence(email: string): Promise<UserSignUp | null> {
	const existedUser = await User.findOne({ email });
	return existedUser;
}
