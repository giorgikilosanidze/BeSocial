import { NextFunction, Request, Response } from 'express';
import { GetChatRequest, PostChatRequest } from './chat.types.js';
import { getChatMessages, storeMessage } from './chat.repository.js';
import { getIO } from '../../socket.js';

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
		const chat = await getChatMessages(userId, receiverId);
		return res.status(200).json({ messages: chat });
	} catch (error: any) {
		return next(error);
	}
}

export async function postChat(req: PostChatRequest, res: Response, next: NextFunction) {
	const { receiverId, text } = req.body;
	const userId = req.userId;

	if (!userId) {
		return res.status(404).json({ message: 'Failed to identify user!' });
	}

	const message = await storeMessage(userId, receiverId, text);

	getIO().emit('newMessage', message);
}
