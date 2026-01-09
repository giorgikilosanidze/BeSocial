import { createPost } from '@/features/feed/feedThunks';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useState, type ChangeEvent } from 'react';

const CreatePost = () => {
	const [postText, setPostText] = useState('');
	const dispatch = useAppDispatch();

	const handleCreatePost = () => {
		dispatch(createPost({ text: postText }));
	};

	const handlePostText = (text: string) => {
		setPostText(text);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
			<div className="flex space-x-3">
				<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
					<img
						src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
						alt="Profile"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex-1">
					<textarea
						value={postText}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
							handlePostText(e.target.value)
						}
						rows={1}
						placeholder="What's on your mind?"
						className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
					></textarea>
				</div>
			</div>

			{/* Image Preview Container */}
			<div id="image-preview-container" className="mt-3 hidden">
				<div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
					{/* Images will be displayed here */}
					{/* <div className="relative group">
						<img src="" alt="Preview" className="w-full h-48 object-cover rounded-lg" />
						<button
							type="button"
							className="absolute top-2 right-2 bg-white hover:bg-gray-100 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<svg
								className="w-4 h-4 text-gray-700"
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
					</div> */}
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-200">
				<div className="flex space-x-2">
					<label className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
						<svg
							className="w-5 h-5 text-green-600"
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
						<span className="text-sm font-medium text-gray-700">Photo</span>
						<input type="file" className="hidden" />
					</label>
				</div>
				<button
					onClick={handleCreatePost}
					className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
				>
					Post
				</button>
			</div>
		</div>
	);
};

export default CreatePost;
