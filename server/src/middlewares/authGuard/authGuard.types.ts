import { Request } from 'express';

export interface AuthGuardRequest extends Request {
	cookies: {
		access_token?: string;
	};
	userId?: string;
}

export interface DecodedAccessToken {
	id: string;
	username: string;
	iat: number;
	exp: number;
}
