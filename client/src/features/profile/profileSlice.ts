import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileInfo } from './profileThunks';
import type { UserSliceState } from '@/types/profile';

const initialState: UserSliceState = {
	user: { id: '', username: '', email: '', postsCount: 0 },
	error: '',
	isLoading: false,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchProfileInfo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProfileInfo.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong';
			})
			.addCase(fetchProfileInfo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			});
	},
});

export default profileSlice.reducer;
