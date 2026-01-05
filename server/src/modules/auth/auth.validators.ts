import { NextFunction, Request, Response } from 'express';
import { logInSchema, signUpSchema } from './auth.schema.js';
import { z } from 'zod';

export function signUpValidation(req: Request, res: Response, next: NextFunction) {
	const valdiationResult = signUpSchema.safeParse(req.body);

	if (!valdiationResult.success) {
		const errors = z.treeifyError(valdiationResult.error);
		console.log(errors);

		return res.status(400).json({ errors });
	}

	req.body = valdiationResult.data;

	next();
}

export function logInValidation(req: Request, res: Response, next: NextFunction) {
	const valdiationResult = logInSchema.safeParse(req.body);

	if (!valdiationResult.success) {
		const errors = z.treeifyError(valdiationResult.error);
		console.log(errors);

		return res.status(400).json({ errors });
	}

	req.body = valdiationResult.data;

	next();
}
