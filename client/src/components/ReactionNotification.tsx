import SERVER_URL from '@/constants/serverUrl';
import type { NotificationType } from '@/types/notification';

interface FollowNotificationToastProps {
	toast: NotificationType;
	onRemove: () => void;
}

const ReactionNotification = ({ toast, onRemove }: FollowNotificationToastProps) => {
	const profilePictureUrl = toast.sender.profilePictureUrl
		? `${SERVER_URL}/${toast.sender.profilePictureUrl}`
		: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff&size=200';

	return (
		<div
			onAnimationEnd={onRemove}
			className="pointer-events-auto w-80 bg-white rounded-xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-toast-slide-in"
		>
			<div className="flex items-start p-4 border-l-4 border-l-red-500">
				<div className="relative flex-shrink-0">
					<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
						<img
							src={profilePictureUrl}
							alt="User"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center ring-2 ring-white">
						<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
				<div className="ml-3 flex-1 min-w-0">
					<p className="text-sm text-gray-900 leading-snug">
						<span className="font-semibold">{toast.sender.username}</span> reacted to
						your post
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
