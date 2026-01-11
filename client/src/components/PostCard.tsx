import type { PostCardProps } from '@/types/feed';
import { timeAgo } from '@/utils/formatTime';
import { useState } from 'react';

const PostCard = ({ post }: PostCardProps) => {
	const [optionsVisibility, setOptionsVisibility] = useState(false);

	const postCreatedAgo = timeAgo(post.createdAt);

	const toggleOptionsVisibility = () => {
		setOptionsVisibility(!optionsVisibility);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			{/* Post Header */}
			<div className="p-4 flex items-start justify-between">
				<div className="flex space-x-3">
					<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
						<img
							src={
								'https://ui-avatars.com/api/?name=Sarah+Johnson&background=2563eb&color=fff'
							}
							alt={post.author.username}
							className="w-full h-full object-cover"
						/>
					</div>
					<div>
						<h4 className="font-semibold text-gray-900 text-sm">
							{post.author.username}
						</h4>
						<p className="text-xs text-gray-500">
							{postCreatedAgo}
							{/* Edited indicator */}
							<span className="ml-1 text-gray-400">(edited)</span>
						</p>
					</div>
				</div>
				<div className="relative">
					<button
						onClick={toggleOptionsVisibility}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
						</svg>
					</button>
					{/* Dropdown menu - hidden by default, shown when three-dots clicked */}
					{optionsVisibility && (
						<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
							<button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-t-lg">
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
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
								<span>Edit Post</span>
							</button>
							<button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-lg">
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
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
								<span>Delete Post</span>
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Post Content */}
			<div className="px-4 pb-3">
				<p className="text-gray-800 text-sm leading-relaxed">{post.text}</p>
			</div>

			{/* Post Image */}
			{post.imageUrl && (
				<div className="w-full">
					<img src={post.imageUrl} alt="Post" className="w-full object-cover max-h-96" />
				</div>
			)}

			{/* Reactions Summary */}
			<div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500 border-b border-gray-100">
				<div className="flex items-center space-x-2">
					<div className="flex -space-x-1">
						<div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border border-white">
							<svg
								className="w-3 h-3 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
							</svg>
						</div>
						<div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border border-white">
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
					{/* <span>{post.likes + post.loves}</span> */}
				</div>
				<div className="flex items-center space-x-4">
					<button className="hover:underline">{post.comments} comments</button>
					<span>12 shares</span>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="px-4 py-2 flex items-center justify-around border-b border-gray-100">
				<button
					className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
						post.isLiked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
					}`}
				>
					<svg
						className="w-5 h-5"
						fill={post.isLiked ? 'currentColor' : 'none'}
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
						/>
					</svg>
					<span className="font-medium text-sm">Like</span>
				</button>
				<button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>
					<span className="font-medium text-sm">Comment</span>
				</button>
				<button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
						/>
					</svg>
					<span className="font-medium text-sm">Share</span>
				</button>
			</div>

			{/* Comments Section - Always hidden for UI demo */}
			{/* You can show this conditionally based on your logic */}
		</div>
	);
};

export default PostCard;
