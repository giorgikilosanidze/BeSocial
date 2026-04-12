import reactionConfig from '@/constants/reactionConfig';
import SERVER_URL from '@/constants/serverUrl';
import type { NotificationType } from '@/types/notification';
import { timeAgo } from '@/utils/formatTime';
import { Link } from 'react-router-dom';
import routes from '@/constants/routes';
import { markNotificationAsRead } from '@/features/notifications/notificationsThunks';
import { useAppDispatch } from '@/hooks/reduxHooks';
import dummyProfilePicture from '../assets/user.jpg';

interface ReactedNotificationProps {
	notification: NotificationType;
	onNotificationClick?: () => void;
}

const ReactedNotification = ({ notification, onNotificationClick }: ReactedNotificationProps) => {
	const dispatch = useAppDispatch();
	const notificationType = notification.type === 'comment' ? 'comment' : notification.reactionType || 'like';
	const config = reactionConfig[notificationType];
	const destination = notification.post
		? routes.post.replace(':postId', notification.post)
		: routes.profile.replace(':userId', notification.sender._id);

	const markAsReadIfNeeded = () => {
		if (!notification.isRead) {
			dispatch(markNotificationAsRead(notification.id));
		}
	};

	const handleNavigate = () => {
		markAsReadIfNeeded();
		if (onNotificationClick) onNotificationClick();
	};

	const profilePictureUrl = notification.sender.profilePictureUrl
		? `${SERVER_URL}/${notification.sender.profilePictureUrl}`
		: dummyProfilePicture;

	const reactionTimeAgo = timeAgo(notification.createdAt);

	return (
		<div className="relative">
			<Link
				to={destination}
				onClick={handleNavigate}
				className={`flex items-start px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] ${
					!notification.isRead
						? `${config.borderColor} ${config.bgTint}`
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
					<div
						className={`absolute -bottom-1 -right-1 w-5 h-5 ${config.bgColor} rounded-full flex items-center justify-center ring-2 ring-white`}
					>
						<config.icon />
					</div>
				</div>
				<div className="ml-3 flex-1 min-w-0">
					<p className="text-sm text-gray-900">
						<span className="font-semibold hover:underline">
							{notification.sender.username}
						</span>{' '}
						{config.label}
					</p>
					<p className={`text-xs ${config.textColor} font-medium mt-0.5`}>
						{reactionTimeAgo}
					</p>
				</div>
				{!notification.isRead && (
					<div className="ml-2 mt-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
				)}
			</Link>
		</div>
	);
};

export default ReactedNotification;
