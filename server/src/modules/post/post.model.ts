import mongoose, { Document } from 'mongoose';
import { PostModel } from './post.types.js';

const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		text: {
			type: String,
			required: false,
		},
		imageUrls: {
			type: Array,
			required: false,
		},
		isEdited: {
			type: Boolean,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
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
