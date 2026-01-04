import { compare, hash } from 'bcrypt';
import { createUser } from '../user/user.repository.js';
import { UserSignUp } from '../user/user.types.js';
import jwt from 'jsonwebtoken';

export async function signUpUser(
	username: string,
	email: string,
	password: string
): Promise<UserSignUp> {
	let hashedPassword = '';

	try {
		hashedPassword = await hash(password, 12);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			throw new Error(error.message);
		}

		throw new Error('Failed to hash password!');
	}

	try {
		const createdUser = await createUser(username, email, hashedPassword);
		return createdUser;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			throw new Error(error.message);
		}

		throw new Error('Failed to create a user!');
	}
}

export function createJWT(id: string, username: string): string {
	const token = jwt.sign(
		{
			id,
			username,
		},
		process.env.JWT_SECRET_KEY as string,
		{ expiresIn: '1h' }
	);

	return token;
}

export async function comparePasswords(password: string, dbPassword: string): Promise<boolean> {
	const isEqual = await compare(password, dbPassword);
	return isEqual;
}
