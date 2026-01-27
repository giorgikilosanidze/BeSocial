const ProfileTabs = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 overflow-hidden">
			<div className="flex border-b border-gray-200">
				<button className="flex-1 py-4 px-6 text-sm font-medium text-blue-600 border-b-2 border-blue-600 hover:bg-gray-50 transition-colors">
					<div className="flex items-center justify-center space-x-2">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
						<span>Posts</span>
					</div>
				</button>
				<button className="flex-1 py-4 px-6 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
					<div className="flex items-center justify-center space-x-2">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>About</span>
					</div>
				</button>
				<button className="flex-1 py-4 px-6 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
					<div className="flex items-center justify-center space-x-2">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span>Photos</span>
					</div>
				</button>
				<button className="flex-1 py-4 px-6 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
					<div className="flex items-center justify-center space-x-2">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
						<span>Friends</span>
					</div>
				</button>
			</div>
		</div>
	);
};

export default ProfileTabs;
