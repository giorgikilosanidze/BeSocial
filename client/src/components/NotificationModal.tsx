import { fetchAllNotifications } from '@/features/notifications/notificationsThunks';
import { useAppDispatch } from '@/hooks/reduxHooks';
import type { NotificationType } from '@/types/notification';
import { useEffect, useState } from 'react';
import ReactedNotification from './ReactedNotification';
import FollowingNotification from './FollowingNotification';

interface NotificationModalProps {
	onClose: () => void;
}

const NotificationModal = ({ onClose }: NotificationModalProps) => {
	const [notifications, setNotifications] = useState<NotificationType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const loadNotifications = async () => {
			try {
				const result = await dispatch(fetchAllNotifications()).unwrap();
				setNotifications(result);
			} catch (error) {
				console.error('Failed to fetch all notifications:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadNotifications();
	}, [dispatch]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden animate-[modalSlideIn_0.2s_ease-out]">
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<h2 className="text-lg font-bold text-gray-900">All Notifications</h2>
						{!isLoading && (
							<span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
								{notifications.length}
							</span>
						)}
					</div>
					<button
						onClick={onClose}
						className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Notification List */}
				<div className="max-h-[60vh] overflow-y-auto">
					{isLoading && (
						<div className="flex items-center justify-center py-12">
							<div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}

					{!isLoading && notifications.length === 0 && (
						<div className="flex flex-col items-center justify-center py-12 text-gray-400">
							<svg
								className="w-12 h-12 mb-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
							<p className="text-sm font-medium">No notifications yet</p>
						</div>
					)}

					{!isLoading &&
						notifications.map((notification) => {
							if (notification.type === 'follow') {
								return (
									<FollowingNotification
										key={notification.id}
										notification={notification}
										onNotificationClick={onClose}
									/>
								);
							} else {
								return (
									<ReactedNotification
										key={notification.id}
										notification={notification}
										onNotificationClick={onClose}
									/>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
};

export default NotificationModal;
