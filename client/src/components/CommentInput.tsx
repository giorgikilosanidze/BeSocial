const CommentInput = () => {
	return (
		<div className="flex space-x-2 mt-3">
			<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
				<img src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff" alt="Your avatar" className="w-full h-full object-cover" />
			</div>
			<div className="flex-1 flex space-x-2">
				<input
					type="text"
					placeholder="Write a comment..."
					className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button className="text-blue-600 hover:text-blue-700 transition-colors">
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default CommentInput;
