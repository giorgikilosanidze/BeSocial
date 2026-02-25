import type { NotificationType } from '@/types/notification';

const ReactedNotification = ({ notification }: { notification: NotificationType }) => {
	console.log(notification);

	return (
		<div className="flex items-start px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] border-l-blue-400 bg-blue-50/40">
			<div className="relative flex-shrink-0">
				<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
					<img
						src="https://ui-avatars.com/api/?name=Alex+Johnson&background=2563eb&color=fff&size=200"
						alt="User"
						className="w-full h-full object-cover"
					/>
				</div>
				{/* Like accent */}
				<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
					<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
						<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
					</svg>
				</div>
			</div>
			<div className="ml-3 flex-1 min-w-0">
				<p className="text-sm text-gray-900">
					<span className="font-semibold">Alex Johnson</span> liked your post
				</p>
				<p className="text-xs text-blue-600 font-medium mt-0.5">15 minutes ago</p>
			</div>
			<div className="ml-2 mt-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
		</div>
		// <div className="flex items-start px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] border-l-red-400 bg-red-50/30">
		// 	<div className="relative flex-shrink-0">
		// 		<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
		// 			<img
		// 				src="https://ui-avatars.com/api/?name=Maria+Garcia&background=ec4899&color=fff&size=200"
		// 				alt="User"
		// 				className="w-full h-full object-cover"
		// 			/>
		// 		</div>
		// 		{/* Love accent */}
		// 		<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center ring-2 ring-white">
		// 			<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
		// 				<path
		// 					fillRule="evenodd"
		// 					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
		// 					clipRule="evenodd"
		// 				/>
		// 			</svg>
		// 		</div>
		// 	</div>
		// 	<div className="ml-3 flex-1 min-w-0">
		// 		<p className="text-sm text-gray-900">
		// 			<span className="font-semibold">Maria Garcia</span> loved your post
		// 		</p>
		// 		<p className="text-xs text-blue-600 font-medium mt-0.5">1 hour ago</p>
		// 	</div>
		// 	<div className="ml-2 mt-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
		// </div>;

		// <div className="flex items-start px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] border-l-transparent">
		// 	<div className="relative flex-shrink-0">
		// 		<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
		// 			<img
		// 				src="https://ui-avatars.com/api/?name=Tom+Wilson&background=f97316&color=fff&size=200"
		// 				alt="User"
		// 				className="w-full h-full object-cover"
		// 			/>
		// 		</div>
		// 		{/* Angry accent */}
		// 		<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center ring-2 ring-white">
		// 			<svg
		// 				className="w-3 h-3 text-white"
		// 				fill="none"
		// 				stroke="currentColor"
		// 				viewBox="0 0 24 24"
		// 			>
		// 				<path
		// 					strokeLinecap="round"
		// 					strokeLinejoin="round"
		// 					strokeWidth={2.5}
		// 					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
		// 				/>
		// 			</svg>
		// 		</div>
		// 	</div>
		// 	<div className="ml-3 flex-1 min-w-0">
		// 		<p className="text-sm text-gray-700">
		// 			<span className="font-semibold text-gray-900">Tom Wilson</span> reacted angry to
		// 			your post
		// 		</p>
		// 		<p className="text-xs text-gray-400 mt-0.5">3 hours ago</p>
		// 	</div>
		// </div>;
	);
};

export default ReactedNotification;
