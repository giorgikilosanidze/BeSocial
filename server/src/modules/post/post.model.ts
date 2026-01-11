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
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		isEdited: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

postSchema.set('toJSON', {
	transform: (_, ret) => {
		const { _id, __v, ...rest } = ret;
		return {
			id: _id,
			...rest,
		};
	},
});

const Post = mongoose.model<PostModel & Document>('Post', postSchema);

export default Post;
