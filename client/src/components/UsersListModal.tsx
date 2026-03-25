import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import SERVER_URL from '@/constants/serverUrl';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
	followOrUnfollow,
	getFollowersList,
	getFollowingList,
} from '@/features/profile/profileThunks';
import type { FollowListUser } from '@/types/profile';
import dummyProfilePicture from '../assets/user.jpg';

interface UsersListModalProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	userId: string;
	type: 'followers' | 'following';
}

const UsersListModal = ({ setIsOpen, userId, type }: UsersListModalProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loggedInUserId = useAppSelector((state) => state.auth.user.id);
	const [users, setUsers] = useState<FollowListUser[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const action =
					type === 'followers' ? getFollowersList(userId) : getFollowingList(userId);
				const result = await dispatch(action).unwrap();

				// Optional: sort logged in user to the top
				const sortedResult = [...result].sort((a, b) => {
					if (a._id === loggedInUserId) return -1;
					if (b._id === loggedInUserId) return 1;
					return 0;
				});

				setUsers(sortedResult);
			} catch (error) {
				console.error('Failed to fetch list', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUsers();
	}, [dispatch, userId, type, loggedInUserId]);

	const handleFollowToggle = async (targetId: string, isCurrentlyFollowed: boolean) => {
		// Optimistic update
		const actionType = isCurrentlyFollowed ? 2 : 1;
		setUsers((currentUsers) =>
			currentUsers.map((u) =>
				u._id === targetId ? { ...u, isFollowed: !isCurrentlyFollowed } : u,
			),
		);

		try {
			// Actually dispatch follow action
			await dispatch(followOrUnfollow({ targetUser: targetId, action: actionType })).unwrap();
		} catch (error) {
			// Revert if failed
			setUsers((currentUsers) =>
				currentUsers.map((u) =>
					u._id === targetId ? { ...u, isFollowed: isCurrentlyFollowed } : u,
				),
			);
			console.error('Failed to toggle follow', error);
		}
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false);
		};
		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleEscape);
		};
	}, [setIsOpen]);

	const title = type === 'followers' ? 'Followers' : 'Following';

	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
			>
				<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<h2 className="text-lg font-bold text-gray-900">{title}</h2>
						{!isLoading && (
							<span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
								{users.length}
							</span>
						)}
					</div>
					<button
						onClick={closeModal}
						className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
					>
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div className="overflow-y-auto flex-1 p-2">
					{isLoading && (
						<div className="flex items-center justify-center py-12">
							<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}

					{!isLoading && users.length === 0 && (
						<div className="flex flex-col items-center justify-center py-12 text-gray-400">
							<p className="text-sm font-medium">No users found.</p>
						</div>
					)}

					{!isLoading && users.length > 0 && (
						<div className="space-y-1">
							{users.map((u) => {
								const profilePictureSrc = u.profilePictureUrl
									? `${SERVER_URL}/${u.profilePictureUrl}`
									: dummyProfilePicture;

								return (
									<div
										key={u._id}
										className="flex items-center justify-between rounded-xl p-3 hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center space-x-3 min-w-0">
											<img
												onClick={() => {
													navigate(`/profile/${u._id}`);
													closeModal();
												}}
												src={profilePictureSrc}
												alt={u.username}
												className="w-11 h-11 rounded-full object-cover cursor-pointer"
											/>
											<div className="min-w-0">
												<p
													onClick={() => {
														navigate(`/profile/${u._id}`);
														closeModal();
													}}
													className="font-semibold text-sm text-gray-900 truncate cursor-pointer hover:underline"
												>
													{u.username}
												</p>
											</div>
										</div>

										{u._id !== loggedInUserId && (
											<button
												onClick={() =>
													handleFollowToggle(u._id, u.isFollowed)
												}
												className={`font-medium text-xs px-4 py-2 rounded-lg transition-colors ${
													u.isFollowed
														? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
														: 'bg-blue-600 text-white hover:bg-blue-700'
												}`}
											>
												{u.isFollowed ? 'Unfollow' : 'Follow'}
											</button>
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UsersListModal;
