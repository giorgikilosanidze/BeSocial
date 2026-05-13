import { Document } from 'mongoose';

export interface UserSignUp extends Document {
	username: string;
	email: string;
	password: string;
	refreshToken?: string;
	profilePictureUrl?: string;
	coverPhotoUrl?: string;
	lastSeenAt?: Date | null;
	following: string[];
	followers: string[];
}
