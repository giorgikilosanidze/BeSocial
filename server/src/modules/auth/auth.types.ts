import { Request } from 'express';

export interface PostSignUpBody {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface UserIdRequest extends Request {
	userId?: string;
}
