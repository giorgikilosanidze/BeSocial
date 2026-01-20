import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	error: '',
	isLoading: false,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
});

export default profileSlice.reducer;
