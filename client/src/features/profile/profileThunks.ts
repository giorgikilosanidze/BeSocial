import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfileInfo = createAsyncThunk<string, string>(
	'profile/fetchProfileInfo',
	async (userId, { rejectWithValue }) => {
		console.log(userId);

		return rejectWithValue({ message: 'dummy error' });
	},
);
