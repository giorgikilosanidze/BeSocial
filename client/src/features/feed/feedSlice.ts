import type { FeedSliceState } from '@/types/feed';
import { createSlice } from '@reduxjs/toolkit';
import { createPost, editPost, fetchPosts } from './feedThunks';

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
				state.posts.unshift(action.payload);
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
			})

			.addCase(editPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editPost.fulfilled, (state, action) => {
				state.isLoading = false;

				state.posts = state.posts.map((post) =>
					post.id === action.payload.id ? action.payload : post
				);
			})
			.addCase(editPost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to edit post!';
			});
	},
});

// export const {} = feedSlice.actions;

export default feedSlice.reducer;
