import User from '../user/user.model.js';
import { UserSignUp } from './user.types.js';

export async function createUser(
	username: string,
	email: string,
	hashedPassword: string,
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

export async function getUserById(id: string): Promise<UserSignUp | null> {
	const user = await User.findById(id);
	return user;
}

export async function storeRefreshToken(userId: string, token: string) {
	const user = await getUserById(userId);

	if (!user) {
		throw new Error('User not found');
	}

	user.refreshToken = token;

	await user.save();
}

export async function deleteRefreshToken(id: string) {
	await User.findByIdAndUpdate(id, { refreshToken: null });
}
