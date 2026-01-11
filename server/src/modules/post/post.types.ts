import { Document } from 'mongoose';

export interface PostModel extends Document {
	text: string;
	imageUrl?: string;
	isEdited: boolean;
	author: string;
}

export interface PostType {
	text: string;
	imageUrl?: string;
	userId: string;
}

export interface EditPostDB {
	editedText?: string;
	editedImageUrl?: string;
	postId: string;
}
