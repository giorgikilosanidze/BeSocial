import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	fetchProfileInfo,
	followOrUnfollow,
	uploadCoverPhoto,
	uploadProfilePicture,
} from './profileThunks';
import type { UserSliceState } from '@/types/profile';
import { createPost, deletePost, editPost } from '../feed/feedThunks';

const initialState: UserSliceState = {
	user: {
		id: '',
		username: '',
		email: '',
		postsCount: 0,
		posts: [],
		profilePictureUrl: '',
		coverPhotoUrl: '',
		followersCount: 0,
		followingCount: 0,
		followers: [],
		following: [],
		isFollowed: false,
	},
	error: '',
	isLoading: false,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		updateFollowsInRealTime: (state, action: PayloadAction<{ isFollowing: boolean }>) => {
			if (action.payload.isFollowing) {
				state.user.followersCount++;
			} else {
				state.user.followersCount--;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchProfileInfo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProfileInfo.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong';
			})
			.addCase(fetchProfileInfo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})

			.addCase(createPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user.posts.unshift(action.payload);
				state.user.postsCount++;
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to create post!';
			})

			.addCase(editPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editPost.fulfilled, (state, action) => {
				state.isLoading = false;

				state.user.posts = state.user.posts.map((post) =>
					post.id === action.payload.id ? action.payload : post,
				);
			})
			.addCase(editPost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to edit post!';
			})

			.addCase(deletePost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user.posts = state.user.posts.filter(
					(post) => post.id !== action.payload.postId,
				);
				state.user.postsCount--;
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to delete post!';
			})

			.addCase(uploadProfilePicture.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(uploadProfilePicture.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user.profilePictureUrl = action.payload.profilePictureUrl;
				state.user.posts.forEach((post) => {
					post.author.profilePictureUrl = action.payload.profilePictureUrl;
				});
			})
			.addCase(uploadProfilePicture.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to -upload profile picture!';
			})

			.addCase(uploadCoverPhoto.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(uploadCoverPhoto.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user.coverPhotoUrl = action.payload.coverPhotoUrl;
			})
			.addCase(uploadCoverPhoto.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to -upload profile picture!';
			})

			.addCase(followOrUnfollow.rejected, (state, action) => {
				state.error = action.error.message || 'Failed to follow/unfollow user!';
			});
	},
});

export const { updateFollowsInRealTime } = profileSlice.actions;

export default profileSlice.reducer;
