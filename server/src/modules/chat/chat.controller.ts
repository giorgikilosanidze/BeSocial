import { NextFunction, Request, Response } from 'express';
import { GetChatRequest, PostChatRequest } from './chat.types.js';
import { getChatMessages, getChatThreads, storeMessage } from './chat.repository.js';
import { getIO } from '../../socket.js';

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
		const chat = await getChatMessages(userId, receiverId);
		return res.status(200).json({ data: { messages: chat } });
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

	if (!receiverId) {
		return res.status(404).json({ message: 'Failed to identify receiver!' });
	}

	if (!text?.trim()) {
		return res.status(400).json({ message: 'Message text is required!' });
	}

	try {
		const message = await storeMessage(userId, receiverId, text.trim());

		// Send only to the two participants (both can have multiple connected sockets).
		getIO().to(userId).to(receiverId).emit('newMessage', message);

		return res.status(201).json({ data: { message } });
	} catch (error: any) {
		return next(error);
	}
}
