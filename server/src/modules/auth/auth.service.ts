import { compare, hash } from 'bcrypt';
import { createUser } from '../user/user.repository.js';
import { UserSignUp } from '../user/user.types.js';
import jwt from 'jsonwebtoken';

export async function signUpUser(
	username: string,
	email: string,
	password: string,
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
		{ expiresIn: '1h' },
	);

	return token;
}

export function createRefreshJWT(id: string): string {
	const token = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET_KEY as string, {
		expiresIn: '7d',
	});
	return token;
}

// Short-lived token presented in the socket handshake. The client obtains it
// from an authenticated HTTP endpoint (cookie-backed), then the socket server
// verifies it to derive the real userId instead of trusting client input.
export function createSocketToken(id: string): string {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '2m' });
}

export async function comparePasswords(password: string, dbPassword: string): Promise<boolean> {
	const isEqual = await compare(password, dbPassword);
	return isEqual;
}
