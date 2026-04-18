import routes from '@/constants/routes';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import dummyProfilePicture from '../assets/user.jpg';
import FollowedByModal from './FollowedByModal';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const deterministicScore = (value: string, seed: string) => {
	const combined = `${seed}:${value}`;
	let hash = 2166136261;

	for (let i = 0; i < combined.length; i++) {
		hash ^= combined.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
};

const FollowedBy = () => {
	const loggedInUserId = useAppSelector((state) => state.auth.user.id);
	const visitedUserId = useAppSelector((state) => state.profile.user.id);
	const followedBy = useAppSelector((state) => state.profile.user.followedBy);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isOwnProfile = loggedInUserId === visitedUserId;
	const showSeeAll = !isOwnProfile && followedBy.length > 0;

	const previewUsers = useMemo(() => {
		if (followedBy.length <= 6) {
			return followedBy;
		}

		const seed = `${loggedInUserId}:${visitedUserId}:${followedBy.length}`;
		return [...followedBy]
			.sort((a, b) => {
				const scoreA = deterministicScore(a._id, seed);
				const scoreB = deterministicScore(b._id, seed);
				if (scoreA === scoreB) {
					return a.username.localeCompare(b.username);
				}
				return scoreA - scoreB;
			})
			.slice(0, 6);
	}, [followedBy, loggedInUserId, visitedUserId]);

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">
					Followed By
					{!isOwnProfile && (
						<span className="text-sm text-gray-500 font-normal ml-2">
							({followedBy.length})
						</span>
					)}
				</h3>
				{showSeeAll && (
					<button
						onClick={() => setIsModalOpen(true)}
						className="text-sm text-blue-600 hover:underline"
					>
						See all
					</button>
				)}
			</div>

			{isOwnProfile ? (
				<p className="text-sm text-gray-500">You are on your own profile.</p>
			) : followedBy.length === 0 ? (
				<p className="text-sm text-gray-500">No mutual connections.</p>
			) : (
				<div className="grid grid-cols-3 gap-3">
					{previewUsers.map((user) => {
						const profilePictureSrc = user.profilePictureUrl
							? `${SERVER_URL}/${user.profilePictureUrl}`
							: dummyProfilePicture;

						return (
							<div key={user._id} className="flex flex-col items-center">
								<Link
									to={routes.profile.replace(':userId', user._id)}
									className="w-full"
								>
									<div className="w-full aspect-square rounded-full overflow-hidden bg-gray-100 mb-2">
										<img
											src={profilePictureSrc}
											alt={user.username}
											className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
										/>
									</div>
								</Link>
								<Link
									to={routes.profile.replace(':userId', user._id)}
									className="text-xs font-medium text-gray-900 text-center truncate w-full hover:underline"
								>
									{user.username}
								</Link>
							</div>
						);
					})}
				</div>
			)}

			{isModalOpen && (
				<FollowedByModal users={followedBy} onClose={() => setIsModalOpen(false)} />
			)}
		</div>
	);
};

export default FollowedBy;
