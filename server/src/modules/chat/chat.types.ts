export interface ChatModel {
	senderId: string;
	receiverId: string;
	text: string;
	seenAt: Date | null;
}

export interface PostChatRequest {
	userId?: string;
	body: {
		receiverId: string;
		text: string;
		clientMessageId?: string;
	};
}

export interface GetChatRequest {
	userId?: string;
	params: {
		receiverId?: string;
	};
}

export interface ChatThread {
	id: string;
	username: string;
	avatarUrl?: string;
	lastMessage: string;
	lastMessageAt: string;
	unreadCount: number;
	isOnline: boolean;
	lastSeenAt: string | null;
}
