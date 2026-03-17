import { Document, Types } from 'mongoose';

export interface PostModel extends Document {
	text: string;
	imageUrls?: string[];
	isEdited: boolean;
	author: string;
	comments: CommentModelType[];
}

export interface PostType {
	text: string;
	imageUrls?: string[];
	userId: string;
}

export interface EditPostDB {
	editedText?: string;
	editedImageUrls?: string[];
	postId: string;
}

export interface AddCommentType {
	userId: string;
	postId: string;
	text: string;
	username: string;
	profilePictureUrl: string;
}

export interface CommentModelType {
	userId: string;
	text: string;
	username: string;
	profilePictureUrl: string;
	_id?: Types.ObjectId;
}
