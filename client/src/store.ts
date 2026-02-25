import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import feedReducer from './features/feed/feedSlice';
import profileReducer from './features/profile/profileSlice';
import navbarReducer from './features/navbar/navbarSlice';
import notificationReducer from './features/notifications/notificationsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		feed: feedReducer,
		profile: profileReducer,
		navbar: navbarReducer,
		notification: notificationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
