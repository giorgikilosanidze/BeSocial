import { useEffect, useState } from 'react';
import AppRoutes from './AppRoutes';
import NotificationToast from './components/NotificationToast';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { getUserOnRefresh } from './features/auth/authThunks';
import { socket, connectWithUser, disconnectSocket } from './socket';
import type { NotificationType } from './types/notification';
import { fetchNotifications } from './features/notifications/notificationsThunks';
import {
	incrementUnreadCount,
	prependNotificationInRealTime,
} from './features/notifications/notificationsSlice';
import { toggleUnreadNotifications } from './features/navbar/navbarSlice';
import ScrollToTop from './components/ScrollToTop';
import { hasNewNotificationForDot } from './utils/notificationDot';
import { ChatUiProvider } from './components/chat/ChatUiContext';

function App() {
	const [toasts, setToasts] = useState<NotificationType[]>([]);
	const dispatch = useAppDispatch();
	const { isLoggedIn, user, isLoading } = useAppSelector((state) => state.auth);

	const isServerAwake = sessionStorage.getItem('isServerAwake') === 'true';

	useEffect(() => {
		dispatch(getUserOnRefresh());
	}, [dispatch]);

	useEffect(() => {
		if (!isServerAwake && !isLoading) {
			sessionStorage.setItem('isServerAwake', 'true');
		}
	}, [isLoading, isServerAwake]);

	useEffect(() => {
		if (isLoggedIn && user.id) {
			connectWithUser(user.id);
		} else {
			disconnectSocket();
		}
	}, [isLoggedIn, user.id]);

	useEffect(() => {
		if (isLoggedIn && user.id) {
			dispatch(fetchNotifications())
				.unwrap()
				.then((data) => {
					const latestNotificationCreatedAt = data.notifications[0]?.createdAt;
					const shouldShowDot = hasNewNotificationForDot(
						user.id,
						latestNotificationCreatedAt,
					);

					dispatch(toggleUnreadNotifications(shouldShowDot));
				})
				.catch((error) => {
					console.error('Failed to fetch notifications on app load:', error);
				});
		} else {
			dispatch(toggleUnreadNotifications(false));
		}
	}, [dispatch, isLoggedIn, user.id]);

	useEffect(() => {
		if (!isLoggedIn) return;

		const handleFollowNotification = (notification: NotificationType) => {
			setToasts((prev) => [...prev, notification]);
			dispatch(prependNotificationInRealTime(notification));
			dispatch(incrementUnreadCount());
			dispatch(toggleUnreadNotifications(true));
		};

		socket.on('followNotification', handleFollowNotification);

		return () => {
			socket.off('followNotification', handleFollowNotification);
		};
	}, [dispatch, isLoggedIn]);

	useEffect(() => {
		if (!isLoggedIn) return;

		const handleReactionNotification = (notification: NotificationType) => {
			setToasts((prev) => [...prev, notification]);
			dispatch(prependNotificationInRealTime(notification));
			dispatch(incrementUnreadCount());
			dispatch(toggleUnreadNotifications(true));
		};

		socket.on('reactionNotification', handleReactionNotification);

		return () => {
			socket.off('reactionNotification', handleReactionNotification);
		};
	}, [dispatch, isLoggedIn]);

	useEffect(() => {
		if (!isLoggedIn) return;

		const handleCommentNotification = (notification: NotificationType) => {
			setToasts((prev) => [...prev, notification]);
			dispatch(prependNotificationInRealTime(notification));
			dispatch(incrementUnreadCount());
			dispatch(toggleUnreadNotifications(true));
		};

		socket.on('commentNotification', handleCommentNotification);

		return () => {
			socket.off('commentNotification', handleCommentNotification);
		};
	}, [dispatch, isLoggedIn]);

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
			<ChatUiProvider>
				<ScrollToTop />
				<AppRoutes />
			</ChatUiProvider>
			<NotificationToast toasts={toasts} onRemove={removeToast} />
		</div>
	);
}

export default App;
