import reactionConfig from '@/constants/reactionConfig';
import SERVER_URL from '@/constants/serverUrl';
import type { NotificationType } from '@/types/notification';
import { timeAgo } from '@/utils/formatTime';
import { useNavigate } from 'react-router-dom';
import routes from '@/constants/routes';
import { markNotificationAsRead } from '@/features/notifications/notificationsThunks';
import { useAppDispatch } from '@/hooks/reduxHooks';

interface ReactedNotificationProps {
	notification: NotificationType;
	onNotificationClick?: () => void;
}

const ReactedNotification = ({ notification, onNotificationClick }: ReactedNotificationProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const reactionType = notification.reactionType || 'like';
	const config = reactionConfig[reactionType];

	const handleNavigate = () => {
		if (!notification.isRead) {
			dispatch(markNotificationAsRead(notification.id));
		}
		if (notification.post) {
			navigate(routes.post.replace(':postId', notification.post));
		}
		if (onNotificationClick) onNotificationClick();
	};

	const profilePictureUrl = notification.sender.profilePictureUrl
		? `${SERVER_URL}/${notification.sender.profilePictureUrl}`
		: `https://ui-avatars.com/api/?name=${notification.sender.username}&background=2563eb&color=fff&size=200`;

	const reactionTimeAgo = timeAgo(notification.createdAt);

	return (
		<div
			onClick={handleNavigate}
			className={`flex items-start px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] ${
				!notification.isRead ? `${config.borderColor} ${config.bgTint}` : 'border-l-transparent bg-white'
			}`}
		>
			<div className="relative flex-shrink-0">
				<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
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
					<span className="font-semibold">{notification.sender.username}</span>{' '}
					{config.label}
				</p>
				<p className={`text-xs ${config.textColor} font-medium mt-0.5`}>
					{reactionTimeAgo}
				</p>
			</div>
			{!notification.isRead && (
				<div className="ml-2 mt-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
			)}
		</div>
	);
};

export default ReactedNotification;
