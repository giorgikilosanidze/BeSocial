import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfileInfo = createAsyncThunk<string, string>(
	'profile/fetchProfileInfo',
	async (userId, { rejectWithValue }) => {
		const response = await fetch(`http://localhost:3000/api/profile/user/${userId}`, {
			credentials: 'include',
		});

		const data = await response.json();

		if (!response.ok) {
			return rejectWithValue(data);
		}

		return data;
	},
);
