const SuggestionsSidebar = () => {
	return (
		<aside className="hidden lg:block lg:col-span-3">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
				{/* User Suggestions */}
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold text-gray-900 text-sm">Suggestions For You</h3>
					<button className="text-xs text-blue-600 hover:text-blue-700 font-medium">See All</button>
				</div>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-full overflow-hidden">
								<img src="https://ui-avatars.com/api/?name=Alex+Turner&background=dc2626&color=fff" alt="Alex Turner" className="w-full h-full object-cover" />
							</div>
							<div>
								<p className="font-medium text-sm text-gray-900">Alex Turner</p>
								<p className="text-xs text-gray-500">12 mutual friends</p>
							</div>
						</div>
						<button className="text-blue-600 hover:text-blue-700 font-medium text-xs">
							Follow
						</button>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-full overflow-hidden">
								<img src="https://ui-avatars.com/api/?name=Sophie+Miller&background=ea580c&color=fff" alt="Sophie Miller" className="w-full h-full object-cover" />
							</div>
							<div>
								<p className="font-medium text-sm text-gray-900">Sophie Miller</p>
								<p className="text-xs text-gray-500">8 mutual friends</p>
							</div>
						</div>
						<button className="text-blue-600 hover:text-blue-700 font-medium text-xs">
							Follow
						</button>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-full overflow-hidden">
								<img src="https://ui-avatars.com/api/?name=David+Lee&background=0891b2&color=fff" alt="David Lee" className="w-full h-full object-cover" />
							</div>
							<div>
								<p className="font-medium text-sm text-gray-900">David Lee</p>
								<p className="text-xs text-gray-500">15 mutual friends</p>
							</div>
						</div>
						<button className="text-blue-600 hover:text-blue-700 font-medium text-xs">
							Follow
						</button>
					</div>
				</div>

				{/* Trending Topics */}
				<div className="mt-6 pt-6 border-t border-gray-200">
					<h3 className="font-semibold text-gray-900 text-sm mb-4">Trending Topics</h3>
					<div className="space-y-3">
						<div className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
							<p className="font-medium text-sm text-gray-900">#WebDevelopment</p>
							<p className="text-xs text-gray-500">12.4K posts</p>
						</div>
						<div className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
							<p className="font-medium text-sm text-gray-900">#ReactJS</p>
							<p className="text-xs text-gray-500">8.9K posts</p>
						</div>
						<div className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
							<p className="font-medium text-sm text-gray-900">#TechNews</p>
							<p className="text-xs text-gray-500">15.2K posts</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default SuggestionsSidebar;
