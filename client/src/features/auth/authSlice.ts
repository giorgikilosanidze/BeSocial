import { createSlice } from '@reduxjs/toolkit';
import { getUserOnRefresh, loginUser, logOutUser, signupUser } from './authThunks';
import type { AuthSliceState } from '@/types/auth';

const initialState: AuthSliceState = {
	user: { id: '', username: '', email: '' },
	isLoggedIn: false,
	isLoading: true,
	error: '',
	loginValidationErrors: {
		email: '',
		password: '',
	},
	signupValidationErrors: {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		stopLoader: (state) => {
			state.isLoading = false;
		},
	},
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
				state.signupValidationErrors = {
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
				};
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.isLoading = false;

				if (action.payload?.errors?.properties) {
					const { properties } = action.payload.errors;

					if (properties?.username?.errors) {
						state.signupValidationErrors.username = properties.username?.errors[0];
					} else {
						state.signupValidationErrors.username = '';
					}

					if (properties?.email?.errors) {
						state.signupValidationErrors.email = properties.email?.errors[0];
					} else {
						state.signupValidationErrors.email = '';
					}

					if (properties?.password?.errors) {
						state.signupValidationErrors.password = properties.password?.errors[0];
					} else {
						state.signupValidationErrors.password = '';
					}

					if (properties?.confirmPassword?.errors) {
						state.signupValidationErrors.confirmPassword =
							properties.confirmPassword?.errors[0];
					} else {
						state.signupValidationErrors.confirmPassword = '';
					}
				} else if (action.payload?.otherErrors) {
					const { otherErrors } = action.payload;

					if (otherErrors.email) {
						state.signupValidationErrors.email = otherErrors.email;
					} else {
						state.signupValidationErrors.email = '';
					}

					if (otherErrors.confirmPassword) {
						state.signupValidationErrors.confirmPassword = otherErrors.confirmPassword;
					} else {
						state.signupValidationErrors.password = '';
					}
				} else {
					state.error = action.error.message || 'Something went wrong!';
				}
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
				state.loginValidationErrors.email = '';
				state.loginValidationErrors.password = '';
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;

				if (action.payload?.errors?.properties) {
					const { properties } = action.payload.errors;

					if (properties?.email?.errors) {
						state.loginValidationErrors.email = properties.email?.errors[0];
					} else {
						state.loginValidationErrors.email = '';
					}

					if (properties?.password?.errors) {
						state.loginValidationErrors.password = properties.password?.errors[0];
					} else {
						state.loginValidationErrors.password = '';
					}
				} else if (action.payload?.otherErrors) {
					const { otherErrors } = action.payload;

					if (otherErrors.email) {
						state.loginValidationErrors.email = otherErrors.email;
					} else {
						state.loginValidationErrors.email = '';
					}

					if (otherErrors.password) {
						state.loginValidationErrors.password = otherErrors.password;
					} else {
						state.loginValidationErrors.password = '';
					}
				} else {
					state.error = action.error.message || 'Something went wrong!';
				}
			})

			.addCase(logOutUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logOutUser.fulfilled, (state) => {
				state.isLoading = false;
				state.isLoggedIn = false;
				state.user.id = '';
				state.user.username = '';
				state.user.email = '';
			})
			.addCase(logOutUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			})

			.addCase(getUserOnRefresh.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserOnRefresh.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.user.id = action.payload.id;
				state.user.username = action.payload.username;
				state.user.email = action.payload.email;
			})
			.addCase(getUserOnRefresh.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			});
	},
});

export const { stopLoader } = authSlice.actions;

export default authSlice.reducer;
