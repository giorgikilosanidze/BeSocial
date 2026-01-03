import type { UserLogin, UserSignup } from '@/types/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error.message || 'Signup failed');
			}

			const res = await response.json();
			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Something went wrong');
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (user: UserLogin, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error.message || 'Login failed');
			}

			const res = await response.json();
			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Something went wrong');
		}
	}
);
