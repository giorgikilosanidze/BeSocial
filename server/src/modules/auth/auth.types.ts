import { Request } from 'express';

export interface PostSignUpBody {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface UserIdRequest extends Request {
	userId?: string;
}

export interface RefreshTokenRequest extends Request {
	cookies: {
		refresh_token?: string;
	};
}

export type LogOutRequest = RefreshTokenRequest;

export interface DecodedRefreshToken {
	id: string;
	iat: number;
	exp: number;
}
