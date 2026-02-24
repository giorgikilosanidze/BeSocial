import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
	hasUnreadNotifications: boolean;
}

const initialState: InitialStateType = {
	hasUnreadNotifications: false,
};

const navbarSlice = createSlice({
	name: 'navbar',
	initialState,
	reducers: {
		toggleUnreadNotifications: (state, action: PayloadAction<boolean>) => {
			state.hasUnreadNotifications = action.payload;
		},
	},
});

export const { toggleUnreadNotifications } = navbarSlice.actions;

export default navbarSlice.reducer;
