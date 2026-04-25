import Chat from './chat.model.js';
import { ChatModel } from './chat.types.js';

export async function storeMessage(
	userId: string,
	recieverId: string,
	text: string,
): Promise<ChatModel> {
	const chat = new Chat({
		senderId: userId,
		recieverId,
		text,
	});

	await chat.save();

	return chat;
}
