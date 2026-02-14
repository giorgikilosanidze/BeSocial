import type { FeedSliceState, SocketReactionData } from '@/types/feed';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createPost, deletePost, editPost, fetchPosts } from './feedThunks';

const initialState: FeedSliceState = {
	posts: [],
	isLoading: false,
	error: '',
	reactions: {
		reactions: [],
		isLoading: false,
		error: '',
	},
};

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		addPostInRealTime: (state, action) => {
			state.posts.unshift(action.payload);
		},
		editPostInRealTime: (state, action) => {
			state.posts = state.posts.map((post) =>
				post.id === action.payload.id ? action.payload : post,
			);
		},
		deletePostInRealTime: (state, action) => {
			state.posts = state.posts.filter((post) => post.id !== action.payload);
		},
		addReactionInRealTime: (state, action: PayloadAction<SocketReactionData>) => {
			for (let i = 0; i < state.posts.length; i++) {
				const post = state.posts[i];

				if (post.id === action.payload.postId) {
					post.userReaction = action.payload.userReaction;
					return;
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state) => {
				state.isLoading = false;
				// state.posts.unshift(action.payload);
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
			.addCase(editPost.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(editPost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to edit post!';
			})

			.addCase(deletePost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deletePost.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to delete post!';
			});
	},
});

export const {
	addPostInRealTime,
	editPostInRealTime,
	deletePostInRealTime,
	addReactionInRealTime,
} = feedSlice.actions;

export default feedSlice.reducer;
