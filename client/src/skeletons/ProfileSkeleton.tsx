import Navbar from '@/components/Navbar';
import PostSkeleton from './PostSkeleton';

const ProfileSkeleton = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />

			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				{/* Profile Header Skeleton */}
				<div className="bg-white shadow rounded-lg overflow-hidden mb-6 animate-pulse">
					{/* Cover Photo */}
					<div className="h-48 bg-gray-200 w-full"></div>

					<div className="px-4 pb-4">
						<div className="relative flex items-end -mt-16 mb-4">
							{/* Profile Picture */}
							<div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white"></div>
						</div>

						{/* User Info */}
						<div className="space-y-2">
							<div className="h-6 bg-gray-200 rounded w-48"></div> {/* Name */}
							<div className="h-4 bg-gray-200 rounded w-32"></div> {/* Headline */}
						</div>

						{/* Stats/Buttons */}
						<div className="flex justify-end mt-4 space-x-3">
							<div className="h-9 bg-gray-200 rounded w-24"></div>
							<div className="h-9 bg-gray-200 rounded w-24"></div>
						</div>
					</div>
				</div>

				{/* Profile Tabs Skeleton */}
				<div className="bg-white shadow rounded-lg mb-6 p-4 animate-pulse flex space-x-6">
					<div className="h-4 bg-gray-200 rounded w-16"></div>
					<div className="h-4 bg-gray-200 rounded w-16"></div>
					<div className="h-4 bg-gray-200 rounded w-16"></div>
					<div className="h-4 bg-gray-200 rounded w-16"></div>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left Sidebar */}
					<div className="lg:col-span-1 space-y-6">
						{/* Intro Skeleton */}
						<div className="bg-white shadow rounded-lg p-4 animate-pulse space-y-3">
							<div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
							<div className="h-4 bg-gray-200 rounded w-full"></div>
							<div className="h-4 bg-gray-200 rounded w-5/6"></div>
							<div className="h-4 bg-gray-200 rounded w-4/6"></div>
						</div>

						{/* Photos Skeleton */}
						<div className="bg-white shadow rounded-lg p-4 animate-pulse">
							<div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
							<div className="grid grid-cols-3 gap-2">
								{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
									<div
										key={i}
										className="aspect-square bg-gray-200 rounded"
									></div>
								))}
							</div>
						</div>

						{/* Friends Skeleton */}
						<div className="bg-white shadow rounded-lg p-4 animate-pulse">
							<div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
							<div className="grid grid-cols-3 gap-2">
								{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
									<div
										key={i}
										className="aspect-square bg-gray-200 rounded-full"
									></div>
								))}
							</div>
						</div>
					</div>

					{/* Right Content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Create Post Skeleton */}
						<div className="bg-white shadow rounded-lg p-4 animate-pulse flex space-x-3">
							<div className="w-10 h-10 bg-gray-200 rounded-full"></div>
							<div className="flex-1 h-10 bg-gray-200 rounded-full"></div>
						</div>

						{/* Posts Skeletons */}
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSkeleton;
