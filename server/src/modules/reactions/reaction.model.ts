import mongoose from 'mongoose';
import { ReactionModel } from './reaction.types.js';

const Schema = mongoose.Schema;

const reactionSchema = new Schema(
	{
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		type: {
			type: String,
			enum: ['like', 'love', 'angry'],
			required: true,
		},
	},
	{ timestamps: true },
);

reactionSchema.index({ postId: 1, userId: 1 }, { unique: true });

reactionSchema.set('toJSON', {
	transform: (_, ret) => {
		const { _id, __v, ...rest } = ret;
		return {
			id: _id,
			...rest,
		};
	},
});

const Reaction = mongoose.model<ReactionModel & Document>('reaction', reactionSchema);

export default Reaction;
