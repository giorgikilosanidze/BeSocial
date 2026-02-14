import mongoose, { Document } from 'mongoose';
import { UserSignUp } from './user.types.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		required: true,
		type: String,
	},
	email: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
	profilePictureUrl: {
		required: false,
		type: String,
	},
	coverPhotoUrl: {
		required: false,
		type: String,
	},
	followers: [{ type: String, ref: 'User' }],
	following: [{ type: String, ref: 'User' }],
	refreshToken: {
		type: String,
	},
});

const User = mongoose.model<UserSignUp & Document>('User', userSchema);

export default User;
