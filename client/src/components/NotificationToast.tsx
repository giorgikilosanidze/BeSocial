interface NotificationToastProps {
	toast: Record<string, unknown>;
	onRemove: () => void;
}

const NotificationToast = ({ toast, onRemove }: NotificationToastProps) => {
	console.log(toast);

	return (
		<div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-3 pointer-events-none">
			{/* Follow Toast */}
			<div
				onAnimationEnd={onRemove}
				className="pointer-events-auto w-80 bg-white rounded-xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-toast-slide-in"
			>
				<div className="flex items-start p-4 border-l-4 border-l-blue-500">
					<div className="relative flex-shrink-0">
						<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
							<img
								src="https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff&size=200"
								alt="User"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
							<svg
								className="w-3 h-3 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
							</svg>
						</div>
					</div>
					<div className="ml-3 flex-1 min-w-0">
						<p className="text-sm text-gray-900 leading-snug">
							<span className="font-semibold">{}</span> started following you
						</p>
						<p className="text-xs text-gray-400 mt-1">Just now</p>
					</div>
					{/* Close button */}
					<button className="ml-2 flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
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

			{/* Love Reaction Toast */}
			{/* <div
				className="pointer-events-auto w-80 bg-white rounded-xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-toast-slide-in"
				style={{ animationDelay: '0.15s' }}
			>
				<div className="flex items-start p-4 border-l-4 border-l-red-500">
					<div className="relative flex-shrink-0">
						<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
							<img
								src="https://ui-avatars.com/api/?name=Maria+Garcia&background=ec4899&color=fff&size=200"
								alt="User"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center ring-2 ring-white">
							<svg
								className="w-3 h-3 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
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
							<span className="font-semibold">Maria Garcia</span> loved your post
						</p>
						<p className="text-xs text-gray-400 mt-1">Just now</p>
					</div>
					<button className="ml-2 flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div> */}
		</div>
	);
};

export default NotificationToast;
