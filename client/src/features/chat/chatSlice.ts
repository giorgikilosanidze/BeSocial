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
			selectedChat?.messages.push(message);
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

export const { createChat, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
