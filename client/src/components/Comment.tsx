const Comment = () => {
	return (
		<div className="flex space-x-2">
			<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
				<img src="https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff" alt="Commenter" className="w-full h-full object-cover" />
			</div>
			<div className="flex-1">
				<div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
					<p className="font-semibold text-sm text-gray-900">John Doe</p>
					<p className="text-sm text-gray-700">Amazing post! Thanks for sharing 👍</p>
				</div>
				<div className="flex items-center space-x-4 mt-1 px-3">
					<button className="text-xs text-gray-500 hover:text-blue-600 font-medium">Like</button>
					<button className="text-xs text-gray-500 hover:text-blue-600 font-medium">Reply</button>
					<span className="text-xs text-gray-400">1h</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
