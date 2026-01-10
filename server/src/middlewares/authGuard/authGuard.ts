import { NextFunction, Request, Response } from 'express';
import { AuthGuardRequest, DecodedAccessToken } from './authGuard.types.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function authGuard(req: AuthGuardRequest, res: Response, next: NextFunction) {
	const accessToken = req.cookies.access_token;

	if (!accessToken) {
		throw new Error('Authorization failed!');
	}

	let decodedToken: DecodedAccessToken;

	try {
		decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as DecodedAccessToken;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			throw new Error(error.message);
		}

		throw new Error('Failed to decode token!');
	}

	req.userId = decodedToken.id;
	next();
}
