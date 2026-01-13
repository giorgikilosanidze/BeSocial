import type {
	CreatePostResponse,
	DeletePostResponse,
	EditPostData,
	FetchPostsResponse,
	Post,
} from '@/types/feed';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createPost = createAsyncThunk<CreatePostResponse, Post>(
	'feed/createPost',
	async (postData, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/api/feed/posts', {
				method: 'POST',
				body: JSON.stringify(postData),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error.message || 'Failed to create post!');
			}

			const res = await response.json();

			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Failed to create post!');
		}
	}
);

export const fetchPosts = createAsyncThunk<FetchPostsResponse>(
	'feed/fetchPosts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/api/feed/posts', {
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error.message || 'Failed to fetch posts!');
			}

			const res = await response.json();

			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Failed to fetch posts!');
		}
	}
);

export const editPost = createAsyncThunk<CreatePostResponse, EditPostData>(
	'feed/editPost',
	async (editedData, { rejectWithValue }) => {
		const response = await fetch(`http://localhost:3000/api/feed/posts/${editedData.postId}`, {
			method: 'PATCH',
			body: JSON.stringify(editedData.post),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (!response.ok) {
			const error = await response.json();
			rejectWithValue((error as Error).message || 'Failed to edit post!');
		}

		const res = await response.json();
		console.log(res);

		return res;
	}
);

export const deletePost = createAsyncThunk<DeletePostResponse, string>(
	'feed/deletePost',
	async (postId, { rejectWithValue }) => {
		const response = await fetch(`http://localhost:3000/api/feed/posts/${postId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (!response.ok) {
			const error = await response.json();
			rejectWithValue((error as Error).message || 'Failed to delete post!');
		}

		return { postId };
	}
);
