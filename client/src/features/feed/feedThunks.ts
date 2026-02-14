import SERVER_URL from '@/constants/serverUrl';
import type {
	CreatePostResponse,
	DeletePostResponse,
	EditPostData,
	FetchPostsResponse,
	ReactionData,
} from '@/types/feed';
import { refreshTokenRequest } from '@/utils/refreshTokenRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createPost = createAsyncThunk<CreatePostResponse, FormData>(
	'feed/createPost',
	async (postData, { rejectWithValue }) => {
		try {
			const response = await fetch(`${SERVER_URL}/api/feed/posts`, {
				method: 'POST',
				body: postData,
				credentials: 'include',
			});

			if (!response.ok) {
				const error = await response.json();

				if (
					error.message === 'ACCESS_TOKEN_EXPIRED' ||
					error.message === 'NO_ACCESS_TOKEN'
				) {
					try {
						await refreshTokenRequest();

						const retry = await fetch(`${SERVER_URL}/api/feed/posts`, {
							method: 'POST',
							body: postData,
							credentials: 'include',
						});

						if (!retry.ok) {
							const retryError = await retry.json();
							return rejectWithValue(retryError.message || 'Not authenticated');
						}

						return await retry.json();
					} catch (refreshError: unknown) {
						return rejectWithValue((refreshError as Error).message);
					}
				}

				return rejectWithValue(error.message || 'Failed to create post!');
			}

			const res = await response.json();

			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Failed to create post!');
		}
	},
);

export const fetchPosts = createAsyncThunk<FetchPostsResponse>(
	'feed/fetchPosts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${SERVER_URL}/api/feed/posts`, {
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				const error = await response.json();

				if (
					error.message === 'ACCESS_TOKEN_EXPIRED' ||
					error.message === 'NO_ACCESS_TOKEN'
				) {
					try {
						await refreshTokenRequest();

						const retry = await fetch(`${SERVER_URL}/api/feed/posts`, {
							headers: {
								'Content-Type': 'application/json',
							},
							credentials: 'include',
						});

						if (!retry.ok) {
							const retryError = await retry.json();
							return rejectWithValue(retryError.message || 'Not authenticated');
						}

						return await retry.json();
					} catch (refreshError: unknown) {
						return rejectWithValue((refreshError as Error).message);
					}
				}

				return rejectWithValue(error.message || 'Failed to fetch posts!');
			}

			const res = await response.json();

			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Failed to fetch posts!');
		}
	},
);

export const editPost = createAsyncThunk<CreatePostResponse, EditPostData>(
	'feed/editPost',
	async (editedData, { rejectWithValue }) => {
		const response = await fetch(`${SERVER_URL}/api/feed/posts/${editedData.postId}`, {
			method: 'PATCH',
			body: JSON.stringify(editedData.post),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (!response.ok) {
			const error = await response.json();

			if (error.message === 'ACCESS_TOKEN_EXPIRED' || error.message === 'NO_ACCESS_TOKEN') {
				try {
					await refreshTokenRequest();

					const retry = await fetch(`${SERVER_URL}/api/feed/posts/${editedData.postId}`, {
						method: 'PATCH',
						body: JSON.stringify(editedData.post),
						headers: {
							'Content-Type': 'application/json',
						},
						credentials: 'include',
					});

					if (!retry.ok) {
						const retryError = await retry.json();
						return rejectWithValue(retryError.message || 'Not authenticated');
					}

					return await retry.json();
				} catch (refreshError: unknown) {
					return rejectWithValue((refreshError as Error).message);
				}
			}

			return rejectWithValue((error as Error).message || 'Failed to edit post!');
		}

		const res = await response.json();

		return res;
	},
);

export const deletePost = createAsyncThunk<DeletePostResponse, string>(
	'feed/deletePost',
	async (postId, { rejectWithValue }) => {
		const response = await fetch(`${SERVER_URL}/api/feed/posts/${postId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (!response.ok) {
			const error = await response.json();

			if (error.message === 'ACCESS_TOKEN_EXPIRED' || error.message === 'NO_ACCESS_TOKEN') {
				try {
					await refreshTokenRequest();

					const retry = await fetch(`${SERVER_URL}/api/feed/posts/${postId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						},
						credentials: 'include',
					});

					if (!retry.ok) {
						const retryError = await retry.json();
						return rejectWithValue(retryError.message || 'Not authenticated');
					}

					return await retry.json();
				} catch (refreshError: unknown) {
					return rejectWithValue((refreshError as Error).message);
				}
			}

			return rejectWithValue((error as Error).message || 'Failed to delete post!');
		}

		return { postId };
	},
);

export const sendReactionData = createAsyncThunk<boolean, ReactionData>(
	'feed/sendReactionData',
	async (reactionData, { rejectWithValue }) => {
		const response = await fetch(`${SERVER_URL}/api/feed/reaction`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(reactionData),
		});

		const data = await response.json();

		if (!response.ok) {
			const error = await response.json();

			if (error.message === 'ACCESS_TOKEN_EXPIRED' || error.message === 'NO_ACCESS_TOKEN') {
				try {
					await refreshTokenRequest();

					const retry = await fetch(`${SERVER_URL}/api/feed/reaction`, {
						method: 'POST',
						credentials: 'include',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(reactionData),
					});

					if (!retry.ok) {
						const retryError = await retry.json();
						return rejectWithValue(retryError.message || 'Not authenticated');
					}

					return await retry.json();
				} catch (refreshError: unknown) {
					return rejectWithValue((refreshError as Error).message);
				}
			}

			return rejectWithValue((error as Error).message || 'Failed to delete post!');
		}
		// console.log(data);

		return data;
	},
);
