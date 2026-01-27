const ProfileHeader = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
			{/* Cover Photo Section */}
			<div className="relative h-80 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
				{/* Cover Photo - will be replaced with actual image */}
				<img
					src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200"
					alt="Cover"
					className="w-full h-full object-cover"
				/>
				{/* Edit Cover Photo Button */}
				<button className="absolute bottom-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors shadow-md flex items-center space-x-2">
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
							d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span>Edit Cover</span>
				</button>
			</div>

			{/* Profile Info Section */}
			<div className="px-6 pb-6">
				{/* Profile Photo */}
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-20 relative">
					<div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-5">
						<div className="relative group">
							<div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
								<img
									src="https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=200"
									alt="Profile"
									className="w-full h-full object-cover"
								/>
							</div>
							{/* Edit Profile Photo Button */}
							<button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors border-2 border-gray-200">
								<svg
									className="w-5 h-5 text-gray-700"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</button>
						</div>
						<div className="pb-2">
							<h1 className="text-3xl font-bold text-gray-900">
								John Doe
							</h1>
							<p className="text-gray-600 text-sm mt-1">@johndoe</p>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex space-x-3 mt-4 sm:mt-0">
						<button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm">
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
									d="M12 4v16m8-8H4"
								/>
							</svg>
							<span>Follow</span>
						</button>
						<button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
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
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/>
							</svg>
							<span>Message</span>
						</button>
						<button className="bg-gray-100 text-gray-700 p-2.5 rounded-lg hover:bg-gray-200 transition-colors">
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
							</svg>
						</button>
					</div>
				</div>

				{/* Bio and Info */}
				<div className="mt-6 space-y-3">
					<p className="text-gray-700 text-sm leading-relaxed">
						🚀 Full-stack developer | TypeScript enthusiast | Building amazing
						things with React & Node.js | Coffee lover ☕ | Always learning
						something new
					</p>
					<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
						<div className="flex items-center space-x-2">
							<svg
								className="w-4 h-4 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<span>Software Engineer at TechCorp</span>
						</div>
						<div className="flex items-center space-x-2">
							<svg
								className="w-4 h-4 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span>San Francisco, CA</span>
						</div>
						<div className="flex items-center space-x-2">
							<svg
								className="w-4 h-4 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
								/>
							</svg>
							<a
								href="#"
								className="text-blue-600 hover:underline"
							>
								johndoe.dev
							</a>
						</div>
						<div className="flex items-center space-x-2">
							<svg
								className="w-4 h-4 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<span>Joined January 2024</span>
						</div>
					</div>
				</div>

				{/* Stats */}
				<div className="mt-6 pt-5 border-t border-gray-200">
					<div className="flex flex-wrap gap-6">
						<button className="flex flex-col hover:opacity-75 transition-opacity">
							<span className="text-2xl font-bold text-gray-900">
								247
							</span>
							<span className="text-sm text-gray-600">Posts</span>
						</button>
						<button className="flex flex-col hover:opacity-75 transition-opacity">
							<span className="text-2xl font-bold text-gray-900">
								1,842
							</span>
							<span className="text-sm text-gray-600">Followers</span>
						</button>
						<button className="flex flex-col hover:opacity-75 transition-opacity">
							<span className="text-2xl font-bold text-gray-900">
								531
							</span>
							<span className="text-sm text-gray-600">Following</span>
						</button>
						<button className="flex flex-col hover:opacity-75 transition-opacity">
							<span className="text-2xl font-bold text-gray-900">
								89
							</span>
							<span className="text-sm text-gray-600">Photos</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
