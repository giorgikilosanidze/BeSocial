import { fetchProfileInfo } from '@/features/profile/profileThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileTabs from '@/components/ProfileTabs';
import ProfileIntro from '@/components/ProfileIntro';
import ProfilePhotos from '@/components/ProfilePhotos';
import ProfileFriends from '@/components/ProfileFriends';
import PostCard from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';

const Profile = () => {
	const user = useAppSelector((state) => state.profile.user);
	const { userId } = useParams<{ userId: string }>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!userId) return;
		dispatch(fetchProfileInfo(userId));
	}, [userId, dispatch]);

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />

			{/* Main Container */}
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				{/* Profile Header */}
				<ProfileHeader username={user.username} postsCount={user.postsCount} />

				{/* Tabs Navigation */}
				<ProfileTabs />

				{/* Main Content Area */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
					{/* Left Sidebar - About/Info */}
					<div className="lg:col-span-1 space-y-6">
						<ProfileIntro />
						<ProfilePhotos />
						<ProfileFriends />
					</div>

					{/* Right Content - Posts/Timeline */}
					<div className="lg:col-span-2 space-y-6">
						{/* Create Post */}
						<CreatePost />

						{/* Posts */}
						{user.posts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
