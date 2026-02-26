import SERVER_URL from '@/constants/serverUrl';
import type { NotificationType } from '@/types/notification';
import { useNavigate } from 'react-router-dom';
import routes from '@/constants/routes';

interface ReactionNotificationProps {
	toast: NotificationType;
	onRemove: () => void;
}

const reactionConfig = {
	like: {
		borderColor: 'border-l-blue-500',
		badgeBg: 'bg-blue-500',
		label: 'liked your post',
		icon: (
			<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
				<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
			</svg>
		),
	},
	love: {
		borderColor: 'border-l-red-500',
		badgeBg: 'bg-red-500',
		label: 'loved your post',
		icon: (
			<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
				<path
					fillRule="evenodd"
					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
					clipRule="evenodd"
				/>
			</svg>
		),
	},
	angry: {
		borderColor: 'border-l-orange-500',
		badgeBg: 'bg-orange-500',
		label: 'reacted angry to your post',
		icon: (
			<svg
				className="w-3 h-3 text-white"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2.5}
					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
				/>
			</svg>
		),
	},
};

const ReactionNotification = ({ toast, onRemove }: ReactionNotificationProps) => {
	const navigate = useNavigate();
	const reactionType = toast.reactionType || 'like';
	const config = reactionConfig[reactionType];

	const handleNavigate = () => {
		if (toast.post) {
			navigate(routes.post.replace(':postId', toast.post));
		}
		onRemove();
	};

	const profilePictureUrl = toast.sender.profilePictureUrl
		? `${SERVER_URL}/${toast.sender.profilePictureUrl}`
		: `https://ui-avatars.com/api/?name=${toast.sender.username}&background=2563eb&color=fff&size=200`;

	return (
		<div
			onAnimationEnd={onRemove}
			onClick={handleNavigate}
			className="pointer-events-auto w-80 bg-white rounded-xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-toast-slide-in cursor-pointer hover:bg-gray-50 transition-colors"
		>
			<div className={`flex items-start p-4 border-l-4 ${config.borderColor}`}>
				<div className="relative flex-shrink-0">
					<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
						<img
							src={profilePictureUrl}
							alt="User"
							className="w-full h-full object-cover"
						/>
					</div>
					<div
						className={`absolute -bottom-1 -right-1 w-5 h-5 ${config.badgeBg} rounded-full flex items-center justify-center ring-2 ring-white`}
					>
						{config.icon}
					</div>
				</div>
				<div className="ml-3 flex-1 min-w-0">
					<p className="text-sm text-gray-900 leading-snug">
						<span className="font-semibold">{toast.sender.username}</span>{' '}
						{config.label}
					</p>
					<p className="text-xs text-gray-400 mt-1">Just now</p>
				</div>
				<button className="ml-2 flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default ReactionNotification;
