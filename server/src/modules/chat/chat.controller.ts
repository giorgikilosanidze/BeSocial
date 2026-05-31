import { NextFunction, Request, Response } from 'express';
import { GetChatRequest, PostChatRequest } from './chat.types.js';
import {
	getChatMessages,
	getChatThreads,
	markMessagesAsSeen,
	storeMessage,
} from './chat.repository.js';
import { getIO } from '../../socket.js';
import { isUserOnline } from '../../socket.js';
import User from '../user/user.model.js';

export async function getChats(req: Request, res: Response, next: NextFunction) {
	const userId = (req as GetChatRequest).userId;

	if (!userId) {
		return res.status(404).json({ message: 'Failed to identify user!' });
	}

	try {
		const chats = await getChatThreads(userId);
		return res.status(200).json({ data: { chats } });
	} catch (error: any) {
		return next(error);
	}
}

export async function getChat(req: GetChatRequest, res: Response, next: NextFunction) {
	const userId = req.userId;
	const receiverId = req.params.receiverId;

	if (!userId) {
		return res.status(404).json({ message: 'Failed to identify user!' });
	}

	if (!receiverId) {
		return res.status(404).json({ message: 'Failed to identify receiver!' });
	}

	try {
		const { seenMessageIds, seenAt } = await markMessagesAsSeen(userId, receiverId);
		if (seenMessageIds.length > 0 && seenAt) {
			getIO().to(receiverId).emit('messageSeen', {
				chatId: userId,
				seenMessageIds,
				seenAt,
			});
		}

		const chat = await getChatMessages(userId, receiverId);
		return res.status(200).json({ data: { messages: chat } });
	} catch (error: any) {
		return next(error);
	}
}

export async function postChat(req: PostChatRequest, res: Response, next: NextFunction) {
	const { receiverId, text, clientMessageId } = req.body;
	const userId = req.userId;
	const emitSendError = (message: string) => {
		if (!userId) return;

		getIO().to(userId).emit('newMessage', {
			status: 'error',
			error: message,
			clientMessageId,
			receiverId,
		});
	};

	if (!userId) {
		return res.status(404).json({ message: 'Failed to identify user!' });
	}

	if (!receiverId) {
		emitSendError('Failed to identify receiver!');
		return res.status(404).json({ message: 'Failed to identify receiver!' });
	}

	if (!text?.trim()) {
		emitSendError('Message text is required!');
		return res.status(400).json({ message: 'Message text is required!' });
	}

	try {
		const message = await storeMessage(userId, receiverId, text.trim());

		// Attach the sender's identity so the recipient can label a brand-new
		// chat thread / toast without a separate lookup (the stored message only
		// holds ids).
		const sender = await User.findById(userId).select('username profilePictureUrl').lean();
		const payload = {
			...(message as any).toJSON(),
			senderUsername: sender?.username || '',
			senderProfilePictureUrl: sender?.profilePictureUrl || '',
		};

		// Send only to the two participants (both can have multiple connected sockets).
		getIO().to(userId).to(receiverId).emit('newMessage', payload);

		return res.status(201).json({ data: { message } });
	} catch (error: any) {
		emitSendError(error?.message || 'Failed to send message.');
		return next(error);
	}
}

export async function getChatPresence(req: GetChatRequest, res: Response, next: NextFunction) {
	const receiverId = req.params.receiverId;

	if (!receiverId) {
		return res.status(404).json({ message: 'Failed to identify receiver!' });
	}

	try {
		const user = await User.findById(receiverId).select('lastSeenAt').lean();
		return res.status(200).json({
			data: {
				isOnline: isUserOnline(receiverId),
				lastSeenAt: user?.lastSeenAt ? new Date(user.lastSeenAt).toISOString() : null,
			},
		});
	} catch (error: any) {
		return next(error);
	}
}
