import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser } from './authThunks';
import type { AuthSliceState } from '@/types/auth';

const initialState: AuthSliceState = {
	isLoggedIn: false,
	jwt: null,
	isLoading: false,
	error: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signupUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signupUser.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			})

			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.isLoading = false;
				// state.jwt = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			});
	},
});

// export const {  } = authSlice.actions;

export default authSlice.reducer;
