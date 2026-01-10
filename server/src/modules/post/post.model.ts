import mongoose, { Document } from 'mongoose';
import { PostModel } from './post.types.js';

const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

postSchema.set('toJSON', {
	transform: (_, ret) => {
		delete (ret as any).__v;
		return ret;
	},
});

const Post = mongoose.model<PostModel & Document>('Post', postSchema);

export default Post;
