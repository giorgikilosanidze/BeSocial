const ProfilePostsFilter = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">Posts</h3>
				<div className="flex items-center space-x-2">
					<button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
						All Posts
					</button>
					<button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
						Photos
					</button>
					<button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
						Videos
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePostsFilter;
