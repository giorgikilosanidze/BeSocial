import { useCallback, useMemo, useState, type ReactNode } from 'react';
import AllChatsModal from './AllChatsModal';
import ChatWidget from './ChatWidget';
import { type ChatThreadItem } from './chatUiMock';
import { ChatUiContext, createNewThread, type ChatUiContextType, type OpenChatUserPayload } from './chatUiStore';

export const ChatUiProvider = ({ children }: { children: ReactNode }) => {
	const [chatThreads, setChatThreads] = useState<ChatThreadItem[]>([]);
	const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
	const [isAllChatsModalOpen, setIsAllChatsModalOpen] = useState(false);

	const selectedChat = chatThreads.find((chat) => chat.id === selectedChatId) || null;
	const hasUnreadChats = chatThreads.some((chat) => chat.unreadCount > 0);

	const openAllChats = useCallback(() => {
		setIsAllChatsModalOpen(true);
	}, []);

	const closeAllChats = useCallback(() => {
		setIsAllChatsModalOpen(false);
	}, []);

	const openChatById = useCallback((chatId: string) => {
		setSelectedChatId(chatId);
		setIsAllChatsModalOpen(false);
	}, []);

	const openChatWithUser = useCallback((payload: OpenChatUserPayload) => {
		setIsAllChatsModalOpen(false);
		setChatThreads((prev) => {
			const normalizedUsername = payload.username.trim().toLowerCase();
			const existingChat = prev.find(
				(chat) =>
					chat.id === payload.userId ||
					chat.username.trim().toLowerCase() === normalizedUsername,
			);

			if (existingChat) {
				setSelectedChatId(existingChat.id);
				return prev;
			}

			const newThread = createNewThread(payload);
			setSelectedChatId(newThread.id);
			return [newThread, ...prev];
		});
	}, []);

	const closeChatWidget = useCallback(() => {
		setSelectedChatId(null);
	}, []);

	const value = useMemo<ChatUiContextType>(
		() => ({
			chatThreads,
			hasUnreadChats,
			openAllChats,
			closeAllChats,
			openChatById,
			openChatWithUser,
			closeChatWidget,
		}),
		[
			chatThreads,
			hasUnreadChats,
			openAllChats,
			closeAllChats,
			openChatById,
			openChatWithUser,
			closeChatWidget,
		],
	);

	return (
		<ChatUiContext.Provider value={value}>
			{children}
			<AllChatsModal
				isOpen={isAllChatsModalOpen}
				chats={chatThreads}
				onClose={closeAllChats}
				onOpenChat={openChatById}
			/>
			<ChatWidget
				key={selectedChat?.id || 'no-chat'}
				chat={selectedChat}
				onClose={closeChatWidget}
			/>
		</ChatUiContext.Provider>
	);
};
