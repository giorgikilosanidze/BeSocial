import { Document } from 'mongoose';

export interface PostModel extends Document {
	text: string;
	imageUrls?: string[];
	isEdited: boolean;
	author: string;
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
