import SERVER_URL from '@/constants/serverUrl';
import type { NotificationType } from '@/types/notification';
import { refreshTokenRequest } from '@/utils/refreshTokenRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNotifications = createAsyncThunk<NotificationType[]>(
	'notifications/fetchNotifications',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${SERVER_URL}/api/notifications`, {
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

						const retry = await fetch(`${SERVER_URL}/api/notifications`, {
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

export const fetchAllNotifications = createAsyncThunk<NotificationType[]>(
	'notifications/fetchAllNotifications',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${SERVER_URL}/api/notifications/all`, {
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

						const retry = await fetch(`${SERVER_URL}/api/notifications/all`, {
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

				return rejectWithValue(error.message || 'Failed to fetch notifications!');
			}

			const res = await response.json();

			return res;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message || 'Failed to fetch notifications!');
		}
	},
);

export const markNotificationAsRead = createAsyncThunk<NotificationType, string>(
	'notifications/markAsRead',
	async (notificationId, { rejectWithValue }) => {
		try {
			const response = await fetch(`${SERVER_URL}/api/notifications/${notificationId}/read`, {
				method: 'PATCH',
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
						const retry = await fetch(
							`${SERVER_URL}/api/notifications/${notificationId}/read`,
							{
								method: 'PATCH',
								headers: {
									'Content-Type': 'application/json',
								},
								credentials: 'include',
							},
						);

						if (!retry.ok) {
							const retryError = await retry.json();
							return rejectWithValue(retryError.message || 'Not authenticated');
						}

						return await retry.json();
					} catch (refreshError: unknown) {
						return rejectWithValue((refreshError as Error).message);
					}
				}
				return rejectWithValue(error.message || 'Failed to mark notification as read!');
			}

			const res = await response.json();
			return res;
		} catch (error: unknown) {
			return rejectWithValue(
				(error as Error).message || 'Failed to mark notification as read!',
			);
		}
	},
);
