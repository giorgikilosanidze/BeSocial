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
			});
			return response;
		} catch (error) {
			rejectWithValue(error);
		}
	}
);
