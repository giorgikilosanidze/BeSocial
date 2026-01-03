import { NextFunction, Request, Response } from 'express';
import { signUpSchema } from '../modules/auth/auth.schema.js';
import { z } from 'zod';

export function userValidation(req: Request, res: Response, next: NextFunction) {
	const valdiationResult = signUpSchema.safeParse(req.body);

	if (!valdiationResult.success) {
		const errors = z.treeifyError(valdiationResult.error);
		console.log(errors);

		return res.status(400).json({ errors });
	}

	req.body = valdiationResult.data;

	next();
}
