import type { UserSignup } from '@/types/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/loginUser', async () => {});

export const signupUser = createAsyncThunk(
	'auth/signupUser',
	async (user: UserSignup, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/auth/signup', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const res = await response.json();
			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Something went wrong');
		}
	}
);
