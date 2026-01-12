import { compare, hash } from 'bcrypt';
import { createUser } from '../user/user.repository.js';
import { UserSignUp } from '../user/user.types.js';
import jwt from 'jsonwebtoken';

export async function signUpUser(
	username: string,
	email: string,
	password: string
): Promise<UserSignUp> {
	const hashedPassword = await hash(password, 12);
	const createdUser = await createUser(username, email, hashedPassword);
	return createdUser;
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
