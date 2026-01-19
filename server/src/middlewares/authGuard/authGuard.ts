import { NextFunction, Request, Response } from 'express';
import { AuthGuardRequest, DecodedAccessToken } from './authGuard.types.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function authGuard(req: AuthGuardRequest, res: Response, next: NextFunction) {
	const accessToken = req.cookies.access_token;

	if (!accessToken) {
		const error = new Error('NO_ACCESS_TOKEN');
		(error as any).status = 401; // mark as Unauthorized
		return next(error);
	}

	let decodedToken: DecodedAccessToken;

	try {
		decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as DecodedAccessToken;
	} catch (error: any) {
		if (error.name === 'TokenExpiredError') {
			const error = new Error('ACCESS_TOKEN_EXPIRED');
			(error as any).status = 401;
			return next(error);
		} else if (error.name === 'JsonWebTokenError') {
			const error = new Error('ACCESS_TOKEN_INVALID');
			(error as any).status = 401;
			return next(error);
		} else {
			// some other unexpected error
			return next(Object.assign(new Error('Token verification failed'), { status: 401 }));
		}
	}

	req.userId = decodedToken.id;
	next();
}
