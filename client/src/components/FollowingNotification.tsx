import SERVER_URL from '@/constants/serverUrl';
import type { NotificationType } from '@/types/notification';

const FollowingNotification = ({ notification }: { notification: NotificationType }) => {
	const profilePictureUrl = notification.sender.profilePictureUrl
		? `${SERVER_URL}/${notification.sender.profilePictureUrl}`
		: 'https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff&size=200';

	return (
		<div className="flex items-start px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] border-l-blue-500 bg-blue-50/40">
			<div className="relative flex-shrink-0">
				<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
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
					<span className="font-semibold">{notification.sender.username}</span> started
					following you
				</p>
				<p className="text-xs text-blue-600 font-medium mt-0.5">2 minutes ago</p>
			</div>
			<div className="ml-2 mt-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
		</div>

		// <div className="flex items-start px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] border-l-transparent">
		// 	<div className="relative flex-shrink-0">
		// 		<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
		// 			<img
		// 				src="https://ui-avatars.com/api/?name=Sara+Lee&background=10b981&color=fff&size=200"
		// 				alt="User"
		// 				className="w-full h-full object-cover"
		// 			/>
		// 		</div>
		// 		<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
		// 			<svg
		// 				className="w-3 h-3 text-white"
		// 				fill="currentColor"
		// 				viewBox="0 0 20 20"
		// 			>
		// 				<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
		// 			</svg>
		// 		</div>
		// 	</div>
		// 	<div className="ml-3 flex-1 min-w-0">
		// 		<p className="text-sm text-gray-700">
		// 			<span className="font-semibold text-gray-900">Sara Lee</span> started
		// 			following you
		// 		</p>
		// 		<p className="text-xs text-gray-400 mt-0.5">Yesterday</p>
		// 	</div>
		// </div>
	);
};

export default FollowingNotification;
