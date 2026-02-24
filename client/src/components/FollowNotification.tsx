import SERVER_URL from '@/constants/serverUrl';
import type { NotificationType } from '@/types/notification';

interface FollowNotificationToastProps {
	toast: NotificationType;
	onRemove: () => void;
}

const FollowNotification = ({ toast, onRemove }: FollowNotificationToastProps) => {
	const profilePictureUrl = toast.sender.profilePictureUrl
		? `${SERVER_URL}/${toast.sender.profilePictureUrl}`
		: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff&size=200';

	return (
		<div
			onAnimationEnd={onRemove}
			className="pointer-events-auto w-80 bg-white rounded-xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-toast-slide-in"
		>
			<div className="flex items-start p-4 border-l-4 border-l-blue-500">
				<div className="relative flex-shrink-0">
					<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
						<img
							src={profilePictureUrl}
							alt="User"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
						<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
						</svg>
					</div>
				</div>
				<div className="ml-3 flex-1 min-w-0">
					<p className="text-sm text-gray-900 leading-snug">
						<span className="font-semibold">{toast.sender.username}</span> started
						following you
					</p>
					<p className="text-xs text-gray-400 mt-1">Just now</p>
				</div>
				{/* Close button */}
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

export default FollowNotification;
