import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import NotificationToast from './components/NotificationToast';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { getUserOnRefresh } from './features/auth/authThunks';
import { socket, connectWithUser } from './socket';
import type { NotificationType } from './types/notification';
import { toggleUnreadNotifications } from './features/navbar/navbarSlice';
import ScrollToTop from './components/ScrollToTop';

// import { useLocation } from 'react-router-dom';
// import routes from './constants/routes';
// import { stopLoader } from './features/auth/authSlice';

function App() {
	const [toasts, setToasts] = useState<NotificationType[]>([]);
	const dispatch = useAppDispatch();
	const { isLoggedIn, user, isLoading } = useAppSelector((state) => state.auth);

	const isServerAwake = sessionStorage.getItem('isServerAwake') === 'true';
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
		if (!isServerAwake && !isLoading) {
			sessionStorage.setItem('isServerAwake', 'true');
		}
	}, [isLoading, isServerAwake]);

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

	useEffect(() => {
		socket.on('commentNotification', (notification) => {
			setToasts((prev) => [...prev, notification]);
			dispatch(toggleUnreadNotifications(true));
		});

		return () => {
			socket.off('commentNotification');
		};
	}, [dispatch]);

	const removeToast = () => {
		setToasts([]);
	};

	if (!isServerAwake && isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-50">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-lg font-medium text-gray-700 animate-pulse">
						Please wait, server is waking up.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			<ScrollToTop />
			<AppRoutes />
			<NotificationToast toasts={toasts} onRemove={removeToast} />
		</div>
	);
}

export default App;
