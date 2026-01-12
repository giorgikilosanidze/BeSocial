import { NextFunction, Request, Response } from 'express';
import { AuthGuardRequest, DecodedAccessToken } from './authGuard.types.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function authGuard(req: AuthGuardRequest, res: Response, next: NextFunction) {
	const accessToken = req.cookies.access_token;

	if (!accessToken) {
		const error = new Error('Authorization failed!');
		(error as any).status = 401; // mark as Unauthorized
		return next(error);
	}

	let decodedToken: DecodedAccessToken;

	try {
		decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as DecodedAccessToken;
	} catch (error: any) {
		const err = new Error('Invalid or expired token') as any;
		err.statusCode = 401;
		return next(err);
	}

	req.userId = decodedToken.id;
	next();
}
