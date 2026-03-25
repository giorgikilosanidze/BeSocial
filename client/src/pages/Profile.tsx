import { fetchProfileInfo } from '@/features/profile/profileThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileFriends from '@/components/ProfileFriends';
import PostCard from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';
import ProfileSkeleton from '@/skeletons/ProfileSkeleton';
import { socket } from '@/socket';
import { updateFollowsInRealTime } from '@/features/profile/profileSlice';
import UsersListModal from '@/components/UsersListModal';
import { useState } from 'react';

const Profile = () => {
	const loggedInUserId = useAppSelector((state) => state.auth.user.id);
	const user = useAppSelector((state) => state.profile.user);
	const loggedInUser = useAppSelector((state) => state.auth.user);
	const isLoading = useAppSelector((state) => state.profile.isLoading);
	const { userId } = useParams<{ userId: string }>();
	const dispatch = useAppDispatch();
	const [modalType, setModalType] = useState<'followers' | 'following' | null>(null);

	const hasPermission = loggedInUserId === userId;

	const displayFollowersCount = hasPermission ? loggedInUser.followersCount : user.followersCount;
	const displayFollowingCount = hasPermission ? loggedInUser.followingCount : user.followingCount;

	useEffect(() => {
		if (!userId) return;
		dispatch(fetchProfileInfo(userId));
	}, [userId, dispatch]);

	useEffect(() => {
		socket.on('followedOrUnfollowed', (followsData) => {
			dispatch(updateFollowsInRealTime(followsData));
		});

		return () => {
			socket.off('followedOrUnfollowed');
		};
	}, [dispatch]);

	if (isLoading) {
		return <ProfileSkeleton />;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />

			{/* Main Container */}
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				{/* Profile Header */}
				<ProfileHeader
					username={user.username}
					postsCount={user.postsCount}
					followersCount={displayFollowersCount}
					followingCount={displayFollowingCount}
					isFollowed={user.isFollowed}
					hasPermission={hasPermission}
					onFollowersClick={() => setModalType('followers')}
					onFollowingClick={() => setModalType('following')}
				/>

				{/* Main Content Area */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
					{/* Left Sidebar - About/Info */}
					<div className="lg:col-span-1 space-y-6">
						<ProfileFriends />
					</div>

					{/* Right Content - Posts/Timeline */}
					<div className="lg:col-span-2 space-y-6">
						{/* Create Post */}
						{hasPermission && <CreatePost />}

						{/* Posts */}
						{user.posts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				</div>
			</div>

			{modalType && (
				<UsersListModal
					setIsOpen={(value) => {
						const isModalOpen = typeof value === 'function' ? value(true) : value;
						if (!isModalOpen) setModalType(null);
					}}
					userId={userId!}
					type={modalType}
				/>
			)}
		</div>
	);
};

export default Profile;
