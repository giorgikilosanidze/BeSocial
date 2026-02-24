import mongoose, { Schema } from 'mongoose';
import { NotificationModel } from './notification.types.js';

const notificationSchema = new Schema(
	{
		recipient: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		type: {
			type: String,
			enum: ['follow', 'reaction'],
			required: true,
		},
		isRead: {
			type: Boolean,
			required: true,
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: false,
		},
	},
	{ timestamps: true },
);

notificationSchema.set('toJSON', {
	transform: (_, ret) => {
		const { _id, __v, ...rest } = ret;
		return {
			id: _id,
			...rest,
		};
	},
});

const Notification = mongoose.model<NotificationModel & Document>(
	'Notification',
	notificationSchema,
);

export default Notification;
