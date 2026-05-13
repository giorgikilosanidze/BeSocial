import SERVER_URL from '@/constants/serverUrl';
import { refreshTokenRequest } from '@/utils/refreshTokenRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type {
	ChatMessageDto,
	GetMessagesResponse,
	Message,
	SendMessageResponse,
} from '@/types/chat';

const formatTime = (dateString?: string): string => {
	if (!dateString) return '';

	return new Date(dateString).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});
};

const mapDtoToMessage = (dto: ChatMessageDto, currentUserId: string): Message => ({
	id: dto.id,
	sender: dto.senderId === currentUserId ? 'me' : 'them',
	text: dto.text,
	time: formatTime(dto.createdAt),
	seenAt: dto.seenAt,
});

export const getMessages = createAsyncThunk<
	{ receiverId: string; messages: Message[] },
	string,
	{ state: RootState; rejectValue: string }
>(
	'chat/getMessages',
	async (receiverId, { rejectWithValue, getState }) => {
		const currentUserId = getState().auth.user.id;

		try {
			const response = await fetch(`${SERVER_URL}/api/chat/${receiverId}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			const data = (await response.json()) as GetMessagesResponse | { message?: string };

			if (!response.ok) {
				const error = data as { message?: string };

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

						const retryData = (await retry.json()) as GetMessagesResponse;
						return {
							receiverId,
							messages: retryData.data.messages.map((message) =>
								mapDtoToMessage(message, currentUserId),
							),
						};
					} catch (refreshError: unknown) {
						return rejectWithValue((refreshError as Error).message);
					}
				}

				return rejectWithValue((error as Error).message || 'Failed to get messages!');
			}

			const responseData = data as GetMessagesResponse;

			return {
				receiverId,
				messages: responseData.data.messages.map((message) =>
					mapDtoToMessage(message, currentUserId),
				),
			};
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Something went wrong');
		}
	},
);

export const sendMessage = createAsyncThunk<
	SendMessageResponse,
	{ receiverId: string | undefined; text: string; clientMessageId?: string },
	{ rejectValue: string }
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

		const data = (await response.json()) as SendMessageResponse | { message?: string };

		if (!response.ok) {
			const error = data as { message?: string };

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

					return (await retry.json()) as SendMessageResponse;
				} catch (refreshError: unknown) {
					return rejectWithValue((refreshError as Error).message);
				}
			}

			return rejectWithValue((error as Error).message || 'Failed to send message!');
		}

		return data as SendMessageResponse;
	} catch (error: unknown) {
		return rejectWithValue((error as Error).message || 'Something went wrong');
	}
});
