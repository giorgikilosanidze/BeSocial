import mongoose, { Document, Schema } from 'mongoose';
import { ChatModel } from './chat.types.js';

const chatSchema = new Schema(
	{
		senderId: {
			type: String,
			required: true,
		},
		recieverId: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		seenAt: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true },
);

chatSchema.set('toJSON', {
	transform: (_, ret) => {
		const { _id, __v, ...rest } = ret;
		return {
			id: _id,
			...rest,
		};
	},
});

const Chat = mongoose.model<ChatModel & Document>('Chat', chatSchema);

export default Chat;
