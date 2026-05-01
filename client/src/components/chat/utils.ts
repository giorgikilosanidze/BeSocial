import type { ChatProps } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';

export function createChatData(username: string, avatarUrl: string | undefined): ChatProps | null {
	const chatData: ChatProps = {
		id: uuidv4(),
		username,
		avatarUrl,
		messages: [],
	};

	return chatData;
}
