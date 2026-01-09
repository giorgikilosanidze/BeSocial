import type { CreatePostResponse, Post } from '@/types/feed';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createPost = createAsyncThunk<CreatePostResponse, Post>(
	'feed/createPost',
	async (postData, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/feed/posts', {
				method: 'POST',
				body: JSON.stringify(postData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error.message || 'Failed to create post!');
			}

			const res = await response.json();
			console.log(res);

			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Failed to create post!');
		}
	}
);
