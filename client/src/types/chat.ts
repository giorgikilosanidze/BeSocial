export interface Chat {
	id: string;
	username: string;
	avatarUrl?: string;
	lastMessage: string;
	lastMessageAt: string;
	unreadCount: number;
	isOnline: boolean;
	lastSeenAt: string | null;
}

export interface ChatSlice {
	chats: ChatProps[];
	isLoading: boolean;
	error: string;
}

export interface ChatProps {
	id: string;
	username: string;
	avatarUrl?: string;
	messages: Message[];
}

export interface ChatComponentProps {
	chat: (Omit<ChatProps, 'messages'> & { isOnline?: boolean; lastSeenAt?: string | null }) | null;
	onClose: () => void;
}

export interface Message {
	id: string;
	sender: 'me' | 'them';
	text: string;
	time: string;
	seenAt?: string | null;
}

export interface ChatMessageDto {
	id: string;
	senderId: string;
	receiverId: string;
	text: string;
	seenAt: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface GetMessagesResponse {
	data: {
		messages: ChatMessageDto[];
	};
}

export interface SendMessageResponse {
	data: {
		message: ChatMessageDto;
	};
}

export interface GetChatsResponse {
	data: {
		chats: Array<{
			id: string;
			username: string;
			avatarUrl?: string;
			lastMessage: string;
			lastMessageAt: string;
			unreadCount: number;
			isOnline: boolean;
			lastSeenAt: string | null;
		}>;
	};
}

export interface ChatPreviewDropdownProps {
	chats: Chat[];
	onOpenChat: (chatId: string) => void;
	onSeeAll: () => void;
}

export interface AllChatsModalProps {
	isOpen: boolean;
	chats: {
		id: string;
		username: string;
		avatarUrl?: string;
		lastMessage: string;
		lastMessageAt: string;
		unreadCount: number;
		isOnline: boolean;
		lastSeenAt: string | null;
	}[];
	onClose: () => void;
	onOpenChat: (chatId: string) => void;
}
