import { string, z } from 'zod';

export const signUpSchema = z.object({
	username: z
		.string()
		.min(3, 'Username must be at leas 3 characters long')
		.max(20, 'Username must not have more than 20 characters'),
	email: z.email('Please enter a valid email address'),
	password: string()
		.min(8, 'Password must be at least 8 characters long')
		.regex(/\d/, 'Password must contain at least one number'),
	confirmPassword: string()
		.min(8, 'Password must be at least 8 characters long')
		.regex(/\d/, 'Password must contain at least one number'),
});

export const logInSchema = z.object({
	email: z.email('Please enter a valid email address'),
	password: string()
		.min(8, 'Password must be at least 8 characters long')
		.regex(/\d/, 'Password must contain at least one number'),
});
