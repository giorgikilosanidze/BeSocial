import SERVER_URL from '@/constants/serverUrl';
import { getSuggestions } from '@/features/feed/feedThunks';
import { followOrUnfollow } from '@/features/profile/profileThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuggestionsSidebar = () => {
	const suggestions = useAppSelector((state) => state.feed.suggestions);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [followActions, setFollowActions] = useState<Record<string, 1 | 2>>({});

	useEffect(() => {
		dispatch(getSuggestions());
	}, [dispatch]);

	const handleFollow = (targetUserId: string) => {
		const currentAction = followActions[targetUserId] || 1;
		dispatch(followOrUnfollow({ targetUser: targetUserId, action: currentAction }));
		setFollowActions((prev) => ({
			...prev,
			[targetUserId]: currentAction === 1 ? 2 : 1,
		}));
	};

	return (
		<aside className="hidden lg:block lg:col-span-3">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
				{/* User Suggestions */}
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold text-gray-900 text-sm">Suggestions For You</h3>
					<button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
						See All
					</button>
				</div>
				<div className="space-y-3">
					{suggestions.map((suggestion) => {
						const profilePictureSrc = suggestion.profilePictureUrl
							? `${SERVER_URL}/${suggestion.profilePictureUrl}`
							: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=200';

						const action = followActions[suggestion._id] || 1;

						return (
							<div key={suggestion._id} className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 rounded-full overflow-hidden">
										<img
											onClick={() => navigate(`/profile/${suggestion._id}`)}
											src={profilePictureSrc}
											alt={suggestion.username}
											className="w-full h-full object-cover cursor-pointer"
										/>
									</div>
									<div>
										<p
											onClick={() => navigate(`/profile/${suggestion._id}`)}
											className="font-medium text-sm text-gray-900 cursor-pointer hover:underline"
										>
											{suggestion.username}
										</p>
									</div>
								</div>
								<button
									onClick={() => handleFollow(suggestion._id)}
									className={`font-medium text-xs ${
										action === 1
											? 'text-blue-600 hover:text-blue-700'
											: 'text-red-500 hover:text-red-600'
									}`}
								>
									{action === 1 ? 'Follow' : 'Unfollow'}
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</aside>
	);
};

export default SuggestionsSidebar;
