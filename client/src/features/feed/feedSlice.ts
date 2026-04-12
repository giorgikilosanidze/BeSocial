import type {
	Comments,
	DeleteCommentPayload,
	FeedSliceState,
	SocketReactionData,
} from '@/types/feed';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	addComment,
	createPost,
	deleteComment,
	deletePost,
	editPost,
	fetchPosts,
	getSuggestions,
} from './feedThunks';

const initialState: FeedSliceState = {
	posts: [],
	isLoading: false,
	isSuggestionsLoading: false,
	error: '',
	followersCount: 0,
	followingsCount: 0,
	suggestions: [],
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
					const { reactions } = action.payload;
					post.userReaction = action.payload.userReaction;
					post.likes = reactions.likes ?? reactions.like ?? 0;
					post.loves = reactions.loves ?? reactions.love ?? 0;
					post.angry = reactions.angry ?? 0;
					return;
				}
			}
		},
		addCommentInRealTime: (state, action: PayloadAction<Comments>) => {
			for (let i = 0; i < state.posts.length; i++) {
				const post = state.posts[i];

				if (post.id === action.payload.postId) {
					if (!post.comments) {
						post.comments = [];
					}
					const hasComment = post.comments.some(
						(comment) => comment._id === action.payload._id,
					);

					if (!hasComment) {
						post.comments.unshift(action.payload);
					}
					return;
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createPost.pending, (state) => {
				state.error = '';
			})
			.addCase(createPost.fulfilled, () => {
				// state.posts.unshift(action.payload);
			})
			.addCase(createPost.rejected, (state, action) => {
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
				state.error = '';
			})
			.addCase(editPost.fulfilled, (state) => {
				state.error = '';
			})
			.addCase(editPost.rejected, (state, action) => {
				state.error = action.error.message || 'Failed to edit post!';
			})

			.addCase(deletePost.pending, (state) => {
				state.error = '';
			})
			.addCase(deletePost.fulfilled, (state) => {
				state.error = '';
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.error = action.error.message || 'Failed to delete post!';
			})

			.addCase(addComment.pending, (state) => {
				state.error = '';
			})
			.addCase(addComment.fulfilled, (state, action) => {
				const post = state.posts.find((post) => post.id === action.payload.postId);

				if (post) {
					if (!post.comments) {
						post.comments = [];
					}

					const hasComment = post.comments.some(
						(comment) => comment._id === action.payload._id,
					);

					if (!hasComment) {
						post.comments.unshift(action.payload);
					}
				}
			})
			.addCase(addComment.rejected, (state, action) => {
				state.error = action.error.message || 'Failed to delete post!';
			})

			.addCase(deleteComment.pending, (state) => {
				state.error = '';
			})
			.addCase(
				deleteComment.fulfilled,
				(state, action: PayloadAction<DeleteCommentPayload>) => {
					const post = state.posts.find((post) => post.id === action.payload.postId);

					if (post?.comments) {
						post.comments = post.comments.filter(
							(comment) => comment._id !== action.payload.commentId,
						);
					}
				},
			)
			.addCase(deleteComment.rejected, (state, action) => {
				state.error = action.error.message || 'Failed to delete post!';
			})

			.addCase(getSuggestions.pending, (state) => {
				state.isSuggestionsLoading = true;
			})
			.addCase(getSuggestions.fulfilled, (state, action) => {
				state.isSuggestionsLoading = false;
				state.suggestions = action.payload;
			})
			.addCase(getSuggestions.rejected, (state, action) => {
				state.isSuggestionsLoading = false;
				state.error = action.error.message || 'Failed to get suggestions!';
			});
	},
});

export const {
	addPostInRealTime,
	editPostInRealTime,
	deletePostInRealTime,
	addReactionInRealTime,
	addCommentInRealTime,
} = feedSlice.actions;

export default feedSlice.reducer;
