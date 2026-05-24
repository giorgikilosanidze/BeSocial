import dummyProfilePicture from '@/assets/user.jpg';
import SERVER_URL from '@/constants/serverUrl';
import { resolveImageSrc } from '@/utils/resolveImageSrc';
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import { FiSmile } from 'react-icons/fi';
import { addMessage, markMessagesSeen, reconcileOutgoingMessage } from '@/features/chat/chatSlice';
import { getMessages, sendMessage } from '@/features/chat/chatThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { socket } from '@/socket';
import type { ChatComponentProps, Message } from '@/types/chat';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface NewMessageSocketPayload {
	status?: string;
	error?: string;
	message?: string;
	messageId?: string;
	clientMessageId?: string;
	id?: string;
	senderId?: string;
	receiverId?: string;
	text?: string;
	createdAt?: string;
	seenAt?: string | null;
}

interface MessageSeenSocketPayload {
	chatId?: string;
	seenMessageIds?: string[];
	seenAt?: string;
}

interface PresenceResponse {
	data: {
		isOnline: boolean;
		lastSeenAt: string | null;
	};
}

const EMOTICON_TO_EMOJI: Record<string, string> = {
	'<3': '\u2764\uFE0F',
	':)': '\u{1F642}',
	':(': '\u{1F641}',
	':D': '\u{1F604}',
	';)': '\u{1F609}',
};

const convertEmoticonsToEmoji = (input: string) =>
	input.replace(/(^|\s)(<3|:\)|:\(|:D|;\))(?=\s|$)/g, (fullMatch, prefix, token) => {
		const emoji = EMOTICON_TO_EMOJI[token as keyof typeof EMOTICON_TO_EMOJI];
		return emoji ? `${prefix}${emoji}` : fullMatch;
	});

const resolveChatAvatarSrc = (avatarUrl?: string) =>
	resolveImageSrc(avatarUrl, dummyProfilePicture);

const EMPTY_MESSAGES: Message[] = [];

const ChatWidget = ({
	chat,
	onMinimize,
	onClose,
	widgetIndex = 0,
	rightOffsetPx,
}: ChatComponentProps) => {
	const [message, setMessage] = useState('');
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [failedMessages, setFailedMessages] = useState<Record<string, string>>({});
	const [now, setNow] = useState(() => Date.now());
	const [presence, setPresence] = useState<{ isOnline: boolean; lastSeenAt: string | null }>({
		isOnline: false,
		lastSeenAt: null,
	});
	const pendingMessagesRef = useRef<{ id: string; text: string }[]>([]);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const messageInputRef = useRef<HTMLInputElement>(null);
	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const emojiToggleButtonRef = useRef<HTMLButtonElement>(null);
	const dispatch = useAppDispatch();
	const currentUserId = useAppSelector((state) => state.auth.user.id);
	const chatMessages = useAppSelector((state) => {
		if (!chat) return EMPTY_MESSAGES;
		return (
			state.chat.chats.find((currentChat) => currentChat.id === chat.id)?.messages ||
			EMPTY_MESSAGES
		);
	});
	const isCurrentChatLoading = useAppSelector(
		(state) => state.chat.isLoading && state.chat.loadingChatId === chat?.id,
	);
	const showHistorySkeleton = Boolean(chat?.id && isCurrentChatLoading && chatMessages.length === 0);
	const lastMessage = chatMessages[chatMessages.length - 1];
	const lastMessageSeenAt = lastMessage?.seenAt || null;
	const effectiveIsOnline = chat?.isOnline ?? presence.isOnline;
	const effectiveLastSeenAt = chat?.lastSeenAt ?? presence.lastSeenAt;

	const formatTimeAgo = (dateString: string) => {
		const timestamp = new Date(dateString).getTime();
		const diffMs = Math.max(0, now - timestamp);
		const minuteMs = 60 * 1000;
		const hourMs = 60 * minuteMs;
		const dayMs = 24 * hourMs;

		if (diffMs < hourMs) {
			const minutes = Math.max(1, Math.floor(diffMs / minuteMs));
			return `${minutes}m ago`;
		}

		if (diffMs < dayMs) {
			const hours = Math.floor(diffMs / hourMs);
			return `${hours}h ago`;
		}

		const days = Math.floor(diffMs / dayMs);
		return `${days} day${days === 1 ? '' : 's'} ago`;
	};

	let activityLabel = 'Offline';
	if (effectiveIsOnline) {
		activityLabel = 'Active now';
	} else if (effectiveLastSeenAt) {
		activityLabel = `Last seen ${formatTimeAgo(effectiveLastSeenAt)}`;
	}

	useEffect(() => {
		const loadPresence = async () => {
			if (!chat?.id) return;

			try {
				const response = await fetch(`${SERVER_URL}/api/chat/presence/${chat.id}`, {
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (!response.ok) return;
				const data = (await response.json()) as PresenceResponse;
				setPresence({
					isOnline: data.data.isOnline,
					lastSeenAt: data.data.lastSeenAt,
				});
			} catch (error) {
				console.error(error);
			}
		};

		loadPresence();
	}, [chat?.id]);

	useEffect(() => {
		const resolvePendingMessageId = (payload: NewMessageSocketPayload) => {
			const directId = payload.clientMessageId || payload.messageId || payload.id;

			if (directId && pendingMessagesRef.current.some((item) => item.id === directId)) {
				return directId;
			}

			if (payload.text) {
				const matchedByText = [...pendingMessagesRef.current]
					.reverse()
					.find((item) => item.text === payload.text);

				if (matchedByText) return matchedByText.id;
			}

			return undefined;
		};

		const handleNewMessage = (payload: NewMessageSocketPayload) => {
			if (!chat || !currentUserId) return;
			const pendingMessageId = resolvePendingMessageId(payload);
			const isPendingMessageForThisWidget = Boolean(
				pendingMessageId &&
				pendingMessagesRef.current.some((item) => item.id === pendingMessageId),
			);

			const isRelatedToCurrentChat =
				(payload.senderId === chat.id && payload.receiverId === currentUserId) ||
				(payload.senderId === currentUserId && payload.receiverId === chat.id);

			if (!isRelatedToCurrentChat && !isPendingMessageForThisWidget) return;

			const errorMessage =
				payload.error ||
				(payload.status === 'error' ? payload.message || 'Failed to send message.' : '');
			const isMessageFromCurrentUser = payload.senderId === currentUserId;
			const messageId = pendingMessageId;

			if (isMessageFromCurrentUser && payload.id && messageId && chat) {
				dispatch(
					reconcileOutgoingMessage({
						chatId: chat.id,
						tempId: messageId,
						serverId: payload.id,
						seenAt: payload.seenAt || null,
					}),
				);
			}

			if (!isMessageFromCurrentUser && payload.id && payload.text) {
				dispatch(
					addMessage({
						id: chat.id,
						message: {
							id: payload.id,
							sender: isMessageFromCurrentUser ? 'me' : 'them',
							text: payload.text,
							time: new Date(payload.createdAt || Date.now()).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
							}),
							seenAt: payload.seenAt || null,
						},
					}),
				);
				dispatch(getMessages(chat.id));
			}

			if (!messageId) return;

			pendingMessagesRef.current = pendingMessagesRef.current.filter(
				(item) => item.id !== messageId,
			);

			if (!errorMessage) return;

			setFailedMessages((prev) => ({
				...prev,
				[messageId]: errorMessage,
			}));
		};

		socket.on('newMessage', handleNewMessage);

		const handleMessageSeen = (payload: MessageSeenSocketPayload) => {
			if (!chat || !payload.chatId || payload.chatId !== chat.id) return;
			if (!payload.seenAt || !payload.seenMessageIds?.length) return;

			dispatch(
				markMessagesSeen({
					chatId: payload.chatId,
					seenMessageIds: payload.seenMessageIds,
					seenAt: payload.seenAt,
				}),
			);
		};

		socket.on('messageSeen', handleMessageSeen);

		const handleUserPresenceChanged = (payload: {
			userId?: string;
			isOnline?: boolean;
			lastSeenAt?: string | null;
		}) => {
			if (!chat || payload.userId !== chat.id || typeof payload.isOnline !== 'boolean')
				return;
			setPresence({
				isOnline: payload.isOnline,
				lastSeenAt: payload.lastSeenAt ?? null,
			});
		};

		socket.on('userPresenceChanged', handleUserPresenceChanged);

		return () => {
			socket.off('newMessage', handleNewMessage);
			socket.off('messageSeen', handleMessageSeen);
			socket.off('userPresenceChanged', handleUserPresenceChanged);
		};
	}, [chat, currentUserId, dispatch]);

	useLayoutEffect(() => {
		const container = messagesContainerRef.current;
		if (!container) return;

		container.scrollTop = container.scrollHeight;
	}, [chat?.id, chatMessages.length, lastMessageSeenAt]);

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setNow(Date.now());
		}, 60 * 1000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!isEmojiPickerOpen) return;
			const target = event.target as Node;
			if (
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(target) &&
				emojiToggleButtonRef.current &&
				!emojiToggleButtonRef.current.contains(target) &&
				messageInputRef.current &&
				!messageInputRef.current.contains(target)
			) {
				setIsEmojiPickerOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isEmojiPickerOpen]);

	const handleSend = () => {
		if (!chat || !message.trim()) return;

		const normalizedMessage = convertEmoticonsToEmoji(message.trim());

		const messageId = uuidv4();
		const nextMessage: Message = {
			sender: 'me',
			text: normalizedMessage,
			id: messageId,
			time: new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			}),
			seenAt: null,
		};

		dispatch(addMessage({ id: chat.id, message: nextMessage }));

		pendingMessagesRef.current = [
			...pendingMessagesRef.current,
			{ id: messageId, text: normalizedMessage },
		];

		dispatch(
			sendMessage({
				receiverId: chat.id,
				text: normalizedMessage,
				clientMessageId: messageId,
			}),
		)
			.unwrap()
			.catch((error) => {
				const errorMessage =
					typeof error === 'string' ? error : 'Failed to send message. Please try again.';
				setFailedMessages((prev) => ({
					...prev,
					[messageId]: errorMessage,
				}));
			});

		setMessage('');
		setIsEmojiPickerOpen(false);
	};

	const handleMessageTyping = (value: string) => {
		setMessage(value);
	};

	const handleEmojiPick = (emojiData: EmojiClickData) => {
		const input = messageInputRef.current;
		if (!input) {
			setMessage((prev) => prev + emojiData.emoji);
			return;
		}

		const selectionStart = input.selectionStart ?? message.length;
		const selectionEnd = input.selectionEnd ?? message.length;
		const nextMessage =
			message.slice(0, selectionStart) + emojiData.emoji + message.slice(selectionEnd);

		setMessage(nextMessage);

		window.requestAnimationFrame(() => {
			const nextCursorPosition = selectionStart + emojiData.emoji.length;
			input.focus();
			input.setSelectionRange(nextCursorPosition, nextCursorPosition);
		});
	};

	if (!chat) return null;

	const desktopRightOffset = `${rightOffsetPx ?? 24 + widgetIndex * 376}px`;

	return (
		<div
			className="fixed z-[120] inset-0 w-screen h-[100dvh] bg-white overflow-visible flex flex-col md:inset-auto md:[right:var(--chat-right)] md:[bottom:var(--chat-bottom)] md:w-[360px] md:h-auto md:rounded-2xl md:border md:border-gray-200 md:shadow-2xl"
			style={
				{
					'--chat-right': desktopRightOffset,
					'--chat-bottom': '16px',
				} as CSSProperties
			}
		>
			<div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-2xl">
				<div className="flex items-center gap-3 min-w-0">
					<img
						src={resolveChatAvatarSrc(chat.avatarUrl)}
						alt={chat.username}
						className="w-9 h-9 rounded-full object-cover"
					/>
					<div className="min-w-0">
						<p className="text-sm font-semibold text-gray-900 truncate">
							{chat.username}
						</p>
						<p
							className={`text-[11px] ${effectiveIsOnline ? 'text-green-600' : 'text-gray-500'}`}
						>
							{activityLabel}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-1 shrink-0">
					<button
						onClick={onMinimize}
						className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
						aria-label="Minimize chat"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 12h14"
							/>
						</svg>
					</button>
					<button
						onClick={onClose}
						className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
						aria-label="Close chat"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div
				ref={messagesContainerRef}
				className="flex-1 overflow-y-auto px-3 py-3 bg-gradient-to-b from-gray-50 to-white md:h-[300px] md:flex-none"
			>
				{showHistorySkeleton ? (
					<div className="space-y-2 animate-pulse">
						<div className="flex justify-start">
							<div className="w-[68%] h-12 bg-gray-200 rounded-2xl rounded-bl-md" />
						</div>
						<div className="flex justify-end">
							<div className="w-[56%] h-12 bg-gray-200 rounded-2xl rounded-br-md" />
						</div>
						<div className="flex justify-start">
							<div className="w-[74%] h-12 bg-gray-200 rounded-2xl rounded-bl-md" />
						</div>
						<div className="flex justify-end">
							<div className="w-[48%] h-12 bg-gray-200 rounded-2xl rounded-br-md" />
						</div>
					</div>
				) : (
					<div className="space-y-2">
						{chatMessages.map((chatMessage) => {
							const failedMessageError = failedMessages[chatMessage.id];

							return (
								<div
									key={chatMessage.id}
									className={`flex ${chatMessage.sender === 'me' ? 'justify-end' : 'justify-start'}`}
								>
									<div
										className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm transition-colors duration-300 ${
											chatMessage.sender === 'me'
												? 'bg-blue-600 text-white hover:bg-blue-700 rounded-br-md'
												: 'bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-bl-md'
										} ${failedMessageError ? 'opacity-60' : ''}`}
									>
										<p>{chatMessage.text}</p>
										<p
											className={`text-[10px] mt-1 ${chatMessage.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}
										>
											{chatMessage.time}
										</p>
										{failedMessageError && (
											<p className="text-[11px] mt-1 text-red-400">
												{failedMessageError}
											</p>
										)}
									</div>
								</div>
							);
						})}
					</div>
				)}
				{lastMessage?.sender === 'me' && lastMessage.seenAt && (
					<p className="mt-2 px-1 text-[11px] text-gray-500 text-right">
						Seen: {formatTimeAgo(lastMessage.seenAt)}
					</p>
				)}
			</div>

			<div
				className="p-3 border-t border-gray-100 bg-white sticky bottom-0"
				style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
			>
				<div className="relative">
					{isEmojiPickerOpen && (
						<div
							ref={emojiPickerRef}
							className="absolute bottom-12 left-0 z-[130] rounded-xl overflow-hidden shadow-xl bg-white"
						>
							<EmojiPicker
								onEmojiClick={handleEmojiPick}
								autoFocusSearch={false}
								searchDisabled={false}
								searchPlaceholder="Search emoji..."
								previewConfig={{ showPreview: false }}
								height={320}
								width={320}
								style={{ borderRadius: 12 }}
							/>
						</div>
					)}
				</div>
				<div className="flex items-center gap-2">
					<button
						ref={emojiToggleButtonRef}
						onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
						className="h-9 w-9 shrink-0 rounded-full bg-gray-100 hover:bg-gray-200 text-lg leading-none flex items-center justify-center transition-colors"
						type="button"
						aria-label="Open emoji picker"
					>
						<FiSmile className="w-5 h-5 text-gray-600" />
					</button>
					<input
						ref={messageInputRef}
						value={message}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && message) {
								handleSend();
							}
						}}
						onChange={(e) => handleMessageTyping(e.target.value)}
						type="text"
						placeholder="Write a message..."
						className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
					/>
					<button
						onClick={handleSend}
						className={`h-9 px-4 rounded-full bg-blue-600 text-white text-sm font-medium ${message ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
						disabled={message ? false : true}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatWidget;
