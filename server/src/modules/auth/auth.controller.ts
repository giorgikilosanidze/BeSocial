import { NextFunction, Request, Response } from 'express';

export function postSignUp(req: Request, res: Response, next: NextFunction) {
	console.log(req);
	return res.status(200).json({ message: 'User created successfully!' });
}
