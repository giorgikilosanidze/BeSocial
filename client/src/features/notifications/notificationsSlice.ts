import type { NotificationState } from '@/types/notification';
import type { NotificationType } from '@/types/notification';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchNotifications, markNotificationAsRead } from './notificationsThunks';

const initialState: NotificationState = {
	data: [],
	unreadCount: 0,
	error: '',
	isLoading: false,
	status: 'idle',
};

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		incrementUnreadCount: (state) => {
			state.unreadCount++;
		},
		prependNotificationInRealTime: (state, action: PayloadAction<NotificationType>) => {
			const incomingNotification = action.payload;
			const hasNotification = state.data.some(
				(notification) => notification.id === incomingNotification.id,
			);

			if (hasNotification) {
				return;
			}

			state.data.unshift(incomingNotification);
			state.data = state.data.slice(0, 5);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.pending, (state) => {
				state.isLoading = true;
				state.status = 'loading';
			})
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.isLoading = false;
				state.status = 'fullfiled';
				state.data = action.payload.notifications;
				state.unreadCount = action.payload.unreadCount;
			})
			.addCase(fetchNotifications.rejected, (state, action) => {
				state.isLoading = false;
				state.status = 'error';
				state.error = action.error.message || 'Failed to fetch notifications!';
			})
			.addCase(markNotificationAsRead.fulfilled, (state, action) => {
				const index = state.data.findIndex((n) => n.id === action.payload.id);
				if (index !== -1) {
					state.data[index] = action.payload;
				}

				if (action.payload.isRead && state.unreadCount > 0) {
					state.unreadCount--;
				}
			});
	},
});

export const { incrementUnreadCount, prependNotificationInRealTime } = notificationsSlice.actions;

export default notificationsSlice.reducer;
