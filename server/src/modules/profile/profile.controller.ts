import { NextFunction, Request, Response } from 'express';

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
	console.log(1);
}
