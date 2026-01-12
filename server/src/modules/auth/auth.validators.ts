import { NextFunction, Request, Response } from 'express';
import { logInSchema, signUpSchema } from './auth.schema.js';
import { z } from 'zod';

export function signUpValidation(req: Request, res: Response, next: NextFunction) {
	const validationResult = signUpSchema.safeParse(req.body);

	if (!validationResult.success) {
		const errors = z.treeifyError(validationResult.error);
		return res.status(400).json({ errors });
	}

	req.body = validationResult.data;

	next();
}

export function logInValidation(req: Request, res: Response, next: NextFunction) {
	const validationResult = logInSchema.safeParse(req.body);

	if (!validationResult.success) {
		const errors = z.treeifyError(validationResult.error);
		return res.status(400).json({ errors });
	}

	req.body = validationResult.data;

	next();
}
