export interface Chat {
	id: string;
	username: string;
	avatarUrl?: string;
	lastMessage: string;
	lastMessageAt: string;
	unreadCount: number;
}

export interface ChatSlice {
	chats: ChatProps[];
}

export interface ChatProps {
	id: string;
	username: string;
	avatarUrl?: string;
	messages: Message[];
}

export interface ChatComponentProps {
	chat: ChatProps | null;
	onMessage: (message: Message) => void;
	onClose: () => void;
}

export interface Message {
	id: string;
	sender: 'me' | 'them';
	text: string;
	time: string;
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
	}[];
	onClose: () => void;
	onOpenChat: (chatId: string) => void;
}
