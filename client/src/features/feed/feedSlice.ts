import type { FeedSliceState } from '@/types/feed';
import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchPosts } from './feedThunks';

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
				state.posts.push(action.payload);
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to create post!';
			})

			.addCase(fetchPosts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to fetch posts!';
			});
	},
});

// export const {} = feedSlice.actions;

export default feedSlice.reducer;
