import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import feedReducer from './features/feed/feedSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		feed: feedReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
