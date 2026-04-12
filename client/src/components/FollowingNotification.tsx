import SERVER_URL from '@/constants/serverUrl';
import type { NotificationType } from '@/types/notification';
import { timeAgo } from '@/utils/formatTime';
import { Link } from 'react-router-dom';
import routes from '@/constants/routes';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { markNotificationAsRead } from '@/features/notifications/notificationsThunks';
import dummyProfilePicture from '../assets/user.jpg';

interface FollowingNotificationProps {
	notification: NotificationType;
	onNotificationClick?: () => void;
}

const FollowingNotification = ({
	notification,
	onNotificationClick,
}: FollowingNotificationProps) => {
	const dispatch = useAppDispatch();
	const destination = routes.profile.replace(':userId', notification.sender._id);

	const markAsReadIfNeeded = () => {
		if (!notification.isRead) {
			dispatch(markNotificationAsRead(notification.id));
		}
	};

	const handleNotificationClick = () => {
		markAsReadIfNeeded();
		if (onNotificationClick) onNotificationClick();
	};
	const profilePictureUrl = notification.sender.profilePictureUrl
		? `${SERVER_URL}/${notification.sender.profilePictureUrl}`
		: dummyProfilePicture;

	const followTimeAgo = timeAgo(notification.createdAt);

	return (
		<div className="relative">
			<Link
				to={destination}
				onClick={handleNotificationClick}
				className={`flex items-start px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] ${
					!notification.isRead
						? 'border-l-blue-500 bg-blue-50/40'
						: 'border-l-transparent bg-white'
				}`}
			>
				<div className="relative flex-shrink-0">
					<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 block">
						<img
							src={profilePictureUrl}
							alt="User"
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Accent icon */}
					<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
						<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
						</svg>
					</div>
				</div>
				<div className="ml-3 flex-1 min-w-0">
					<p className="text-sm text-gray-900">
						<span className="font-semibold hover:underline">
							{notification.sender.username}
						</span>{' '}
						started following you
					</p>
					<p className="text-xs text-blue-600 font-medium mt-0.5">{followTimeAgo}</p>
				</div>
				{!notification.isRead && (
					<div className="ml-2 mt-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
				)}
			</Link>
		</div>
	);
};

export default FollowingNotification;
