import { createContext } from 'react';
import type { ChatThreadItem } from './chatUiMock';

export interface OpenChatUserPayload {
	userId: string;
	username: string;
	avatarUrl?: string;
}

export interface ChatUiContextType {
	chatThreads: ChatThreadItem[];
	hasUnreadChats: boolean;
	openAllChats: () => void;
	closeAllChats: () => void;
	openChatById: (chatId: string) => void;
	openChatWithUser: (payload: OpenChatUserPayload) => void;
	closeChatWidget: () => void;
}

export const ChatUiContext = createContext<ChatUiContextType | null>(null);

export const createNewThread = ({
	userId,
	username,
	avatarUrl,
}: OpenChatUserPayload): ChatThreadItem => ({
	id: userId,
	username,
	avatarUrl,
	lastMessage: '',
	lastMessageAt: '',
	unreadCount: 0,
	messages: [],
});
