export interface ChatProps {
	id: string;
	username: string;
	avatarUrl?: string;
	messages: { id: string; sender: 'me' | 'them'; text: string; time: string }[];
}

export interface ChatComponentProps {
	chat: ChatProps | null;
	onClose: () => void;
}

export interface ChatPreviewDropdownProps {
	chats: {
		id: string;
		username: string;
		avatarUrl?: string;
		lastMessage: string;
		lastMessageAt: string;
		unreadCount: number;
	}[];
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
