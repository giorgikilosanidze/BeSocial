const PostSkeleton = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
			{/* Post Header Skeleton */}
			<div className="p-4 flex items-start justify-between">
				<div className="flex space-x-3">
					<div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
					<div className="flex-1 space-y-2 py-1">
						<div className="h-4 bg-gray-200 rounded w-24"></div>
						<div className="h-3 bg-gray-200 rounded w-16"></div>
					</div>
				</div>
			</div>

			{/* Post Content Skeleton */}
			<div className="px-4 pb-3 space-y-2">
				<div className="h-4 bg-gray-200 rounded w-full"></div>
				<div className="h-4 bg-gray-200 rounded w-5/6"></div>
				<div className="h-4 bg-gray-200 rounded w-4/6"></div>
			</div>

			{/* Post Image Skeleton (Optional, but good for visual weight) */}
			<div className="w-full h-64 bg-gray-200"></div>

			{/* Reactions Summary Skeleton */}
			<div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
				<div className="h-4 bg-gray-200 rounded w-16"></div>
				<div className="h-4 bg-gray-200 rounded w-24"></div>
			</div>

			{/* Action Buttons Skeleton */}
			<div className="px-4 py-2 flex items-center justify-around border-b border-gray-100">
				<div className="h-8 bg-gray-200 rounded w-20"></div>
				<div className="h-8 bg-gray-200 rounded w-20"></div>
				<div className="h-8 bg-gray-200 rounded w-20"></div>
			</div>
		</div>
	);
};

export default PostSkeleton;
