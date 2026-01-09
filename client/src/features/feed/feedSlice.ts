import type { FeedSliceState } from '@/types/feed';
import { createSlice } from '@reduxjs/toolkit';
import { createPost } from './feedThunks';

const initialState: FeedSliceState = {
	posts: [],
	isLoading: false,
	error: '',
};

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log(state);
				console.log(action);
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to create post!';
				console.log(state);
				console.log(action);
			});
	},
});

// export const {} = feedSlice.actions;

export default feedSlice.reducer;
