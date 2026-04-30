export interface ChatPreviewItem {
	id: string;
	username: string;
	avatarUrl?: string;
	lastMessage: string;
	lastMessageAt: string;
	unreadCount: number;
}

export interface ChatMessageItem {
	id: string;
	sender: 'me' | 'them';
	text: string;
	time: string;
}

export interface ChatThreadItem extends ChatPreviewItem {
	messages: ChatMessageItem[];
}
