import { Document } from 'mongoose';

export interface PostModel extends Document {
	text: string;
	imageUrl?: string;
}

export interface PostType {
	text: string;
	imageUrl?: string;
}
