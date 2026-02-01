import { uploadCoverPhoto, uploadProfilePicture } from '@/features/profile/profileThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import type { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

interface ProfileHeaderProps {
	username: string;
	postsCount: number;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileHeader = ({ username, postsCount }: ProfileHeaderProps) => {
	const profilePictureUrl = useAppSelector((state) => state.profile.user.profilePictureUrl);
	const coverPhotoUrl = useAppSelector((state) => state.profile.user.coverPhotoUrl);
	const dispatch = useAppDispatch();
	const { userId } = useParams<{ userId: string }>();

	const profilePictureSrc = profilePictureUrl
		? `${SERVER_URL}/${profilePictureUrl}`
		: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=200';

	const coverPhotoSrc = coverPhotoUrl
		? `${SERVER_URL}/${coverPhotoUrl}`
		: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200';

	const handleProfilePicture = (image: FileList | null) => {
		if (!image || !userId) return;

		const formData = new FormData();
		formData.append('image', image[0]);

		dispatch(uploadProfilePicture({ userId, formData }));
	};

	const handleCoverPhoto = (image: FileList | null) => {
		if (!image || !userId) return;

		const formData = new FormData();
		formData.append('image', image[0]);

		dispatch(uploadCoverPhoto({ userId, formData }));
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
			{/* Cover Photo Section */}
			<div className="relative h-80 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
				{/* Cover Photo - will be replaced with actual image */}
				<img src={coverPhotoSrc} alt="Cover" className="w-full h-full object-cover" />
				{/* Edit Cover Photo Button */}
				<label className="absolute bottom-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors shadow-md flex items-center space-x-2 cursor-pointer">
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
					<input
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							handleCoverPhoto(e.target.files);
							e.target.value = '';
						}}
						type="file"
						accept="image/png,image/jpeg"
						className="hidden"
					/>
				</label>
			</div>

			{/* Profile Info Section */}
			<div className="px-6 pb-6">
				{/* Profile Photo */}
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-20 relative pointer-events-none">
					<div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-5 pointer-events-auto">
						<div className="relative group">
							<div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
								<img
									src={profilePictureSrc}
									alt="Profile"
									className="w-full h-full object-cover"
								/>
							</div>
							{/* Edit Profile Photo Button */}
							<label className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors border-2 border-gray-200 cursor-pointer">
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
								<input
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										handleProfilePicture(e.target.files);
										e.target.value = '';
									}}
									type="file"
									accept="image/png,image/jpeg"
									className="hidden"
								/>
							</label>
						</div>
						<div className="pb-2">
							<h1 className="text-3xl font-bold text-gray-900 mb-6">{username}</h1>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex space-x-3 mt-4 sm:mt-0 pointer-events-auto">
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
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
							</svg>
						</button>
					</div>
				</div>

				{/* Bio and Info */}
				<div className="mt-6 space-y-3">
					<h1 className="font-semibold text-xl">BIO</h1>
					<p className="text-gray-700">
						Those who break the rules are scum, but those who abandon there friends are
						worse than scum.
					</p>
				</div>

				{/* Stats */}
				<div className="mt-6 pt-5 border-t border-gray-200">
					<div className="flex flex-wrap gap-6">
						<button className="flex flex-col hover:opacity-75 transition-opacity">
							<span className="text-2xl font-bold text-gray-900">{postsCount}</span>
							<span className="text-sm text-gray-600">Posts</span>
						</button>
						<button className="flex flex-col hover:opacity-75 transition-opacity">
							<span className="text-2xl font-bold text-gray-900">1,842</span>
							<span className="text-sm text-gray-600">Followers</span>
						</button>
						<button className="flex flex-col hover:opacity-75 transition-opacity">
							<span className="text-2xl font-bold text-gray-900">531</span>
							<span className="text-sm text-gray-600">Following</span>
						</button>
						<button className="flex flex-col hover:opacity-75 transition-opacity">
							<span className="text-2xl font-bold text-gray-900">89</span>
							<span className="text-sm text-gray-600">Photos</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
