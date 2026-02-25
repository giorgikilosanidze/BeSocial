import type { NotificationState } from '@/types/notification';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNotifications } from './notificationsThunks';

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
			});
	},
});

export default notificationsSlice.reducer;
