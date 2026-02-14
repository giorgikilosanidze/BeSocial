import { Document } from 'mongoose';

export interface UserSignUp extends Document {
	username: string;
	email: string;
	password: string;
	refreshToken?: string;
	profilePictureUrl?: string;
	coverPhotoUrl?: string;
	following: string[];
	followers: string[];
}
