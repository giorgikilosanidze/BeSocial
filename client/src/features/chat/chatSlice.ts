import type { ChatSlice } from '@/types/chat';
import { createSlice } from '@reduxjs/toolkit';
import { getMessages } from './chatThunks';

const initialState: ChatSlice = {
	chats: [],
	isLoading: false,
	error: '',
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		createChat: (state, action) => {
			const existingChat = state.chats.find((chat) => chat.id === action.payload.id);
			if (existingChat) {
				existingChat.username = action.payload.username || existingChat.username;
				existingChat.avatarUrl = action.payload.avatarUrl || existingChat.avatarUrl;
				return;
			}
			state.chats.push(action.payload);
		},
		addMessage: (state, action) => {
			const { id, message } = action.payload;
			const selectedChat = state.chats.find((chat) => chat.id === id);
			if (!selectedChat) return;

			const alreadyExists = selectedChat.messages.some(
				(existingMessage) => existingMessage.id === message.id,
			);

			if (alreadyExists) return;

			selectedChat.messages.push(message);
		},
		reconcileOutgoingMessage: (state, action) => {
			const { chatId, tempId, serverId, seenAt } = action.payload as {
				chatId: string;
				tempId: string;
				serverId: string;
				seenAt?: string | null;
			};
			const selectedChat = state.chats.find((chat) => chat.id === chatId);
			if (!selectedChat) return;

			const message = selectedChat.messages.find((item) => item.id === tempId);
			if (!message) return;

			message.id = serverId;
			if (typeof seenAt !== 'undefined') {
				message.seenAt = seenAt;
			}
		},
		markMessagesSeen: (state, action) => {
			const { chatId, seenMessageIds, seenAt } = action.payload as {
				chatId: string;
				seenMessageIds: string[];
				seenAt: string;
			};
			const selectedChat = state.chats.find((chat) => chat.id === chatId);
			if (!selectedChat) return;

			const seenIds = new Set(seenMessageIds);
			selectedChat.messages = selectedChat.messages.map((message) =>
				seenIds.has(message.id) ? { ...message, seenAt } : message,
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				state.isLoading = false;

				const selectedChat = state.chats.find((chat) => chat.id === action.payload.receiverId);

				if (selectedChat) {
					selectedChat.messages = action.payload.messages;
					return;
				}

				state.chats.push({
					id: action.payload.receiverId,
					username: '',
					avatarUrl: '',
					messages: action.payload.messages,
				});
			})
			.addCase(getMessages.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || action.error.message || 'Something went wrong!';
			});
	},
});

export const { createChat, addMessage, reconcileOutgoingMessage, markMessagesSeen } =
	chatSlice.actions;

export default chatSlice.reducer;
