import routes from '@/constants/routes';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileSidebar = () => {
	const user = useAppSelector((state) => state.auth.user);
	const navigate = useNavigate();

	const handleViewProfileClick = () => {
		navigate(routes.profile.replace(':userId', user.id));
	};

	const profilePictureSrc = user.profilePictureUrl
		? `${SERVER_URL}/${user.profilePictureUrl}`
		: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=200';

	const coverPhotoSrc = user.coverPhotoUrl
		? `${SERVER_URL}/${user.coverPhotoUrl}`
		: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=200';

	return (
		<aside className="hidden lg:block lg:col-span-3">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-20">
				<div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600">
					<img src={coverPhotoSrc} alt="Profile" className="w-full h-full object-cover" />
				</div>
				<div className="px-4 pb-4">
					<div className="flex flex-col items-center -mt-10">
						<div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
							<img
								src={profilePictureSrc}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</div>
						<h3 className="mt-2 text-lg font-semibold text-gray-900">
							{user.username}
						</h3>
					</div>
					<div className="mt-4 pt-4 border-t border-gray-200">
						<div className="flex justify-around text-center">
							<div>
								<p className="text-lg font-bold text-gray-900">{user.postsCount}</p>
								<p className="text-xs text-gray-500">Posts</p>
							</div>
							<div>
								<p className="text-lg font-bold text-gray-900">
									{user.followersCount}
								</p>
								<p className="text-xs text-gray-500">Followers</p>
							</div>
							<div>
								<p className="text-lg font-bold text-gray-900">
									{user.followingCount}
								</p>
								<p className="text-xs text-gray-500">Following</p>
							</div>
						</div>
					</div>
					<button
						onClick={handleViewProfileClick}
						className="w-full mt-4 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
					>
						View Profile
					</button>
				</div>
			</div>
		</aside>
	);
};

export default ProfileSidebar;
