import { NextFunction, Response } from 'express';
import { PostChatRequest } from './chat.types.js';
import { storeMessage } from './chat.repository.js';
import { getIO } from '../../socket.js';

export async function getChat() {
	console.log(1);
}

export async function postChat(req: PostChatRequest, res: Response, next: NextFunction) {
	const { recieverId, text } = req.body;
	const userId = req.userId;

	if (!userId) {
		return res.status(404).json({ message: 'Failed to identify user!' });
	}

	const message = await storeMessage(userId, recieverId, text);

	getIO().emit('newMessage', message);
}
