import { Schema } from 'mongoose';

const commentSchema = new Schema(
	{
		userId: {
			required: true,
			type: Schema.Types.ObjectId,
		},
		username: {
			required: true,
			type: String,
		},
		profilePictureUrl: {
			type: String,
			default: '',
		},
		text: {
			required: true,
			type: String,
		},
	},
	{ timestamps: true },
);

commentSchema.set('toJSON', {
	transform: (_, ret) => {
		const { _id, __v, ...rest } = ret;
		return {
			id: _id,
			...rest,
		};
	},
});

export default commentSchema;
