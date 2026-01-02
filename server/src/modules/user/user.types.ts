import { Document } from 'mongoose';

export interface UserSignUp extends Document {
	username: string;
	email: string;
	password: string;
}
