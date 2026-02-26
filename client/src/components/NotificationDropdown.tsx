import { fetchNotifications } from '@/features/notifications/notificationsThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import ReactedNotification from './ReactedNotification';
import FollowingNotification from './FollowingNotification';

interface NotificationDropdownProps {
	onSeeAll: () => void;
	onClose: () => void;
}

const NotificationDropdown = ({ onSeeAll, onClose }: NotificationDropdownProps) => {
	const notifications = useAppSelector((state) => state.notification.data);
	const status = useAppSelector((state) => state.notification.status);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchNotifications());
		}
	}, [dispatch, status]);

	return (
		<div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden">
			{/* Header */}
			<div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<h3 className="text-base font-bold text-gray-900">Notifications</h3>
					<span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
						{notifications.filter((n) => !n.isRead).length}
					</span>
				</div>
			</div>

			{/* Notification Items */}
			<div className="max-h-[400px] overflow-y-auto">
				{notifications.map((notification) => {
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

			{/* Footer */}
			<div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
				<button
					onClick={onSeeAll}
					className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
				>
					See all notifications
				</button>
			</div>
		</div>
	);
};

export default NotificationDropdown;
