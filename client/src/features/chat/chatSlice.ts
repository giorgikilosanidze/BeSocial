import type { ChatSlice } from '@/types/chat';
import { createSlice } from '@reduxjs/toolkit';
import { getMessages } from './chatThunks';

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
	extraReducers: (builder) => {
		builder
			.addCase(getMessages.pending, (state, action) => {
				console.log(state);
				console.log(action);
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				console.log(state);
				console.log(action);
			})
			.addCase(getMessages.rejected, (state, action) => {
				console.log(state);
				console.log(action);
			});
	},
});

export const { createChat, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
