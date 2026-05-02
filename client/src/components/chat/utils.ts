import type { ChatProps } from '@/types/chat';

export function createChatData(
	receiverId: string,
	username: string,
	avatarUrl: string | undefined,
): ChatProps {
	const chatData: ChatProps = {
		id: receiverId,
		username,
		avatarUrl,
		messages: [],
	};

	return chatData;
}
