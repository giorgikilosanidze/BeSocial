import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import NotificationToast from './components/NotificationToast';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { getUserOnRefresh } from './features/auth/authThunks';
import { socket, connectWithUser } from './socket';
import type { NotificationType } from './types/notification';
import { toggleUnreadNotifications } from './features/navbar/navbarSlice';

// import { useLocation } from 'react-router-dom';
// import routes from './constants/routes';
// import { stopLoader } from './features/auth/authSlice';

function App() {
	const [toasts, setToasts] = useState<NotificationType[]>([]);
	const dispatch = useAppDispatch();
	const { isLoggedIn, user } = useAppSelector((state) => state.auth);
	// const location = useLocation();

	useEffect(() => {
		// if (
		// 	location.pathname === routes.login ||
		// 	location.pathname === routes.signup ||
		// 	location.pathname === routes.notFound
		// ) {
		// 	dispatch(stopLoader());
		// }
		// if (
		// 	location.pathname !== routes.login &&
		// 	location.pathname !== routes.signup &&
		// 	location.pathname !== routes.notFound
		// ) {
		dispatch(getUserOnRefresh());
		// }
	}, [dispatch]); // locationic iko ak dependency arrayshi.

	useEffect(() => {
		if (isLoggedIn && user.id) {
			connectWithUser(user.id);
		}
	}, [isLoggedIn, user.id]);

	useEffect(() => {
		socket.on('followNotification', (notification) => {
			setToasts((prev) => [...prev, notification]);
			dispatch(toggleUnreadNotifications(true));
		});

		return () => {
			socket.off('followNotification');
		};
	}, [dispatch]);

	useEffect(() => {
		socket.on('reactionNotification', (notification) => {
			setToasts((prev) => [...prev, notification]);
			dispatch(toggleUnreadNotifications(true));
		});

		return () => {
			socket.off('reactionNotification');
		};
	}, [dispatch]);

	const removeToast = () => {
		setToasts([]);
	};

	return (
		<div>
			<AppRoutes />
			<NotificationToast toasts={toasts} onRemove={removeToast} />
		</div>
	);
}

export default App;
