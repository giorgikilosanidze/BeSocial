import type { AuthResponse, LoginError, SignupError, UserLogin, UserSignup } from '@/types/auth';
import { refreshTokenRequest } from '@/utils/refreshTokenRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signupUser = createAsyncThunk<AuthResponse, UserSignup, { rejectValue: SignupError }>(
	'auth/signupUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/api/auth/signup', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error);
			}

			const res = await response.json();
			return res;
		} catch (error: unknown) {
			return rejectWithValue({ message: (error as Error).message || 'Something went wrong' });
		}
	},
);

export const loginUser = createAsyncThunk<AuthResponse, UserLogin, { rejectValue: LoginError }>(
	'auth/loginUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				const error = await response.json();
				return rejectWithValue(error);
			}

			const res = await response.json();
			return res;
		} catch (error: unknown) {
			return rejectWithValue({ message: (error as Error).message || 'Something went wrong' });
		}
	},
);

export const logOutUser = createAsyncThunk<boolean>(
	'auth/logOutUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/api/auth/logout', {
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
	},
);

export const getUserOnRefresh = createAsyncThunk<AuthResponse>(
	'auth/getUserOnRefresh',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:3000/api/auth/me', {
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

						const retry = await fetch('http://localhost:3000/api/auth/me', {
							credentials: 'include',
						});

						if (!retry.ok) {
							const retryError = await retry.json();
							return rejectWithValue(retryError.message || 'Not authenticated');
						}

						const retryRes = await retry.json();
						return retryRes;
					} catch (refreshError: unknown) {
						return rejectWithValue((refreshError as Error).message);
					}
				}

				return rejectWithValue(error.message || 'Not authenticated');
			}

			const res = await response.json();
			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Something went wrong');
		}
	},
);
