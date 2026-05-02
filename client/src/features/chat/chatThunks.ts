import SERVER_URL from '@/constants/serverUrl';
import { refreshTokenRequest } from '@/utils/refreshTokenRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMessages = createAsyncThunk<object, string>(
	'chat/getMessages',
	async (receiverId, { rejectWithValue }) => {
		try {
			const response = await fetch(`${SERVER_URL}/api/chat/${receiverId}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			const data = await response.json();

			if (!response.ok) {
				const error = await response.json();

				if (
					error.message === 'ACCESS_TOKEN_EXPIRED' ||
					error.message === 'NO_ACCESS_TOKEN'
				) {
					try {
						await refreshTokenRequest();

						const retry = await fetch(`${SERVER_URL}/api/chat/${receiverId}`, {
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

				return rejectWithValue((error as Error).message || 'Failed to get messages!');
			}

			return data;
		} catch (error: unknown) {
			return rejectWithValue({ message: (error as Error).message || 'Something went wrong' });
		}
	},
);

export const sendMessage = createAsyncThunk<
	object,
	{ receiverId: string | undefined; text: string }
>('chat/sendMessage', async (message, { rejectWithValue }) => {
	try {
		const response = await fetch(`${SERVER_URL}/api/chat/send`, {
			method: 'POST',
			body: JSON.stringify(message),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		const data = await response.json();

		if (!response.ok) {
			const error = await response.json();

			if (error.message === 'ACCESS_TOKEN_EXPIRED' || error.message === 'NO_ACCESS_TOKEN') {
				try {
					await refreshTokenRequest();

					const retry = await fetch(`${SERVER_URL}/api/chat/send`, {
						method: 'POST',
						body: JSON.stringify(message),
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

			return rejectWithValue((error as Error).message || 'Failed to send message!');
		}

		return data;
	} catch (error: unknown) {
		return rejectWithValue({ message: (error as Error).message || 'Something went wrong' });
	}
});
