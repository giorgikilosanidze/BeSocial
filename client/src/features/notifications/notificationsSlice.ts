import type { NotificationState } from '@/types/notification';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNotifications, markNotificationAsRead } from './notificationsThunks';

const initialState: NotificationState = {
	data: [],
	error: '',
	isLoading: false,
	status: 'idle',
};

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.pending, (state) => {
				state.isLoading = true;
				state.status = 'loading';
			})
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.isLoading = false;
				state.status = 'fullfiled';
				state.data = action.payload;
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
			});
	},
});

export default notificationsSlice.reducer;
