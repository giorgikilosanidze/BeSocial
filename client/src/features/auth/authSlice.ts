import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser } from './authThunks';
import type { AuthSliceState } from '@/types/auth';

const initialState: AuthSliceState = {
	user: { id: '', username: '', email: '' },
	isLoggedIn: false,
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
			.addCase(signupUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.user.id = action.payload.id;
				state.user.username = action.payload.username;
				state.user.email = action.payload.email;
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			})

			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.user.id = action.payload.id;
				state.user.username = action.payload.username;
				state.user.email = action.payload.email;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			});
	},
});

// export const {  } = authSlice.actions;

export default authSlice.reducer;
