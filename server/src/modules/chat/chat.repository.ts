import Chat from './chat.model.js';
import { ChatModel } from './chat.types.js';

export async function storeMessage(
	userId: string,
	receiverId: string,
	text: string,
): Promise<ChatModel> {
	const chat = new Chat({
		senderId: userId,
		receiverId,
		text,
	});

	await chat.save();

	return chat;
}

export async function getChatMessages(userId: string, receiverId: string) {
	const messages = await Chat.find({
		$or: [
			{ senderId: userId, receiverId },
			{ senderId: receiverId, receiverId: userId },
		],
	}).sort({ createdAt: 1 });

	return messages;
}
