import { updateCoverPhoto, updateProfilePicture } from '@/features/auth/authSlice';
import {
	followOrUnfollow,
	uploadCoverPhoto,
	uploadProfilePicture,
} from '@/features/profile/profileThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import dummyProfilePicture from '../assets/user.jpg';
import ImageCropModal from './ImageCropModal';
import ImagePreviewModal from './ImagePreviewModal';

interface ProfileHeaderProps {
	username: string;
	postsCount: number;
	followersCount: number;
	followingCount: number;
	isFollowed: boolean;
	hasPermission: boolean;
	onFollowersClick: () => void;
	onFollowingClick: () => void;
}

type CropTarget = 'profile' | 'cover';
type PreviewTarget = 'profile' | 'cover';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileHeader = ({
	username,
	postsCount,
	followersCount,
	followingCount,
	isFollowed,
	hasPermission,
	onFollowersClick,
	onFollowingClick,
}: ProfileHeaderProps) => {
	const profilePictureUrl = useAppSelector((state) => state.profile.user.profilePictureUrl);
	const coverPhotoUrl = useAppSelector((state) => state.profile.user.coverPhotoUrl);
	const dispatch = useAppDispatch();
	const { userId } = useParams<{ userId: string }>();
	const [followAction, setFollowAction] = useState<1 | 2>(isFollowed ? 2 : 1);
	const [optimisticFollowers, setoptimisticFollowers] = useState(followersCount);
	const [cropTarget, setCropTarget] = useState<CropTarget | null>(null);
	const [cropImage, setCropImage] = useState<File | null>(null);
	const [isImageSaving, setIsImageSaving] = useState(false);
	const [previewTarget, setPreviewTarget] = useState<PreviewTarget | null>(null);

	useEffect(() => {
		setoptimisticFollowers(followersCount);
	}, [followersCount]);

	const profilePictureSrc = profilePictureUrl
		? `${SERVER_URL}/${profilePictureUrl}`
		: dummyProfilePicture;
	const hasCoverPhoto = Boolean(coverPhotoUrl);

	const coverPhotoSrc = coverPhotoUrl ? `${SERVER_URL}/${coverPhotoUrl}` : '';

	const handleFollow = () => {
		dispatch(followOrUnfollow({ targetUser: userId!, action: followAction }));
		setFollowAction(followAction === 1 ? 2 : 1);
		setoptimisticFollowers(
			followAction === 1 ? optimisticFollowers + 1 : optimisticFollowers - 1,
		);
	};

	const resetCropper = () => {
		setCropTarget(null);
		setCropImage(null);
	};

	const openPreview = (target: PreviewTarget) => {
		setPreviewTarget(target);
	};

	const handleImageKeyDown = (
		event: React.KeyboardEvent<HTMLImageElement>,
		target: PreviewTarget,
	) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openPreview(target);
		}
	};

	const startCrop = (target: CropTarget, image: FileList | null) => {
		if (!image || image.length === 0) return;
		setCropTarget(target);
		setCropImage(image[0]);
	};

	const handleCroppedUpload = async (processedImage: File) => {
		if (!userId || !cropTarget) return;

		const formData = new FormData();
		formData.append('image', processedImage);

		setIsImageSaving(true);

		try {
			if (cropTarget === 'profile') {
				const newProfilePictureUrl = await dispatch(
					uploadProfilePicture({ userId, formData }),
				).unwrap();

				dispatch(updateProfilePicture(newProfilePictureUrl));
			} else {
				const newCoverPhotoUrl = await dispatch(
					uploadCoverPhoto({ userId, formData }),
				).unwrap();

				dispatch(updateCoverPhoto(newCoverPhotoUrl));
			}

			resetCropper();
		} catch (error) {
			console.error(error);
		} finally {
			setIsImageSaving(false);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
			{/* Cover Photo Section */}
			<div className="relative h-80 bg-gray-700">
				{hasCoverPhoto && (
					<img
						src={coverPhotoSrc}
						alt="Cover"
						onClick={() => openPreview('cover')}
						onKeyDown={(event) => handleImageKeyDown(event, 'cover')}
						role="button"
						tabIndex={0}
						className="w-full h-full object-cover cursor-pointer"
					/>
				)}
				{/* Edit Cover Photo Button */}
				{hasPermission && (
					<label className="absolute bottom-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors shadow-md flex items-center space-x-2 cursor-pointer max-[520px]:w-10 max-[520px]:h-10 max-[520px]:p-0 max-[520px]:justify-center">
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
						<span className="max-[520px]:hidden">Edit Cover</span>
						<input
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								startCrop('cover', e.target.files);
								e.target.value = '';
							}}
							type="file"
							accept="image/png,image/jpeg"
							className="hidden"
						/>
					</label>
				)}
			</div>

			{/* Profile Info Section */}
			<div className="px-6 pb-6">
				{/* Profile Photo */}
				<div className="relative -mt-20 pointer-events-none">
					<div className="relative group w-fit pointer-events-auto">
							<div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
								<img
									src={profilePictureSrc}
									alt="Profile"
									onClick={() => openPreview('profile')}
									onKeyDown={(event) => handleImageKeyDown(event, 'profile')}
									role="button"
									tabIndex={0}
									className="w-full h-full object-cover cursor-pointer"
								/>
							</div>
							{/* Edit Profile Photo Button */}
							{hasPermission && (
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
											startCrop('profile', e.target.files);
											e.target.value = '';
										}}
										type="file"
										accept="image/png,image/jpeg"
										className="hidden"
									/>
								</label>
							)}
						</div>

					<div className="mt-5 flex items-center justify-between gap-4 pointer-events-auto">
						<div className="min-w-0">
							<h1 className="text-3xl font-bold text-gray-900 leading-tight break-words">
								{username}
							</h1>
						</div>

						{/* Action Buttons */}
						<div className="flex items-center justify-end gap-3 shrink-0">
							{!hasPermission && (
								<button
									onClick={handleFollow}
									className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
								>
									{followAction === 1 && (
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
									)}
									{followAction === 2 && (
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
												d="M25 4v16m8-8H4"
											/>
										</svg>
									)}
									<span>{followAction === 1 ? 'Follow' : 'Unfollow'}</span>
								</button>
							)}
							<button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors max-[520px]:w-10 max-[520px]:h-10 max-[520px]:px-0 max-[520px]:justify-center">
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
								<span className="max-[520px]:hidden">Message</span>
							</button>
						</div>
					</div>
				</div>

				{/* Stats */}
				<div className="mt-6 pt-5 border-t border-gray-200">
					<div className="flex flex-wrap gap-6">
						<button className="cursor-text flex flex-col">
							<span className="text-2xl font-bold text-gray-900">{postsCount}</span>
							<span className="text-sm text-gray-600">Posts</span>
						</button>
						<button
							onClick={onFollowersClick}
							className="flex flex-col hover:opacity-75 transition-opacity"
						>
							<span className="text-2xl font-bold text-gray-900">
								{optimisticFollowers}
							</span>
							<span className="text-sm text-gray-600">Followers</span>
						</button>
						<button
							onClick={onFollowingClick}
							className="flex flex-col hover:opacity-75 transition-opacity"
						>
							<span className="text-2xl font-bold text-gray-900">
								{followingCount}
							</span>
							<span className="text-sm text-gray-600">Following</span>
						</button>
					</div>
				</div>
			</div>

			{cropTarget && cropImage && (
				<ImageCropModal
					mode={cropTarget}
					imageFile={cropImage}
					isSaving={isImageSaving}
					onCancel={resetCropper}
					onConfirm={handleCroppedUpload}
				/>
			)}

			{previewTarget && (previewTarget === 'profile' || hasCoverPhoto) && (
				<ImagePreviewModal
					imageSrc={previewTarget === 'profile' ? profilePictureSrc : coverPhotoSrc}
					imageAlt={
						previewTarget === 'profile'
							? 'Profile image preview'
							: 'Cover image preview'
					}
					variant={previewTarget}
					onClose={() => setPreviewTarget(null)}
				/>
			)}
		</div>
	);
};

export default ProfileHeader;
