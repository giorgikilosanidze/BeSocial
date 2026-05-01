import type { ChatSlice } from '@/types/chat';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ChatSlice = {
	chats: [],
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		createChat: (state, action) => {
			state.chats.push(action.payload);
		},
		addMessage: (state, action) => {
			const { id, message } = action.payload;
			const selectedChat = state.chats.find((chat) => chat.id === id);
			selectedChat?.messages.push(message);
		},
	},
	// extraReducers: (builder) => {},
});

export const { createChat, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
