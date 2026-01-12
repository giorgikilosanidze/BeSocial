import type { AuthResponse, UserLogin, UserSignup } from '@/types/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signupUser = createAsyncThunk<AuthResponse, UserSignup>(
	'auth/signupUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/auth/signup', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
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

export const loginUser = createAsyncThunk<AuthResponse, UserLogin>(
	'auth/loginUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
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

export const logOutUser = createAsyncThunk<boolean>(
	'auth/logOutUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/auth/logout', {
				method: 'POST',
				credentials: 'include',
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error.message || 'Log out failed');
			}

			return true;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Something went wrong');
		}
	}
);
