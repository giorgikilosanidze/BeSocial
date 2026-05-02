import type { ChatProps } from '@/types/chat';

export function createChatData(
	recieverId: string,
	username: string,
	avatarUrl: string | undefined,
): ChatProps | null {
	const chatData: ChatProps = {
		id: recieverId,
		username,
		avatarUrl,
		messages: [],
	};

	return chatData;
}
